import {
  getAllInterviews,
  addInterview,
  updateInterview,
} from "../../lib/controller";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        await getAllInterviews(req, res);
      } catch (error) {
        res.json({ success: false, error: "eeeeeeerrrr" });
      }
      break;
    case "POST":
      try {
        await addInterview(req, res);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "PUT":
      try {
        await updateInterview(req, res);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: error.message });
      break;
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
