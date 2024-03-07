/* eslint-disable no-unused-vars */
import React from "react";
import Heart from "./Heart";
import { link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Card({ stay }) {
  //assigning myStayId to be the stay id user clicked
  const params = useParams();
  const myStayId = params.id;

  if (!stay) {
    return null;
  }

  let badgeText;
  if (stay.isSuperhost) {
    badgeText = "Superhost";
  } else if (stay.rating >= 4.8) {
    badgeText = "Guest Favorite";
  } else if (stay.rareFind === true) badgeText = "Rare Find";

  return (
    // <div className="card--container">
    <div className="card">
      <div className="card--info">
        {badgeText && <div className="card--badge"> {badgeText}</div>}
        {/* Add Heart component logic here after learning local storage or back-end*/}
      </div>

      {/* link directly to airbnb web */}
      <a href={stay.url}>
        <img src={stay.images[0]} alt="location img" className="card--image" />
      </a>

      <div className="card--stats">
        <h4 className="stayType">{stay.type}</h4>
        <img
          // src="./images/star.png"
          src="https://pluspng.com/img-png/star-png-star-png-image-2156.png"
          alt="rating star"
          className="card--star"
        />{" "}
        <h4 className="rating">{stay.rating} </h4>{" "}
        <h4 className="reviewCount">({stay.reviewsCount})</h4>
      </div>
      <div className="card--title">
        <p>{stay.name}</p>
        <span className="bold">${stay.price.rate}/night •</span>
        <span>${stay.price.total}/stay •</span>
      </div>
    </div>
    // </div>
  );
}
