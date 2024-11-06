import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ExerciseCard({
  image,
  name,
  formCheckVideoUrl,
  explanationVideoUrl,
}) {
  const [isView, setIsView] = useState(false);

  const handleViewDetails = () => {
    setIsView(true);
  };

  const handleCloseDetails = () => {
    setIsView(false);
  };
  return (
    <div className="bg-gray-800 rounded-xl  md:w-3/4 overflow-hidden">
      <img
        src={image}
        alt={name}
        className="rounded-t-lg w-full h-60 object-cover rounded-lg"
      />
      <div className="py-2  flex flex-row items-center justify-between w-[100%]  ml-2">
        <h3 className="text-lg font-semibold text-white  w-[70%] text-left font-montserrat">
          {name}
        </h3>
        <div className=" w-[30%] m-3">
          <button
            onClick={() => {
              if (isView) {
                handleCloseDetails();
              } else {
                handleViewDetails();
              }
            }} // Open form check video in a new tab
            className="text-center p-3 bg-white text-black rounded-full w-[100%] "
          >
            {!isView ? (
              <>
                View
                <FontAwesomeIcon icon={faChevronDown} className="ml-2 mt-1" />
              </>
            ) : (
              <>
                Close
                <FontAwesomeIcon icon={faChevronUp} className="ml-2 mt-1" />
              </>
            )}
          </button>
        </div>
      </div>
      {isView ? (
        <div className="flex flex-row m-4 space-x-5 p-2">
          <button
            onClick={() => window.open(explanationVideoUrl, "_blank")} // Open explanation video in a new tab
            className="flex flex-col items-center justify-center p-3 bg-black text-white rounded-2xl text-center truncate whitespace-nowrap"
          >
            <FontAwesomeIcon
              icon={faCirclePlay}
              className="text-4xl text-white p-2 border-white"
            />
            <h3>Form Check</h3>
            <div className="text-[#c8c8c8] text-center">
              <p>30 Sec</p>
            </div>
          </button>
          <button
            onClick={() => window.open(explanationVideoUrl, "_blank")} // Open explanation video in a new tab
            className="flex flex-col justify-center items-center  p-3 bg-black text-white rounded-2xl text-center truncate whitespace-nowrap "
          >
            <FontAwesomeIcon
              icon={faCirclePlay}
              className="text-4xl text-white p-2 border-white"
            />

            <h3>Explanation</h3>
            <div className="text-[#c8c8c8] text-center">
              <p>10 min</p>
            </div>
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
