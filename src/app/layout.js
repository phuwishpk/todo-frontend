'use client';

import { useEffect, useState } from 'react';
import { todoAPI } from '@/lib/api';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import TodoStats from '@/components/TodoStats';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    checkHealth();
    loadTodos();
  }, []);

  const checkHealth = async () => {
    try {
      await todoAPI.healthCheck();
      setApiStatus('healthy');
    } catch (err) {
      setApiStatus('unhealthy');
      setError('Cannot connect to API. Please check if the backend is running.');
    }
  };

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoAPI.getTodos();
      setTodos(data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Please try again.');
      console.error('Load todos error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (todo) => {
    try {
      await todoAPI.createTodo(todo);
      await loadTodos();
    } catch (err) {
      alert('Failed to add todo. Please try again.');
      throw err;
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      await todoAPI.updateTodo(id, updates);
      await loadTodos();
    } catch (err) {
      alert('Failed to update todo. Please try again.');
      throw err;
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      await loadTodos();
    } catch (err) {
      alert('Failed to delete todo. Please try again.');
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-teal-50 to-emerald-100 py-8 px-4"> {/* ตัวอย่างแก้สีพื้นหลัง */}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="text-5xl animate-bounce">✨</div>
            {/* --- 👇 แก้ไข className ของ h1 ตรงนี้ 👇 --- */}
            <h1 className="text-5xl font-bold bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
              My Todo List
            </h1>
            {/* --- 👆 สิ้นสุดการแก้ไข 👆 --- */}
            <div className="text-5xl animate-bounce">📝</div>
          </div>
          <p className="text-gray-600 text-lg mb-4">Organize your tasks beautifully</p>

          {/* API Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                        shadow-sm bg-white border-2 border-gray-200">
            <div className={`w-3 h-3 rounded-full ${
              apiStatus === 'healthy' ? 'bg-green-500 animate-pulse' :
              apiStatus === 'unhealthy' ? 'bg-red-500' :
              'bg-yellow-500 animate-pulse'
            }`} />
            <span className="text-gray-700">
              {apiStatus === 'healthy' ? '🟢 API Connected' :
               apiStatus === 'unhealthy' ? '🔴 API Disconnected' :
               '🟡 Connecting...'}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="text-red-800 font-medium">{error}</p>
                <button
                  onClick={() => { checkHealth(); loadTodos(); }}
                  className="text-red-600 underline text-sm mt-1 hover:text-red-800"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Todo Form (อย่าลืมแก้สีปุ่มใน AddTodo.jsx ด้วยนะครับ) */}
        <AddTodo onAdd={handleAdd} loading={loading} />

        {/* Statistics */}
        <TodoStats todos={todos} />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          loading={loading}
        />

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p className="mb-2">
            Made with <span className="text-red-500 animate-pulse">❤️</span> using Next.js + Flask
          </p>
          <p className="text-xs text-gray-400">
            Frontend: GitHub Pages | Backend: Render | Database: PostgreSQL
          </p>
        </div>
      </div>
    </div>
  );
}
