import "./App.css";
import Card from "./components/Card";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";

function App() {
  const [stay, setStay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    location: "",
    checkin: "",
    checkout: "",
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };

  const getStay = async () => {
    console.log(formData);
    // const url = `https://airbnb13.p.rapidapi.com/search-location?location=${formData.location}&checkin=2024-02-01&checkout=2024-02-02&adults=2&children=0&infants=0&pets=0&page=1&currency=USD`;

    const url = `https://airbnb13.p.rapidapi.com/search-location?location={formData.location}&checkin=2024-02-01&checkout=2024-02-02&adults=2&children=0&infants=0&pets=0&page=1&currency=USD`;

    // const url = `https://airbnb13.p.rapidapi.com/search-location?location=${formData.location}&checkin=${formData.checkin}&checkout=${formData.checkout}&adults=${formData.adults}&children=${formData.children}&infants=${formData.infants}&pets=${formData.pets}&page=1&currency=USD`;

    // const apiUrl = `https://airbnb13.p.rapidapi.com/search-location?location=${formData.location}&checkin=${formData.checkin}&checkout=${formData.checkout}&adults=${formData.adults}&children=${formData.children}&infants=${formData.infants}&pets=${formData.pets}&page=1&currency=USD`;
    // console.log("API URL:", apiUrl);
    try {
      // const response = await fetch(apiUrl, options);

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        console.log(data.results);
        console.log(url);
        // console.log(apiUrl);
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
    getStay();
  }, [formData]); // Trigger useEffect when form data changes

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
      <Navbar staySearch={getStay} />
      <Hero />

      <section className="cards--list">
        {Array.isArray(stay) && stay.length > 0 ? (
          stay.map((stayItem) => <Card key={stayItem.id} stay={stayItem} />)
        ) : (
          <p>No lodging availability</p>
        )}
      </section>
      <Card />
    </div>
  );
}

export default App;
