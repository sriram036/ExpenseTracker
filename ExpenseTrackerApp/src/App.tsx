import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;



  const [items, setItems] = useState<
    { id: number, amount: string, category: string, description: string, date: string, createdAt: string }[]
  >([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const sortedItems = [...items].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const indexOfLastItem = currentPage * recordsPerPage;
  const indexOfFirstItem = indexOfLastItem - recordsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / recordsPerPage);

  const fetchUsers = () => {
    fetch("https://expensetracker-fuws.onrender.com/api/getExpenses")
      .then((res) => res.json())
      .then((data) => setItems(data));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.category || !formData.description || !formData.date) {
      alert("Please fill all fields");
      return;
    }

    
    const response = await fetch("https://expensetracker-fuws.onrender.com/api/addExpense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    await response.text();
    setFormData({ amount: "", category: "", description: "", date:"" });
    // console.log("Form submitted:", formData);
    // console.log("Items:",items);
    
    alert("Form submitted");
    fetchUsers();

  };

  return (
    <div className="page">
      <h2 className="title">Expense Tracker Form 🧾</h2>

      <form onSubmit={handleSubmit} className="formCard">
        <div className="formRow">

          <input
            type="text"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="input"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleSelectChange}
            className="input"
          >
            <option>Please Select</option>
            <option>Home</option>
            <option>Office</option>
            <option>Travel</option>
            <option>Entertainment</option>
            <option>Food</option>
            <option>Miscellaneous</option>
          </select>

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="input"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input"
          />
        </div>

        <button type="submit" className="button">
          Add Expense
        </button>
      </form>

      <div className="tableCard">
        <h2>Expense List</h2>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
              <th onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              style={{ cursor: "pointer" }}>Created At {sortOrder === "asc" ? "↑" : "↓"}</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((obj, index) => (
              <tr key={index}>
                <td>{obj.id}</td>
                <td>{obj.amount}</td>
                <td>{obj.category}</td>
                <td>{obj.description}</td>
                <td>{obj.date}</td>
                <td>{obj.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App
