import { useState, useEffect } from "react";
import css from "./MoreInfo.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import EditInfo from "../EditInfo/EditInfo.jsx";
import AddPhoto from "../AddPhoto/AddPhoto.jsx";

function MoreInfo({ hero }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (selectedImage) {
          closeImageModal();
        } else if (isModalOpen) {
          closeModal();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, selectedImage]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      if (selectedImage) {
        closeImageModal();
      } else {
        closeModal();
      }
    }
  };

  return (
    <div>
      <button onClick={openModal} className={css.buttonMoreInfo}>
        More Info
      </button>

      {isModalOpen && (
        <div className={css.modalOverlay} onClick={handleOverlayClick}>
          <div className={css.modalContent}>
            <div className={css.blockForCross}>
              <button onClick={closeModal} className={css.closeButton}>
                <AiOutlineCloseCircle className={css.crossIcon} />
              </button>
            </div>

            {selectedImage ? (
              <div className={css.fullImageContainer}>
                <img
                  src={selectedImage}
                  alt="Full size image"
                  className={css.fullImage}
                />
              </div>
            ) : (
              <>
                <h2 className={css.titleOfModalWindow}>
                  More information about a superhero
                </h2>
                <p className={css.heroNickname}>{hero.nickname}</p>
                <div className={css.imageGrid}>
                  {hero.images.slice(0, 10).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Зображення ${index + 1}`}
                      className={css.imageOfSuperhero}
                      onClick={() => handleImageClick(image)}
                    />
                  ))}
                </div>
                <p className={css.textInCard}>
                  <span className={css.titelsInCard}>Real name:</span>{" "}
                  {hero.real_name}
                </p>
                <p className={css.textInCard}>
                  <span className={css.titelsInCard}>Description:</span>{" "}
                  {hero.origin_description}
                </p>
                <p className={css.textInCard}>
                  <span className={css.titelsInCard}>Superpowers:</span>{" "}
                  {hero.superpowers.join(", ")}
                </p>
                <p className={css.textInCard}>
                  <span className={css.titelsInCard}>Catch Phrase:</span>{" "}
                  {hero.catch_phrase}
                </p>
                <div className={css.buttons}>
                  <EditInfo hero={hero} />
                  <AddPhoto hero={hero}/>
                  <DeleteButton hero={hero} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MoreInfo;
