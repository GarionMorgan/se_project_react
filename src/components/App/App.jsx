import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { defaultCoordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";

import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  register,
  login,
  getUserInfo,
  updateUserProfile,
} from "../../utils/auth";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  // state for current user
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // registration and login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleSignUp = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(() => {
        return login({ email, password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        closeActiveModal(); // Close the modal after successful signup
        return getUserInfo(data.token); // Fetch user info after signup
      })
      .then((user) => {
        setCurrentUser(user); // Update current user state
      })
      .catch((error) => {
        console.error("Registration/Login failed", error);
      });
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal(); // Close the modal after successful login
        return getUserInfo(res.token); // Fetch user info after login
      })
      .then((user) => {
        setCurrentUser(user); // Update current user state
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };

  // check token on app load

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((error) => {
          console.error("Token is invalid", error);
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  const onCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
  };

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const handleSignInClick = () => {
    setActiveModal("sign-in");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (data) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    console.log("Before - Data received for new item:", data);
    console.log("on add item called");
    // create shallow copy and remove _id
    const cleanData = { ...data };
    delete cleanData._id;

    console.log("Clean data being sent to addItem:", cleanData);

    addItem(cleanData, token)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(
          "Unable to save new clothing item to your wardrobe. Please verify your internet connection and try again.",
          err
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onDeleteItem = (data) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    deleteItem(data._id, token)
      .then(() => {
        setClothingItems((state) =>
          state.filter((item) => {
            return item._id !== data._id;
          })
        );
        closeActiveModal();
      })
      .catch((err) => {
        console.error(
          "Unable to delete clothing item from your wardrobe. Please try again.",
          err
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateUser = (userData) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    updateUserProfile(userData, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((error) => console.error("Profile update failed", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!activeModal) {
      //exits if no modal is open
      return;
    }
    //prevents unnecessary event listeners when not needed
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    //adding event listener with modal is active
    document.addEventListener("keydown", handleEscClose);

    //clean up the listener with modal is closed or component demounts
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); //re-runs effect when activeModal changes

  useEffect(() => {
    // Try to get the user's current location. If permission is denied or
    // geolocation isn't available, fall back to the default coordinates.
    const fetchWeatherAt = (coords) => {
      getWeather(coords, APIkey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch((error) => {
          console.error(
            "Failed to fetch weather data. Please check your internet connection and try again.",
            error
          );
        });
    };

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          fetchWeatherAt(coords);
        },
        (err) => {
          console.warn(
            "Geolocation unavailable or denied, using default.",
            err
          );
          fetchWeatherAt(defaultCoordinates);
        },
        { maximumAge: 5 * 60 * 1000, timeout: 5000 }
      );
    } else {
      fetchWeatherAt(defaultCoordinates);
    }
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const navigate = useNavigate();

  // logout function
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  // like and dislike functionality
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    const action = !isLiked ? addCardLike : removeCardLike;
    action(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((error) => console.error(error));
  };

  // Add this to your App.jsx to debug
  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleSignUpClick={handleSignUpClick}
              handleSignInClick={handleSignInClick}
              currentUser={currentUser}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={onCardClick}
                    clothingItems={clothingItems}
                    onAddBtnClick={setActiveModal}
                    onCardLike={handleCardLike}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={onCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onEditProfile={handleEditProfile}
                      onLogOut={handleLogOut}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn} // Pass isLoggedIn to Profile
                      currentUser={currentUser}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItem={onAddItem}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              onDeleteItem={onDeleteItem}
              isLoading={isLoading}
            ></ItemModal>
            <LoginModal
              isOpen={activeModal === "sign-in"}
              onClose={closeActiveModal}
              handleSignInClick={handleLogin}
            />
            <RegisterModal
              isOpen={activeModal === "sign-up"}
              onClose={closeActiveModal}
              handleSignUpClick={handleSignUp}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />

            <Footer />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
