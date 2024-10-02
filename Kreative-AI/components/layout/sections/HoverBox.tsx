"use client"; // Important for using hooks in the component
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FileUpload } from "@/components/ui/FileUpload"; // Importing FileUpload component

interface HoverBoxProps {
  isOpen: boolean;
  onClose: () => void; // onClose prop passed to reset state
}

export const HoverBox: React.FC<HoverBoxProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [promotionalText, setPromotionalText] = useState("");
  const [festivalTheme, setFestivalTheme] = useState(""); // State for festival theme
  const [uploadMessage, setUploadMessage] = useState<string | null>(null); // To show upload status
  const [loading, setLoading] = useState(false); // Loading state
  const [finalImage, setFinalImage] = useState<string | null>(null); // State for final predefined image
  const [remainingTime, setRemainingTime] = useState<number | null>(null); // State for remaining time

  const handleImageUpload = (files: File[]) => {
    const file = files[0];
    if (file) {
      setSelectedImage(file); // Set the uploaded file as selectedImage
      setUploadMessage(null); // Clear any previous messages
    }
  };

  const handleGenerateBanner = async () => {
    if (selectedImage && promotionalText && festivalTheme) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("promotional_text", promotionalText);
      formData.append("festival_theme", festivalTheme);

      setLoading(true); // Start the loading process

      // Simulate a loading duration of 15-45 seconds
      const loadingDuration = Math.floor(Math.random() * (45000 - 15000 + 1)) + 15000; // Random duration between 15s (15000 ms) and 45s (45000 ms)
      setRemainingTime(Math.floor(loadingDuration / 1000)); // Set the remaining time in seconds

      try {
        const response = await fetch("http://localhost:8000/upload-image", {
          method: "POST",
          body: formData,
        });

        // Start a countdown timer
        const countdownInterval = setInterval(() => {
          setRemainingTime(prevTime => {
            if (prevTime !== null && prevTime > 0) {
              return prevTime - 1; // Decrease time by 1 second
            } else {
              clearInterval(countdownInterval);
              return 0; // Clear the interval when time is up
            }
          });
        }, 1000);

        // Wait for the specified loading duration before processing the response
        setTimeout(async () => {
          clearInterval(countdownInterval); // Clear the countdown interval when loading is done
          const data = await response.json();
          if (response.ok) {
            setFinalImage("/images/Final.jpg"); // Set the path to your final image
            setUploadMessage("Upload Successful!"); // Set success message
          } else {
            setUploadMessage(data.error); // Set error message
          }
          setLoading(false); // Stop loading after response is processed
        }, loadingDuration);
      } catch (error) {
        setUploadMessage("An error occurred while uploading the image."); // Handle any errors
        setLoading(false); // Stop loading in case of error
      }
    } else {
      setUploadMessage("Please fill in all fields and select an image to upload."); // Prompt user to fill all fields
    }
  };

  const handleClose = () => {
    onClose(); // Call the onClose function passed from the parent
    // Reset state variables
    setSelectedImage(null);
    setPromotionalText("");
    setFestivalTheme("");
    setUploadMessage(null);
    setLoading(false);
    setFinalImage(null); // Reset final image
    setRemainingTime(null); // Reset remaining time
  };

  const handleDownload = () => {
    // Create an anchor element and trigger a download
    const link = document.createElement("a");
    link.href = finalImage || ""; // Ensure there's a valid image to download
    link.download = "final_banner.jpg"; // Set the download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Remove the link element after triggering download
  };

  useEffect(() => {
    // Clean up function to reset state when the component unmounts
    return () => {
      setLoading(false);
      setRemainingTime(null);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose} />
      <div
        className={`relative ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg shadow-lg p-6 z-10 w-full h-full md:w-11/12 md:h-3/4 lg:w-3/4 lg:h-3/4`}
        style={{
          backgroundColor: "hsl(var(--background))",
          boxShadow: "0 0 10px hsl(24, 95%, 53%), 0 0 5px hsl(24, 95%, 53%)",
        }}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          &times; {/* This represents the close (X) icon */}
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-orange-600"> Generate Banner</h2>

        <div className="flex flex-col md:flex-row justify-between items-start h-full">
          {/* Image Preview Section - Takes 60% */}
          <div className="w-full md:w-3/5 h-full p-10 flex justify-center items-center">
            <div className="w-full h-full bg-gray-300 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center overflow-hidden pb-4">
              {loading ? (
                <div className="text-blue-600">
                  Generating... {/* Normal generating text */}
                  {remainingTime !== null && (
                    <p>ETA: {remainingTime} seconds</p> // Display remaining time
                  )}
                </div>
              ) : finalImage ? (
                <>
                  <img
                    src={finalImage}
                    alt="Final Banner"
                    className="object-contain w-full h-full rounded-lg"
                  />
                </>
              ) : (
                <span className="text-center text-gray-500">Final output will be displayed here</span>
              )}
            </div>
          </div>

          {/* Input Section - Takes 40% */}
          <div className="w-full md:w-2/5 h-full p-10 flex flex-col h-full">
            <textarea
              placeholder="Add promotional text here..."
              value={promotionalText}
              onChange={(e) => setPromotionalText(e.target.value)}
              className="border border-gray-300 rounded p-3 mb-4 w-full focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
              rows={3}
              style={{
                fontSize: "1rem", // Match font size from global.css
              }}
            />

            <input
              type="text"
              placeholder="Enter festival theme..."
              value={festivalTheme}
              onChange={(e) => setFestivalTheme(e.target.value)}
              className="border border-gray-300 rounded p-3 mb-4 w-full focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
              style={{
                fontSize: "1rem", // Match font size from global.css
              }}
            />

            {/* File Upload Component */}
            <div className="border border-gray-300 rounded p-2 mb-4 w-full focus:border-orange-500 focus:ring-orange-500 focus:outline-none">
              <FileUpload onChange={handleImageUpload} />
            </div>

            <button
              onClick={handleGenerateBanner}
              className="bg-orange-600 text-white rounded px-4 py-2 hover:bg-orange-700 transition-colors"
              style={{
                fontSize: "1rem", // Match font size from global.css
              }}
            >
              Generate Banner
            </button>

            {uploadMessage && (
              <div className="mt-4 text-center">
                <p className={`font-bold ${uploadMessage.includes('Successful') ? 'text-green-500' : 'text-red-500'}`}>
                  {uploadMessage}
                </p>
              </div>
            )}

            {finalImage && (
              <button
                onClick={handleDownload}
                className="mt-4 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors"
              >
                Download Banner
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
