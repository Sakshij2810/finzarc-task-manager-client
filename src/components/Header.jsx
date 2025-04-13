import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#151a22]/10 backdrop-blur-md border-b border-white/10 text-white px-6 py-4 flex justify-between items-center">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Task Manager
        </Link>
        <nav className="flex items-center justify-between gap-5">
          <p className="font-medium">Welcome, {user.username}</p>

          {user ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={onLogout}
                className="bg-[#55bfbf] text-black hover:bg-[#139796] px-4 py-2 rounded transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="hover:underline px-4 py-2 rounded transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded transition"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
