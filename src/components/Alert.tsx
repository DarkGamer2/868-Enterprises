import Logo from "/assets/images/Logo.jpg";
import { useTheme } from "../context/theme/ThemeContext";
const Alert:React.FC<{message:string;visible:boolean;onClose:()=>void}> = ({message,visible,onClose,}) => {
    const { theme } = useTheme();
    return(
        <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transform transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"} ${theme === "dark" ? "dark" : "light"}`}>
            <div className={`flex items-center bg-white dark:bg-black shadow-lg rounded-lg p-4 max-w-sm w-full mx-auto mt-6 border `}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <span>
                    <img src={Logo} alt="logo" className="w-8 h-8" />
                </span>
                </div>
                {/* Message */}
                <div className="ml-4">
                    <h3 className="text-lg font-bold text-black dark:text-white font-bebasNeue">MEWZALINE</h3>
                    <p className="text-gray-500 dark:text-white font-lato">{message}</p>
                </div>
                {/* Close Button */}
                <button onClick={onClose} className="ml-4 text-red-600 hover:text-red-700 focus:outline-none">
                &times;
                </button>
            </div> 
        </div>
    )
  
}

export default Alert