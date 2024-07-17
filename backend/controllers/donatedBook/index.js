import DonatedBook from "../../models/donatedBook/index.js";
import createError from "http-errors";

//==========================================================================
// Create New Borrowed book
//==========================================================================
export const createDonatedBook = async (req, res, next) => {
  const { ISBN } = req.body;

  try {
    const book = await DonatedBook.findOne({ ISBN });

    if (book) {
      return next(createError(400, "Book already donated!"));
    }

    if (!book) {
      const donateBook = new DonatedBook(req.body);

      try {
        await donateBook.save();
      } catch (error) {
        console.log(error);
        return next(createError(500, "Donated book not saved"));
      }

      res.status(201).json({
        success: true,
        message: "Book successfully donated!",
      });
    }
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error! please try again!"));
  }
};

//==========================================================================
// Get all books
//==========================================================================
export const getDonatedBooks = async (req, res, next) => {
  try {
    const books = await DonatedBook.find();

    if (!books) {
      return next(createError(400, "Donated books not found!"));
    }

    return res.status(200).json({
      success: true,
      result: books,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get single book
//==========================================================================
export const getDonatedBook = async (req, res, next) => {
  const donatedBookId = req.params.id;

  try {
    const book = await DonatedBook.findById(donatedBookId);

    if (!book) {
      return next(createError(400, "Donated Book does not exist!"));
    }

    return res.status(200).json({
      success: true,
      result: book,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};
