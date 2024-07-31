import Bookshelf from "../../models/bookshelf/index.js";
import createError from "http-errors";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import Book from "../../models/book/index.js";
import BorrowedBook from "../../models/borrowedBook/index.js";
import DonatedBook from "../../models/donatedBook/index.js";

//==========================================================================
// Create a bookshelf
//==========================================================================

// export const createBookshelf = async (req, res, next) => {
//   const {
//     image,
//     name,
//     country,
//     state,
//     city,
//     zipCode,
//     street,
//     longitude,
//     latitude,
//     openingTime,
//     closingTime,
//   } = req.body;

//   try {
// Generate a unique barcode
//     const barcode = uuidv4();
/*
    Other methods to generate unique barcode:
    1. mongoose object id
        const barcode = new mongoose.Types.ObjectId().toString();
    2. nanoid
        npm install nanoid
        import { nanoid } from 'nanoid';
        const barcode = nanoid();

    3. Custom Barcode Generation
        const generateBarcode = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
        }
         const barcode = generateBarcode();
    */

//     // Check if the bookshelf already exists
//     const existingBookshelf = await Bookshelf.findOne({ barcode });

//     if (existingBookshelf) {
//       return next(createError(400, "Bookshelf already exists!"));
//     }

//     // Create a new bookshelf instance
//     const newBookshelf = new Bookshelf({
//       barcode,
//       image,
//       name,
//       country,
//       state,
//       city,
//       zipCode,
//       street,
//       longitude,
//       latitude,
//       openingTime,
//       closingTime,
//     });

//     // Save the new bookshelf to the database
//     await newBookshelf.save();

//     // Respond with success message
//     res.status(201).json({
//       success: true,
//       result: newBookshelf,
//       message: "Bookshelf successfully created!",
//     });
//   } catch (error) {
//     return next(createError(500, "Server error! Please try again!"));
//   }
// };

