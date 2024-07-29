import BorrowedBook from "../../models/borrowedBook/index.js";
import createError from "http-errors";
import User from "../../models/user/index.js";
import Book from "../../models/book/index.js";
import Bookshelf from "../../models/bookshelf/index.js";

//==========================================================================
// Create New Borrowed book
//==========================================================================
export const createBorrowedBook = async (req, res, next) => {
  const { title, author, dueDate, book: bookId, borrowedFrom: bookshelfId } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);
    const bookshelf = await Bookshelf.findById(bookshelfId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (!bookshelf) return res.status(404).json({ message: "Bookshelf not found" });

    const borrowedBook = new BorrowedBook({
      title,
      author,
      dueDate,
      book: bookId,
      borrowedFrom: bookshelfId,
    });

    const savedBorrowedBook = await borrowedBook.save();

    user.borrowedBooks = user.borrowedBooks || [];
    user.borrowedBooks.push(savedBorrowedBook._id);
    await user.save();

    book.borrowedTimes = book.borrowedTimes || [];
    book.borrowedTimes.push(savedBorrowedBook._id);
    await book.save();

    bookshelf.borrowedBooks = bookshelf.borrowedBooks || [];
    bookshelf.borrowedBooks.push(savedBorrowedBook._id);
    await bookshelf.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      borrowedBook,
    });
  } catch (error) {
    console.error("Error creating borrowed book:", error);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};


//==========================================================================
// Get all books
//==========================================================================

export const getBorrowedBooks = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate("borrowedBooks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.borrowedBooks || user.borrowedBooks.length === 0) {
      return res.status(200).json({ borrowedBooks: [] });
    }

    const borrowedBooks = user.borrowedBooks.map((borrowedBook) => ({
      title: borrowedBook.title,
      author: borrowedBook.author,
      dueDate: borrowedBook.dueDate,
      bookId: borrowedBook.book,
      borrowedFrom: borrowedBook.borrowedFrom,
    }));

    res.status(200).json({ borrowedBooks });
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
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
