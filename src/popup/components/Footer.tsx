import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="w-full text-center">
      {" "}
      <p>
        {/* with ❤️  */}
        &copy; {new Date().getFullYear()} | made by{" "}
        <a
          href="https://yourwebsite.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          SM
        </a>
      </p>
    </div>
  );
};

export default Footer;
