import MainLayout from "@/layout/MainLayout/MainLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard";
import Login from "@/pages/login/Login";
import ViewRiderDetails from "@/pages/Rider/View"
import Rider from "@/pages/Rider"

const App = () => {
  


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<MainLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/rider" element={<Rider />} />
        </Route>
        <Route path="/rider/:rider" element={<ViewRiderDetails />} />
      </Routes>
    </>
  );
};

export default App;
