import React from 'react'
import { useThemeStore } from '../Themes/useThemes';
import { SunIcon, MoonIcon } from 'lucide-react'; // Or whatever icon library you use

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === "night" ? "winter" : "night");
  };

  return (
    <button 
      onClick={toggleTheme} 
      className='btn btn-ghost btn-circle'
    >
      {theme === "night" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

export default ThemeSelector;
