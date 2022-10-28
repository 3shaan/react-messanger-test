import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../FireBase/FireBase.config";

const Register = () => {
  const navigate = useNavigate();
  


  const formData =  (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          name,
          email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
        });
        navigate('/')
      })
      .catch((error) => console.log(error));

    console.log(name, email, password);
  };

  return (
    <div>
      <div className="w-full mx-auto mt-10 bg-base-200 max-w-md p-8 space-y-3 rounded-xl">
        <h1 className="text-2xl font-bold text-center">sign Up </h1>
        <form
          onSubmit={(e) => formData(e)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block dark:text-gray-400">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="w-full px-4 py-3 rounded-md dark:border-gray-700  focus:dark:border-violet-400 text-black"
              required
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block dark:text-gray-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" Email"
              className="w-full px-4 py-3 rounded-md dark:border-gray-700  text-black focus:dark:border-violet-400"
              required
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block dark:text-gray-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md dark:border-gray-700 text-black focus:dark:border-violet-400"
              required
            />
          </div>
          <button className="block w-full p-3 text-center bg-primary rounded-lg font-semibold text-xl btn hover:bg-purple-800 duration-500">
            Sign Up
          </button>
        </form>
        <div className="flex justify-center space-x-4">
          <button className=" w-full p-3 text-center bg-secondary rounded-lg flex items-center justify-center gap-5 font-semibold btn hover:bg-rose-700">
            <span className="text-xl">
              <FaGoogle></FaGoogle>
            </span>
            Sign Up With Google
          </button>
        </div>
        <p className="text-xs text-center sm:px-6 dark:text-gray-400">
          Already have an account?
          <Link
            rel="noopener noreferrer"
            to={"/login"}
            className="underline dark:text-gray-100"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
