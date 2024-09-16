import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TopSellingProducts: React.FC = () => {
  return (
    <motion.div
      className="mt-6"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
      <ul className="bg-white rounded-lg shadow p-4">
        {['Tshirt Levis', 'Long Jeans Jacket', 'Fullcap', 'Adidas Pants'].map((product, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="mb-4 flex justify-between"
          >
            <span>{product}</span>
            <span>${(49.99 + index * 40).toFixed(2)}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TopSellingProducts;
