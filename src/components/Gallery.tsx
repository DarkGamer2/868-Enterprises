import React, { useState } from 'react';

interface GalleryProps {
  mainImage: string;
  additionalImages: string[];
}

const Gallery: React.FC<GalleryProps> = ({ mainImage, additionalImages }) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  return (
    <div>
      <div className="mb-4">
        <img
          src={selectedImage}
          alt="Main Product"
          className="w-full h-auto object-cover border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex space-x-2">
        {[mainImage, ...additionalImages].map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Additional Image ${index}`}
            className={`w-16 h-16 object-cover cursor-pointer border ${
              selectedImage === image ? 'border-blue-500' : 'border-gray-300'
            } rounded`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
