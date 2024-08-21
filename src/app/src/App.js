import './App.css';
import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import EditTodo from './components/EditTodo';
import TodoDisplay from './components/TodoDisplay';

export function App() {
  const { todos, loading, error, createTodo, updateTodo, deleteTodo } = useTodos();
  const [editTodo, setEditTodo] = useState(null);
  const [todoText, setTodoText] = useState('');

  // Handles edit click
  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setTodoText(todo.text);
  };

  return (
    <div className="App">
      <TodoDisplay
        error={error}
        todos={todos}
        handleEditClick={handleEditClick}
        deleteTodo={deleteTodo}
        loading={loading}
      />
      <EditTodo
        editTodo={editTodo}
        todoText={todoText}
        setTodoText={setTodoText}
        setEditTodo={setEditTodo}
        createTodo={createTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default App;