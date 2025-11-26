import React from 'react';
import { MealHistoryItem } from '../types';

interface HistoryListProps {
  history: MealHistoryItem[];
  onClear: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-md mt-12 mb-8">
      <div className="flex justify-between items-end mb-4 px-2">
        <h3 className="text-xl font-bold text-gray-400">历史记录</h3>
        <button 
          onClick={onClear}
          className="text-sm text-rose-400 hover:text-rose-600 font-semibold underline decoration-2 decoration-rose-200"
        >
          清空
        </button>
      </div>
      
      <div className="space-y-3">
        {history.map((item) => (
          <div 
            key={item.id} 
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-4 border border-white shadow-sm hover:shadow-md transition-all cursor-default"
          >
            <span className="text-3xl">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-700 truncate">{item.name}</h4>
              <p className="text-xs text-gray-500 truncate">{item.type} • {item.calories}</p>
            </div>
            <span className="text-xs text-gray-400 font-mono">
              {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};