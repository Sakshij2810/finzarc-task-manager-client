import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, reset } from "../features/tasks/tasksSlice";
import TaskItem from "./TaskItem";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const TasksList = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    // console.log("Fetching tasks..."); // Debug log
    dispatch(getTasks());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  // Ensure tasks is always an array for mapping
  const displayTasks = Array.isArray(tasks) ? tasks : [];

  return (
    <section className="mb-8 ">
      {isError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{message}</p>
        </div>
      )}

      {displayTasks.length > 0 ? (
        <div className="grid gap-4">
          {displayTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}

          <Link
            to="/create-task"
            className="w-[20%] text-center bg-[#17b5b4] text-black px-4 py-2 rounded hover:bg-[#139796] transition disabled:opacity-50 cursor-pointer"
          >
            Create Task
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center  justify-center py-50">
          <p className="text-gray-500 text-center py-4">
            {!isError && "No tasks found"}
          </p>
          <Link
            to="/create-task"
            className="w-[40%] text-center bg-[#17b5b4] text-black px-4 py-2 rounded hover:bg-[#139796] transition disabled:opacity-50 cursor-pointer"
          >
            Create New Task
          </Link>
        </div>
      )}
    </section>
  );
};

export default TasksList;