export const createBookshelf = async (req, res, next) => {
  const {
    image,
    name,
    country,
    state,
    city,
    zipCode,
    street,
    longitude,
    latitude,
    openingTime,
    closingTime,
  } = req.body;

  // Validate the required fields
  if (
    !image ||
    !name ||
    !country ||
    !state ||
    !city ||
    !zipCode ||
    !street ||
    !longitude ||
    !latitude ||
    !openingTime ||
    !closingTime
  ) {
    return next(createError(400, "All fields are required"));
  }

  try {
    // Generate a unique barcode
    const barcode = uuidv4();

    // Check if the bookshelf already exists
    const existingBookshelf = await Bookshelf.findOne({ barcode });
    if (existingBookshelf) {
      return next(
        createError(400, "Bookshelf with this barcode already exists!")
      );
    }

    // Create a new bookshelf instance
    const newBookshelf = new Bookshelf({
      barcode,
      image,
      name,
      country,
      state,
      city,
      zipCode,
      street,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      openingTime,
      closingTime,
    });

    // Save the new bookshelf to the database
    await newBookshelf.save();

    // Respond with success message
    res.status(201).json({
      success: true,
      result: newBookshelf,
      message: "Bookshelf successfully created!",
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};
//==========================================================================
// Update bookshelf
//==========================================================================
export const updateBookshelf = async (req, res, next) => {
  const { id } = req.params;
  const {
    image,
    name,
    country,
    state,
    city,
    zipCode,
    street,
    longitude,
    latitude,
    openingTime,
    closingTime,
  } = req.body;

  try {
    // Find and update the bookshelf by ID
    const updatedBookshelf = await Bookshelf.findByIdAndUpdate(
      id,
      {
        $set: {
          image,
          name,
          country,
          state,
          city,
          zipCode,
          street,
          longitude,
          latitude,
          openingTime,
          closingTime,
        },
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validators are run on the update
      }
    );

    if (!updatedBookshelf) {
      return next(createError(404, "Bookshelf not found!"));
    }

    // Respond with success message and updated document
    res.status(200).json({
      success: true,
      message: "Bookshelf successfully updated!",
      data: updatedBookshelf,
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get all bookshelves
//==========================================================================
export const getBookshelves = async (req, res, next) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      // If search parameter is provided, construct the query with $or conditions
      query = {
        $or: [
          { name: new RegExp(search, "i") },
          { country: new RegExp(search, "i") },
          { state: new RegExp(search, "i") },
          { city: new RegExp(search, "i") },
        ],
      };
    }

    // Find bookshelves based on the constructed query or return all if no query
    const bookshelves = await Bookshelf.find(query);

    if (!bookshelves || bookshelves.length === 0) {
      return next(createError(400, "Bookshelves not found!"));
    }

    return res.status(200).json({
      success: true,
      result: bookshelves,
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get single bookshelf
//==========================================================================
export const getBookshelf = async (req, res, next) => {
  const bookshelfId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(bookshelfId)) {
    return next(createError(400, "Invalid bookshelf ID"));
  }

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

//==========================================================================
// Get single bookshelf
//==========================================================================

export const deleteBookshelf = async (req, res, next) => {
  const { id: bookshelfId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookshelfId)) {
    return next(createError(400, "Invalid bookshelf ID"));
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bookshelf = await Bookshelf.findById(bookshelfId).session(session);

    if (!bookshelf) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(404, "Bookshelf not found"));
    }

    // Remove the bookshelf's reference from related collections
    await Book.updateMany(
      { _id: { $in: bookshelf.books } },
      { $pull: { bookshelves: bookshelfId } },
      { session }
    );

    await BorrowedBook.updateMany(
      { borrowedFrom: bookshelfId },
      { $unset: { borrowedFrom: "" } },
      { session }
    );

    await DonatedBook.updateMany(
      { donatedTo: bookshelfId },
      { $unset: { donatedTo: "" } },
      { session }
    );

    // Delete the bookshelf
    await Bookshelf.findByIdAndDelete(bookshelfId).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Bookshelf has been successfully deleted",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error deleting bookshelf:", error);
    return next(createError(500, "Internal server error"));
  }
};

//==========================================================================
// Get single bookshelf books
//==========================================================================
export const getAllBooksInBookshelf = async (req, res, next) => {
  const bookshelfId = req.params.id;

  try {
    // Find the bookshelf by its ID and populate the books, donatedBooks, and borrowedBooks fields
    // const bookshelf = await Bookshelf.findById(bookshelfId)
    //   .populate({ path: 'books', select: 'title' })
    //   .populate({ path: 'donatedBooks', select: 'title' })
    //   .populate({ path: 'borrowedBooks', select: 'title' });

    /*
    
    To populate all the attributes of the Book schema in the getAllBooksInBookshelf function, you need to update the populate method calls to not limit the fields being selected. Instead, you will populate the full Book documents.
    
    */

    // Find the bookshelf by its ID and populate the books, donatedBooks, and borrowedBooks fields
    const bookshelf = await Bookshelf.findById(bookshelfId)
      .populate({ path: "books", model: "Book" })
      .populate({ path: "donatedBooks", model: "Book" })
      .populate({ path: "borrowedBooks", model: "Book" });

    if (!bookshelf) {
      return next(createError(400, "Bookshelf not found!"));
    }

    // Extract the books, donatedBooks, and borrowedBooks from the bookshelf document
    const { books, donatedBooks, borrowedBooks } = bookshelf;

    res.status(200).json({
      success: true,
      books,
      donatedBooks,
      borrowedBooks,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get all books from all bookshelves
//==========================================================================
export const getAllBooksFromAllBookshelves = async (req, res, next) => {
  try {
    const bookshelves = await Bookshelf.find()
      .populate("books._id", "title author")
      .populate("donatedBooks._id", "title author")
      .populate("borrowedBooks._id", "title author");

    // Initialize an object to hold all the books
    const allBooks = {
      books: [],
      donatedBooks: [],
      borrowedBooks: [],
    };

    // Loop through each bookshelf and accumulate the books
    bookshelves.forEach((bookshelf) => {
      allBooks.books = allBooks.books.concat(bookshelf.books);
      allBooks.donatedBooks = allBooks.donatedBooks.concat(
        bookshelf.donatedBooks
      );
      allBooks.borrowedBooks = allBooks.borrowedBooks.concat(
        bookshelf.borrowedBooks
      );
    });

    // Return the combined books data
    res.status(200).json({ success: true, result: allBooks });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Total Number of books in bookshelf
//==========================================================================
export const countTotalBooksInBookshelf = async () => {
  try {
    const result = await Bookshelf.aggregate([
      {
        $project: {
          totalBooks: {
            $add: [
              { $size: "$books" },
              { $size: "$donatedBooks" },
              { $size: "$borrowedBooks" },
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalBooksInAllShelf: { $sum: "$totalBooks" },
        },
      },
    ]);

    const totalBooks = result.length > 0 ? result[0].totalBooksInAllShelf : 0;

    res.status(200).json({
      success: true,
      result: totalBooks,
    });
  } catch (error) {
    next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Total Number of available books in a bookshelf without borrowed books
//==========================================================================
export const calculateTotalAvailableBooks = async () => {
  try {
    const result = await Bookshelf.aggregate([
      {
        $project: {
          totalBooks: {
            $subtract: [
              { $add: [{ $size: "$books" }, { $size: "$donatedBooks" }] },
              { $size: "$borrowedBooks" },
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          bookshelfAvailableBooks: { $sum: "$totalBooks" },
        },
      },
    ]);

    const totalAvailableBooks =
      result.length > 0 ? result[0].bookshelfAvailableBooks : 0;

    res.status(200).json({
      success: true,
      result: totalAvailableBooks,
    });
  } catch (error) {
    next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Total Number of  books in all bookshelves
//==========================================================================
export const countAllBooksFromAllBookshelves = async (req, res, next) => {
  try {
    // Find all bookshelves
    const bookshelves = await Bookshelf.find();

    // Initialize counters for books, donatedBooks, and borrowedBooks
    let bookCount = 0;
    let donatedBookCount = 0;
    let borrowedBookCount = 0;

    // Loop through each bookshelf and accumulate the counts
    bookshelves.forEach((bookshelf) => {
      bookCount += bookshelf.books.length;
      donatedBookCount += bookshelf.donatedBooks.length;
      borrowedBookCount += bookshelf.borrowedBooks.length;
    });

    // Return the counts
    res.status(200).json({
      success: true,
      bookCount,
      donatedBookCount,
      borrowedBookCount,
    });
  } catch (error) {
    next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Total Number of  borrowed books in all bookshelves
//==========================================================================

export const countShelvesBorrowedBooks = async (req, res, next) => {
  try {
    const bookshelves = await Bookshelf.find();

    const borrowedBookCount = bookshelves.reduce(
      (acc, bookshelf) => acc + bookshelf.borrowedBooks.length,
      0
    );

    res.status(200).json({
      success: true,
      result: borrowedBookCount,
    });
  } catch (error) {
    next(createError(400, "Server error! Please try again!"));
  }
};
