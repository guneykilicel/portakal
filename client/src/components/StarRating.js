import React from "react";

const StarRating = ({ rating }) => {
  //rating =4
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push("a"); //tam dolu yıldız
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push("v"); // yarım dolu yıldız
    } else {
      stars.push("o"); // boş yıldız
    }
  }
  return <>{stars}</>;
};

export default StarRating;