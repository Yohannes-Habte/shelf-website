import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../utils/security/secreteKey";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle input change
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/subscribers/new`, { email });
      if (response.status === 201) {
        toast.success(response.data.message);
        setEmail("");
      } else {
        toast.error("Subscription failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        toast.error(
          `Error: ${error.response.data.message || "Subscription failed"}`
        );
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Please try again later.");
      } else {
        // Something else happened in setting up the request
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-subscription">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="border-2 border-gray-200 rounded-l-lg py-2 px-2 text-gray-700 w-full focus:outline-none focus:border-cyan-500 bg-gray-50"
            aria-label="Email"
          />
          <button
            type="submit"
            className="bg-cyan-600 text-white py-2 rounded-r-lg hover:bg-cyan-700 transition-colors px-2 text-sm"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterSubscription;
