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
    <div className="card--container">
      <div className="card">
        <div className="card--info">
          {badgeText && <div className="card--badge"> {badgeText}</div>}
          {/* Add Heart component logic here */}
        </div>
        <a href={stay.url}>
          <img
            src={stay.images[0]}
            alt="location img"
            className="card--image"
          />
        </a>

        <div className="card--stats">
          <h4>
            {stay.type}
            <img
              // src="./images/star.png"
              src="https://pluspng.com/img-png/star-png-star-png-image-2156.png"
              alt="rating star"
              className="card--star"
            />

            <span>{stay.rating}</span>
            <span> ({stay.reviewsCount})</span>
          </h4>
          {/* <span className="bold">{stay.rating}</span>
        <span className="bold"> ({stay.reviewsCount})</span> */}
        </div>
        <div className="card--title">
          <p>{stay.name}</p>
          <span className="bold">${stay.price.rate} night •</span>
          <span>${stay.price.total} night •</span>
        </div>
      </div>
    </div>
  );
}
