import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFiltered(data);
        setLoading(false);
      });
  }, []); // 1st, fixed rerendering of fetching, fetch once

  useEffect(() => {
    const result = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFiltered(result);
  }, [search]);

  const handleSearch = (e) => {
    setTimeout(() => {
      setSearch(e.target.value);
    }, 300);
  };

  const handleDelete = (id) => {
    const updated = users;
    const index = updated.findIndex((u) => u.id === id);
    updated.splice(index, 1);
    setUsers(updated);
    setFiltered(updated);
  };

  const handleSelect = (id) => {
    if (id == selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  return (
    <div>
      <h2>Users ({users.length})</h2>
      <input
        placeholder="Search user..."
        value={search}
        onChange={handleSearch}
      />
      {loading && <p>Loading...</p>}

      <ul>
        {filtered.map((user, index) => (
          <li key={index} onClick={() => handleSelect(user.id)}>
            {user.name}
            <button onClick={handleDelete}>Delete</button>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && <p>No users found.</p>}
    </div>
  );
}
