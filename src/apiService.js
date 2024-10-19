// src/apiService.js
import axios from "axios";

// Set up base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Your API base URL
});

// Function to get exercises by machineId
export const getExercisesByMachineId = async (machineId) => {
  try {
    const response = await api.get(`/exercises/${machineId}`);
    return response.data; // Return the data received
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error; // Propagate error to handle it in components
  }
};

// Function to create a new exercise
export const createExercise = async (exerciseData) => {
  try {
    const response = await api.post(
      "/exercises?machineId=" + exerciseData.machineId,
      exerciseData
    );
    return response.data; // Return the created exercise
  } catch (error) {
    console.error("Error creating exercise:", error);
    throw error; // Propagate error
  }
};

export const getMachineById = async (machineId) => {
  try {
    const response = await api.get(`/machines/${machineId}`);
    return response.data; // Return the machine data received
  } catch (error) {
    console.error("Error fetching machine details:", error);
    throw error; // Propagate error to handle it in components
  }
};
