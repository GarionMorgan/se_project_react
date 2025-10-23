import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({
  weatherData,
  onCardClick,
  onCardLike,
  clothingItems,
  currentUser,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const isLoggedIn = currentUser; // Determine if the user is logged in

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {!weatherData?.temp?.F || weatherData.temp.F === 999
            ? "Loading..."
            : currentTemperatureUnit === "F"
            ? weatherData?.temp?.F
            : weatherData.temp.C}
          &deg; {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
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
      </section>
    </main>
  );
}

export default Main;
