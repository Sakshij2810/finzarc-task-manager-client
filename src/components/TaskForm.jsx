import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../features/tasks/tasksSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ taskToEdit, setTaskToEdit }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [dueDate, setDueDate] = useState(
    taskToEdit?.dueDate
      ? new Date(taskToEdit.dueDate).toISOString().split("T")[0]
      : ""
  );

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.tasks);

  const onSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      dueDate,
    };

    if (taskToEdit) {
      dispatch(updateTask({ taskId: taskToEdit._id, taskData }));
      toast.success("Task Updated Successfully");
      setTaskToEdit(null);
    } else {
      dispatch(createTask(taskData));
      toast.success("Task Created Successfully");
      navigate("/");
    }

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="z-100   bg-[#151a22]/10 backdrop-blur-md border border-[#114348]  p-10 rounded-lg shadow-md mb-6 mt-30"
    >
      <h1 className="z-100 text-3xl text-[#17b5b4] font-bold mb-8">
        {taskToEdit ? "Edit Task" : "Add New Task"}
      </h1>
      <div className="z-100 mb-4 pt-5">
        <label className="block text-white  mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-white border text-black border-[#2b3133] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 bg-white text-black border border-[#2b3133] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-4 pb-10">
        <label className="block text-white mb-2" htmlFor="dueDate">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full text-black   px-3 py-2 bg-white border border-[#2b3133] rounded "
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#17b5b4] text-black px-4 py-2 rounded hover:bg-[#139796] transition disabled:opacity-50 cursor-pointer"
      >
        {isLoading ? "Processing..." : taskToEdit ? "Update Task" : "Add Task"}
      </button>
      {taskToEdit && (
        <button
          type="button"
          onClick={() => {
            setTaskToEdit(null);
            setTitle("");
            setDescription("");
            setDueDate("");
          }}
          className="ml-2 bg-[#24262d] text-white px-4 py-2 rounded hover:bg-[#404451] transition cursor-pointer"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
