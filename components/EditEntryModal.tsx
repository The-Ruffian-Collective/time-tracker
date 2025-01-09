import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XIcon } from 'lucide-react';

interface EditEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (date: string, hours: number) => void;
  initialDate: string;
  initialHours: number;
}

export function EditEntryModal({ isOpen, onClose, onSave, initialDate, initialHours }: EditEntryModalProps) {
  const [date, setDate] = useState(initialDate);
  const [hours, setHours] = useState(initialHours);

  const handleSave = () => {
    onSave(date, hours);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-medium text-gray-900">Edit Entry</Dialog.Title>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
          >
            <XIcon className="h-6 w-6" />
          </button>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="edit-date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="edit-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="edit-hours" className="block text-sm font-medium text-gray-700">
                Hours
              </label>
              <input
                type="number"
                id="edit-hours"
                min="0.25"
                step="0.25"
                value={hours}
                onChange={(e) => setHours(Math.max(0.25, parseFloat(e.target.value) || 0))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

