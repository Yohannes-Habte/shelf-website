import DonatedBook from "../../models/donatedBook/index.js";
import createError from "http-errors";
import User from "../../models/user/index.js";
import Bookshelf from "../../models/bookshelf/index.js";
import mongoose from "mongoose";

//==========================================================================
// Create New Borrowed book
//==========================================================================

export const createDonatedBook = async (req, res, next) => {
  const { title, author, bookshelfId, userId } = req.body;

  try {
    if (!title || !author || !userId || !bookshelfId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the bookshelf exists
    const bookshelf = await Bookshelf.findById(bookshelfId);
    if (!bookshelf) {
      return res.status(400).json({ message: "Bookshelf not found" });
    }

    // Create a new donated book
    const newDonatedBook = new DonatedBook({
      title,
      author,
      bookshelfId,
      userId,
      // Add other required fields here
    });

    // Save the new donated book
    await newDonatedBook.save();

    // Update the User's donatedBooks
    await User.findByIdAndUpdate(
      userId,
      { $push: { donatedBooks: newDonatedBook._id } },
      { new: true, runValidators: true }
    );

    // Update the Bookshelf's donatedBooks
    await Bookshelf.findByIdAndUpdate(
      bookshelfId,
      { $push: { donatedBooks: newDonatedBook._id } },
      { new: true, runValidators: true }
    );

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Donated book created successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return next(createError(500, "Server error! Please try again."));
  }
};

//==========================================================================
// Get all donated books
//==========================================================================

export const getDonatedBooks = async (req, res, next) => {
  try {
    // Retrieve all donated books and populate relevant fields
    const books = await DonatedBook.find()
      .populate({ path: "genre", select: "category" }) // Populate the genre field
      .populate({ path: "book", model: "Book" }) // Populate the 'book' reference
      .populate({ path: "borrowedFrom", model: "Bookshelf" }); // Populate the 'borrowedFrom' reference

    // Check if no books are found
    if (books.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No donated books found.",
        result: [],
      });
    }

    // Send successful response with books
    return res.status(200).json({
      success: true,
      result: books,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching donated books:", error);

    // Send error response
    return next(
      createError(500, "Internal Server Error. Please try again later.")
    );
  }
};

//==========================================================================
// Get single donated book
//==========================================================================
export const getDonatedBook = async (req, res, next) => {
  const donatedBookId = req.params.id;

  if (!donatedBookId || !mongoose.Types.ObjectId.isValid(donatedBookId)) {
    return next(createError(400, "Invalid donated book ID."));
  }

  try {
    const books = await DonatedBook.findById(donatedBookId);
    if (!books) {
      return next(createError(404, "Donated books not found."));
    }

    return res.status(200).json({
      success: true,
      result: books,
    });
  } catch (error) {
    console.error("Error fetching donated books:", error);
    return next(
      createError(500, "Internal Server Error. Please try again later.")
    );
  }
};
//==========================================================================
// Update a donated book
//==========================================================================

export const updateDonatedBook = async (req, res, next) => {
  const donatedBookId = req.params.id;
  const { bookshelfId, userId, ...updateData } = req.body;

  if (!donatedBookId || !mongoose.Types.ObjectId.isValid(donatedBookId)) {
    return next(createError(400, "Invalid donated book ID."));
  }

  // Validate and sanitize incoming data
  if (
    updateData.coverImageUrl !== undefined &&
    typeof updateData.coverImageUrl !== "string"
  ) {
    return next(createError(400, "Invalid coverImageUrl."));
  }

  try {
    // Fetch the existing book to ensure it exists
    const existingBook = await DonatedBook.findById(donatedBookId);
    if (!existingBook) {
      return next(createError(404, "Donated book not found."));
    }

    // Update the book with new data
    const updatedBook = await DonatedBook.findByIdAndUpdate(
      donatedBookId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return next(createError(404, "Donated book not updated."));
    }

    // Handle Bookshelf update if bookshelfId is provided
    if (bookshelfId && mongoose.Types.ObjectId.isValid(bookshelfId)) {
      // Add the book to the new bookshelf
      const newBookshelf = await Bookshelf.findByIdAndUpdate(
        bookshelfId,
        { $push: { donatedBooks: donatedBookId } },
        { new: true }
      );

      if (!newBookshelf) {
        return next(createError(400, "New bookshelf not found."));
      }
    }

    // Handle User update if userId is provided
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      // Add the book to the new user
      const newUser = await User.findByIdAndUpdate(
        userId,
        { $push: { donatedBooks: donatedBookId } },
        { new: true }
      );

      if (!newUser) {
        return next(createError(400, "New user not found."));
      }
    }

    return res.status(200).json({
      success: true,
      result: updatedBook,
      message: "Donated book successfully updated",
    });
  } catch (error) {
    console.error("Error updating donated book:", error);
    return next(
      createError(500, "Internal Server Error. Please try again later.")
    );
  }
};

//==========================================================================
// Delete a donated book
//==========================================================================
export const deleteBorrowedBook = async (req, res) => {
  const bookId = req.params.bookId;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid donated book ID" });
  }

  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: to delete donated book" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const book = await DonatedBook.findByIdAndDelete(bookId).session(session);

    if (!book) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Donated book not found" });
    }

    const user = await User.findOneAndUpdate(
      { "donatedBooks._id": bookId },
      { $pull: { donatedBooks: { _id: bookId } } },
      { new: true, session }
    );

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found" });
    }

    const bookshelf = await Bookshelf.findOneAndUpdate(
      { "donatedBooks._id": bookId },
      { $pull: { donatedBooks: { _id: bookId } } },
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
      .json({ success: true, message: "Donated book deleted successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({ message: "Internal server error" });
  }
};

//==========================================================================
// Get counts of donated books
//==========================================================================
export const countDonatedBooks = async (req, res, next) => {
  try {
    const counts = await DonatedBook.countDocuments();

    if (counts < 0) {
      return next(createError(500, "Invalid count of donated books."));
    }

    if (counts === 0) {
      return next(createError(500, "No donated books found."));
    }

    return res.status(200).json({
      success: true,
      result: counts,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
