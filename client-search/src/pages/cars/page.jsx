//* LIB
import useDebounce from "@/hooks/useDebounce";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const CarPage = () => {
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [count, setCount] = React.useState(0);

  const searchInputRef = React.useRef(null);

  const debouncedQuery = useDebounce(search, 300);

  const handleToggle = () => {
    setOpen(!open);
    if (debouncedQuery.trim() !== "") {
      fetchData(
        `http://localhost:2000/api/v1/cars/search?q=${encodeURIComponent(
          search
        )}`
      );
    } else {
      fetchData(`http://localhost:2000/api/v1/cars/get/all`);
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target)
    ) {
      setOpen(false);
      setItems([]);
      setCount(0);
    }
  };

  const fetchData = async (
    url = "http://localhost:2000/api/v1/cars/get/all"
  ) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setItems(data?.metadata?.cars);
      setCount(data?.metadata?.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      fetchData(
        `http://localhost:2000/api/v1/cars/search?q=${encodeURIComponent(
          search
        )}`
      );
    } else {
      fetchData(`http://localhost:2000/api/v1/cars/get/all`);
    }
  }, [debouncedQuery]);

  return (
    <div className="min-h-screen bg-slate-500-50 py-6 flex flex-col items-center justify-center relative overflow-hidden sm:py-12">
      <div className="text-center mb-16">
        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          Redis Search Count: <span className="text-red-600">{count}</span>
        </h3>
      </div>
      <input
        onClick={handleToggle}
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Here..."
        className="py-3 px-4 w-1/2 rounded shadow font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-200 duration-100 shadow-gray-100"
        ref={searchInputRef}
      />

      <ul style={{ display: open ? "block" : "none" }} className="w-1/2">
        {!items?.length ? (
          <li className="w-full text-red-700 p-4 mt-2 bg-red flex flex-col gap-2 ">
            <p className="text-lg">Not have data</p>
          </li>
        ) : (
          <>
            {items?.map((item, index) => (
              <li
                key={index} // Use a unique identifier as the key
                className="w-full text-gray-700 p-4 mt-2 bg-white flex flex-col gap-2 "
              >
                <div className="flex">
                  <img
                    src={item.image}
                    alt="Siacoin Icon"
                    className="w-8 h-8 mr-2 rounded-full"
                  />
                  <p className="text-lg">
                    {item.make} - {item.model}
                  </p>
                </div>
                <div>
                  <p className="text-lg">{item.description}</p>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default CarPage;
