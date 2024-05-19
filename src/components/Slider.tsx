import Image1 from "../assets/images/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg";
import Image2 from "../assets/images/SNY04089.jpg_edit.width-1440_05001m7uKQ0crRoI.jpg";
import Image3 from "../assets/images/clothingrack.0.jpg";
import Image4 from "../assets/images/enjoy-retro-clothing-truro-20-scaled.jpg";
import Image5 from "../assets/images/index-online-65a1812dc7346.jpg";
import { useState } from "react";
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

  const Slide = (type:string) => {
    let local;
    if (type === "next") {
      local = activeSlide + 1;
      images.length - 1 < local
        ? setActiveSlide(local / images.length - 1)
        : setActiveSlide(local);
    }
    if (type === "prev") {
      local = activeSlide - 1;
      setActiveSlide(local);
    }
    setPrev(activeSlide)
  };
  return (
    <div>
      <div className="rounded-xl relative shadow-lg overflow-hidden">
        <div className="w-auto h-[400px] relative">
          {images.map((image, index) => {
            return (
              <img
                src={image.image}
                key={index}
                alt="slider image"
                className={`h-full w-full absolute object-cover inset-0 duration-[2s] ease-out transition-[clip-path] ${
                  index === activeSlide
                    ? "clip-visible"
                    : "clip-hidden opacity-0"
                }`}
              />
            );
          })}
          <img src={images[prev].image} alt="previmg" className="w-full h-full object-cover" />
        </div>
        <div>
          <button onClick={() => Slide("prev")} id="back">
            <ArrowBackIosNewIcon />
          </button>
          <button
            onClick={() => Slide("next")}
            id="forward"
            className="right-0"
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
