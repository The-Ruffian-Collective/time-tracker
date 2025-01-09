import { useState } from 'react';

type View = 'day' | 'week' | 'month';

interface ViewSelectorProps {
  onViewChange: (view: View) => void;
}

export function ViewSelector({ onViewChange }: ViewSelectorProps) {
  const [selectedView, setSelectedView] = useState<View>('month');

  const handleViewChange = (view: View) => {
    setSelectedView(view);
    onViewChange(view);
  };

  return (
    <div className="flex space-x-2">
      {(['day', 'week', 'month'] as View[]).map((view) => (
        <button
          key={view}
          onClick={() => handleViewChange(view)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            selectedView === view
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </button>
      ))}
    </div>
  );
}

