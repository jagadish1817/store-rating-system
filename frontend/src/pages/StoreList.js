import { useEffect, useState } from "react";
import axios from "axios";

function StoreList() {
  const [stores, setStores] = useState([]);
  const [rating, setRating] = useState({});
  const [search, setSearch] = useState("");
  const [averageRatings, setAverageRatings] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/store/all")
      .then(async (res) => {
        setStores(res.data);

        const ratingsObj = {};

        for (const store of res.data) {
          const avgRes = await axios.get(
            `http://localhost:5000/api/rating/average/${store.id}`,
          );

          ratingsObj[store.id] = avgRes.data.average_rating;
        }

        setAverageRatings(ratingsObj);
      })
      .catch((err) => console.log(err));
  }, []);

  const submitRating = async (storeId) => {
    try {
      await axios.post("http://localhost:5000/api/rating/submit", {
        user_id: 1,
        store_id: storeId,
        rating: rating,
      });

      alert("Rating Submitted Successfully");

      const avgRes = await axios.get(
        `http://localhost:5000/api/rating/average/${storeId}`,
      );

      setAverageRatings((prev) => ({
        ...prev,
        [storeId]: avgRes.data.average_rating,
      }));
    } catch (error) {
      console.log(error);
      alert("Error submitting rating");
    }
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container">
      <h1 className="title">Store Rating System</h1>

      <input
        className="rating-input"
        type="text"
        placeholder="Search by Name or Address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

      {filteredStores.length > 0 ? (
        filteredStores.map((store) => (
          <div key={store.id} className="store-card">
            <h3>{store.name}</h3>
            <p>{store.address}</p>
            <p>Email: {store.email}</p>

            <p>
              Average Rating:{" "}
              {averageRatings[store.id] != null
                ? Number(averageRatings[store.id]).toFixed(1)
                : "0.0"}{" "}
              ⭐
            </p>

            <input
              className="rating-input"
              type="text"
              min="1"
              max="5"
              placeholder="Rate 1-5"
              onChange={(e) =>
                setRating({
                  ...rating,
                  [store.id]: e.target.value,
                })
              }
            />

            <button className="btn" onClick={() => submitRating(store.id)}>
              Submit Rating
            </button>
          </div>
        ))
      ) : (
        <h3>Store Not Available</h3>
      )}
    </div>
  );
}

export default StoreList;
