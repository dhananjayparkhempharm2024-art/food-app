import { Outlet } from "react-router-dom";
import RestaurantNavbar from "../components/nav-comp/RestaurantNavbar";

const RestaurantLayout = () => {
  return (
    <>
      <RestaurantNavbar />
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </>
  );
};

export default RestaurantLayout;

