import { Formik, Form, Field } from "formik";
import { useId } from "react";
import { useState } from "react";
import css from "./AddSuperhero.module.css";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchHeroes } from "../../redux/actions.js";
import { useSelector } from "react-redux";

function AddSuperhero() {
  const nicknameId = useId();
  const realNameId = useId();
  const originDescriptionId = useId();
  const superpowersId = useId();
  const catchPhraseId = useId();
  const imageUploadId = useId();
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const totalPage = useSelector((state) => state.heroes.totalPage);
  const accessToken = useSelector((state) => state.auth.accessToken); 

  const initialValues = {
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
  };

  const handleSubmit = async (values, actions) => {
    const { superpowers, ...rest } = values;

    const superpowersArray = superpowers
      .split(",")
      .map((power) => power.trim())
      .filter((power) => power);

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
        imageUrl = uploadData.secure_url;
      } catch (error) {
        console.error("Failed to upload image to Cloudinary:", error);
        return;
      }
    } else {
      console.error("No file selected for upload");
    }

    const superheroData = {
      ...rest,
      superpowers: superpowersArray,
    };

    if (imageUrl) {
      superheroData.images = [imageUrl];
    }

    try {
      const response = await fetch(
        "https://superhero-backend-vrcc.onrender.com/superheros",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, 
          },
          body: JSON.stringify(superheroData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      dispatch(fetchHeroes(Math.ceil(totalPage / 5)));
      alert("The superhero added successfully!");
      actions.resetForm();
      setFile(null);
    } catch (error) {
      console.error("Failed to create superhero:", error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.currentTarget.files[0];
    setFile(selectedFile);
  };

  return (
    <div className={css.backgroundForm}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.wrapperForm}>
          <label htmlFor={nicknameId}>Nickname</label>
          <Field
            type="text"
            name="nickname"
            className={css.field}
            placeholder="Enter a nickname (Required)"
          />
          <label htmlFor={realNameId}>Real name</label>
          <Field
            type="text"
            name="real_name"
            className={css.field}
            placeholder="Enter a real name (Required)"
          />
          <label htmlFor={originDescriptionId}>Origin description</label>
          <Field
            type="text"
            as="textarea"
            cols="20"
            rows="3"
            name="origin_description"
            className={css.field}
            placeholder="Enter a description of the origin (Required)"
          />
          <label htmlFor={superpowersId}>Superpowers</label>
          <Field
            type="text"
            as="textarea"
            cols="20"
            rows="3"
            name="superpowers"
            className={css.field}
            placeholder="Enter superpowers separated by comma and space (Required)"
          />
          <label htmlFor={catchPhraseId}>Catch phrase</label>
          <Field
            type="text"
            as="textarea"
            cols="20"
            rows="3"
            name="catch_phrase"
            className={css.field}
            placeholder="Enter a catch phrase (Required)"
          />
          <label htmlFor={imageUploadId}>Upload Image</label>
          <div>
            <input
              type="file"
              name="images"
              id={imageUploadId}
              onChange={handleFileChange}
              className={`${css.field} ${css.upload}`}
            />
            <label htmlFor={imageUploadId} className={css.customUploadButton}>
              <MdOutlineCloudUpload className={css.iconUpload} />
              <span className={css.textOfUploader}>
                {" "}
                {file ? file.name : "Select file (Required)"}
              </span>
            </label>
          </div>

          <button type="submit" className={css.buttonSubmit}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddSuperhero;