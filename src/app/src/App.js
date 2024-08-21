import './App.css';
import { useState } from 'react';
import { useTodos } from './useTodos';

export function App() {
  const { todos, loading, error, createTodo, updateTodo, deleteTodo } = useTodos();
  const [editTodo, setEditTodo] = useState(null);
  const [todoText, setTodoText] = useState('');

  // Handles todo creation
  const handleTodoCreation = (event) => {
    event.preventDefault();
    if (todoText) {
      createTodo(todoText);
      setTodoText('');
    }
  };

  // Handles todo updation
  const handleTodoUpdate = (event) => {
    event.preventDefault();
    if (editTodo && todoText) {
      updateTodo(editTodo._id, todoText);
      setTodoText('');
      setEditTodo(null);
    }
  };


  // Handles edit click
  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setTodoText(todo.text);
  };

  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <ul>
            {todos.length ? todos.map((todo) => (
              <li key={todo._id} style={{
                padding: '8px 12px',
                borderBottom: '1px solid #ddd',
                fontSize: '18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                {todo.text}
                <div style={{
                  display: 'flex',
                  gap: '8px'
                }}>
                  <button onClick={() => handleEditClick(todo)}>Edit</button>
                  <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </div>
              </li>
            )) : <div>No todos found. Create a new todo below!</div>}
          </ul>
        )}
      </div>
      <div>
        <h1>{editTodo ? 'Edit a ToDo' : 'Create a ToDo'}</h1>
        <form onSubmit={editTodo ? handleTodoUpdate : handleTodoCreation}>
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input
              type="text"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              required
            />
          </div>
          <div style={{ marginTop: '5px' }}>
            <button type="submit">{editTodo ? 'Update ToDo' : 'Add ToDo!'}</button>
            {editTodo && (
              <button
                type="button"
                onClick={() => {
                  setEditTodo(null);
                  setTodoText('');
                }}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;