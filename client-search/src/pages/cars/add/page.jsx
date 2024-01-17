//* LIB
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCarPage = () => {
  const Navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    make: "",
    model: "",
    image: "",
    description: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formData.make ||
      !formData.model ||
      !formData.image ||
      !formData.description
    ) {
      return toast.error("Please fill in all fields");
    }
    try {
      const response = await fetch("http://localhost:2000/api/v1/cars/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Data sent successfully");
        resetForm();
        return Navigate("/cars");
      } else {
        toast.error("Failed to send data");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    return setFormData({
      make: "",
      model: "",
      image: "",
      description: "",
    });
  };

  return (
    <>
      <div className="max-w-screen-md mx-auto p-5 flex justify-center">
        <div>
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Create <span className="text-indigo-600">Data Search</span>
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {/* ... other form elements ... */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-make"
                >
                  Make
                </label>
                <input
                  id="grid-make"
                  type="text"
                  placeholder="Car Make"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
                {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-model"
                >
                  Model
                </label>
                <input
                  id="grid-model"
                  type="text"
                  placeholder="Car Model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-image"
                >
                  Image
                </label>
                <input
                  id="grid-image"
                  type="text"
                  placeholder="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-description"
                >
                  Description
                </label>
                <textarea
                  rows="5"
                  id="grid-description"
                  placeholder="Car Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                ></textarea>
              </div>
            </div>

            {/* ... other form elements ... */}

            <div className="flex justify-between w-full px-3">
              <div className="md:flex md:items-center"></div>
              <button
                type="submit"
                className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
              >
                Create Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCarPage;
