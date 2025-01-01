import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { auth } from "../firebase";
import { useAuth } from "../AuthContext";

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth(auth); // This hook will return the current user if logged in

  const handleIconClick = () => {
    if (user) {
      navigate("/list"); // Navigate to /list if user is logged in
    } else {
      navigate("/login"); // Navigate to /login if not logged in
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">OnlineMyBusiness</h1>
      <FaUserCircle
        className="text-3xl text-gray-600 cursor-pointer"
        onClick={handleIconClick}
      />
    </header>
  );
}

export default Header;
