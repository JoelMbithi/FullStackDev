import React from 'react';
import { IoIosColorPalette } from "react-icons/io";
import { THEMES } from '../constants/index.jsx';
import { useThemeStore } from '../Store/useStoreTheme.jsx';

const ThemeSelector = () => {
  const { setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost flex items-center btn-circle hover:bg-green-600">
        <IoIosColorPalette className="text-xl flex justify-center -mt-4" />
      </button>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-box w-52">
        {THEMES.map((themeOption) => (
          <li key={themeOption.name}>
            <a 
              onClick={() => setTheme(themeOption.name)}
              className="flex items-center justify-between"
            >
              <span>{themeOption.label}</span>
              <div className="flex gap-1">
                {themeOption.colors.map((color, i) => (
                  <span 
                    key={i} 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;