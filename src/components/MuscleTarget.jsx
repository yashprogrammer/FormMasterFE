import React, { useEffect, useState } from "react";
import { getMachineById } from "../apiService";

export default function MuscleTarget({ machineId }) {
  const [machine, setMachine] = useState(null); // State to hold machine info
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchMachineInfo = async () => {
      console.log(machineId.machineId);

      try {
        const data = await getMachineById(machineId.machineId); // Fetch machine data
        setMachine(data); // Set the machine data to state
      } catch (err) {
        setError(err); // Set error if fetch fails
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMachineInfo(); // Call the function
  }, [machineId]); // Run when the component mounts

  if (loading) return <div className="text-white">Loading machine info...</div>; // Loading state
  if (error)
    return (
      <div className="text-red-500">
        Error fetching machine info: {error.message}
      </div>
    ); // Error handling

  return (
    <div className="bg-teal-500 text-justify py-4 rounded-lg my-6 md:w-3/4 flex items-center justify-center overflow-x-hidden">
      <h2 className="text-2xl font-semibold text-white ml-5 break-words whitespace-normal">Muscle <br/> Targeted</h2>
      <img
        src={machine.targetedMuscles}
        alt="Muscle Targeted"
        className="mx-auto mt-4 w-32"
      />
    </div>
  );
}
