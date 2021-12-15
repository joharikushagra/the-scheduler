import React, { useState } from "react";

function Update(props) {
  const data = props.interview.data || {
    startTime: "",
    endTime: "",
    users: [],
  };

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [errors, setErrors] = useState([]);

  const handleStartTimeChange = (e) => {
    const dt = new Date(e.target.value);
    setStartTime(dt.valueOf());
  };

  const handleEndTimeChange = (e) => {
    const dt = new Date(e.target.value);
    setEndTime(dt.valueOf());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    if (endTime - startTime <= 0) {
      setErrors((prevErrors) => [
        ...prevErrors,
        `End Time must be greater than start time.`,
      ]);
      return;
    }

    // Request to backend APIs
    const body = {
      startTime,
      endTime,
      id: data._id,
    };

    try {
      const data = await fetch("/api", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const json = await data.json();

      if (json.success) alert(json.message);
      else alert(json.message);
      window.history.back();
    } catch (error) {
      alert(error.message);
      window.history.back();
    }
  };

  return (
    <div className="flex flex-col justify-center w-screen items-center">
      <form onSubmit={handleSubmit}>
        <div className="py-12 w-96">
          <h2 className="text-2xl font-bold">
            Update interview schedule for{" "}
            {data.users.map((user) => (
              <span key={user._id}>{user.name} , </span>
            ))}
          </h2>
          <div className="mt-8">
            {errors.length !== 0 && (
              <ul className="list-disc">
                {errors.map((e) => (
                  <li className="text-semibold text-red-500">{e}</li>
                ))}
              </ul>
            )}
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-700">Start time</span>
                <input
                  type="datetime-local"
                  required="true"
                  onChange={handleStartTimeChange}
                  className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                />
              </label>
              <label className="block">
                <span className="text-gray-700">End time</span>
                <input
                  type="datetime-local"
                  required="true"
                  onChange={handleEndTimeChange}
                  className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="
                  flex
                  mt-6
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
          >
            <span className="mr-2 uppercase">Update</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Update;

export async function getServerSideProps({ params }) {
  const host =
    process.env.NODE_ENV == "production"
      ? process.env.HOST
      : "http://localhost:3000";
  const res = await fetch(host + "/api/interview", {
    method: "POST",
    body: JSON.stringify(params),
  });
  const interview = await res.json();

  return {
    props: {
      interview,
    },
  };
}
