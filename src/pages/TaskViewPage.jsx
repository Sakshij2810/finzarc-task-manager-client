import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import {
  FaCopy,
  FaShare,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/tasksSlice";
import Header from "../components/Header";
import Spinner from "../components/Spinner";

const TaskViewPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });

  // Get current user from Redux store
  const { user } = useSelector((state) => state.auth);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get(`/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(response.data);
        setEditedTask({
          title: response.data.title,
          description: response.data.description || "",
          dueDate: response.data.dueDate
            ? new Date(response.data.dueDate).toISOString().split("T")[0]
            : "",
          completed: response.data.completed,
        });

        if (user && response.data.userId === user._id) {
          setIsOwner(true);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch task");
        toast.error(err.response?.data?.message || "Failed to fetch task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, user]);

  const handleCopyContent = () => {
    const contentToCopy = `${task.title}\n\n${task.description || ""}`.trim();
    navigator.clipboard
      .writeText(contentToCopy)
      .then(() => toast.success("Content copied to clipboard!"))
      .catch(() => toast.error("Failed to copy content"));
  };

  const handleShareTask = () => {
    const shareableLink = `${window.location.origin}/tasks/${taskId}`;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId))
        .unwrap()
        .then(() => {
          toast.success("Task deleted successfully");
          navigate("/tasks");
        })
        .catch((err) => toast.error(err.message));
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveChanges = () => {
    const taskData = {
      title: editedTask.title,
      description: editedTask.description,
      dueDate: editedTask.dueDate,
      completed: editedTask.completed,
    };

    dispatch(updateTask({ taskId: task._id, taskData }))
      .unwrap()
      .then((updatedTask) => {
        setTask(updatedTask);
        setIsEditing(false);
        toast.success("Task updated successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleCancelEdit = () => {
    setEditedTask({
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
      completed: task.completed,
    });
    setIsEditing(false);
  };

  if (loading)
    return (
      <div className="p-4 text-center">
        <Spinner />
      </div>
    );
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!task) return <div className="p-4 text-center">Task not found</div>;

  return (
    <div className="min-h-screen bg-[#0a0f16]">
      <Header />
      <div className="max-w-3xl mx-auto pt-40 p-4">
        <Link
          to="/"
          className="flex items-center text-[#17b5b4] mb-4 hover:text-[#0f8a89]"
        >
          <FaArrowLeft className="mr-2" /> Back to Tasks
        </Link>

        <div className="bg-[#0c1d22] border border-[#124147] rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleInputChange}
                className="text-2xl font-bold text-[#17b5b4] bg-[#0c1d22] border-b border-[#17b5b4] focus:outline-none w-full"
              />
            ) : (
              <h1 className="text-2xl font-bold text-[#17b5b4]">
                {task.title}
              </h1>
            )}
            {isOwner && (
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveChanges}
                      className="text-green-500 hover:text-green-700 p-2 cursor-pointer"
                      title="Save Changes"
                    >
                      <FaCheck size={18} />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-red-500 hover:text-red-700 p-2 cursor-pointer"
                      title="Cancel"
                    >
                      <FaTimes size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleEditToggle}
                      className="text-[#17b5b4] hover:text-[#0f8a89] p-2 cursor-pointer"
                      title="Edit Task"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="text-red-500 hover:text-red-700 p-2 cursor-pointer"
                      title="Delete Task"
                    >
                      <FaTrash size={18} />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#17b5b4] mb-2">
              Description
            </h2>
            {isEditing ? (
              <textarea
                name="description"
                value={editedTask.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#0c1d22] text-white border border-[#124147] rounded focus:outline-none focus:ring-1 focus:ring-[#17b5b4]"
                rows="3"
              />
            ) : (
              <p className="text-gray-300 whitespace-pre-wrap">
                {task.description || "No description provided"}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-[#17b5b4]">Status</h3>
              {isEditing ? (
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    name="completed"
                    checked={editedTask.completed}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-[#17b5b4] bg-[#0c1d22] border-[#124147] rounded focus:ring-[#17b5b4]"
                  />
                  <span className="ml-2 text-gray-300">
                    {editedTask.completed ? "Completed" : "Pending"}
                  </span>
                </label>
              ) : (
                <p className="text-gray-300">
                  {task.completed ? "Completed" : "Pending"}
                </p>
              )}
            </div>

            {isEditing || task.dueDate ? (
              <div>
                <h3 className="text-sm font-semibold text-[#17b5b4]">
                  Due Date
                </h3>
                {isEditing ? (
                  <input
                    type="date"
                    name="dueDate"
                    value={editedTask.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#0c1d22] text-white border border-[#124147] rounded focus:outline-none focus:ring-1 focus:ring-[#17b5b4]"
                  />
                ) : (
                  <p className="text-gray-300">
                    {format(
                      new Date(task.dueDate),
                      "MMMM dd, yyyy 'at' h:mm a"
                    )}
                  </p>
                )}
              </div>
            ) : null}

            {task.createdAt && (
              <div>
                <h3 className="text-sm font-semibold text-[#17b5b4]">
                  Created
                </h3>
                <p className="text-gray-300">
                  {format(new Date(task.createdAt), "MMMM dd, yyyy")}
                </p>
              </div>
            )}

            {task.updatedAt && (
              <div>
                <h3 className="text-sm font-semibold text-[#17b5b4]">
                  Last Updated
                </h3>
                <p className="text-gray-300">
                  {format(new Date(task.updatedAt), "MMMM dd, yyyy")}
                </p>
              </div>
            )}
          </div>

          <div className="flex space-x-4 pt-4 border-t border-[#124147]">
            <button
              onClick={handleCopyContent}
              className="flex items-center text-[#17b5b4] hover:text-[#0f8a89] cursor-pointer"
            >
              <FaCopy className="mr-2" /> Copy Content
            </button>
            <button
              onClick={handleShareTask}
              className="flex items-center text-[#17b5b4] hover:text-[#0f8a89] cursor-pointer"
            >
              <FaShare className="mr-2" /> Share Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskViewPage;
