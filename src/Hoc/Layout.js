import React from "react";

// components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Layout = props => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
