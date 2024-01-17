//* LIB
import React from "react";

//* IMPORT
import "./App.css";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const [flag, setFlag] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:2000/api/v1/movies/search/idx?idx=idx:movie&query=${query}`
      );
      const data = await response.json();
      setResults(data?.metadata?.documents);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const debouncedQuery = useDebounce(query, 300);

  const handleToggle = () => {
    setFlag(true);
  };

  React.useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setFlag(false);
    }
  };

  React.useEffect(() => {
    handleSearch();
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [debouncedQuery]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full md:w-1/2 flex flex-col items-center h-64">
          <div className="w-full px-4">
            <div className="flex flex-col items-center relative">
              <div className="w-full" ref={dropdownRef}>
                <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
                  <input
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies..."
                    onFocus={handleToggle}
                  />
                  <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                    <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline
                          points={flag ? "18 15 12 9 6 15" : "18 15 12 20 6 15"}
                        ></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {flag && (
                <div className="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto">
                  <div className="flex flex-col w-full">
                    {results?.map((option, index) => (
                      <React.Fragment key={index}>
                        <div>
                          <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                            <div className="w-6 flex flex-col items-center">
                              <div className="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full">
                                <img
                                  className="rounded-full"
                                  alt="A"
                                  src={
                                    option.value.poster === "N/A"
                                      ? "https://upload.wikimedia.org/wikipedia/vi/d/d3/Case_Closed_Movie_5.jpg"
                                      : option.value.poster
                                  }
                                />
                              </div>
                            </div>
                            <div className="w-full items-center flex">
                              <div className="mx-2 -mt-1">
                                <span>
                                  {option.value.title +
                                    " " +
                                    option.value.genre}
                                </span>
                                <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
                                  {option.value.plot}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
