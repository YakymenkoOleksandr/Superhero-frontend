import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { useState } from "react";
import css from "./AddSuperhero.module.css";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchHeroes } from "../../redux/actions.js";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { selectAccessToken } from "../../redux/auth/authSelectors.js";
import { selectTotalPage } from "../../redux/heroes/heroesSelectors.js";
import { useNavigate } from "react-router-dom";

function AddSuperhero() {
  const nicknameId = useId();
  const realNameId = useId();
  const originDescriptionId = useId();
  const superpowersId = useId();
  const catchPhraseId = useId();
  const imageUploadId = useId();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const totalPage = useSelector(selectTotalPage);
  const accessToken = useSelector(selectAccessToken);

  const createSuperheroSchema = yup.object().shape({
    nickname: yup
      .string()
      .min(3, "Nickname should have at least 3 characters")
      .max(30, "Nickname should have at most 30 characters")
      .required("Nickname is required"),
    real_name: yup
      .string()
      .min(3, "Real name should have at least 3 characters")
      .max(30, "Real name should have at most 30 characters")
      .required("Real name is required"),
    origin_description: yup
      .string()
      .min(3, "Origin description should have at least 3 characters")
      .max(1000, "Origin description should have at most 1000 characters")
      .required("Origin description is required"),
    superpowers: yup
      .string()
      .required("Superpowers are required")
      .min(3, "Superpowers must be at least 3 characters long")
      .max(100, "Superpowers must be at most 100 characters long"),
    catch_phrase: yup
      .string()
      .min(3, "Catch phrase should have at least 3 characters")
      .max(50, "Catch phrase should have at most 50 characters")
      .required("Catch phrase is required"),
    images: yup
      .mixed()
      .required("Image is required")
      .test(
        "is-image",
        "Invalid file type, only images are allowed",
        (value) => {
          return (
            value &&
            [
              "image/jpg",
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp",
              "image/bmp",
              "image/tiff",
              "image/svg+xml",
            ].includes(value.type)
          );
        }
      ),
  });

  const initialValues = {
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    images: null,
  };

  const handleSubmit = async (values, actions) => {
    const { superpowers, ...rest } = values;

    /*const superpowersArray = superpowers
      .split(",")
      .map((power) => power.trim())
      .filter((power) => power);*/

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
      superpowers: superpowers, // Тут був superpowersArray
    };

    if (imageUrl) {
      superheroData.images = [imageUrl];
    } else {
      superheroData.images = [];
    }

    try {
      const response = await fetch(
        "https://superhero-backend-vrcc.onrender.com/superheros/superheros",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(superheroData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const responseData = await response.json();
      // console.log("Server Response Data:", responseData);

      const lastPage = Math.ceil(totalPage / 5);
      navigate(`/superherosColection?page=${lastPage}`);

      dispatch(fetchHeroes(Math.ceil(totalPage / 5)));
      actions.resetForm();
      setFile(null);
    } catch (error) {
      console.error("Failed to create superhero:", error);
    }
  };

  const handleFileChange = (event, setFieldValue) => {
    const selectedFile = event.currentTarget.files[0];
    setFile(selectedFile);
    setFieldValue("images", selectedFile);
  };

  return (
    <div className={css.backgroundForm}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={createSuperheroSchema}
      >
        <Form className={css.wrapperForm}>
          <label htmlFor={nicknameId}>Nickname</label>
          <Field
            type="text"
            id={nicknameId}
            name="nickname"
            className={css.field}
            placeholder="Enter a nickname (Required)"
          />
          <ErrorMessage
            name="nickname"
            component="span"
            className={css.error}
          />
          <label htmlFor={realNameId}>Real name</label>
          <Field
            type="text"
            id={realNameId}
            name="real_name"
            className={css.field}
            placeholder="Enter a real name (Required)"
          />
          <ErrorMessage
            name="real_name"
            component="span"
            className={css.error}
          />
          <label htmlFor={originDescriptionId}>Origin description</label>
          <Field
            type="text"
            id={originDescriptionId}
            as="textarea"
            cols="20"
            rows="3"
            name="origin_description"
            className={css.field}
            placeholder="Enter a description of the origin (Required)"
          />
          <ErrorMessage
            name="origin_description"
            component="span"
            className={css.error}
          />
          <label htmlFor={superpowersId}>Superpowers</label>
          <Field
            type="text"
            id={superpowersId}
            as="textarea"
            cols="20"
            rows="3"
            name="superpowers"
            className={css.field}
            placeholder="Enter superpowers separated by comma and space (Required)"
          />
          <ErrorMessage
            name="superpowers"
            component="span"
            className={css.error}
          />
          <label htmlFor={catchPhraseId}>Catch phrase</label>
          <Field
            type="text"
            id={catchPhraseId}
            as="textarea"
            cols="20"
            rows="3"
            name="catch_phrase"
            className={css.field}
            placeholder="Enter a catch phrase (Required)"
          />
          <ErrorMessage
            name="catch_phrase"
            component="span"
            className={css.error}
          />
          <label htmlFor={imageUploadId}>Upload Image</label>
          <Field name="images">
            {({ field, form }) => (
              <>
                <input
                  type="file"
                  id={imageUploadId}
                  onChange={(event) =>
                    handleFileChange(event, form.setFieldValue)
                  }
                  className={`${css.field} ${css.upload}`}
                />
                <label
                  htmlFor={imageUploadId}
                  className={css.customUploadButton}
                >
                  <MdOutlineCloudUpload className={css.iconUpload} />
                  <span className={css.textOfUploader}>
                    {form.values.images
                      ? form.values.images.name
                      : "Select file (Required)"}
                  </span>
                </label>
              </>
            )}
          </Field>
          <ErrorMessage name="images" component="span" className={css.error} />

          <button type="submit" className={css.buttonSubmit}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddSuperhero;
