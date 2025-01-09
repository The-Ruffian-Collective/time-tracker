'use client'

import { useState, useEffect } from 'react';
import { useTimeTracker } from '../hooks/useTimeTracker';
import { Header } from '../components/Header';
import { Summary } from '../components/Summary';
import { ViewSelector } from '../components/ViewSelector';
import { EditEntryModal } from '../components/EditEntryModal';
import { PlusIcon, DownloadIcon, PencilIcon, TrashIcon } from 'lucide-react';

export default function Home() {
  const { entries, currentDate, setCurrentDate, view, setView, addEntry, deleteEntry, editEntry, getTotalHours, exportToCSV } = useTimeTracker();
  const [date, setDate] = useState('');
  const [hours, setHours] = useState(1);
  const [showReminder, setShowReminder] = useState(false);
  const [editingEntry, setEditingEntry] = useState<{ id: string; date: string; hours: number } | null>(null);

  useEffect(() => {
    const lastEntry = entries[entries.length - 1];
    const today = new Date().toISOString().split('T')[0];
    if (!lastEntry || lastEntry.date !== today) {
      setShowReminder(true);
    }
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEntry(date, hours);
    setDate('');
    setHours(1);
    setShowReminder(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(id);
    }
  };

  const handleEdit = (id: string, date: string, hours: number) => {
    setEditingEntry({ id, date, hours });
  };

  const handleSaveEdit = (date: string, hours: number) => {
    if (editingEntry) {
      editEntry(editingEntry.id, date, hours);
      setEditingEntry(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentDate={currentDate} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <ViewSelector onViewChange={setView} />
            <button
              onClick={() => exportToCSV()}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <DownloadIcon className="h-5 w-5 mr-2" />
              Export to CSV
            </button>
          </div>
          {showReminder && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Don't forget to log your hours for today!
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Log Hours</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                    Hours
                  </label>
                  <input
                    type="number"
                    id="hours"
                    name="hours"
                    required
                    min="0.25"
                    step="0.25"
                    value={hours}
                    onChange={(e) => setHours(Math.max(0.25, parseFloat(e.target.value) || 0))}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Entry
                </button>
              </div>
            </form>
            <Summary totalHours={getTotalHours()} />
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {entries.slice().reverse().map((entry) => (
                  <li key={entry.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {new Date(entry.date).toLocaleDateString()}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {entry.hours} hours
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(entry.id, entry.date, entry.hours)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      {editingEntry && (
        <EditEntryModal
          isOpen={!!editingEntry}
          onClose={() => setEditingEntry(null)}
          onSave={handleSaveEdit}
          initialDate={editingEntry.date}
          initialHours={editingEntry.hours}
        />
      )}
    </div>
  );
}

