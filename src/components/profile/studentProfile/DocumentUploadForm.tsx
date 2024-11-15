import React, { useState, ChangeEvent, FormEvent, DragEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  name: string;
  phone: string;
  address: string;
  activityName: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

const DocumentUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    activityName: '',
  });
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addFiles(files);
  };

  const addFiles = (files: File[]) => {
    const validFiles = files.filter(file => file.size <= 50 * 1024 * 1024);
    
    if (validFiles.length !== files.length) {
      toast.warn('Some files were not added. File size should be less than 50MB', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    setSelectedFiles(prevFiles => [
      ...prevFiles,
      ...validFiles.map(file => Object.assign(file, {
        preview: file.type.startsWith('video/') ? URL.createObjectURL(file) : undefined
      }))
    ]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);
    console.log('Selected files:', selectedFiles);
    toast.success('Form submitted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('video/')) {
      return (
        <svg className="w-3 h-3 text-purple-500" fill="none" height={50} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-3 h-3 text-blue-500" fill="none" height={50} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h3 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Upload Documents and Videos
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6 ">
        <table className="w-full">
  <tbody className="md:space-x-4 lg:space-x-6 block md:table-row-group">
    <tr className="block md:table-row mb-4 md:mb-0">
      <td className="block md:table-cell py-2 md:pr-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
      </td>
      <td className="block md:table-cell py-2">
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formData.name}
          onChange={handleInputChange}
        />
      </td>
    </tr>
    <tr className="block md:table-row mb-4 md:mb-0">
      <td className="block md:table-cell py-2 md:pr-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number:</label>
      </td>
      <td className="block md:table-cell py-2">
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </td>
    </tr>
    <tr className="block md:table-row mb-4 md:mb-0">
      <td className="block md:table-cell py-2 md:pr-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
      </td>
      <td className="block md:table-cell py-2">
        <textarea
          id="address"
          name="address"
          required
          rows={3}
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formData.address}
          onChange={handleInputChange}
        ></textarea>
      </td>
    </tr>
    <tr className="block md:table-row">
      <td className="block md:table-cell py-2 md:pr-4">
        <label htmlFor="activityName" className="block text-sm font-medium text-gray-700">Activity Name:</label>
      </td>
      <td className="block md:table-cell py-2">
        <input
          id="activityName"
          name="activityName"
          type="text"
          required
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formData.activityName}
          onChange={handleInputChange}
        />
      </td>
    </tr>
  </tbody>
</table>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Documents and Videos (Max: 50MB each)
            </label>
            <div 
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${isDragging ? 'bg-gray-100' : ''}`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-8 w-8 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  height={100}
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload files</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only" 
                      multiple 
                      onChange={handleFileChange} 
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov,.avi"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, JPG, JPEG, PNG, MP4, MOV, AVI up to 50MB each
                </p>
              </div>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h4>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-1 bg-gray-50 rounded-md text-xs">
                    <div className="flex items-center">
                      {getFileIcon(file)}
                      <span className="ml-1 text-gray-500 truncate max-w-xs">{file.name}</span>
                      <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-3 h-3" height={40} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      
                    </button>
                    </div>
                   
                  </div>
                ))}
              </div>
            </div>
          )}

<div>
  <button
    type="submit"
    className="cart-btn bd-fill__btn w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium"
  >
    Submit
  </button>
</div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DocumentUploadForm;