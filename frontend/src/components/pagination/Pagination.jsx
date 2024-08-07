const Pagination = ({ loadMoreBookshelves, more }) => {
  return (
    <div className="flex justify-center py-4">
      {more ? (
        <button
          onClick={loadMoreBookshelves}
          className="bg-rose-600 text-white py-2 px-12 rounded hover:bg-cyan-700 transition-colors"
        >
          More Bookshelves
        </button>
      ) : (
        <p>No more bookshelves to load</p>
      )}
    </div>
  );
};

export default Pagination;
