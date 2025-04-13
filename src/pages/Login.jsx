import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message); // Show error toast
    }

    if (isSuccess || user) {
      navigate("/");
      toast.success("Logged in successfully!");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (error) {
      // console.log(error);
    }
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
            className="absolute z-10 w-full h-full top-0 left-0 object-cover"
            src="https://finzarc.com/team/Contact.jpg"
            alt="Contact background"
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
              <h3 className="text-2xl font-semibold mb-4">Why login?</h3>
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
                  Access your personalized dashboard
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
                  Manage your tasks efficiently
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
                  Stay organized and productive
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-8">Welcome back</h2>

            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={onChange}
                  className="w-full bg-[#15191b] px-4 py-3 border border-[#2b3133] rounded-lg"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={onChange}
                  className="w-full bg-[#15191b] px-4 py-3 border border-[#2b3133] rounded-lg"
                  placeholder="Enter your password"
                />
              </div>

              {isError && (
                <div className="text-red-400 text-sm">
                  {message.includes("credentials")
                    ? "Invalid email or password. Please try again."
                    : message}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full bg-[#17b5b4] cursor-pointer hover:bg-[#139796] text-black font-medium py-3 px-4 rounded-lg transition duration-200"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#17b5b4] hover:text-[#139796] font-medium"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
