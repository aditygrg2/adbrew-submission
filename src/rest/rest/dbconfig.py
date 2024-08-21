import os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ.get("MONGO_HOST", "localhost") + ':' + os.environ.get("MONGO_PORT", "27017")
db = MongoClient(mongo_uri)['test_db']
