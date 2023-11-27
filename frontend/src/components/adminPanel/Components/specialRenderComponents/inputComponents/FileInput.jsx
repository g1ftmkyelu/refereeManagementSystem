import React, { useState, useEffect } from 'react';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../configs/firebaseConfig';

const FileInput = ({ formData, fieldName, setFormData }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            setUploading(true);

            const fileName = `${fieldName}_${Date.now()}_${selectedFile.name}`;
            const storageRef = ref(storage, `files/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('Error uploading file:', error);
                    setUploading(false);
                },
                async () => {
                    // Upload completed successfully
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setFormData({ ...formData, [fieldName]: downloadURL });
                    setSelectedFile(null);
                    setUploadProgress(0);
                    setUploading(false);
                    setImagePreview(null);
                }
            );
        }
    };

    useEffect(() => {
        // Clean up the upload progress if the component unmounts
        return () => {
            setUploadProgress(0);
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div className="border p-4 rounded-md w-full shadow-md flex flex-col items-center">
            <div className="flex flex-col w-full items-center mb-4">
                <label className="form-label text-xl font-bold mb-2" htmlFor={fieldName}>
                    {fieldName}
                </label>
                <div className="mt-2 w-full">
                    <input
                        type="file"
                        id={fieldName}
                        name={fieldName}
                        onChange={handleFileInputChange}
                        className={'p-3 m5 bg-gray-300 rounded-md w-full'}
              
                    />
                    {selectedFile && (
                        <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded-md mt-2">
                            Upload
                        </button>
                    )}
                </div>
                {(imagePreview || formData[fieldName]) && (
                    <div className="mt-2">
                        <img
                            src={imagePreview || formData[fieldName]}
                            alt={fieldName}
                            className="w-72 h-72 rounded-md"
                        />
                    </div>
                )}
                {uploading && (
                    <div className="mt-2">
                        <span>Uploading...</span>
                    </div>
                )}
                {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-3 w-full">
                        <progress value={uploadProgress} max="100" />
                        <span>{`${uploadProgress.toFixed(2)}%`}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileInput;
