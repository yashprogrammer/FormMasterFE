import React, { useEffect, useState } from "react";
import { getMachineById } from "../apiService";
import MuscleTarget from "./MuscleTarget";
import ExerciseList from "./ExerciseList";

export default function MachineInfo({ machineId }) {
  const [machine, setMachine] = useState(null); // State to hold machine info
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchMachineInfo = async () => {
      try {
        const data = await getMachineById(machineId); // Fetch machine data
        setMachine(data); // Set the machine data to state
      } catch (err) {
        setError(err); // Set error if fetch fails
      } finally {
        setLoading(false); // Stop loading
      }
    };
    console.log(machine);

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
    <>
      <div className="text-center py-6 md:w-3/4">
        <img
          src={machine.imageUrl} // Use the imageUrl from the machine data
          alt={machine.name} // Use the machine name for alt text
          className="mx-auto w-24 h-24"
        />
        <h1 className="text-3xl font-bold text-white">{machine.name}</h1>
      </div>
      <MuscleTarget machineId={{ machineId }} />
      <ExerciseList machineId={{ machineId }} />
    </>
  );
}
