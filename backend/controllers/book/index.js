import Book from "../../models/book/index.js";
import createError from "http-errors";

//==========================================================================
// Create New book
//==========================================================================
export const createBook = async (req, res, next) => {
  const { ISBN } = req.body;

  try {
    const book = await Book.findOne({ ISBN });

    if (book) {
      return next(createError(400, "Book already exist!"));
    }

    if (!book) {
      const newBook = new Book(req.body);

      try {
        await newBook.save();
      } catch (error) {
        console.log(error);
        return next(createError(500, "Book not saved"));
      }

      res.status(201).json({
        success: true,
        message: "Book successfully created!",
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
export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

    if (!books) {
      return next(createError(400, "Books not found!"));
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
export const getBook = async (req, res, next) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return next(createError(400, "Book does not exist!"));
    }

    return res.status(200).json({
      success: true,
      result: book,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};
