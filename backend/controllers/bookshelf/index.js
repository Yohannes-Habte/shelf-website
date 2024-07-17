import Bookshelf from "../../models/bookshelf/index.js";
import createError from "http-errors";

//==========================================================================
// Register new user
//==========================================================================
export const createBookshelf = async (req, res, next) => {
  const { barcode, name, image, openingHours } = req.body;

  try {
    const bookshelf = await Bookshelf.findOne({ barcode });

    if (bookshelf) {
      return next(createError(400, "Book shelf exist!"));
    }

    if (!bookshelf) {
      const newBookShelf = new Bookshelf({
        barcode,
        name,
        image,
        openingHours,
      });

      try {
        await newBookShelf.save();
      } catch (error) {
        console.log(error);
        return next(createError(500, "Bookshelf not saved"));
      }

      res.status(201).json({
        success: true,
        message: "Bookshelf successfully created!",
      });
    }
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error! please try again!"));
  }
};

//==========================================================================
// Get all bookshelves
//==========================================================================
export const getBookshelves = async (req, res, next) => {
  try {
    const bookshelves = await Bookshelf.find();

    if (!bookshelves) {
      return next(createError(400, "Bookshelves not found!"));
    }

    return res.status(200).json({
      success: true,
      result: bookshelves,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get single bookshelf
//==========================================================================
export const getBookshelf = async (req, res, next) => {
  const bookshelfId = req.params.id;

  try {
    const bookshelf = await Bookshelf.findById(bookshelfId);

    if (!bookshelf) {
      return next(createError(400, "Bookshelf does not exist!"));
    }

    return res.status(200).json({
      success: true,
      result: bookshelf,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};
