import Interview from "../models/Interview";
import User from "../models/User";

/* DEBUGGING FUNCTION
function print({ startTime, endTime, candidate }) {
  console.log({
    startTime: new Date(startTime).toLocaleTimeString(),
    endTime: new Date(endTime).toLocaleTimeString(),
  });
}
*/

// controller for update interview
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
  let intTime = new Date(startTime);
  let currTime = new Date();

  // TIME CHECKER
  if(intTime.getDay() - currTime.getDay() < 1) { // check for same day
    if(intTime.getHours() - currTime.getHours()  < 2) { // check for atleast 2 hours difference
      return res.json({
        success: false,
        message: "Select time after two hours from now"
      })
    }
  }

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

    let newInt = await Interview.create({
      startTime,
      endTime,
      users: [...allUsers.map(u => u._id)]
    });

  const promises = allUsers.map((user) => {
    return new Promise(async (resolve) => {
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

// controller for update interview
export const updateInterview = async (req, res) => {
  const { endTime, startTime } = req.body
  const interview = await Interview.findById(req.body.id).populate({
    path: 'users',
    populate: [{ path: 'interviews'}]
  });
  
  const allUsers = interview.users;
  let isClashing = false;

  for (let user of allUsers) {
    for(let int of user.interviews) {
      if(int._id.equals(interview._id)) continue;

      if(!(int.startTime > endTime || int.endTime < startTime)) {
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

  interview.startTime = startTime;
  interview.endTime = endTime;
  await interview.save();

  return res.json({
    success: true,
    message: "Interview schedule updated"
  })
}

// controller for listing all interviews upcoming
export const getAllInterviews = async (req, res) => {
  const data = await Interview.find({completed:false
  }).populate('users');

  res.status(200).json({
    success: true,
    data,
  });
};


// controller for fetching interview by id
export const getInterviewById = async(req, res) => {
  req.body = JSON.parse(req.body)
  const int = await Interview.findById(req.body.id).populate('users');
  return res.json({
    success: true,
    data: int
  });
}