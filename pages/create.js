import React, { useState } from "react";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const users = [
  { email: 'kushagra@gmail.com', name: 'Kushagra Johari'},
  { email: 'john@gmail.com', name: 'John Cena'},
  { email: 'praveen@gmail.com', name: 'Praveen'},
  { email: 'deepak@gmail.com', name: 'Deepak'},
  { email: 'johndoe@gmail.com', name: 'John Doe'},
]

function Create() {
  const [emails, setEmails] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleEmailsChange = (e) => {
    setEmails((prevEmails) => {
      return e.target.value.split(",").map((email) => email.trim());
    });
  };

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

    setIsDisabled(true);

    setErrors([]);

    // Sanity checks
    if (emails.length < 2) {
      setErrors((prevErrors) => [
        ...prevErrors,
        `You must provide atleast 2 candidate emails.`,
      ]);
      setIsDisabled(false);
      return;
    }

    for (let email of emails) {
      if (!validateEmail(email)) {
        setErrors((prevErrors) => [
          ...prevErrors,
          `${email} is not a valid email`,
        ]);
        setIsDisabled(false);
        return;
      }
    }
    if (endTime - startTime <= 0) {
      setErrors((prevErrors) => [
        ...prevErrors,
        `End Time must be greater than start time.`,
      ]);
      setIsDisabled(false);
      return;
    }

    // Request to backend APIs
    const body = {
      emails,
      startTime,
      endTime,
    };

    try {
      const data = await fetch("/api", {
        method: "POST",
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
    <div className="flex flex-col justify-center w-screen items-center px-2">
      <form onSubmit={handleSubmit}>
        <div className="py-12 w-96">
          <h2 className="text-2xl font-bold">Create Interview</h2>
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
                <span className="text-gray-500">Email address</span>
                <input
                  type="text"
                  onChange={handleEmailsChange}
                  className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                  placeholder="Comma seperated emails"
                  required
                />
              </label>
              {emails.length !== 0 && (
                <p className="my-1">
                  {emails.map((e) => (
                    <span className="bg-blue-400 mr-1 p-1 mt-1">{e}</span>
                  ))}
                </p>
              )}
              <label className="block">
                <span className="text-gray-700">Start time</span>
                <input
                  type="datetime-local"
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
            disabled={isDisabled}
            className={`
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
                  ${isDisabled ? 'opacity-50' : 'opacity-100'}
                `}
          >
            <span className="mr-2 uppercase">Create</span>
          </button>
        </div>
      </form>
      <div className="bg-white shadow-xl rounded-xl p-4">
        <p className="font-bold text-xl text-red-500 mb-3 ">Please use following emails while creating interviews.</p>
      <ul className="list-none mb-4">
        {users.map((u, idx) => (
          <li className="font-semibold mb-2" key={idx}>
            {u.name} -{" "}
            <span className="text-gray-500 font-normal">{u.email}</span>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Create;
