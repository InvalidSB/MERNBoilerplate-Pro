import React from "react";
import { Link } from "react-router-dom";
import { signout, isAuth } from "./helpers/auth";
import { ToastContainer, toast } from "react-toastify";

const app = ({ history }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-20 bg-dark shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-8/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-3xl xl:text-3xl font-extrabold  text-center ">
            MERN boilerplate
            </h1>
            <h1 className="text-2xl xl:text-2xl font-extrabold  text-center ">
              Authentication with Email & Google ,
              email verification & Forget password
            </h1>
            <div className="w-full flex-1 mt-8 text-indigo-500">
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Features
                </div>
              </div>
              <div className="mx-auto max-w-xs relative ">
                {!isAuth() ? (
                  <Link
                    to="/login"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <i className="fas fa-sign-in-alt  w-6  -ml-2" />
                    <span className="ml-3">Sign In</span>
                  </Link>
                ) : null}

                <Link
                  to="/register"
                  className="mt-5 tracking-wide font-semibold bg-gray-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <i className="fas fa-user-plus  w-6  -ml-2" />
                  <span className="ml-3">Create Another Account</span>
                </Link>
                {/* {isAuth() && isAuth().role === 'private' ? (
                  <Link
                    to="/inner"
                    className="mt-5 tracking-wide font-semibold bg-orange-500 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <i className="fas fa-sign-in-alt  w-6  -ml-2" />
                    <span className="ml-3">Home</span>
                  </Link>
                ) : null} */}
                {isAuth() && isAuth().role === 'admin' ? (
                  <Link
                    to="/admin"
                    className="mt-5 tracking-wide font-semibold bg-green-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <i className="fas fa-sign-in-alt  w-6  -ml-2" />
                    <span className="ml-3">Admin Dashbaord</span>
                  </Link>
                ) : null}
                 {isAuth() ? (
                  <Link
                    to="/inner"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <i className="fas fa-sign-in-alt  w-4  -ml-2" />
                    <span className="ml-3">Home</span>
                  </Link>
                ) : null}
                
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default app;
