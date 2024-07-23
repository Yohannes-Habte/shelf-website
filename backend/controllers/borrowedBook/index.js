import BorrowedBook from "../../models/borrowedBook/index.js";
import createError from "http-errors";
import User from "../../models/user/index.js";
import Book from "../../models/book/index.js";
import Bookshelf from "../../models/bookshelf/index.js";

//==========================================================================
// Create New Borrowed book
//==========================================================================
export const createBorrowedBook = async (req, res, next) => {
  const {
    ISBN,
    title,
    author,
    dueDate,
    book: bookId,
    borrowedFrom: bookshelfId,
  } = req.body;

  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);
    const bookshelf = await Bookshelf.findById(bookshelfId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (!bookshelf) {
      return res.status(404).json({ message: "Bookshelf not found" });
    }

    const borrowedBook = new BorrowedBook({
      ISBN: ISBN,
      title: title,
      author: author,
      dueDate: dueDate,
      book: bookId,
      borrowedFrom: bookshelfId,
    });

    await borrowedBook.save();

    user.borrowedBooks.push(borrowedBook._id);
    await user.save();

    bookshelf.borrowedBooks.push(borrowedBook._id);
    await bookshelf.save();

    book.status = "borrowed";
    book.borrowedTimes.push(borrowedBook._id);
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      borrowedBook,
    });
  } catch (error) {
    console.error("Error creating borrowed book:", error);
    next(error);
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

  if (!mongoose.Types.ObjectId.isValid(borrowedBookId)) {
    return res.status(400).json({ message: "Invalid borrowed book ID" });
  }

  if (req.user.role !== "generalManager") {
    return res
      .status(403)
      .json({ message: "Forbidden: to perform such action" });
  }

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

//==========================================================================
// Delete a borrowed book
//==========================================================================
export const deleteBorrowedBook = async (req, res) => {
  const bookId = req.params.bookId;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid borrowed book ID" });
  }

  if (req.user.role !== "generalManager") {
    return res
      .status(403)
      .json({ message: "Forbidden: to delete borrowed book" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const book = await BorrowedBook.findByIdAndDelete(bookId).session(session);

    if (!book) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Borrowed book not found" });
    }

    // Update user

    const user = await User.findOneAndUpdate(
      { "borrowedBooks._id": bookId },
      { $pull: { borrowedBooks: { _id: bookId } } },
      { new: true, session }
    );

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found" });
    }

    // Update bookshelf

    const bookshelf = await Bookshelf.findOneAndUpdate(
      { "borrowedBooks._id": bookId },
      { $pull: { borrowedBooks: { _id: bookId } } },
      { new: true, session }
    );

    if (!bookshelf) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Bookshelf not found" });
    }

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json({ success: true, message: "Borrowed deleted successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({ message: "Internal server error" });
  }
};

//==========================================================================
// Get counts of borrowed books
//==========================================================================
export const countBorrowedBooks = async (req, res, next) => {
  try {
    const counts = await BorrowedBook.countDocuments();
    return res.status(200).json({
      success: true,
      result: counts,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
