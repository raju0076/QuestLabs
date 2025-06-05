import React, { useState } from 'react';
import axios from 'axios';
import "../styles/form.css";
import { UserProfiles } from '../components/common/userCard';
import { Plus } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    photo: null,
    photoUrl: '',
    linkedin: '',
    twitter: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [showProfiles, setShowProfiles] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post("https://questlabs-3.onrender.com/users/addUsers", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("🎉 Profile added successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      setShowForm(false);
      setShowProfiles(true);
    } catch (error) {
      toast.error(`❌ ${error.response?.data?.message || "Something went wrong."}`, {
        position: "top-right",
        autoClose: 4000,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <ToastContainer />

      {!showForm && showProfiles && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              setShowForm(true);
              setShowProfiles(false);
            }}
            className="flex fixed items-center gap-2 px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-200 shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add New Profile
          </button>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-3">
            <button
              onClick={() => {
                setShowForm(false);
                setShowProfiles(true);
              }}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-purple-700 text-center">Add Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="firstName"
                required
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                name="lastName"
                required
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                name="title"
                required
                onChange={handleChange}
                placeholder="Title / Role"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="url"
                name="photoUrl"
                onChange={handleChange}
                placeholder="Photo URL"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="url"
                name="linkedin"
                onChange={handleChange}
                placeholder="LinkedIn (optional)"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="url"
                name="twitter"
                onChange={handleChange}
                placeholder="Twitter (optional)"
                className="w-full px-3 py-2 border rounded-md"
              />

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {showProfiles && <UserProfiles />}
    </div>
  );
};
