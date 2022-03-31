import { lazy, Suspense, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthContext from "./global/auth/auth-context";

import "./App.scss";

// Component imports
import { Navbar, Footer, Loader, UserModal } from "./components";

// Pages imports
const Home = lazy(() => import("./screens/Home"));
const Auth = lazy(() => import("./screens/Auth"));
const OTP = lazy(() => import("./screens/OTP"));
const Profile = lazy(() => import("./screens/Profile"));
const Doctors = lazy(() => import("./screens/Doctors"));
const Appointment = lazy(() => import("./screens/Appointment"));
const Error404 = lazy(() => import("./screens/Error404"));

function App() {
  const [displayModal, setDisplayModal] = useState(false);

  const authCtx = useContext(AuthContext);

  const handleToggleDisplayModal = () => {
    setDisplayModal((prevDisplayState) => !prevDisplayState);
  };

  //? To display LOADING screen on handling requests
  if (authCtx.isUserFetching) {
    return (
      <>
        <Navbar />
        <main>
          <Loader message={"Handling your request"} />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar onProfileClick={handleToggleDisplayModal} />
      <main>
        {/* USER MODEL  */}
        {authCtx.isLoggedIn && displayModal && (
          <UserModal user={authCtx.user} />
        )}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {authCtx.isLoggedIn ? (
              <Route path="/auth" element={<Navigate replace to={"/"} />} />
            ) : (
              <Route path="/auth" element={<Auth />} />
            )}

            {/* OTP Verification */}
            {authCtx.user?.verified ? (
              <Route
                path="/otp/verify"
                element={<Navigate replace to={"/"} />}
              />
            ) : (
              <Route path="/otp/verify" element={<OTP />} />
            )}
            {authCtx.isLoggedIn && (
              <Route path="/doctor/:id" element={<Profile />} />
            )}
            {authCtx.isLoggedIn && (
              <Route path="/profile/:id" element={<Profile />} />
            )}
            {authCtx.isLoggedIn ? (
              <Route path="/appointment/:id" element={<Appointment />} />
            ) : (
              <Route
                path="/appointment"
                element={<Navigate replace to={"/auth"} />}
              />
            )}
            {/* <Route path="/doctor/:id" element={<Profile />} /> */}
            <Route path="/doctors" element={<Doctors />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
