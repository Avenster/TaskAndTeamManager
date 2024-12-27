import Sidebar from "~/components/Sidebar"
import Introduction from "~/components/HeroSection"


export default function HomePage() {
  return (
    <div className="flex flex-row max-w-7xl w-full h-full overflow-hidden justify-between items-start">
      <Sidebar />
      <Introduction />
      

    </div>


  )
}
