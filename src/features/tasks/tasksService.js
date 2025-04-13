import API from "../../utils/api";

const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await API.get("/tasks", config);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API.post("/tasks", taskData, config);
  return response.data;
};

const updateTask = async (taskId, taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API.put(`/tasks/${taskId}`, taskData, config);
  return response.data;
};

const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await API.delete(`/tasks/${taskId}`, config);
  return taskId;
};

const tasksService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default tasksService;
