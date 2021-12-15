import {
  getInterviewById
} from "../../lib/controller";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        await getInterviewById(req, res);
      } catch (error) {
        res.json({ success: false, error: error.message });
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
