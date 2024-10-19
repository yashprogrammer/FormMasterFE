import React, { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import { getExercisesByMachineId } from "../apiService"; // Import your API function

export default function ExerciseList({ machineId }) {
  const [exercises, setExercises] = useState([]); // State to hold exercises
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExercisesByMachineId(machineId.machineId); // Fetch exercises using machineId
        setExercises(data); // Set the fetched exercises
      } catch (err) {
        setError(err); // Set error if fetch fails
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchExercises(); // Call the function
  }, [machineId]); // Dependency on machineId

  if (loading) return <div className="text-white">Loading exercises...</div>; // Loading state
  if (error)
    return (
      <div className="text-red-500">
        Error fetching exercises: {error.message}
      </div>
    ); // Error handling

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        Exercises Available
      </h2>
      {exercises.length > 0 ? (
        exercises.map((exercise) => (
          <ExerciseCard
            key={exercise._id} // Use exercise ID as key
            image={exercise.thumbnailUrl} // Assuming this is the image URL
            name={exercise.name} // Exercise name
            formCheckVideoUrl={exercise.formCheckVideoUrl} // Form check video URL
            explanationVideoUrl={exercise.explanationVideoUrl} // Explanation video URL
          />
        ))
      ) : (
        <div className="text-white">
          No exercises available for this machine.
        </div>
      )}
    </div>
  );
}
