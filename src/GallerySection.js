import React, { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

const GallerySection = () => {
  // Initial images
  const initialImages = [
    {
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    },
    {
      src: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
      thumbnail:
        "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
    },
    {
      src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
      thumbnail:
        "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
    },
    {
      src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
      thumbnail:
        "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    },
  ];

  // State for managing images
  const [images, setImages] = useState(initialImages);
  const previewLimit = 5; // Number of images to show initially

  // Function to handle adding a new image
  const handleAddImage = () => {
    const newImageUrl = prompt("Enter the URL of the new image:");
    if (newImageUrl) {
      const newImage = {
        src: newImageUrl,
        thumbnail: newImageUrl,
      };
      setImages([...images, newImage]);
    }
  };

  // Function to handle deleting an image
  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Gallery</h2>
      <button
        onClick={handleAddImage}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Image
      </button>
      <Gallery>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
          {images.slice(0, previewLimit).map((image, index) => (
            <div key={index} className="relative">
              <Item original={image.src} thumbnail={image.thumbnail}>
                {({ ref, open }) => (
                  <img
                    ref={ref}
                    onClick={open}
                    src={image.thumbnail}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-28 object-cover rounded-lg cursor-pointer sm:h-40 md:h-48"
                    loading="lazy"
                  />
                )}
              </Item>
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                style={{ fontSize: "12px" }}
              >
                X
              </button>
            </div>
          ))}
          {images.length > previewLimit && (
            <Item
              original={images[previewLimit].src}
              thumbnail={images[previewLimit].thumbnail}
            >
              {({ ref, open }) => (
                <div
                  ref={ref}
                  onClick={open}
                  className="relative flex items-center justify-center bg-gray-300 rounded-lg text-center cursor-pointer h-32 sm:h-40 md:h-48"
                >
                  <span className="text-xl font-semibold">
                    + {images.length - previewLimit} More
                  </span>
                </div>
              )}
            </Item>
          )}
        </div>
      </Gallery>
    </div>
  );
};

export default GallerySection;
