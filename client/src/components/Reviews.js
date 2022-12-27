import React from "react";
import Review from "./elements/Review";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <div className="w-full"> {/*grid grid-cols-2 grid-flow-row gap-5 */}
      {reviews.map((review) => {
        return (
          <div><Review review={review} /> </div>
        );
      })}
      {/* <div // review.rating review.review review.name review.id
        className="card text-white bg-primary mb-3 mr-4"
        style={{ maxWidth: "30%" }}
      >
        <div className="card-header d-flex justify-content-between">
          <span>Joan</span>
          <span>
            <StarRating rating={3} />
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">This restaurant was awesome</p>
        </div>
      </div>

      <div
        className="card text-white bg-primary mb-3 mr-4"
        style={{ maxWidth: "30%" }}
      >
        <div className="card-header d-flex justify-content-between">
          <span>Joan</span>
          <span>
            <StarRating rating={3} />
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">This restaurant was awesome</p>
        </div>
      </div>

      <div
        className="card text-white bg-primary mb-3 mr-4"
        style={{ maxWidth: "30%" }}
      >
        <div className="card-header d-flex justify-content-between">
          <span>Joan</span>
          <span>
            <StarRating rating={3} />
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">This restaurant was awesome</p>
        </div>
      </div>
      <div
        className="card text-white bg-primary mb-3 mr-4"
        style={{ maxWidth: "30%" }}
      >
        <div className="card-header d-flex justify-content-between">
          <span>Joan</span>
          <span>
            <StarRating rating={3} />
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">This restaurant was awesome</p>
        </div>
      </div> */}
    </div>
  );
};

export default Reviews;