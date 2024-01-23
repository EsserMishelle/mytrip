/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { API_BASE_URL, API_KEY } from "../apiConfig";
// import "./App.css";
import { ReactComponentas as airbnbLogo } from "./airbnb.svg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useParams } from "react-router-dom";

export default function Navbar({ staySearch, formData, setFormData }) {
  // const params = useParams();
  // const myStay = params.id;
  const id = React.useId();

  async function handleChange(event) {
    const { name, value } = event.target;
    console.log(`updating form field ${name}: with the value: ${value}`);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form Data submitted:", formData);
    // Check if required fields are present
    const requiredFields = ["location", "checkin", "checkout", "adults"];
    const isFormDataValid = requiredFields.every((field) => formData[field]);

    if (isFormDataValid) {
      staySearch(formData); // Pass formData directly
    } else {
      console.error("One or more required fields are missing");
    }
  }

  return (
    <nav>
      {/* <script
        src="https://kit.fontawesome.com/6c2258e105.js"
        crossorigin="anonymous"
      ></script> */}

      <img
        src="https://clipground.com/images/png-logo-generator-online-8.png"
        className="nav--logo"
        alt="company logo"
      />
      <h4 className="nav--logo">Wise Travel</h4>

      {/* <img
        src="https://pluspng.com/img-png/airbnb-logo-png-airbnb-logo-9-png-22-de-outubro-de-2016-577.png"
        className="nav--logo"
        alt="airbnb logo"
      /> */}
      {/* <FontAwesomeIcon
        icon={icon({ name: "airbnb", family: "brands", style: "solid" })}
      /> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor={id + "-location"}>Where</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="search destinations"
          id={id + "-location"}
          className="input--location"
        />

        <label htmlFor={id + "-checkin"}>Check in</label>
        <input
          type="date"
          name="checkin"
          value={formData.checkin}
          onChange={handleChange}
          placeholder="Add dates"
          id={id + "-checkin"}
          className="input--checkin"
        />

        <label htmlFor={id + "-checkout"}>Check out</label>
        <input
          type="date"
          name="checkout"
          value={formData.checkout}
          onChange={handleChange}
          placeholder="Add dates"
          id={id + "-checkout"}
          className="input--checkout"
        />

        <label htmlFor={id + "-adults"}>Adults</label>
        <input
          type="number"
          name="adults"
          value={formData.adults}
          onChange={handleChange}
          placeholder="Age 13 or above"
          id={id + "-adults"}
          className="input--adults"
        />

        <label htmlFor={id + "-children"}>Children</label>
        <input
          type="number"
          name="children"
          value={formData.children}
          onChange={handleChange}
          placeholder="Age 2-12"
          id={id + "-children"}
          className="input--children"
        />
        <label htmlFor={id + "-infants"}>Infants</label>
        <input
          type="number"
          name="infants"
          value={formData.infants}
          onChange={handleChange}
          placeholder="Under 2"
          id={id + "-infants"}
          className="input--infants"
        />
        <label htmlFor={id + "-pets"}>Pets</label>
        <input
          type="number"
          name="pets"
          value={formData.pets}
          onChange={handleChange}
          placeholder="Bringing a service animal?"
          id={id + "-pets"}
          className="input--pets"
        />
        {/* <button type="submit" disabled={loading}>
          {loading ? "searching..." : "Search"} */}
        <button className="form--submit" type="submit">
          Search please
        </button>
      </form>
    </nav>
  );
}
