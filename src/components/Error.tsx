import { useState } from "react";
const Error = () => {
  // State to manage the visibility of the more details text
  const [showDetails, setShowDetails] = useState(false);

  // Error message and detailed message strings
  const errorMessage = "useAuth must be used within a AuthProvider";
  const moreDetails = `useAuth@http://localhost:5173/src/context/auth-context.tsx:47:20
Cart@http://localhost:5173/src/pages/Cart.tsx:33:33
renderWithHooks@http://localhost:5173/node_modules/.vite/deps/chunk-ZW7WJ6XU.js:12171:35
mountIndeterminateComponent@http://localhost:5173/node_modules/.vite/deps/chunk-ZW7WJ6XU.js:14921:36
beginWork$1@http://localhost:5173/node_modules/.vite/deps/chunk-ZW7WJ6XU.js:19749:31
performUnitOfWork@http://localhost:5173/node_modules/.vite/deps/chunk-ZW7WJ6XU.js:19194:31
workLoopSync@http://localhost:5173/node_modules/.vite/deps/chunk-ZW7WJ6XU.js:19133:30
renderRootSync@http://localhost:5173/node_modules/.vite/deps/chunk-ZW7WJ6XU.js:19112:27
recoverFromConcurrentError@http://localhost:5173/node_modules/.vite/deps/chunk-ZW7WJ6XU.js:18732:42
performSyncWorkOnRoot@http://localhost:5173/node_modules/.vite/deps/chunk-ZW7WJ6XU.js:18875:54
flushSyncCallbacks@http://localhost:5173/node_modules/.vite/deps/chunk-ZW7WJ6XU.js:9135:38
@http://localhost:5173/node_modules/.vite/deps/chunk-ZW7WJ6XU.js:18623:39`;

  // Function to toggle the visibility of the more details text
  const handleMoreDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl">Error</h1>
      <div>
        <p className="text-red-600 text-center">{errorMessage}</p>
        <div className="text-center">
          <button
            onClick={handleMoreDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showDetails ? "Hide Details" : "More Details"}
          </button>
        </div>
        {/* Conditionally render the more details string */}
        {showDetails && (
          <pre className="text-gray-600 mt-4 text-center">{moreDetails}</pre>
        )}
      </div>
    </div>
  );
};

export default Error;
