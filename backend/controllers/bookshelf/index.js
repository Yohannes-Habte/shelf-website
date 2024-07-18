import Bookshelf from "../../models/bookshelf/index.js";
import createError from "http-errors";

//==========================================================================
// Create a bookshelf
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

//==========================================================================
// Get single bookshelf books
//==========================================================================
export const getAllBooksInBookshelf = async (req, res, next) => {
  const { bookshelfId } = req.params;

  try {
    // Find the bookshelf by its ID and populate the books, donatedBooks, and borrowedBooks fields
    const bookshelf = await Bookshelf.findById(bookshelfId)
      .populate("books._id", "title author") // Adjust the fields as necessary
      .populate("donatedBooks._id", "title author")
      .populate("borrowedBooks._id", "title author");

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
    console.log(`Total number of books: ${totalBooks}`);

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
    console.log(`Total number of available books: ${totalAvailableBooks}`);

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
