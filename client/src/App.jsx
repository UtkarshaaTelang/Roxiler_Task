// src/App.js or src/routes.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Admin from './pages/Admin';
import User from './pages/User';
import StoreOwner from './pages/StoreOwner';
// import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
<Route path="/user" element={<User />} />
<Route path="/storeowner" element={<StoreOwner />} />
{/* <Route path="/admin" element={
  userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/unauthorized" />
} />
<Route path="/storeowner" element={
  userRole === 'store_owner' ? <StoreOwnerDashboard /> : <Navigate to="/unauthorized" />
} />
<Route path="/user" element={
  userRole === 'normal' ? <UserDashboard /> : <Navigate to="/unauthorized" />
} /> */}

{/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
        {/* Later add protected routes here */}
      </Routes>
    </Router>
  );
}

export default App;
