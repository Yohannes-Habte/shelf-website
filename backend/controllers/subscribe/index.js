import createError from "http-errors";
import Subscriber from "../../models/subscribe/index.js";
import sendEmail from "../../utils/subscribe/index.js";

//===========================================================================================
// Create a a new subscriber
//===========================================================================================
export const createSubscriber = async (req, res, next) => {
  const { email } = req.body;

  try {
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return next(createError(400, "You have already subscribed"));
    }

    subscriber = new Subscriber({
      email,
    });

    await subscriber.save();
    res.status(201).json({ success: true, message: "Subscribed successfully" });
  } catch (err) {
    return next(createError(500, "Server error"));
  }
};

//===========================================================================================
// Create a function to fetch all subscribers and send them a notification email (auth admin)
//===========================================================================================
const notifySubscribers = async (subject, message) => {
  try {
    const subscribers = await Subscriber.find();

    subscribers.forEach((subscriber) => {
      if (subscriber.email) {
        sendEmail({
          email: subscriber.email,
          subject,
          message,
        });
      } else {
        console.error("Subscriber email is undefined:", subscriber);
      }
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};

export const sendNotifications = async (req, res) => {
  const { subject, text } = req.body;

  try {
    await notifySubscribers(subject, text);
    res.status(200).json({ message: "Notifications sent to all subscribers" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
