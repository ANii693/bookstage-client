"use client";
import React, { useState, ChangeEvent, FormEvent, DragEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalContext from "@/hooks/use-context";
import axios from "axios";

interface RatingFormData {
  rating: number;
  comment: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

const UploadRatingForm: React.FC = () => {
  const [formData, setFormData] = useState<RatingFormData>({
    rating: 0,
    comment: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { user } = useGlobalContext();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addFiles = (files: File[]) => {
    const validFiles = files.filter((file) => file.size <= 50 * 1024 * 1024);
    if (validFiles.length !== files.length) {
      toast.warn("Some files were too large and not added (max 50MB).",
      );
    }
    setSelectedFiles((prev) =>
      [...prev, ...validFiles].map((file) =>
        Object.assign(file, {
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        })
      )
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const removeFile = (index: number) =>
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ratingData = new FormData();
    ratingData.append("userEmail", user?.email || "");
    ratingData.append("rating", formData.rating.toString());
    ratingData.append("comment", formData.comment);
    selectedFiles.forEach((file, index) => {
      ratingData.append(`files[${index}]`, file);
    });

    try {
      const response = await axios.post(`${process.env.BASE_URL}ratings/upload`, ratingData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Rating submitted successfully!", {
          position: "top-right",
          autoClose: 5000,
        });

        setFormData({ rating: 0, comment: "" });
        setSelectedFiles([]);
      }
    } catch (error) {
      toast.error("Error submitting rating: " + (error as Error).message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="modal fade" id="uploadRatingModal" tabIndex={-1} aria-labelledby="uploadRatingModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="uploadRatingModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default UploadRatingForm;
