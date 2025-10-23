import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
  isLoggedIn,
  currentUser,
}) {
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button
          className="clothes-section__header-btn"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      {userItems.length > 0 ? (
        <ul className="clothes-section__items">
          {userItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
              />
            );
          })}
        </ul>
      ) : (
        <p className="clothes-section__no-items">
          You haven't added any items yet. Click "Add New" to add your first
          item!
        </p>
      )}
    </div>
  );
}

export default ClothesSection;
