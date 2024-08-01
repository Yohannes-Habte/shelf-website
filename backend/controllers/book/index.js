import Book from "../../models/book/index.js";
import createError from "http-errors";
import Bookshelf from "../../models/bookshelf/index.js";
import mongoose from "mongoose";
import BorrowedBook from "../../models/borrowedBook/index.js";

//==========================================================================
// Create New book
//==========================================================================
export const createBook = async (req, res, next) => {
  const {
    ISBN,
    title,
    genre,
    publishedDate,
    language,
    publisher,
    coverImageUrl,
    summary,
    shelfId,
  } = req.body;

  if (!title || !genre || !language || !shelfId) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  try {
    const newBook = new Book({
      ISBN,
      title,
      genre,
      publishedDate,
      language,
      publisher,
      coverImageUrl,
      summary,
      shelfId,
    });

    const savedBook = await newBook.save();

    const bookshelf = await Bookshelf.findById(shelfId);
    if (!bookshelf) {
      return res.status(404).json({ message: "Bookshelf not found" });
    }

    bookshelf.books.push(savedBook._id);
    await bookshelf.save();

    res.status(201).json({
      success: true,
      message: "Book created and added to the bookshelf successfully",
    });
  } catch (error) {
    console.log("error=", error);
    return next(createError(500, "Server error! please try again!"));
  }
};

//==========================================================================
// Update book to add author/s
//==========================================================================
export const updateBook = async (req, res, next) => {
  const { bookId, firstName, lastName, birthDate, deathDate } = req.body;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return next(createError(400, "Book does not exist!"));
    }

    const author = {
      firstName,
      lastName,
      birthDate,
      deathDate,
    };

    book.authors.push(author);

    await book.save();

    return res.status(200).json({
      success: true,
      result: book,
      message: "Book author is successfully added.",
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get all books
//==========================================================================
export const getBooks = async (req, res, next) => {
  try {
    const { title, genre, ISBN, language } = req.query;
    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }
    if (genre) {
      filter.genre = genre;
    }
    if (ISBN) {
      filter.ISBN = ISBN;
    }
    if (language) {
      filter.language = language;
    }

    const books = await Book.find(filter).populate({
      path: "genre",
      model: "Genre",
      select: "category",
    });

    if (books.length === 0) {
      return next(createError(404, "No books found!"));
    }

    return res.status(200).json({
      success: true,
      result: books,
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};

//==========================================================================
// Second option to all books
//==========================================================================
export const getAllBooks = async (req, res, next) => {
  try {
    const { title, genre, ISBN, language } = req.query;
    const filters = [];

    if (title) {
      filters.push({ title: { $regex: title, $options: "i" } });
    }
    if (genre) {
      filters.push({ genre });
    }
    if (ISBN) {
      filters.push({ ISBN });
    }
    if (language) {
      filters.push({ language });
    }

    let books;
    if (filters.length > 0) {
      books = await Book.find({ $or: filters }).populate({
        path: "genre",
        select: "category",
      });
    } else {
      books = await Book.find().populate({
        path: "genre",
        select: "category",
      });
    }

    if (!books.length) {
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

  // Validate the bookId format
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    console.error("Invalid book ID format");
    return next(createError(400, "Invalid book ID format"));
  }

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      console.error("Book does not exist in database");
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

//==========================================================================
// Delete single book
//==========================================================================

export const deleteBook = async (req, res, next) => {
  const bookId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return next(createError(400, "Invalid book ID"));
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const book = await Book.findById(bookId).session(session);

    if (!book) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(404, "Book does not exist!"));
    }

    // Remove the book from all related Bookshelves
    await Bookshelf.updateMany(
      { books: bookId },
      { $pull: { books: bookId } },
      { session }
    );

    // Remove the book from all related BorrowedBooks
    await BorrowedBook.updateMany(
      { book: bookId },
      { $unset: { book: "" } },
      { session }
    );

    // Delete the book
    await Book.findByIdAndDelete(bookId).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error deleting book:", error);
    return next(createError(500, "Server error! Please try again!"));
  }
};

//==========================================================================
// Count all books
//==========================================================================

export const countBooks = async (req, res, next) => {
  try {
    const count = await Book.countDocuments();

    if (count === 0) {
      return next(createError(404, "No books found."));
    }

    return res.status(200).json({
      success: true,
      result: count,
    });
  } catch (error) {
    console.error("Error counting books:", error);
    return next(
      createError(500, "Failed to count books. Please try again later.")
    );
  }
};

//==========================================================================
// Update book rating
//==========================================================================

export const updateBookRating = async (req, res, next) => {
  const { bookId } = req.params;
  const { rating } = req.body;

  // Ensure rating is valid
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.ratings.push(rating);
    await book.save();

    const averageRating =
      book.ratings.reduce((acc, rating) => acc + rating, 0) /
      book.ratings.length;

    res.status(200).json({
      success: true,
      book,
      averageRating,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//==========================================================================
// Update book rating
//==========================================================================

export const getBookRating = async (req, res, next) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const averageRating =
      book.ratings.length > 0
        ? book.ratings.reduce((acc, rating) => acc + rating, 0) /
          book.ratings.length
        : 0;

    res.status(200).json({
      success: true,
      averageRating,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
