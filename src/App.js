/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
// import "dotenv/config";
function App() {
  const [stay, setStay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = new Date();
  const tomorrow = new Date();
  const sevenDays = new Date();
  tomorrow.setDate(today.getDate() + 1);
  sevenDays.setDate(tomorrow.getDate() + 7);

  const [formData, setFormData] = useState({
    location: "Seattle",
    checkin: tomorrow.toISOString().split("T")[0], // Format: YYYY-MM-DD
    checkout: sevenDays.toISOString().split("T")[0],
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0,
  });

  // Correctly access environment variables
  // const API_BASE_URL =
  //   process.env.REACT_APP_API_BASE_URL || "https://airbnb13.p.rapidapi.com";
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const API_KEY = process.env.REACT_APP_API_KEY;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };

  const getStay = async () => {
    const url = `${API_BASE_URL}/search-location?location=${formData.location}&checkin=${formData.checkin}&checkout=${formData.checkout}&adults=${formData.adults}&children=${formData.children}&infants=${formData.infants}&pets=${formData.pets}&page=1&currency=USD`;

    console.log("Constructed URL:", url);

    try {
      const response = await fetch(url, options);
      // const result = await response.text();
      // console.log(result);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Fetched data:", data);

      if (data.results && data.results.length > 0) {
        setStay(data.results);
      } else {
        setError("No lodging availability found.");
      }
    } catch (error) {
      console.error("Fetching error:", error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStay(); // No need to pass formData here as it's already accessible within the function
  }, [formData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!stay) return <p>No lodging availability</p>;

  return (
    <div className="App">
      <Navbar
        staySearch={getStay}
        formData={formData}
        setFormData={setFormData}
      />
      <Hero />
      <section className="cards--list">
        {stay.map((stayItem) => (
          <Card key={stayItem.id} stay={stayItem} />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default App;
