import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  return (
    <div className="bg-blue-800 mt-2 p-4">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h1 className="text-center font-bebasNeue text-white">Location</h1>
          <p className="text-white text-center">#2 California Street, Chaguanas</p>
        </div>
        <div>
          <h1 className="text-center text-white">Partners</h1>
          <p className="text-white text-center">Sacha Cosmetics</p>
          <p className="text-white text-center">Carnival Kingdom</p>
          <p className="text-white text-center">868 Modeling Division</p>
        </div>
        <div>
          <h1 className="text-center text-white">Contact Information</h1>
          <p className="text-white text-center">Email: 868@example.com</p>
          <p className="text-white text-center">Phone: +1 (868) 555-6241</p>
          <div className='flex justify-center'>
            <InstagramIcon className='text-pink-500 mx-2'/>
            <WhatsAppIcon className='text-green-500 mx-2'/>
            <FacebookIcon className='text-blue-500 mx-2'/>
            <XIcon className='text-black mx-2'/>
          </div>
        </div>
        <div>
          <h1 className="text-center text-white">Developer Information</h1>
          <p className="text-white text-center">Neon Technologies Limited</p>
          <p className="text-white text-center">Contact: +1 (868) 366-6331</p>
        </div>
      </div>
      <p className="text-center text-white mt-4">&#169; 2024, All Rights Reserved</p>
    </div>
  );
};

export default Footer;
