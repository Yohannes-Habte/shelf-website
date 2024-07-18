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
    authors,
    publishedDate,
    genres,
    summary,
    pages,
    language,
    publisher,
    coverImageUrl,
    shelfId,
  } = req.body;

  if (
    !ISBN ||
    !title ||
    !authors ||
    !publishedDate ||
    !summary ||
    !language ||
    !publisher ||
    !coverImageUrl ||
    !shelfId
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  try {
    const book = await Book.findOne({ ISBN });

    if (book) {
      return next(createError(400, "Book already exist!"));
    }

    const newBook = new Book({
      ISBN,
      title,
      authors,
      publishedDate,
      genres,
      summary,
      pages,
      language,
      publisher,
      coverImageUrl,
    });

    const savedBook = await newBook.save();

    const bookshelf = await Bookshelf.findById(shelfId);
    if (!bookshelf) {
      return res.status(404).json({ message: "Bookshelf not found" });
    };

    bookshelf.books.push(savedBook._id);
    await bookshelf.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Book created and added to the bookshelf successfully",
      });
  } catch (error) {
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
