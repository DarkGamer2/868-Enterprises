// ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  currentStatus: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStatus }) => {
  const statusOrder = ['Ordered', 'Shipped', 'Out for delivery', 'Delivered'];
  const progress = (statusOrder.indexOf(currentStatus) + 1) / statusOrder.length * 100;

  return (
    <div className="bg-gray-200 rounded-full h-2 mb-4">
      <div
        className="bg-blue-500 rounded-full h-2 transition-width duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;