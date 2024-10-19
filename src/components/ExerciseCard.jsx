export default function ExerciseCard({
  image,
  name,
  formCheckVideoUrl,
  explanationVideoUrl,
}) {
  return (
    <div className="bg-gray-800 rounded-lg my-4 md:w-3/4">
      <img
        src={image}
        alt={name}
        className="rounded-t-lg w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <div className="mt-2">
          <button
            onClick={() => window.open(formCheckVideoUrl, "_blank")} // Open form check video in a new tab
            className="mt-2 mr-2 px-4 py-2 bg-gray-700 text-white rounded-full"
          >
            View Form Check Video
          </button>
          <button
            onClick={() => window.open(explanationVideoUrl, "_blank")} // Open explanation video in a new tab
            className="mt-2 px-4 py-2 bg-gray-700 text-white rounded-full"
          >
            View Explanation Video
          </button>
        </div>
      </div>
    </div>
  );
}
