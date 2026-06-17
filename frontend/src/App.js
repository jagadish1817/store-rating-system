import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StoreList from "./pages/StoreList";
import OwnerDashboard from "./pages/OwnerDashboard";
import UserList from "./pages/UserList";
import AddStore from "./pages/AddStore";
import StoreAdminList from "./pages/StoreAdminList";
import ChangePassword from "./pages/ChangePassword";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/stores" element={<StoreList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/add-store" element={<AddStore />} />
        <Route path="/store-list" element={<StoreAdminList />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
