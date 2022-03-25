import { Link } from "react-router-dom";

import "./Error404.scss";

// import AuthContext from "../../global/auth/auth-context";

const Error404 = () => {
  return (
    <section className="Error404 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 select-none">
      <div className="error-main">
        <div className="fof">
          <h1>Error 404</h1>
        </div>
      </div>
      <h4>Page not found</h4>
      <p>
        The page you are looking for doesn't exist or an other error occured.
        <br />
        <Link to={"/"}>Go back to homepage.</Link>
      </p>
    </section>
  );
};

export default Error404;
