import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";

import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/api";

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
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setcurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const onCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleMenuClick = () => {
    setActiveModal("user");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteBtnClick = () => {
    setActiveModal("delete-item");
  };

  const onAddItem = (data) => {
    setClothingItems([data, ...clothingItems]);
    closeActiveModal();
  };

  const onDeleteItem = (data) => {
    deleteItem(data._id)
      .then(() => {
        setClothingItems((state) =>
          state.filter((item) => {
            return item._id !== data._id;
          })
        );
        closeActiveModal();
      })
      .catch(console.error);
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
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        // setClothingItems([data, ...clothingItems]);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   setClothingItems(defaultClothingItems);
  // });

  console.log("clothingItems:", clothingItems);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={onCardClick}
                  clothingItems={clothingItems}
                  onAddBtnClick={setActiveModal}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={onCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            title="New garment"
            buttonText="Add garment"
            activeModal={activeModal}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
          ></ItemModal>

          <Footer />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
