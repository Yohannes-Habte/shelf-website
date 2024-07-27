import Book from "../../models/book/index.js";
import createError from "http-errors";
import Bookshelf from "../../models/bookshelf/index.js";

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
    console.log("save book=", savedBook);

    const bookshelf = await Bookshelf.findById(shelfId);
    if (!bookshelf) {
      return res.status(404).json({ message: "Bookshelf not found" });
    }

    bookshelf.books.push(savedBook._id);
    await bookshelf.save();

    console.log("save bookshelf=", await bookshelf.save());

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
      filter.title = { $regex: title, $options: "i" }; // Case-insensitive regex search
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

    const books = await Book.find(filter);

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
      filters.push({ title: { $regex: title, $options: "i" } }); // Case-insensitive regex search
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
      books = await Book.find({ $or: filters });
    } else {
      books = await Book.find();
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

//==========================================================================
// Get single book
//==========================================================================
export const deleteBook = async (req, res, next) => {
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

//==========================================================================
// Count all books
//==========================================================================

export const countBooks = async (req, res, next) => {
  try {
    const count = await Book.countDocuments({});

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
