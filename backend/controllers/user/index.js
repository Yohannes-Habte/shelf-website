import createError from "http-errors";
import User from "../../models/user/index.js";
import mongoose from "mongoose";

//====================================================================
// Get all users
//====================================================================
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users.length) {
      return next(createError(404, "No users found!"));
    }

    return res.status(200).json({
      success: true,
      result: users,
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};

//====================================================================
// Get members by search
//====================================================================

export const getMembersBySearch = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const limit = parseInt(req.query.limit, 10) || 20;
    //http://bookshelf.com/api/v1/users?search=habte&limit=10

    const query = {
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ],
    };

    /**
     *The lean():
     is method in Mongoose is used to retrieve plain JavaScript objects from a query instead of Mongoose documents. When you use lean(), Mongoose skips the conversion of documents into Mongoose objects, making the query faster and more lightweight. This can be especially useful when you don't need the additional methods and properties that come with Mongoose documents.
     */

    const users = await User.find(query)
      .limit(limit)
      .select("firstName lastName")
      .lean();

    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }

    return res.status(200).json({ success: true, result: users });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};

//====================================================================
// Get single user
//====================================================================
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      result: user,
    });
  } catch (err) {
    next(createError(500, "Server error"));
  }
};

export const getUser = async (req, res, next) => {
  const userId = req.params.id;

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "User not found! Please login!"));
    }

    return res.status(200).json({
      success: true,
      result: user,
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};

//====================================================================
// Update user address
//====================================================================
export const updateUserAddress = async (req, res, next) => {
  const { username, email, ...updateUserAddress } = req.body;

  try {
    const user = await User.findOne({ username, email });

    if (!user) {
      return next(createError(404, "User not found! Please login!"));
    }

    Object.assign(user, updateUserAddress);

    try {
      await user.save();
    } catch (error) {
      return next(createError(500, "Address update could not be saved!"));
    }

    return res.status(200).json({
      success: true,
      result: user,
      message: "Update is successful!",
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};

//====================================================================
// Delete single user
//====================================================================
export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  // Authorization check
  if (req.user.role !== "generalManager") {
    return res.status(403).json({ message: "Forbidden: Unauthorized action" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "User not found! Please login!"));
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Successfully deleted",
      result: user,
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};

//====================================================================
// Total users count
//====================================================================
export const getTotalUsersCount = async (req, res, next) => {
  try {
    const totalCount = await User.countDocuments();

    return res.status(200).json({
      success: true,
      result: totalCount,
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};

//====================================================================
// Total user donated books
//====================================================================

export const getUserDonatedBooks = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(createError(400, "Invalid user ID format."));
    }

    const user = await User.findById(userId).populate({
      path: "donatedBooks",
      model: "DonatedBook",
      select: "-__v",
      populate: {
        path: "genre",
        model: "Genre",
        select: "category",
      },
    });

    if (!user) {
      return next(createError(404, "User not found."));
    }

    if (!user.donatedBooks || user.donatedBooks.length === 0) {
      return next(createError(404, "No donated books found."));
    }

    return res.status(200).json({
      success: true,
      result: user.donatedBooks,
    });
  } catch (error) {
    return next(
      createError(500, "Internal Server Error. Please try again later.")
    );
  }
};

//====================================================================
// Total user donated books
//====================================================================

export const getUserBorrowedBooks = async (req, res, next) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(createError(400, "Invalid user ID format."));
    }

    const user = await User.findById(userId).populate({
      path: "borrowedBooks",
      populate: [
        {
          path: "book",
          model: "Book",
          populate: {
            path: "genre",
            model: "Genre",
            select: "category",
          },
          select: "-__v",
        },
      ],
    });

    if (!user) {
      return next(createError(404, "User not found."));
    }

    if (!user.borrowedBooks || user.borrowedBooks.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No borrowed books found.",
        result: [],
      });
    }

    // Format the response
    const formattedBorrowedBooks = user.borrowedBooks.map((borrowedBook) => ({
      book: {
        title: borrowedBook.book.title,
        genre: borrowedBook.book.genre
          ? borrowedBook.book.genre.category
          : "Unknown",
        language: borrowedBook.book.language,
        publishedDate: borrowedBook.book.publishedDate,
        publisher: borrowedBook.book.publisher,
        coverImageUrl: borrowedBook.book.coverImageUrl,
        summary: borrowedBook.book.summary,
        ISBN: borrowedBook.book.ISBN,
        audio: borrowedBook.book.audio,
        authors: borrowedBook.book.authors.map((author) => ({
          firstName: author.firstName,
          lastName: author.lastName,
          birthDate: author.birthDate,
          deathDate: author.deathDate,
        })),
        borrowedTimes: borrowedBook.book.borrowedTimes,
        status: borrowedBook.book.status,
        ratings: borrowedBook.book.ratings,
        reviews: borrowedBook.book.reviews,
      },
      borrowedDate: borrowedBook.borrowedDate,
      returnDate: borrowedBook.returnDate,
    }));

    return res.status(200).json({
      success: true,
      result: formattedBorrowedBooks,
    });
  } catch (error) {
    return next(
      createError(500, "Internal Server Error. Please try again later.")
    );
  }
};
