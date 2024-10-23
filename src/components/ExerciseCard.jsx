import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
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
    <div className="bg-gray-800 rounded-lg my-4 md:w-3/4 overflow-hidden">
      <img
        src={image}
        alt={name}
        className="rounded-t-lg w-full h-40 object-cover mt-2 rounded-lg"
      />
      <div className="py-2  flex flex-row items-center justify-between w-[100%] ">
        <h3 className="text-lg font-semibold text-white whitespace-nowrap w-[70%] ">
          {name}
        </h3>
        <div className="mt-2 w-[30%]">
          <button
            onClick={() => {
              if (isView) {
                handleCloseDetails();
              } else {
                handleViewDetails();
              }
            }} // Open form check video in a new tab
            className="text-center p-2 bg-white text-black rounded-full w-[100%]"
          >
            {!isView ? "View" : "Close"}
            <FontAwesomeIcon icon={faChevronDown} className="ml-2 mt-1" />
          </button>
        </div>

        
      </div>
      {isView ? (
          <div className="flex flex-row w-[100%] ">
            <button
              onClick={() => window.open(explanationVideoUrl, "_blank")} // Open explanation video in a new tab
              className="p-3 m-3 bg-gray-700 text-white rounded-2xl text-center truncate"
            >
              <h3>Form Check</h3>
            </button>
            <button
              onClick={() => window.open(explanationVideoUrl, "_blank")} // Open explanation video in a new tab
              className=" p-3 m-3 bg-gray-700 text-white rounded-2xl text-center truncate"
            >
              <h3>Form Check</h3>
            </button>
          </div>
        ) : (
          <></>
        )}
    </div>
  );
}
