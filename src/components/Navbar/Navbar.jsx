import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import AuthContext from "../../global/auth/auth-context";

// Component import
import Button from "../Button/Button";

import "./Navbar.scss";

const Navbar = ({ onProfileClick }) => {
  const authCtx = useContext(AuthContext);

  return (
    <nav className="bg-tertiary text-white flex items-center justify-between px-8">
      <Link to="/" className="flex items-center w-1/4">
        <div className="bg-white rounded-full">
          <img
            src="/src/img/assets/icon.png"
            alt="Placebo"
            className="h-[7vh]"
          />
        </div>
        <span className="text-3xl ml-4">Placebo</span>
      </Link>
      <div className="w-2/4  flex justify-evenly">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-xl underline underline-offset-4" : "text-xl"
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/doctors"}
          className={({ isActive }) =>
            isActive ? "text-xl underline underline-offset-4" : "text-xl"
          }
        >
          Doctors
        </NavLink>
        {/* <NavLink
          to={"/specialization"}
          className={({ isActive }) =>
            isActive ? "text-xl underline underline-offset-4" : "text-xl"
          }
        >
          Specialization
        </NavLink>
        </NavLink> */}
        <NavLink
          to={"/chat"}
          className={({ isActive }) =>
            isActive ? "text-xl underline underline-offset-4" : "text-xl"
          }>
          Chat
        </NavLink>
      </div>
      <div className="w-1/4 flex justify-end">
        {!authCtx.isLoggedIn && (
          <>
            <Button
              text="Login"
              link="/auth?type=login&user=user"
              classList={["mr-4"]}
            />
            <Button text="Register" link="/auth?type=register&user=user" />
          </>
        )}
        {/* IsLoggedIn */}

        {authCtx.isLoggedIn && (
          <div
            onClick={onProfileClick}
            className="bg-back rounded-full cursor-pointer w-[7vh] h-[7vh] flex justify-center items-center"
          >
            <img
              src={authCtx.user?.profilePic}
              alt={authCtx.user?.name}
              className="h-full w-full rounded-full object-cover aspect-square"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
