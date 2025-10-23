import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  onEditProfile,
  onLogOut,
  onCardLike,
  isLoggedIn, // Added isLoggedIn to props
  currentUser,
}) {
  if (!currentUser) {
    return (
      <div className="profile">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }
  const username = currentUser?.name ?? "User";

  const userId = currentUser?._id || null;

  const userItems = userId
    ? clothingItems.filter((item) => item.owner === userId)
    : [];

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          username={username}
          onEditProfile={onEditProfile}
          onLogOut={onLogOut}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={userItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
        />
      </section>
    </div>
  );
}

export default Profile;
