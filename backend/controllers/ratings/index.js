import Book from "../../models/book/index.js";
import Rating from "../../models/ratings/index.js";
import createError from "http-errors";

//==========================================================================
// Create New rating
//==========================================================================
export const createRating = async (req, res, next) => {
  const { bookId } = req.params;
  const { rating } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.ratings = rating; // Update the book's rating
    await book.save();

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//==========================================================================
// Get all ratings
//==========================================================================
export const getRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.find();

    if (!ratings) {
      return next(createError(400, "Ratings not found!"));
    }

    return res.status(200).json({
      success: true,
      result: ratings,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get single rating
//==========================================================================
export const getRating = async (req, res, next) => {
  const ratingId = req.params.id;

  try {
    const rating = await Rating.findById(ratingId);

    if (!rating) {
      return next(createError(400, "Rating does not exist!"));
    }

    return res.status(200).json({
      success: true,
      result: rating,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Delete single rating
//==========================================================================
export const deleteRating = async (req, res, next) => {
  const ratingId = req.params.id;

  try {
    const rating = await Rating.findById(ratingId);

    if (!rating) {
      return next(createError(404, "Rating does not exist!"));
    }

    await Rating.findByIdAndDelete(ratingId);

    return res.status(200).json({
      success: true,
      message: "Rating has been successfully deleted",
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};
