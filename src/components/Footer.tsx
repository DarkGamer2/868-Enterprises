const Footer = () => {
  return (
    <div>
      <div className="grid grid-cols-4">
        <div>
          <h1 className="text-center font-bebasNeue">Location</h1>
          <span></span>
          <p>#2 California Street, Chaguanas</p>
        </div>
        <div>
          <h1 className="text-center">Partners</h1>
          <span></span>
          <p>Sacha Cosmetics</p>
          <p>Carnival Kingdom</p>
          <p>868 Modeling Division</p>
        </div>
        <div>
          <h1 className="text-center">Contact Information</h1>
        </div>
        <div>
          <h1 className="text-center">Developer Information</h1>
          <span></span>
          <p>Neon Technologies Limited</p>
          <p>Contact: +1 (868) 366-6331</p>
        </div>
      </div>

      <p className="text-center">&#169; 2024, All Rights Reserved</p>
    </div>
  );
};

export default Footer;
