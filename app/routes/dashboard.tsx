import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import HomePage from "~/pages/HomePage";

export const meta: MetaFunction = () => {
  return [
    { title: "Task&Team Manager" },
    { name: "description", content: "Welcome to Task Builder Application" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen w-full h-full bg-black items-center">
      <Header />
      <HomePage />
      
      <Footer />
    </div>
  );
}
