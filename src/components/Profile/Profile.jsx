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
  const username = currentUser.name;

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

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
