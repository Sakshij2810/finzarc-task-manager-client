import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/tasksSlice";
import { format } from "date-fns";
import TaskForm from "./TaskForm.jsx";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
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
        <div className="flex space-x-5">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-2xl cursor-pointer"
          >
            <FaRegEdit />
          </button>
          <button onClick={handleDelete} className="text-2xl cursor-pointer">
            <MdDeleteOutline />
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
