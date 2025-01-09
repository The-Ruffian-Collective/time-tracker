interface SummaryProps {
  totalHours: number;
}

export function Summary({ totalHours }: SummaryProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Monthly Summary</h2>
      <p className="text-3xl font-bold text-indigo-600">{totalHours.toFixed(2)} hours</p>
    </div>
  );
}

