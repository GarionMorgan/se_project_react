import sunny from "../../assets/sunny.svg";
import "./WeatherCard.css";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">Today is 75&deg; F</p>
      <img src={sunny} alt="sunny" className="weather-card__img" />
    </section>
  );
}

export default WeatherCard;
