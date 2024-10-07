import Image1 from "../../public/assets/images/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg";
import Image2 from "../../public/assets/images/SNY04089.jpg_edit.width-1440_05001m7uKQ0crRoI.jpg";
import Image3 from "../../public/assets/images/clothingrack.0.jpg";
import Image4 from "../../public/assets/images/enjoy-retro-clothing-truro-20-scaled.jpg";
import Image5 from "../../public/assets/images/index-online-65a1812dc7346.jpg";
import { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [prev, setPrev] = useState(0);
  const images = [
    {
      image: Image1,
      name: "clothing 1",
    },
    { image: Image2, name: "clothing 2" },
    {
      image: Image3,
      name: "clothing 3",
    },
    {
      image: Image4,
      name: "clothing 4",
    },
    {
      image: Image5,
      name: "clothing 5",
    },
  ];

  const Slide = (type: string) => {
    let local;
    if (type === "next") {
      local = activeSlide + 1;
      setActiveSlide(local >= images.length ? 0 : local);
    }
    if (type === "prev") {
      local = activeSlide - 1;
      setActiveSlide(local < 0 ? images.length - 1 : local);
    }
    setPrev(activeSlide);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      Slide("next");
    }, 10000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [activeSlide]);

  return (
    <div className="relative">
      <div className="rounded-xl relative shadow-lg overflow-hidden">
        <div className="w-full h-[250px] sm:h-[350px] md:h-[400px] relative">
          {images.map((image, index) => {
            return (
              <img
                src={image.image}
                key={index}
                alt="slider image"
                className={`h-full w-full absolute object-cover inset-0 duration-[2s] ease-out transition-[clip-path, opacity] ${
                  index === activeSlide
                    ? "clip-visible opacity-100"
                    : "clip-hidden opacity-0"
                }`}
              />
            );
          })}
          <img
            src={images[prev].image}
            alt="previmg"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex justify-between items-center p-4">
          <button
            onClick={() => Slide("prev")}
            id="back"
            className="bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity"
            style={{ position: "absolute", left: "10px" }}
          >
            <ArrowBackIosNewIcon />
          </button>
          <button
            onClick={() => Slide("next")}
            id="forward"
            className="bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity"
            style={{ position: "absolute", right: "10px" }}
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;