import React from 'react'

const TodoDisplay = ({ todos, handleEditClick, deleteTodo, loading, error }) => {
    return (
        <div>
            <h1>List of TODOs</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) :
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
            }</div>)
}

export default TodoDisplay