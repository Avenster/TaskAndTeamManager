import { useState } from "react";
import Sidebar from "~/components/Sidebar";
import Introduction from "~/components/HeroSection";
import TaskPage from "~/pages/TaskPage";
import Footer from "~/components/Footer";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("home");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "tasks":
        return <TaskPage />;
      default:
        return <Introduction />;
    }
  };

  return (
    <div className="flex flex-row w-full max-w-7xl h-[85vh] overflow-hidden items-center justify-center">
      <Sidebar onPageChange={handlePageChange} />
      <main className="flex-1 h-full scrollbar-custom overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}