import React, { useState } from "react";
import { Page } from "../../types/types";
import ColorAccessibility from "./pages/ColorAccessibility";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WebpageColors from "./pages/WebpageColors";

const Popup: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home setPage={setCurrentPage} />;
      case "accessibility":
        return <ColorAccessibility />;
      case "webpageColors":
        return <WebpageColors />;
      case "about":
        return <About />;
    }
  };

  return (
    <div className="w-[400px] h-[500px] bg-white flex flex-col">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      <main className="flex-1 p-4 overflow-y-auto">{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default Popup;
