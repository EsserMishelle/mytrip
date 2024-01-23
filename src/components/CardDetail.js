import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CardDetail({ stay }) {
  const {stay.id}= useParams();
  console.log(stay.id);
  const matchingStay = stay.filter(
    clickedStay => clickedStay.id === id
  )
  console.log(`The stay is ${matchingStay.}`)
  // const myFormData = params.formData;
  if (!stay) {
    return null;
  }

  if (stay.rating >= 4.8) {
    const guestFavorite = "./images/favorite_Wreath_logo";
  }

  return <div className="detail--container">This is the Stay Detail</div>;
}
