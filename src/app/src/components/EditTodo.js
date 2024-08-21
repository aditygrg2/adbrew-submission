import React from 'react';

const EditTodo = ({editTodo, setEditTodo, setTodoText, todoText, createTodo, updateTodo}) => {
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
            resetTodoTexts();
        }
    };

    const resetTodoTexts = () => {
        setTodoText('');
        setEditTodo(null);
    }

    return (
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
                        onClick={
                            resetTodoTexts
                        }
                        style={{ marginLeft: '10px' }}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    </div>
    )
}

export default EditTodo