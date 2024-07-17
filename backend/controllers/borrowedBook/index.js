import BorrowedBook from "../../models/borrowedBook/index.js";
import createError from "http-errors";

//==========================================================================
// Create New Borrowed book
//==========================================================================
export const createBorrowedBook = async (req, res, next) => {
  const { ISBN } = req.body;

  try {
    const book = await BorrowedBook.findOne({ ISBN });

    if (book) {
      return next(createError(400, "Book already borrowed!"));
    }

    if (!book) {
      const borrowedBook = new BorrowedBook(req.body);

      try {
        await borrowedBook.save();
      } catch (error) {
        console.log(error);
        return next(createError(500, "Borrowed book not saved"));
      }

      res.status(201).json({
        success: true,
        message: "Book successfully borrowed!",
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
export const getBorrowedBooks = async (req, res, next) => {
  try {
    const books = await BorrowedBook.find();

    if (!books) {
      return next(createError(400, "Borrowed books not found!"));
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
export const getBorrowedBook = async (req, res, next) => {
  const borrowedBookId = req.params.id;

  try {
    const book = await BorrowedBook.findById(borrowedBookId);

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
