import React from 'react';
import { Style } from '../types';

interface StyleSwitcherProps {
  styles: Style[];
  selectedStyle: Style | null;
  onSelectStyle: (style: Style) => void;
}

const StyleSwitcher: React.FC<StyleSwitcherProps> = ({ styles, selectedStyle, onSelectStyle }) => {
  return (
    <div className="flex space-x-2">
      {styles.map((style) => (
        <button
          key={style.styleName} // Ensure styleName is unique
          className={`px-4 py-2 rounded-lg border ${
            selectedStyle?.styleName === style.styleName ? 'border-blue-500' : 'border-gray-300'
          }`}
          onClick={() => onSelectStyle(style)}
        >
          <img
            src={style.productImage}
            alt={style.styleName}
            className="w-16 h-16 object-cover cursor-pointer border border-gray-300 rounded"
          />
        </button>
      ))}
    </div>
  );
};

export default StyleSwitcher;
