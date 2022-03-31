import { useContext } from "react";

import { Button } from "..";

import { logout } from "../../global/auth-helper";

import AuthContext from "../../global/auth/auth-context";

import "./UserModal.scss";

const UserModal = ({ user }) => {
  const authCtx = useContext(AuthContext);

  const handleLogout = async () => {
    authCtx.handleFetching();
    await logout();
    authCtx.logOut();
  };

  console.log(authCtx.user);

  return (
    <div className="userModal bg-quaternary w-[20vw] z-10 absolute right-[2rem] px-[0.2vw] rounded-b-[6px]">
      <div className="flex justify-center items-center flex-wrap h-[10vh]">
        <h1 className="text-xl font-bold text-center text-dark mr-2">
          {user?.name}
        </h1>
        {user?.verified && (
          <img
            src="/src/img/assets/tick.png"
            title="Account verified"
            alt="Verified"
            className="w-[20px]"
          />
        )}
        {!user?.verified && (
          <img
            src="/src/img/assets/cross.png"
            title="Account not verified"
            alt="Not Verified"
            className="w-[20px]"
          />
        )}
      </div>
      <Button text="Profile" classList={["w-full", "mb-1"]} />
      <Button text="Placeholder1" classList={["w-full", "mb-1"]} />
      <Button text="Placeholder2" classList={["w-full", "mb-1"]} />
      <Button text="Placeholder3" classList={["w-full", "mb-1"]} />
      <Button
        text="Logout"
        classList={["w-full", "mb-1"]}
        func={handleLogout}
      />
    </div>
  );
};

export default UserModal;
