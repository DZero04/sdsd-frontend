import React, { useState, useRef, useEffect } from "react";
import "./TongueBody.scss";
import { FaCamera, FaUpload } from "react-icons/fa";
import ResultsBody from "./ResultsBody"; // Import ResultsBody
import AxiosInstance from "../Axios";



const TongueBody = () => {

  const [regionsData, setRegionsData] = useState([])

  const GetData = () => {
    AxiosInstance.get('regiondata/')
    .then((res) => {
      setRegionsData(res.data)
    })
  }

  useEffect(() => {
      GetData()
  }, [])

  const [imageSrc, setImageSrc] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("camera");
  const [showCamera, setShowCamera] = useState(false);
  const [showResults, setShowResults] = useState(false); // State to manage showing results
  const [resultData, setResultData] = useState({}); // State for result data

  // State for form inputs
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start Camera
  const startCamera = () => {
    setImageSrc(null);
    setUploadedFile(null);
    setShowCamera(true);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Camera error:", error);
      });
  };

  // Capture Image
  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 400, 300);
    setImageSrc(canvasRef.current.toDataURL("image/png"));
    stopCamera();
  };

  // Stop Camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  // Handle File Upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedFile(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Reset Image Selection
  const resetImage = () => {
    setImageSrc(null);
    setUploadedFile(null);
    setShowResults(false); // Reset results view
    if (activeTab === "camera") startCamera();
  };

  // Tab Change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetImage();
    if (tab === "camera") startCamera();
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  // Handle Predict Button Click
  const handlePredict = () => {
    // Validate inputs
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!age) {
      alert("Please select your age.");
      return;
    }
    if (!gender) {
      alert("Please select your gender.");
      return;
    }
    if (!region) {
      alert("Please select your region.");
      return;
    }
    
    const image = activeTab === "camera" ? imageSrc : uploadedFile;
    if (!image) {
      alert("Please provide an image (capture or upload).");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("file", dataURItoBlob(image)); // Convert base64 to blob

    AxiosInstance.post("diabetesdata/predict/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        const { class: resultClass, confidence } = response.data;

        const result = {
          name,
          age,
          gender,
          region: region,
          result: resultClass === 0 ? "Diabetic" : "Non-Diabetic",
          confidence: `${confidence}%`,
          notes:
            resultClass === 0
              ? "No signs of diabetes detected. Regular checkups are still advised."
              : "Signs suggestive of diabetes were detected. Please confirm with clinical tests.",
          image,
        };

         // Save result to the database
         const dataToSave = {
          person_name: name,
          age: parseInt(age, 10), 
          gender: gender,
          region: region,  
          date: new Date().toISOString().split("T")[0], // Current date
          confidence_level: parseFloat(confidence), // Confidence
          results: result.result // Result ID
          };
        


        //  console.log({
        //   person_name: name,
        //   age: parseInt(age, 10), 
        //   gender: gender,
        //   region: regionsData.find((r) => r.id === Number(region))?.name || "N/A",  
        //   date: new Date().toISOString().split("T")[0], // Current date
        //   confidence_level: parseFloat(confidence), // Confidence
        //   results: result.result 
        //  });
         
         AxiosInstance.post("diabetesdata/", dataToSave)
          .then((response) => {
            if (response.status === 201) {
              console.log("Data saved successfully:", response.data);
            }
          })
          .catch((error) => {
            console.error("Error saving data:", error);
          });

                setResultData(result);
                setShowResults(true);
              })
              .catch((error) => {
                console.error("Prediction error:", error);
                alert("Failed to process the image. Please try again.");
              });
          };


  const handleTryAgain = () => {
    setShowResults(false); // Return to input form
    resetImage(); // Reset image and form inputs
  };

  // Automatically start camera on load
  useEffect(() => {
    if (activeTab === "camera") {
      startCamera();
    }
    return () => stopCamera(); // Cleanup on unmount
  }, [activeTab]);

  return (
    <div className="image-capture-container">
      {!showResults ? (
        <>
          {/* Form Fields */}
          <div className="form-fields">
            <div className="input-row">
              <div className="input-group">
                <label>Name</label>
                <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="input-group" >
                <label>Age</label>
                <select value={age} onChange={(e) => setAge(e.target.value)}>
                  <option value="">Select Age</option>
                  {[...Array(100)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="input-row">
              
              <div className="input-group city-group">
                <label>Region</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)}>
                  <option value="">Select Region</option>
                  <option value="Davao City">Davao City</option>
                  <option value="CARAGA Region">CARAGA Region</option>
                  <option value="SOCKSARGEN">SOCKSARGEN</option>
                  <option value="NCR">NCR</option>
                  <option value="CALABARZON">CALABARZON</option>
                  <option value="MIMAROPA">MIMAROPA</option>
                  <option value="BARMM">BARMM</option>
                  {/* {regionsData
                    .filter((_, index) => index !== 0) // Exclude the first index
                    .map((region) => (
                      <option key={region.id} value={region.id.toString()}>
                        {region.name}
                      </option>
                    ))} */}
                </select>
              </div>
              <div className="agreement">
                <p>
                  By uploading your image and providing additional information
                  (e.g., name, age, gender, and city), you agree to the
                  following:
                </p>
                <ul>
                  <li>
                    1. Your image data will be used for diabetes detection and
                    related insights.
                  </li>
                  <li>
                    2. All information will be securely stored and anonymized
                    for analysis, such as demographic trends.
                  </li>
                  <li>3. You can request deletion of your data at any time.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <h5>Tongue Image</h5>
          <div className="upload-section">
            <div className="tab-buttons">
              <button
                className={activeTab === "camera" ? "active" : ""}
                onClick={() => handleTabChange("camera")}
              >
                Camera
              </button>
              <button
                className={activeTab === "upload" ? "active" : ""}
                onClick={() => handleTabChange("upload")}
              >
                Upload
              </button>
            </div>

            {/* Camera Preview */}
            {activeTab === "camera" && (
              <div className="camera-container">
                {imageSrc ? (
                  <img src={imageSrc} alt="Captured" />
                ) : (
                  <video ref={videoRef} autoPlay></video>
                )}
                {!imageSrc && (
                  <button onClick={captureImage} className="action-btn">
                    <FaCamera size={24} />
                  </button>
                )}
                <div className="controls">
                  <button onClick={resetImage} className="cancel-btn">
                    Cancel
                  </button>
                  <button onClick={handlePredict} className="predict-btn">
                    Predict
                  </button>
                </div>
              </div>
            )}

            {/* Upload Section */}
            {activeTab === "upload" && (
              <div className="upload-container">
                {!uploadedFile ? (
                  <label className="upload-placeholder">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <FaUpload size={50} />
                    <h5>Upload image</h5>
                  </label>
                ) : (
                  <img
                    src={uploadedFile}
                    alt="Uploaded"
                    className="uploaded-preview"
                    style={{
                      width: "400px",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div className="controls">
                  <button onClick={resetImage} className="cancel-btn">
                    Cancel
                  </button>
                  <button onClick={handlePredict} className="predict-btn">
                    Predict
                  </button>
                </div>
              </div>
            )}
          </div>

          <canvas
            ref={canvasRef}
            style={{ display: "none" }}
            width={400}
            height={300}
          ></canvas>
        </>
      ) : (
        // Show ResultsBody component
        <ResultsBody {...resultData} onTryAgain={handleTryAgain} />
      )}
    </div>
  );
};

export default TongueBody;
