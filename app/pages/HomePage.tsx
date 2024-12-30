import { useState } from "react";
import Sidebar from "~/components/Sidebar";
import Introduction from "~/components/HeroSection";
import TaskPage from "~/pages/TaskPage";
import Footer from "~/components/Footer";
import TeamPage from "~/components/TeamTaskPage";
import CalendarPage from "./CalenderPage";
import ActivityPage from "./ActivityLog";
import MembersPage from "./MembersPage";
import AnalyticsPage from "./Analytics";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handlePageChange = (page) => {
    // Check if it's a team page
    if (page.startsWith('team-')) {
      const teamId = page.split('-')[1];
      setSelectedTeam(teamId);
      setCurrentPage('team');
    } else {
      setSelectedTeam(null);
      setCurrentPage(page);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case "tasks":
        return <TaskPage />;
      case "team":
        return <TeamPage teamId={selectedTeam} />;
      case "teams":
        return <MembersPage />;
      case "activity":
        return <ActivityPage />;
      case "analytics":
        return <AnalyticsPage/>;
      case "calendar":
        return <CalendarPage />;
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