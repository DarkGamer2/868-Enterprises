import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-blue-800 p-4 mt-auto">
      {" "}
      {/* Added mt-auto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h1 className="text-center font-inter text-white text-xl">
            Location
          </h1>
          <p className="text-white text-center font-lato">
            #2 California Street, Chaguanas
          </p>
        </div>
        <div>
          <h1 className="text-center text-white font-inter text-xl">
            Partners
          </h1>
          <p className="text-white text-center font-lato">Sacha Cosmetics</p>
          <p className="text-white text-center font-lato">Carnival Kingdom</p>
          <p className="text-white text-center font-lato">
            868 Modeling Division
          </p>
        </div>
        <div>
          <h1 className="text-center text-white font-inter text-xl">
            Contact Information
          </h1>
          <p className="text-white text-center font-lato">
            Email: Mewzaline.est92@gmail.com
          </p>
          <p className="text-white text-center font-lato">
            Phone: +1 (868)  463-6023
          </p>
          <div className="flex justify-center mt-2">
            <Link to="https://www.instagram.com/mewzaline.est.92?igsh=MWd3emNiZ2d5cTMx"><InstagramIcon className="text-pink-500 mx-2" /></Link>
            <WhatsAppIcon className="text-green-500 mx-2" />
           <Link to="https://www.facebook.com/share/1HAHtTP4Ee/"> <FacebookIcon className="text-blue-500 mx-2" />  </Link>
            <XIcon className="text-black mx-2" />
          </div>
        </div>
        <div>
          <h1 className="text-center text-white font-inter text-xl">
            Developer Information
          </h1>
          <p className="text-white text-center font-lato">
            Neon Technologies Limited
          </p>
          <p className="text-white text-center font-lato">
            Contact: +1 (868) 366-6331
          </p>
          <Link to="https://neon-technologies-portfolio-production.up.railway.app/">
            {" "}
            <p className="text-white text-center font-lato">
              Website: Neon Technologies Limited
            </p>
          </Link>
        </div>
      </div>
      <p className="text-center text-white mt-4">
        &#169; 2024, All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
