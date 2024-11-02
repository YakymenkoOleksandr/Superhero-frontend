import css from "./AddPhoto.module.css";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { MdOutlineCloudUpload } from "react-icons/md";

function AddPhoto({ hero }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.currentTarget.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = async (values, actions) => {
  console.log("Submitted values:", values);
  console.log("Uploaded file:", file);

  let imageUrl = "";

  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/djjmekqge/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        console.error("Cloudinary upload error:", errorData);
        throw new Error(`Cloudinary upload failed: ${uploadResponse.status}`);
      }

      const uploadData = await uploadResponse.json();
      console.log("Cloudinary upload data:", uploadData);
      imageUrl = uploadData.secure_url; 
    } catch (error) {
      console.error("Failed to upload image to Cloudinary:", error);
      return;
    }
  } else if (values.imageUrl) {
    imageUrl = values.imageUrl; 
  } else {
    console.error("No file selected for upload or URL provided");
    return;
  }

  const imageOnlyData = {
    imageUrl: imageUrl, 
  };

  try {
    const response = await fetch(
      `https://superhero-backend-vrcc.onrender.com/api/superheros/${hero._id}/images`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageOnlyData), 
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Image URL added successfully");
    actions.resetForm();
    handleCloseModal();
  } catch (error) {
    console.error("Failed to add image:", error);
  }
};

  const handleCloseModal = () => {
    setModalOpen(false);
    setFile(null);
  };

  const handleClickOutside = (event) => {
    if (event.target.classList.contains(css.modal)) {
      handleCloseModal();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <button className={css.addPhotoButton} onClick={() => setModalOpen(true)}>
        Add Photo
      </button>

      {modalOpen && (
        <div className={css.modal} onClick={handleClickOutside}>
          <div className={css.modalContent}>
            <h2>Add Photo</h2>
            <button className={css.closeButton} onClick={handleCloseModal}>
              ×
            </button>
            <Formik
              initialValues={{ imageUrl: "", images: "" }}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className={css.wrapperForm}>
                  <label htmlFor="imageUploadId">Upload Image</label>
                  <div>
                    <input
                      type="file"
                      name="images"
                      id="imageUploadId"
                      onChange={(event) => {
                        handleFileChange(event);
                        setFieldValue("images", event.currentTarget.files[0]);
                      }}
                      className={`${css.field} ${css.upload}`}
                    />
                    <label
                      htmlFor="imageUploadId"
                      className={css.customUploadButton}
                    >
                      <MdOutlineCloudUpload className={css.iconUpload} />
                      <span className={css.textOfUploader}>
                        {file ? file.name : "Select file"}
                      </span>
                    </label>
                  </div>
                  <Field
                    type="text"
                    name="imageUrl"
                    className={css.field}
                    placeholder="Or enter image URL"
                  />
                  <button type="submit" className={css.buttonSubmit}>
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPhoto;
