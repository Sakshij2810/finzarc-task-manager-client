import Header from "../components/Header";
import TasksList from "../components/TasksList";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0a0f16] ">
      <Header />

      <main className="container mx-auto px-4 py-8 ">
        <div className="max-w-3xl mx-auto mt-30">
          <TasksList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
