import React from "react";
import "../NavBar/NavBar.css";

function NavBar({ children }) {
  return <div className="nav-bar">{children}</div>;
}

export default NavBar;
