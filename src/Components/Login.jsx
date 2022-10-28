import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from "../FireBase/FireBase.config";

const Login = () => {
  const navigate = useNavigate();

  const loginData = async (e) => {
    e.preventDefault();
    const form = e.target 
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await updateDoc(doc(db, "users", result.user.uid), {
          isOnline: true,
        });
        navigate("/");
      } catch (error) {
        console.log(error)
      }


     console.log( email, password);
  }




    return (
      <div>
        <div className="w-full mx-auto mt-10 bg-base-200 max-w-md p-8 space-y-3 rounded-xl">
          <h1 className="text-2xl font-bold text-center">Login </h1>
          <form 
            onSubmit={loginData}
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-1 text-sm">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-md dark:border-gray-700  focus:dark:border-violet-400 text-black"
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
                className="w-full px-4 py-3 rounded-md   focus:border-blue-900 text-black"
                required
              />
              <div className="flex justify-end text-xs dark:text-gray-400">
                <a rel="noopener noreferrer" href="#">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button className="block w-full p-3 text-center bg-primary rounded-lg font-semibold text-xl">
              Sign In
            </button>
          </form>
          <div className="flex justify-center space-x-4">
            <button className=" w-full p-3 text-center bg-secondary rounded-lg flex items-center justify-center gap-5 font-semibold">
              <span className='text-xl'>
                <FaGoogle></FaGoogle>
              </span>
              Log In With Google
            </button>
          </div>
          <p className="text-xs text-center sm:px-6 dark:text-gray-400">
            Don't have an account?
            <Link
              rel="noopener noreferrer"
              to={'/signup'}
              className="underline dark:text-gray-100"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
};

export default Login;