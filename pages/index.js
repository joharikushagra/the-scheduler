import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(async () => {
    const res = await fetch("/api");
    const result = await res.json();
    const data = result.data;
    setData(data);
    console.log(data);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-2 text-center">
        <h1 className="text-4xl mb-4 mt-6 font-bold">All Upcoming interviews</h1>
        <div className="py- w-36">
          <Link href="/create">
            <button
              className="
                  flex
                  mt-1
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
              <span className="mr-2 uppercase">Create</span>
            </button>
          </Link>
        </div>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.map((d) => (
              <section key={d._id}>
                <div className="relative items-center w-full px-5 py-1 mx-auto md:px-12 lg:px-12 max-w-7xl">
                  <div className="grid grid-cols-1">
                    <div className="w-full max-w-lg mx-auto my-4 bg-white shadow-xl rounded-xl">
                      <div className="p-6">
                        <div>
                          <div className="mt-3 text-left sm:mt-5">
                            <p className="mb-2 text-md font-semibold tracking-widest text-blue-600 uppercase">
                              Interview Date:{" "}
                              <span className="text-gray-500 font-normal ">{new Date(d.startTime).toLocaleDateString()}</span>
                            </p>
                            <p className="mb-2 text-xs font-semibold tracking-widest text-blue-600 uppercase">
                              Start Time:{" "}
                              <span className="text-gray-500 font-normal">{new Date(d.startTime).toLocaleTimeString()}</span>
                              </p>
                              <p className="mb-2 text-xs font-semibold tracking-widest text-blue-600 uppercase">
                              End Time:{" "}
                              <span className="text-gray-500 font-normal">{new Date(d.endTime).toLocaleTimeString()}</span>
                            </p>
                            <div className="mt-2">
                              <p className="text-md text-gray-600 font-semibold my-3">
                                Candidates
                              </p>
                              <ul className="list-none mb-4">
                                {d.users.map((u) => (
                                  <li className="font-semibold mb-2">
                                    {u.name} -{" "}
                                    <span className="text-gray-500 font-normal">
                                      {u.email}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <Link href={`/edit/${d._id}`}>
                        <button
                          className="items-centerblock px-10 py-4 text-base font-medium text-center text-white transition
                                  duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Update
                        </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
}
