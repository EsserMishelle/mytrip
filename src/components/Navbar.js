/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";

// import "./App.css";
import { ReactComponent as AirbnbLogo } from "./airbnb.svg";

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

    const currentDate = new Date();
    const checkinDate = new Date(formData.checkin);
    const checkoutDate = new Date(formData.checkout);

    if (checkinDate < currentDate || checkoutDate < currentDate) {
      console.log(`Checkin and checkout date cannot be later than today`);
      return;
    }

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
      <div className="nav--log--word">
        <img
          src="https://clipground.com/images/png-logo-generator-online-8.png"
          className="nav--logo"
          alt="company logo"
        />
        <h5 className="nav--logo">My Travel</h5>
      </div>

      <form className="form--search" onSubmit={handleSubmit}>
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
          Search
        </button>
      </form>
    </nav>
  );
}
