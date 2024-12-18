import React from "react";
import { Page } from "../../../types/types";
import { MoveLeft } from "lucide-react";

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Color Helper</h1>
        {currentPage !== "home" && (
          <button
            onClick={() => setPage("home")}
            className="text-blue-500 hover:text-blue-700 w-fit"
          >
            <span>
              <MoveLeft />
              Back to Home
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
