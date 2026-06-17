import { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/change-password",
        {
          userId,
          password,
        },
      );

      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  };

  return (
    <div>
      <h1>Change Password</h1>

      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
}

export default ChangePassword;
