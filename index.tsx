
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Plus, Trash2, Check, Calendar } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        dueDate: dueDate,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      setDueDate('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 p-6">
          <h1 className="text-2xl font-bold text-white mb-2">My Tasks</h1>
          <p className="text-indigo-100 text-sm">
            {todos.filter((t) => !t.completed).length} tasks remaining
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={addTodo} className="mb-6 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-600 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
              >
                <Plus size={20} />
                <span>Add</span>
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No tasks yet. Add one above!</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    todo.completed
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-white border-gray-200 hover:border-indigo-300'
                  } transition-all duration-200 group`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                      todo.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-indigo-500 text-transparent'
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-gray-800 break-words ${
                        todo.completed ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {todo.text}
                    </p>
                    {todo.dueDate && (
                      <p className={`text-xs mt-1 flex items-center gap-1 ${todo.completed ? 'text-gray-300' : 'text-indigo-500'}`}>
                        <Calendar size={12} />
                        {formatDate(todo.dueDate)}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-red-50 rounded-full"
                    aria-label="Delete task"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
