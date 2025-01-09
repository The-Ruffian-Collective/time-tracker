import { CalendarIcon } from 'lucide-react';

interface HeaderProps {
  currentDate: Date;
}

export function Header({ currentDate }: HeaderProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-indigo-600" />
            <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate">
              Time Tracker
            </h1>
          </div>
          <div className="text-lg font-semibold text-gray-600">
            {formatDate(currentDate)}
          </div>
        </div>
      </div>
    </header>
  );
}

