// import React from "react";
// import BeautyPointCard from "./components/BeautyPointCard";

// function App() {
//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <BeautyPointCard />
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setImageUrl(response.data.imageUrl);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Upload an Image</h1>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       {imageUrl && (
//         <div>
//           <h2>Uploaded Image:</h2>
//           <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React from "react";
import BusinessCard from "./BusinessCard";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <BusinessCard />
    </div>
  );
}

export default App;
