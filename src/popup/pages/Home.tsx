import React from "react";
import { Page } from "../../../types/types";

interface HomeProps {
  setPage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ setPage }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => setPage("accessibility")}
          className="bg-white border border-black p-4 rounded-lg hover:bg-black hover:text-white transition-colors"
        >
          Color Accessibility
        </button>
        <button
          onClick={() => setPage("extractor")}
          className="bg-white border border-black p-4 rounded-lg hover:bg-black hover:text-white transition-colors"
        >
          Color Extractor
        </button>
        <button
          onClick={() => setPage("about")}
          className="bg-white border border-black p-4 rounded-lg hover:bg-black hover:text-white transition-colors"
        >
          About
        </button>
      </div>
    </div>
  );
};

export default Home;
