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
import MenuModal from "../MenuModal/MenuModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";

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

  const onAddItem = (data) => {
    // console.log(data._id);
    // const newCardData = {
    //   _id: data._id,
    //   name: data.name,
    //   imageUrl: data.imageUrl,
    //   weather: data.weather,
    // };
    setClothingItems([data, ...clothingItems]);
    closeActiveModal();
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

  // useEffect(() => {
  //   setClothingItems(defaultClothingItems);
  // });

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            handleMenuClick={handleMenuClick}
            isOpen={activeModal === "user"}
            onClose={closeActiveModal}
          />
          <Routes>
            <Route
              path="/se_project_react"
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
              path="/se_project_react/profile"
              element={<Profile onCardClick={onCardClick} />}
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
