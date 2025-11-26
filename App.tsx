import React, { useState, useEffect } from 'react';
import { generateMeal } from './services/geminiService';
import { Meal, MealType, MealHistoryItem } from './types';
import { Button } from './components/Button';
import { MealCard } from './components/MealCard';
import { HistoryList } from './components/HistoryList';

const App: React.FC = () => {
  const [currentMeal, setCurrentMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<MealType>(MealType.ANY);
  const [history, setHistory] = useState<MealHistoryItem[]>([]);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mealHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history
  useEffect(() => {
    localStorage.setItem('mealHistory', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const meal = await generateMeal(selectedType);
      setCurrentMeal(meal);
      
      const historyItem: MealHistoryItem = {
        ...meal,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        type: selectedType
      };
      
      setHistory(prev => [historyItem, ...prev].slice(0, 10)); // Keep last 10
    } catch (err) {
      setError("哎呀，大脑短路了，再试一次吧！");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('mealHistory');
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex flex-col items-center py-10 px-4">
      {/* Background Decorative Elements */}
      <div className="fixed top-20 left-10 text-6xl animate-float opacity-20 pointer-events-none">🥟</div>
      <div className="fixed bottom-20 right-10 text-6xl animate-float opacity-20 pointer-events-none" style={{ animationDelay: '1s' }}>🥡</div>
      <div className="fixed top-1/2 left-4 text-4xl animate-float opacity-20 pointer-events-none" style={{ animationDelay: '2s' }}>🍔</div>
      <div className="fixed top-20 right-20 text-5xl animate-float opacity-20 pointer-events-none" style={{ animationDelay: '3s' }}>🧋</div>

      {/* Header */}
      <header className="text-center mb-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-black text-rose-500 mb-2 drop-shadow-sm flex items-center justify-center gap-3">
          <span className="animate-wiggle inline-block">🥢</span> 
          今天吃什么？
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          选择困难症？我来帮你选！
        </p>
      </header>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 relative z-10 max-w-2xl">
        {Object.values(MealType).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              selectedType === type
                ? 'bg-rose-400 text-white shadow-md scale-105'
                : 'bg-white text-gray-500 hover:bg-rose-50 border border-transparent hover:border-rose-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {currentMeal && !loading ? (
          <div className="mb-8">
            <MealCard meal={currentMeal} />
          </div>
        ) : (
          !loading && !currentMeal && (
            <div className="w-full max-w-md bg-white/50 backdrop-blur-sm rounded-3xl p-10 flex flex-col items-center justify-center border-2 border-dashed border-rose-200 text-center mb-8">
               <span className="text-6xl mb-4 opacity-50">🤔</span>
               <p className="text-gray-400 font-medium">选择一个种类，点击按钮！</p>
            </div>
          )
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-500 px-6 py-3 rounded-2xl mb-6 font-bold flex items-center gap-2 animate-pulse">
            <span>❌</span> {error}
          </div>
        )}

        {/* Action Button */}
        <Button 
          onClick={handleGenerate} 
          isLoading={loading} 
          className="text-xl px-12 py-4 shadow-xl shadow-rose-200"
        >
           {currentMeal ? '换一个！' : '帮我选一个！'} 🎲
        </Button>

        {/* History */}
        <HistoryList history={history} onClear={handleClearHistory} />
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-8 text-center text-gray-400 text-sm font-medium">
        <p>由 Gemini AI 提供“吃货”技术支持 💖</p>
      </footer>
    </div>
  );
};

export default App;