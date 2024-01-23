import { API_BASE_URL, API_KEY } from "./apiConfig";
import "./App.css";

import Card from "./components/Card";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";

function App() {
  const [stay, setStay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    location: "Seattle",
    checkin: "2024-02-01",
    checkout: "2024-02-05",
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
      // "airbnb13.p.rapidapi.com"
    },
  };

  const url = `${API_BASE_URL}/search-location?location=${formData.location}&checkin=${formData.checkin}&checkout=${formData.checkout}&adults=${formData.adults}&children=${formData.children}&infants=${formData.infants}&pets=${formData.pets}&page=1&currency=USD`;
  console.log("API URL:", url);

  // const url = `https://airbnb13.p.rapidapi.com/search-location?location=${formData.location}&checkin=${formData.checkin}&checkout=${formData.checkout}&adults=${formData.adults}&children=${formData.children}&infants=${formData.infants}&pets=${formData.pets}&page=1&currency=USD`;
  // console.log("API URL:", url);

  const getStay = async (formData) => {
    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${formData.location}&checkin=${formData.checkin}&checkout=${formData.checkout}&adults=${formData.adults}&children=${formData.children}&infants=${formData.infants}&pets=${formData.pets}&page=1&currency=USD`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        console.log(data.results);
        console.log(url);
        console.log(options);
        setStay(data.results);
        setLoading(false);
      } else {
        console.error(`Empty or undefined results in API response`, data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStay(formData); // Pass formData directly to getStay
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!stay) {
    return <p>No lodging availability</p>;
  }

  return (
    <div className="App">
      <Navbar
        staySearch={getStay}
        formData={formData}
        setFormData={setFormData}
      />
      <Hero />

      <section className="cards--list">
        {Array.isArray(stay) && stay.length > 0 ? (
          stay.map((stayItem) => <Card key={stayItem.id} stay={stayItem} />)
        ) : (
          <p>No lodging availability</p>
        )}
      </section>
      <Card />
      <Footer />
    </div>
  );
}
export default App;
