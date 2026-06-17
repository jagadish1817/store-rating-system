import { useEffect, useState } from "react";
import axios from "axios";

function StoreAdminList() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.email.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase()),
  );
  const sortByName = () => {
    const sorted = [...stores].sort((a, b) => a.name.localeCompare(b.name));

    setStores(sorted);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/store/admin/all")
      .then((res) => {
        console.log(res.data);
        setStores(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>All Stores</h1>

      {stores.length === 0 ? (
        <p>No stores found</p>
      ) : (
        <>
         
          <button onClick={sortByName}>Sort By Name</button>
          <br />
          <br />
          
          <input
            type="text"
            placeholder="Search Store"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <br />
          <br />
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Rating</th>
              </tr>
            </thead>

            <tbody>
              {filteredStores.map((store) => (
                <tr key={store.id}>
                  <td>{store.name}</td>
                  <td>{store.email}</td>
                  <td>{store.address}</td>
                  <td>{store.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default StoreAdminList;
