import { useState } from "react";

function AddStore() {
  const [store, setStore] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  return (
    <div>
      <h1>Add Store</h1>

      <input
        type="text"
        placeholder="Store Name"
        value={store.name}
        onChange={(e) => setStore({ ...store, name: e.target.value })}
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Store Email"
        value={store.email}
        onChange={(e) => setStore({ ...store, email: e.target.value })}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Store Address"
        value={store.address}
        onChange={(e) => setStore({ ...store, address: e.target.value })}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Owner ID"
        value={store.owner_id}
        onChange={(e) => setStore({ ...store, owner_id: e.target.value })}
      />

      <br />
      <br />

      <button
        onClick={async () => {
          try {
            const res = await fetch("http://localhost:5000/api/store/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(store),
            });

            const data = await res.json();

            alert(data.message);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Add Store
      </button>
    </div>
  );
}

export default AddStore;
