import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import HomePage from "~/pages/HomePage";
import Introduction from "~/pages/Introduction";
import Footer from "~/components/Footer";


export const meta: MetaFunction = () => {
  return [
    { title: "Task&Teamn Manager" },
    { name: "description", content: "Welcome to Task Builder Application" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col h-screen w-full bg-black items-center">
      <Header />
     <HomePage/>
     
     {/* <Introduction/> */}
      

      
    </div>
  );
}