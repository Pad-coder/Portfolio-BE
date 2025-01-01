import { sendEmail } from "../nodeMailer/sendMail.js";
import { sendMessageToMe, sendMessageToVisitor } from "../HTML/message.js";
import "dotenv/config.js";

const sendMesssage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    await sendEmail(
      email,
      "Thank you for visit my Portfolio",
      sendMessageToVisitor(name)
    );

    await sendEmail(
      process.env.EMAIL,
      "NEW VISIT",
      sendMessageToMe(name, message)
    );

    res.status(200).json({ message: `message sent succefully` });
  } catch (error) {
    console.log("Error in send message controller", error.message);
    res.status(500).json({
      error: "Intrenal Server Error",
    });
  }
};

export default sendMesssage;
