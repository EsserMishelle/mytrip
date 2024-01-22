import React from "react";
import Heart from "./Heart";

export default function Card({ stay }) {
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
        {/* Add Heart component logic here after I learn local storage or back-end*/}
      </div>
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
        {/* <span className="bold">{stay.rating}</span>
        <span className="bold"> ({stay.reviewsCount})</span> */}
      </div>
      <div className="card--title">
        <p>{stay.name}</p>
        <span className="bold">${stay.price.rate} night •</span>
        <span>${stay.price.total} night •</span>
      </div>
    </div>
    // </div>
  );
}
