import { useState } from "react";

export default function OrderForm() {
  const [customerName, setCustomerName] = useState("");
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  const validate = (name) => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.customerName = "Name is required.";
    } else if (name.length < 3) {
      newErrors.customerName = "Name must be at least 3 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.customerName = "Only letters and spaces are allowed.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCustomerName(value);
    setErrors(validate(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate(customerName);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Simulate API submission
    setStatusMessage(`✅ Order submitted for ${customerName}`);
    setCustomerName("");
    setErrors({});
  };

  const handleDelete = () => {
    // Simulate deletion logic
    setStatusMessage(`🗑️ Order for "${customerName}" has been deleted.`);
    setCustomerName("");
    setErrors({});
  };

  return (
    <div className="order-form bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="customerName" className="block font-medium mb-1">
            Customer Name
          </label>
          <input
            id="customerName"
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.customerName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.customerName && (
            <p className="text-red-600 text-sm mt-1">{errors.customerName}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Order
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Delete Order
          </button>
        </div>
      </form>

      {statusMessage && (
        <p className="text-green-600 mt-4 font-medium">{statusMessage}</p>
      )}
    </div>
  );
}

