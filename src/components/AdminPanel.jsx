import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminPanel() {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState({
    name: "",
    imageUrl: "",
    targetedMuscles: "",
  });
  const [selectedMachineDetails, setSelectedMachineDetails] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState({
    name: "",
    thumbnailUrl: "",
    formCheckVideoUrl: "",
    explanationVideoUrl: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await axios.get("/machines");
      setMachines(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMachineDetails = async (machineId) => {
    try {
      const response = await axios.get(`/machines/${machineId}`);
      const exercisesResponse = await axios.get(`/exercises/${machineId}`);
      setSelectedMachineDetails({
        ...response.data,
        exercises: exercisesResponse.data,
      });
      setShowDetailsModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (machine) => {
    setSelectedMachine(machine);
    setShowModal(true);
  };

  const handleDeleteMachine = async (machineId) => {
    try {
      await axios.delete(`/api/machines/delete-machine/${machineId}`);
      fetchMachines();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      if (selectedMachine._id) {
        await axios.patch(
          `/machines/edit-machine/${selectedMachine._id}`,
          selectedMachine
        );
      } else {
        // Ensure all required fields are provided
        if (
          !selectedMachine.name ||
          !selectedMachine.imageUrl ||
          !selectedMachine.targetedMuscles
        ) {
          alert("Please fill out all required fields.");
          return;
        }
        await axios.post("/machines/Create-machine", selectedMachine);
      }
      setShowModal(false);
      setSelectedMachine({ name: "", imageUrl: "", targetedMuscles: "" });
      fetchMachines();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddExercise = () => {
    setSelectedExercise({
      name: "",
      thumbnailUrl: "",
      formCheckVideoUrl: "",
      explanationVideoUrl: "",
    });
    setShowAddExerciseModal(true);
  };

  const handleSaveExercise = async () => {
    try {
      if (
        !selectedExercise.name ||
        !selectedExercise.thumbnailUrl ||
        !selectedExercise.formCheckVideoUrl ||
        !selectedExercise.explanationVideoUrl
      ) {
        alert("Please fill out all required fields.");
        return;
      }
      await axios.post(
        `/exercises/Create-exercises/${selectedMachineDetails._id}`,
        selectedExercise
      );
      setShowAddExerciseModal(false);
      fetchMachineDetails(selectedMachineDetails._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteExercise = async (exerciseId) => {
    try {
      await axios.delete(`/exercises/delete-exercise/${exerciseId}`);
      fetchMachineDetails(selectedMachineDetails._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Button
        className="mb-4 bg-blue-500 text-white"
        onClick={() => {
          setSelectedMachine({ name: "", imageUrl: "", targetedMuscles: "" });
          setShowModal(true);
        }}
      >
        Add Machine
      </Button>
      <div className="overflow-x-auto">
        <h2 className="text-center">All Machines</h2>
        <Table striped bordered hover className="bg-white">
          <thead>
            <tr>
              <th>Machine Name</th>
              <th>Machine ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((machine) => (
              <tr key={machine._id}>
                <td>{machine.name}</td>
                <td>{machine._id}</td>
                <td>
                  <Button
                    className="mr-2 bg-red-500 text-white"
                    onClick={() => handleDeleteMachine(machine._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="mr-2 bg-blue-500 text-white"
                    onClick={() => fetchMachineDetails(machine._id)}
                  >
                    View
                  </Button>
                  <Button
                    className="mr-2 bg-green-500 text-white"
                    onClick={() => handleEdit(machine)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Edit Machine Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedMachine?._id ? "Edit Machine" : "Add Machine"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedMachine?.name || ""}
                onChange={(e) =>
                  setSelectedMachine({
                    ...selectedMachine,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={selectedMachine?.imageUrl || ""}
                onChange={(e) =>
                  setSelectedMachine({
                    ...selectedMachine,
                    imageUrl: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Targeted Muscles</Form.Label>
              <Form.Control
                type="text"
                value={selectedMachine?.targetedMuscles || ""}
                onChange={(e) =>
                  setSelectedMachine({
                    ...selectedMachine,
                    targetedMuscles: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Machine Details Modal */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Machine Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMachineDetails && (
            <div>
              <h3 className="text-lg font-bold mb-2">Machine Information</h3>
              <p>
                <strong>Name:</strong> {selectedMachineDetails.name}
              </p>
              <p>
                <strong>ID:</strong> {selectedMachineDetails._id}
              </p>
              <p>
                <strong>Targeted Muscles:</strong>{" "}
                {selectedMachineDetails.targetedMuscles}
              </p>
              <p>
                <strong>Image URL:</strong> {selectedMachineDetails.imageUrl}
              </p>

              <h3 className="text-lg font-bold mt-4 mb-2">Exercises</h3>
              <Button
                className="mb-3 bg-blue-500 text-white"
                onClick={handleAddExercise}
              >
                Add Exercise
              </Button>
              <div className="overflow-x-auto">
                <Table striped bordered hover className="bg-white">
                  <thead>
                    <tr>
                      <th>Exercise Name</th>
                      <th>Exercise ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMachineDetails.exercises.map((exercise) => (
                      <tr key={exercise._id}>
                        <td>{exercise.name}</td>
                        <td>{exercise._id}</td>
                        <td>
                          <Button
                            className="mr-2 bg-green-500 text-white"
                            onClick={() => handleEdit(exercise)}
                          >
                            Edit
                          </Button>
                          <Button
                            className="bg-red-500 text-white"
                            onClick={() => handleDeleteExercise(exercise._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Exercise Modal */}
      <Modal
        show={showAddExerciseModal}
        onHide={() => setShowAddExerciseModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedExercise?.name || ""}
                onChange={(e) =>
                  setSelectedExercise({
                    ...selectedExercise,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Thumbnail URL</Form.Label>
              <Form.Control
                type="text"
                value={selectedExercise?.thumbnailUrl || ""}
                onChange={(e) =>
                  setSelectedExercise({
                    ...selectedExercise,
                    thumbnailUrl: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Form Check Video URL</Form.Label>
              <Form.Control
                type="text"
                value={selectedExercise?.formCheckVideoUrl || ""}
                onChange={(e) =>
                  setSelectedExercise({
                    ...selectedExercise,
                    formCheckVideoUrl: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Explanation Video URL</Form.Label>
              <Form.Control
                type="text"
                value={selectedExercise?.explanationVideoUrl || ""}
                onChange={(e) =>
                  setSelectedExercise({
                    ...selectedExercise,
                    explanationVideoUrl: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddExerciseModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveExercise}>
            Save Exercise
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminPanel;
