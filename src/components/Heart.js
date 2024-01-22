import React from "react";

export default function Heart(props) {
  const heartIcon = props.isFilled ? "heart-filled.png" : "heart-empty.png";
  const buttonLabel = props.isFilled
    ? "Unmark as favorite"
    : "Mark as favorite";
  /**
   * Challenge:
   * If the heart is filled, add an aria-label of "Unmark as favorite".
   * Otherwise, use the aria-label of "Mark as favorite".
   */
  return (
    <button
      onClick={props.handleClick}
      aria-label={buttonLabel}
      aria-pressed={props.isFilled}
      className="card--favorite--button"
    >
      <img
        src={`../images/${heartIcon}`}
        alt="heart icon"
        className="card--favorite"
        // onClick ={props.handleClick} //--- move onClick to the button
      />
    </button>
  );
}
