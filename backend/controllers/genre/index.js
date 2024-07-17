import Genre from "../../models/genre/index.js";
import createError from "http-errors";

//==========================================================================
// Create New Borrowed book
//==========================================================================
export const createGenre = async (req, res, next) => {
  try {
    const newGenre = new Genre(req.body);

    try {
      await newGenre.save();
    } catch (error) {
      console.log(error);
      return next(createError(500, "Genre not saved"));
    }

    res.status(201).json({
      success: true,
      message: "Genre successfully created!",
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error! please try again!"));
  }
};

//==========================================================================
// Get all books
//==========================================================================
export const getGenres = async (req, res, next) => {
  try {
    const genres = await Genre.find();

    if (!genres) {
      return next(createError(400, "Genres not found!"));
    }

    return res.status(200).json({
      success: true,
      result: genres,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get single book
//==========================================================================
export const getGenre = async (req, res, next) => {
  const genreId = req.params.id;

  try {
    const genre = await Genre.findById(genreId);

    if (!genre) {
      return next(createError(400, "Genre does not exist!"));
    }

    return res.status(200).json({
      success: true,
      result: genre,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};
