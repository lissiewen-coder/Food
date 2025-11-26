import React from 'react';
import { Meal } from '../types';

interface MealCardProps {
  meal: Meal;
}

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border-4 border-cute-pink animate-pop relative overflow-hidden group">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-cute-yellow rounded-full -mr-8 -mt-8 opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-cute-blue rounded-full -ml-6 -mb-6 opacity-50 z-0"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
          {meal.emoji}
        </div>
        
        <h2 className="text-3xl font-extrabold text-rose-500 mb-2 leading-tight">
          {meal.name}
        </h2>
        
        <p className="text-gray-600 mb-6 font-medium px-4">
          {meal.description}
        </p>

        <div className="w-full grid grid-cols-2 gap-3 mb-6">
          <div className="bg-orange-50 rounded-2xl p-3 flex flex-col items-center border border-orange-100">
            <span className="text-xs uppercase tracking-wider text-orange-400 font-bold mb-1">耗时</span>
            <span className="text-gray-700 font-bold">{meal.timeToCook}</span>
          </div>
          <div className="bg-green-50 rounded-2xl p-3 flex flex-col items-center border border-green-100">
            <span className="text-xs uppercase tracking-wider text-green-400 font-bold mb-1">热量</span>
            <span className="text-gray-700 font-bold">{meal.calories}</span>
          </div>
        </div>

        <div className="w-full bg-slate-50 rounded-2xl p-4 text-left border border-slate-100">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="text-lg">🛒</span> 食材
          </h3>
          <div className="flex flex-wrap gap-2">
            {meal.ingredients.map((ingredient, idx) => (
              <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 shadow-sm border border-gray-100">
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};