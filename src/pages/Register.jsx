// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { register, reset } from "../features/auth/authSlice";
// import Spinner from "../components/Spinner";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const { username, email, password } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isError) {
//       // Handle error (already shown in the form)
//     }

//     if (isSuccess || user) {
//       navigate("/");
//     }

//     dispatch(reset());
//   }, [user, isError, isSuccess, message, navigate, dispatch]);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     dispatch(register({ username, email, password }));
//   };

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return (
//     <div className="min-h-screen bg-[#0a0f16] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Create a new account
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="relative bg-transparent border border-[#222426] py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <div>
//             <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent"></div>
//           </div>
//           <div className="bg-transparent border border-transparent py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             {isError && (
//               <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
//                 <p>{message}</p>
//               </div>
//             )}

//             <form className="space-y-6" onSubmit={onSubmit}>
//               <div>
//                 <label
//                   htmlFor="username"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Username
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="username"
//                     name="username"
//                     type="text"
//                     required
//                     value={username}
//                     onChange={onChange}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={email}
//                     onChange={onChange}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="current-password"
//                     required
//                     value={password}
//                     onChange={onChange}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#17b5b4] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Register
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">
//                     Already have an account?
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <a
//                   href="/login"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // Handle error (already shown in the form)
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-[#070f11] text-white">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Column - Contact Info */}
        <div className="relative z-100 w-full lg:w-1/2 bg-[#0d2526] p-12 text-white flex flex-col justify-center">
          <img
            className="absolute z-10 w-full h-full top-0 left-0"
            src="https://finzarc.com/team/Contact.jpg"
          />
          <div className="z-100 max-w-md mx-auto">
            <h2 className="z-100 text-4xl font-bold mb-6">
              Call us, beep us,
              <br />
              if you wanna
              <br />
              reach us!
            </h2>
            <p className="text-xl mb-8">sakshi2020jadhav@gmail.com</p>

            <div className="border-t border-white/20 pt-8">
              <h3 className="text-2xl font-semibold mb-4">Why join us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Manage all your tasks in one place
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Collaborate with your team
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Boost your productivity
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-white-900 mb-8">
              Create your account
            </h2>

            {isError && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                <p>{message}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                {/* <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white-700 mb-1"
                >
                  Username
                </label> */}
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={onChange}
                  className="w-full bg-[#15191b] px-4 py-3 border border-[#2b3133] rounded-lg "
                  placeholder="Enter your username"
                />
              </div>

              <div>
                {/* <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white-700 mb-1"
                >
                  Email address
                </label> */}
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={onChange}
                  className="w-full bg-[#15191b] px-4 py-3 border border-[#2b3133] rounded-lg "
                  placeholder="Enter your email"
                />
              </div>

              <div>
                {/* <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white-700 mb-1"
                >
                  Password
                </label> */}
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={onChange}
                  className="w-full bg-[#15191b] px-4 py-3 border border-[#2b3133] rounded-lg "
                  placeholder="Create a password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-[#17b5b4] cursor-pointer hover:bg-[#139796] text-black font-medium py-3 px-4 rounded-lg transition duration-200"
                >
                  Register
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#17b5b4]  hover:text-[#17b5b4] hover:text-bold font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
