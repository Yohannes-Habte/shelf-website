import { useContext, useEffect, useState } from "react";
import { IoMdBook } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import MapSettings from "../mapSettings/MapSettings";
// import Search from "../search/Search";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import { UserLocationContext } from "../../../context/userLocation/UserLocationProvider";
import LikeComponent from "../../LikeComponent/LikeComponent";
import { Link } from "react-router-dom";

const Bookshelves = () => {
  // Global state variables
  const { userLocation } = useContext(UserLocationContext);
  // Local state variables
  const [showMore, setShowMore] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const [bookshelves, setBookshelves] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch all bookshelves
    const fetchBookshelves = async () => {
      try {
        const response = await axios.get(`${API}/bookshelves`);
        setBookshelves(response.data.result);
      } catch (error) {
        toast.error("Error fetching bookshelves");
      }
    };
    fetchBookshelves();
  }, []);

  useEffect(() => {
    // Fetch all bookshelves
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API}/books`);
        setBooks(response.data.result);
      } catch (error) {
        toast.error("Error fetching bookshelves");
      }
    };
    fetchBooks();
  }, []);

  // const filteredBookshelves = bookshelves.filter((shelf) =>
  //   shelf.address.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const displayedBookshelves = showMore
  //   ? filteredBookshelves
  //   : filteredBookshelves.slice(0, 3);

  return (
    <div className="flex gap-2 ">
      {/* <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCenter={setCenter}
      /> */}
      <div className="flex flex-col md:w-5/12">
        {bookshelves &&
          bookshelves.length > 0 &&
          bookshelves.map((shelf) => (
            <div
              key={shelf._id}
              className="mb-3 border border-gray-300 rounded-lg bg-gray-50 hover:shadow-md cursor-pointer"
            >
              <div className="flex gap-1">
                <div className="">
                  <img
                    src={shelf.image}
                    alt="Name"
                    className="w-36 rounded-l-lg"
                  />
                </div>
                <div className=" pt-2 px-2 w-full flex flex-col justify-between ">
                  <div className=" flex justify-between">
                    <div>
                      <h4 className="text-lg font-bold">{shelf?.name}</h4>
                      <p className="text-gray-700">{shelf?.street}</p>
                    </div>
                    <div>
                      <LikeComponent />
                    </div>
                  </div>
                  <div className="pb-2 flex justify-between">
                    <div className="px-2 py-1 hover:bg-gray-200 rounded flex items-center gap-1 text-sm">
                      <IoMdBook />{" "}
                      <Link to={`/bookshelves/${shelf._id}/books`}>
                        {" "}
                        {books.length}{" "}
                      </Link>{" "}
                    </div>
                    <div className="px-2 py-1 hover:bg-gray-200 rounded flex items-center gap-1 text-sm">
                      <FaRegClock /> <span>24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {bookshelves.length > 3 && (
          <button
            className="mt-3 py-3 px-6 bg-gray-600 text-white  hover:bg-cyan-400 rounded-full text-sm text-center w-4/12 mx-auto"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "More"}
          </button>
        )}
      </div>

      <div className="md:w-7/12">
        <MapSettings bookshelves={bookshelves} userLocation={userLocation} />
      </div>
    </div>
  );
};

export default Bookshelves;
