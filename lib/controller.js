import Interview from "../models/Interview";
import User from "../models/User";

function print({ startTime, endTime, candidate }) {
  console.log({
    candidate,
    startTime: new Date(startTime).toLocaleTimeString(),
    endTime: new Date(endTime).toLocaleTimeString(),
  });
}

export const addInterview = async (req, res) => {
  const { emails, startTime, endTime } = req.body;
  const allUsers = await User.find({ email: { $in: emails } }).populate(
    "interviews"
  );

  // check if any user does not exists
  let userSet = new Set();
  for (let user of allUsers) userSet.add(user.email);
  if(userSet.size !== emails.length) {
    return res.json({
      success: false,
      message: 'User does not exist'
    })
  }  

  let isClashing = false;

    for (let user of allUsers) {
      for(let interview of user.interviews) {
        if(!(interview.startTime > endTime || interview.endTime < startTime)) {
          isClashing = true;
          break
        }
      }
      if(isClashing) break;
    }

    if(isClashing) {
      return res.json({
        success: false,
        message: 'All candidates not available for the given slot.'
      })
    }

  const promises = allUsers.map((user) => {
    return new Promise(async (resolve) => {
      let newInt = await Interview.create({
        candidate: user.email,
        startTime,
        endTime,
      });
      user.interviews.push(newInt._id);
      await user.save();
      resolve(user);
    })
  });

  await Promise.all(promises);

  return res.json({
    success: true,
    message: "Interview scheduled"
  })
};

export const updateInterview = async (req, res) => {}

// export const updateInterview = async (req, res) => {
//   const { emails, startTime, endTime } = req.body;

//   const scheduledINterview = await Interview.find({
//     candiate: { $in: emails },
//     $or: [
//       {
//         $and: [
//           { end_time: { $gt: startTime } },
//           { end_time: { $lte: endTime } },
//         ],
//       },
//       {
//         $and: [
//           { start_time: { $gte: startTime } },
//           { start_time: { $lt: endTime } },
//         ],
//       },
//     ],
//   });

//   if (scheduledINterview.length == 0) {
//     const promises = emails.map((e) => {
//       console.log(e);
//       return Interview.findOneAndUpdate({
//         candidate: e,
//         startTime,
//         endTime,
//       });
//     });
//     await Promise.all(promises);

//     res.json({
//       success: true,
//       message: "Interview scheduled successfully",
//     });
//   } else {
//     return res.json({
//       success: false,
//       message: "Slot not available",
//     });
//   }
// };

export const getAllInterviews = async (req, res) => {
  const data = await Interview.find({
    completed: false,
  });

  res.status(200).json({
    success: true,
    data,
  });
};

export const getInterviewById = async(req, res) => {
  const int = await Interview.findById(req.body.id);
  return res.json({
    success: true,
    data: int
  });
}