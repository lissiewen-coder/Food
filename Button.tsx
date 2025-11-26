import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading,
  className = '',
  ...props 
}) => {
  const baseStyles = "font-bold rounded-full transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-rose-400 hover:bg-rose-50 text-white px-8 py-3 text-lg border-b-4 border-rose-600 active:border-b-0 active:translate-y-1",
    secondary: "bg-white hover:bg-gray-50 text-text-primary border-2 border-cute-pink px-4 py-2 text-sm",
    icon: "p-2 bg-white text-rose-400 hover:bg-rose-50 rounded-full shadow-sm hover:shadow-md aspect-square"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          思考中...
        </>
      ) : children}
    </button>
  );
};