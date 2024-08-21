import { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants';
import axios from 'axios';

const API_URL = `${SERVER_URL}/todos/`;

// Custom Hook implementation to make and update API calls
export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const createTodo = async (text) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, { text });
      setTodos([...todos, response.data]);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, text) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}${id}/`, { text });
      setTodos(todos.map(todo =>
        todo._id === id ? { ...todo, text } : todo
      ));
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}${id}/`);
      setTodos(todos.filter(todo => todo._id !== id));
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo
  };
}
