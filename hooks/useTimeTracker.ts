import { useState, useEffect } from 'react';

interface TimeEntry {
  id: string;
  date: string;
  hours: number;
}

export function useTimeTracker() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');

  useEffect(() => {
    const month = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
    const storedEntries = localStorage.getItem(`timeEntries-${month}`);
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    } else {
      setEntries([]);
    }
  }, [currentDate]);

  const addEntry = (date: string, hours: number) => {
    const month = date.substring(0, 7);
    const newEntry: TimeEntry = { id: Date.now().toString(), date, hours };
    const newEntries = [...entries, newEntry];
    setEntries(newEntries);
    localStorage.setItem(`timeEntries-${month}`, JSON.stringify(newEntries));
  };

  const deleteEntry = (id: string) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    setEntries(newEntries);
    const month = currentDate.toISOString().substring(0, 7);
    localStorage.setItem(`timeEntries-${month}`, JSON.stringify(newEntries));
  };

  const editEntry = (id: string, date: string, hours: number) => {
    const newEntries = entries.map(entry => 
      entry.id === id ? { ...entry, date, hours } : entry
    );
    setEntries(newEntries);
    const month = date.substring(0, 7);
    localStorage.setItem(`timeEntries-${month}`, JSON.stringify(newEntries));
  };

  const getFilteredEntries = () => {
    const startDate = new Date(currentDate);
    let endDate = new Date(currentDate);

    if (view === 'day') {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (view === 'week') {
      startDate.setDate(currentDate.getDate() - currentDate.getDay());
      endDate.setDate(startDate.getDate() + 6);
    } else if (view === 'month') {
      startDate.setDate(1);
      endDate.setMonth(currentDate.getMonth() + 1);
      endDate.setDate(0);
    }

    return entries.filter(
      (entry) => new Date(entry.date) >= startDate && new Date(entry.date) <= endDate
    );
  };

  const getTotalHours = () => {
    return getFilteredEntries().reduce((total, entry) => total + entry.hours, 0);
  };

  const exportToCSV = () => {
    const filteredEntries = getFilteredEntries();
    const csvContent = 
      "data:text/csv;charset=utf-8," + 
      "Date,Hours\n" + 
      filteredEntries.map(entry => `${entry.date},${entry.hours}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `time_entries_${view}_${currentDate.toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { 
    entries: getFilteredEntries(), 
    currentDate, 
    setCurrentDate, 
    view, 
    setView, 
    addEntry, 
    deleteEntry,
    editEntry,
    getTotalHours,
    exportToCSV
  };
}

