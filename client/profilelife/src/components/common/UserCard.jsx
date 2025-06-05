import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

export const UserProfiles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users/getUsers")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users", err));
  }, []);

  return (
    <div className="relative flex flex-col items-center mt-16 pt-24 min-h-screen bg-gradient-to-br from-gray-100 to-purple-100">
      <h1 className="text-4xl font-bold text-center text-gray-800 hover:text-purple-600 mb-10">
        Our User Profiles
      </h1>

      {Array.isArray(users) && users.length > 0 ? (
        users.slice().reverse().map((user, index) => (
          <div
            key={index}
            className="w-full max-w-4xl mt-10 bg-white h-70 z-10 sticky top-34 flex flex-col md:flex-row rounded-2xl shadow-lg overflow-hidden transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="w-full md:w-1/2 h-1/2 md:h-auto">
              {(user.photoUrl || user.photo) && (
                <img
                  src={user.photoUrl || `http://localhost:3000/uploads/${user.photo}`}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
              <h2 className="text-3xl font-semibold text-purple-700 mb-3">{user.title}</h2>
              <ul className="space-y-2 text-gray-700 text-lg">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">Name:</span> {user.firstName} {user.lastName}
                </li>

                {user.linkedin && (
                  <li className="flex items-center gap-2">
                    <FaLinkedin className="text-blue-700 w-5 h-5" />
                    <a
                      href={user.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 underline"
                    >
                      LinkedIn
                    </a>
                  </li>
                )}

                {user.twitter && (
                  <li className="flex items-center gap-2">
                    <FaTwitter className="text-sky-500 w-5 h-5" />
                    <a
                      href={user.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-500 underline"
                    >
                      Twitter
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-lg">No user profiles found.</p>
      )}
    </div>
  );
};
