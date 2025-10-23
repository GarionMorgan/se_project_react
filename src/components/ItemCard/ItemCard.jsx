import "./ItemCard.css";
import likeBtn from "../../assets/like_btn.svg";
import likedBtn from "../../assets/liked_btn.svg";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn, currentUser }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  const isLiked = item.likes?.some((id) => id === currentUser?._id); // Added optional chaining to handle undefined values

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>

      {isLoggedIn && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLikeClick}
          aria-label={isLiked ? "Unlike item" : "Like item"}
          aria-pressed={isLiked}
        >
          <img
            src={isLiked ? likedBtn : likeBtn}
            alt={isLiked ? "Unlike" : "Like"}
          />
        </button>
      )}

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
