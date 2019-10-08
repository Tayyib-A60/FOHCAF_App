import React from "react";

// core components
import Login from '../../components/Login/Login';

const AdminLogin = () => {
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <div className="page-header clear-filter" filter-color="blue" style={{marginTop: '-1.4rem', zIndex: 5 }}>
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
          }}
        ></div>
        <Login />
      </div>
    </>
  );
}

export default AdminLogin;