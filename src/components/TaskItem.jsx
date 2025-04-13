import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/tasksSlice";
import { format } from "date-fns";
import TaskForm from "./TaskForm.jsx";
import toast from "react-hot-toast";
import { FaRegEdit, FaCopy, FaShare, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(task.completed);

  const handleComplete = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    dispatch(
      updateTask({ taskId: task._id, taskData: { completed: newCompleted } })
    );
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(task._id));
      toast.success("Task Deleted Successfully");
    }
  };

  const handleShareTask = () => {
    const shareableLink = `${window.location.origin}/tasks/${task._id}`;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        toast.success("Task link copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy link: " + err.message);
      });
  };

  const handleCopyContent = () => {
    const contentToCopy = `${task.title}\n\n${task.description || ""}`.trim();
    if (!contentToCopy) {
      toast.error("No content to copy");
      return;
    }

    navigator.clipboard
      .writeText(contentToCopy)
      .then(() => {
        toast.success("Task content copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy content: " + err.message);
      });
  };

  const handleViewTask = () => {
    navigate(`/tasks/${task._id}`);
  };

  return (
    <div
      className={`bg-[#0c1d22] text-white border border-[#124147] p-4 rounded-lg shadow-md mb-4 ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-10 items-start">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleComplete}
            className="h-5 w-5 text-[#17b5b4] bg-[#17b5b4] rounded focus:ring-[#17b5b4]"
          />
          <div>
            <h3
              className={`font-bold text-[#17b5b4] text-lg ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-white-600 mt-1">{task.description}</p>
            )}
            {task.dueDate && (
              <p className="text-sm text-[#9ea2a5] mt-2">
                Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-3 items-center">
          <button
            onClick={handleViewTask}
            className="text-[#17b5b4] hover:text-[#0f8a89] transition-colors cursor-pointer"
            title="View Task"
          >
            <FaEye size={18} />
          </button>
          <button
            onClick={handleCopyContent}
            className="text-[#17b5b4] hover:text-[#0f8a89] transition-colors ml-2 cursor-pointer"
            title="Copy Content"
          >
            <FaCopy size={18} />
          </button>
          <button
            onClick={handleShareTask}
            className="text-[#17b5b4] hover:text-[#0f8a89] transition-colors ml-2 cursor-pointer"
            title="Share Task"
          >
            <FaShare size={18} />
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-[#17b5b4] hover:text-[#0f8a89] transition-colors ml-2 cursor-pointer"
            title="Edit Task"
          >
            <FaRegEdit size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="text-[#c72e2e] hover:text-red-700 transition-colors ml-2 cursor-pointer"
            title="Delete Task"
          >
            <MdDeleteOutline size={20} />
          </button>
        </div>
      </div>
      {isEditing && (
        <div className="mt-4">
          <TaskForm
            taskToEdit={task}
            setTaskToEdit={() => setIsEditing(false)}
          />
        </div>
      )}
    </div>
  );
};

export default TaskItem;
