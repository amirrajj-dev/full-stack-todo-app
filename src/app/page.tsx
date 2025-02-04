
import AddTodo from "@/components/AddTodo";
import Navbar from "@/components/Navbar";
import StatusCards from "@/components/StatusCards";
import TodosContainer from "@/components/TodosContainer";

const page = async () => {
  
  return (
    <div className="min-h-screen bg-gray-100 pt-4 px-2 dark:bg-gray-900 roboto">
      <div className="max-w-5xl mx-auto dark:bg-gray-800 p-4 shadow-md rounded-md">
        <Navbar />
        <StatusCards />
        <AddTodo/>
        <TodosContainer/>
      </div>
    </div>
  );
};

export default page;