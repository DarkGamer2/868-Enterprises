import NavigationBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
    const navigate = useNavigate();
    const handleSubmit=(e:React.MouseEvent)=>{
        e.preventDefault();
        axios.post("http://localhost:4900")
        navigate("/");
    }
  return (
   <div>
    <NavigationBar/>
   <section>
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-300 rounded shadow-md">
        <h2 className="mb-4 text-3xl font-semibold text-center">Sign-In</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="email">
              Email or mobile phone number
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-bold text-center text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Sign-In
          </button>
        </form>
        <p className="mt-4 text-xs text-center text-gray-600">
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
        <div className="mt-4 text-center">
          <a href="#" className="text-xs text-blue-600 hover:underline">
            Need help?
          </a>
        </div>
        <div className="mt-4 text-center">
          <button onClick={handleSubmit} className="text-sm font-bold text-blue-600 hover:underline">
            Create your Amazon account
          </button>
        </div>
      </div>
    </div>
   </section>
   </div>
  )
}

export default Login