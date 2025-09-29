import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTempUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label htmlFor="toggle-switch__checkbox" className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__circle"></span>
      <span
        className={`toggle-switch__text toggle-switch__text_F ${
          currentTempUnit === "F" ? "toggle-switch__text_color_white" : ""
        }`}
      >
        F
      </span>
      <span
        className={`toggle-switch__text toggle-switch__text_C ${
          currentTempUnit === "C" ? "toggle-switch__text_color_white" : ""
        }`}
      >
        C
      </span>
    </label>
  );
}
