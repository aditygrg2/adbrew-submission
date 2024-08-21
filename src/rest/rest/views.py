from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

# MongoDB setup
mongo_uri = 'mongodb://' + os.environ.get("MONGO_HOST", "localhost") + ':' + os.environ.get("MONGO_PORT", "27017")
db = MongoClient(mongo_uri)['test_db']
todos_collection = db['todos']

class TodoListView(APIView):

    def get(self, _):
        # Implement this method - return all todo items from db instance above.
        try:
            todos = list(todos_collection.find({}).sort('timestamp', 1))
            todos = [{'text': todo['text'], '_id': str(todo['_id']), 'timestamp': str(todo['timestamp'])} for todo in todos]
            return Response(todos, status=status.HTTP_200_OK)
        except Exception as e:
            logging.error(f"Error fetching todos: {e}")
            return Response({"error": "Error fetching todos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        try:
            todo_text = request.data.get('text')
            if not todo_text:
                return Response({"error": "Todo text is required"}, status=status.HTTP_400_BAD_REQUEST)

            todo_item = {
                'text': todo_text,
                'timestamp': datetime.utcnow()
            }

            result = todos_collection.insert_one(todo_item)

            return Response({
                '_id': str(result.inserted_id),
                'text': todo_text,
                'timestamp': str(todo_item['timestamp'])
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            logging.error(f"Error saving todo: {e}")
            return Response({"error": "Error saving todo"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, _, id):
        try:
            result = todos_collection.delete_one({'_id': ObjectId(id)})
            if result.deleted_count == 0:
                return Response({"error": "Todo not found"}, status=status.HTTP_404_NOT_FOUND)
            return Response({"message": "Todo deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logging.error(f"Error deleting todo: {e}")
            return Response({"error": "Error deleting todo"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, id):
        try:
            todo_text = request.data.get('text')
            if not todo_text:
                return Response({"error": "Todo text is required"}, status=status.HTTP_400_BAD_REQUEST)

            result = todos_collection.update_one(
                {'_id': ObjectId(id)},
                {'$set': {'text': todo_text, 'timestamp': datetime.utcnow()}}
            )

            if result.matched_count == 0:
                return Response({"error": "Todo not found"}, status=status.HTTP_404_NOT_FOUND)
            
            return Response({"message": "Todo updated successfully"}, status=status.HTTP_200_OK)

        except Exception as e:
            logging.error(f"Error updating todo: {e}")
            return Response({"error": "Error updating todo"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)