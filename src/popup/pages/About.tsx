import { FC } from "react";

const About: FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About This Extension</h1>
      <p className="text-gray-700 mb-6">
        Welcome to the <span className="font-semibold">Color Helper</span> extension! This
        tool helps users adjust colors on any web page to suit them better.
      </p>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Developer Info</h2>
        <ul className="text-gray-700">
          <li>
            Developed by:{" "}
            <span className="font-medium text-gray-900">Sinisa Manojlovic</span>
          </li>
          <li>
            Contact:{" "}
            <a
              href="mailto:youremail@example.com"
              className="text-blue-500 hover:underline"
            >
              example@example.com
            </a>
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Important Links</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            GitHub Repository:{" "}
            <a
              href="https://github.com/yourusername/color-extractor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              https://github.com/yourusername/color-extractor
            </a>
          </li>
          <li>
            Report Issues:{" "}
            <a
              href="https://github.com/yourusername/color-extractor/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Open an Issue
            </a>
          </li>
          <li>
            Documentation:{" "}
            <a
              href="https://yourdocumentationlink.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read the Docs
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
