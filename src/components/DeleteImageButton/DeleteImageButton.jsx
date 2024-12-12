import css from "./DeleteImageButton.module.css";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchHeroes } from "../../redux/actions.js";

function DeleteImageButton({ index, hero, currentPage }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        const response = await fetch(
          `https://superhero-backend-vrcc.onrender.com/api/superheros/${hero._id}/images/${index}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error deleting image:", errorData);
          throw new Error(`Error deleting image: ${response.status}`);
        }

        window.location.reload();
      } catch (error) {
        console.error("Failed to delete image:", error);
      }
    }
  };

  return (
    <div className={css.deleteWrapperIcon} onClick={handleDelete}>
      <MdDelete className={css.deleteIcon} />
    </div>
  );
}

export default DeleteImageButton;
