import React, { useState } from "react";
import { useSelector } from "react-redux";
import TasksList from "../components/TasksList";
import TaskForm from "../components/TaskForm";
import Header from "../components/Header";

const CreateTask = () => {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className="relative z-100 min-h-screen bg-[#0a0f16]"
      style={{
        backgroundImage:
          "url('https://finzarc.com/_next/image?url=%2Fteam%2FFinzarc-Nexus.jpg&w=2048&q=100')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />

      <main className="z-100 container mx-auto px-4 py-8">
        <div className="z-100 max-w-3xl mx-auto">
          <TaskForm taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
        </div>
      </main>
    </div>
  );
};

export default CreateTask;
