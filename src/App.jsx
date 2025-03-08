import MainLayout from "./layout/MainLayout/MainLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
// import GlobalProviders from "./lib/GlobalProvider";
import OutputRecord from "./pages/outputRecord/Output";
import Rider from "./pages/Rider/View"

const App = () => {
  


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<MainLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/output" element={<OutputRecord />} />
        </Route>
        <Route path="/rider/:rider" element={<Rider />} />
      </Routes>
      {/* <GlobalProviders/> */}
    </>
  );
};

export default App;
