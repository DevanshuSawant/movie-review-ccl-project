// MoviePage.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../utils/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { movieImages } from "../utils/movieImages";
import "../MoviePage.css"

export default function MoviePage() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    stars: "",
    director: "",
    year: ""
  });
  const movieImg = movieImages[movieId];
  console.log(movieImg);
  const fetchReviews = async () => {
    const reviewsRef = collection(db, "reviews");
    const querySnapshot = query(reviewsRef, where("title", "==", movieId));
    const snapshot = await getDocs(querySnapshot);
    const reviewsData = snapshot.docs.map((doc) => doc.data());
    setReviews(reviewsData);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsRef = collection(db, "reviews");
      const querySnapshot = query(reviewsRef, where("title", "==", movieId));
      const snapshot = await getDocs(querySnapshot);
      const reviewsData = snapshot.docs.map((doc) => doc.data());
      setReviews(reviewsData);
    };

    fetchReviews();
  }, [movieId]);

  const handleInputChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add the new review to the database
    await addDoc(collection(db, "reviews"), {
      title: movieId,
      stars: newReview.stars,
      review: newReview.review,
    });

    // Clear the form and fetch the updated reviews
    setNewReview({
      stars: "",
      director: "",
      year: ""
    });
    fetchReviews();
  };

  return (
    <div className="movie-page">
      <button onClick={() => window.history.back()}>Go Back</button>
      <h2>{movieId}</h2>
      <img src={movieImg} alt={movieId} height='400px' />
      <b><h3>Add a Review:</h3></b>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select
            name="stars"
            value={newReview.stars}
            onChange={handleInputChange}
          >
            <option value="">Select a rating</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </label>
        <label>
          Review:
          <input
            type="text"
            name="review"
            value={newReview.review}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Add Review</button>
      </form>
      <h3>Reviews:</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <b>Rating: {review.stars}</b>
            <p>Review: {review.review}</p>
          </li>
        ))}
      </ul>
      
    </div>
  );
}
