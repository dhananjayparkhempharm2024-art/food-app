import { Outlet } from "react-router-dom";
import UserNavbar from "../components/nav-comp/UserNavbar";

const CustomerLayout = () => {
  return (
    <>
      <UserNavbar />
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </>
  );
};

export default CustomerLayout;

