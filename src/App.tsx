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
  }, [search, users]);

  // const handleSearch = (e: any) => { //the timeout breaks the search
  //   setTimeout(() => {
  //     setSearch(e.target.value);
  //   }, 300);
  // };

  const handleDelete = (id: number) => {
    const updated = users.filter((u) => u.id !== id);
    // updated.splice(index, 1); // this mutates the array, reason why deletes last try only and just updating the list (BUG)
    setUsers(updated);
    // setFiltered(updated); // I remove this to remove the flinch anymation when refetching the new updated list
  };

  const handleSelect = (id: number) => {
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
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "6px",
          marginBottom: "15px",
        }} // use setSearch here directly instead of using handleSearch
      />
      {loading && <p>Loading...</p>}

      <ul>
        {filtered.map((user, index) => (
          <li key={index} onClick={() => handleSelect(user.id)}>
            {user.name}
              <button
                onClick={(e) => {
                  handleDelete(user.id); // pass the id of the name selected to delete
                }}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "red",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                x
              </button>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && <p>No users found.</p>}
    </div>
  );
}
