import ReactStars from "react-rating-stars-component";

const Rating = ({ initialRating, onRatingChange }) => {
  const handleRatingChange = (newRating) => {
    onRatingChange(newRating);
  };

  return (
    <ReactStars
      count={5}
      value={initialRating}
      onChange={handleRatingChange}
      size={24}
      activeColor="#ffd700"
    />
  );
};

export default Rating;
