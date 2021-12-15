import Interview from "../models/Interview";
import User from "../models/User";

export const addInterview = async (req, res) => {
  const { emails, startTime, endTime } = req.body;
  //   emails.forEach(async (e) => {
  //     const user = await User.find({ email: e });
  //     if (!user) {
  //       errors.push(`${e} does not exist`);
  //     }
  //   });

  // check for errors

  const scheduledINterview = await Interview.find({
    // candiate: { $in: emails },
    $or: [
      {
        $and: [
          { end_time: { $gte: startTime } },
          { end_time: { $gt: endTime } },
        ],
      },
      {
        $and: [
          { start_time: { $lt: startTime } },
          { start_time: { $lte: endTime } },
        ],
      },
    ],
  });

  console.log(scheduledINterview);

  if (scheduledINterview.length == 0) {
    const promises = emails.map((e) => {
      console.log(e);
      return Interview.create({
        candidate: e,
        startTime,
        endTime,
      });
    });
    await Promise.all(promises);

    res.json({
      success: true,
      message: "Interview scheduled successfully",
    });
  } else {
    return res.json({
      success: false,
      message: "Slot not available",
    });
  }
};

export const updateInterview = async (req, res) => {
  const { emails, startTime, endTime } = req.body;

  const scheduledINterview = await Interview.find({
    candiate: { $in: emails },
    $or: [
      {
        $and: [
          { end_time: { $gt: startTime } },
          { end_time: { $lte: endTime } },
        ],
      },
      {
        $and: [
          { start_time: { $gte: startTime } },
          { start_time: { $lt: endTime } },
        ],
      },
    ],
  });

  if (scheduledINterview.length == 0) {
    const promises = emails.map((e) => {
      console.log(e);
      return Interview.findOneAndUpdate({
        candidate: e,
        startTime,
        endTime,
      });
    });
    await Promise.all(promises);

    res.json({
      success: true,
      message: "Interview scheduled successfully",
    });
  } else {
    return res.json({
      success: false,
      message: "Slot not available",
    });
  }
};

export const getAllInterviews = async (req, res) => {
  const data = await Interview.find({
    completed: false,
  });

  res.status(200).json({
    success: true,
    data,
  });
};
