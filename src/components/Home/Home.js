import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Homebg from "../images/Bg.png";
import logo from "../images/Urban Riders.png";
import Data from "../data/data.json";
import ShowVehicleInfo from "../ShowVehicleInfo/ShowVehicleInfo";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const Home = () => {
  return (
    <div style={{ backgroundImage: `url(${Homebg})` }} className="header">
      <nav className="nav">
        <ul>
          <li>
            <img className="logo" src={logo} alt="" />
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/destination">Destination</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
        </ul>
      </nav>
      <div
        className="title-container vehicleStyle col-lg-12 row"
        style={{ width: "100%" }}
      >
        {Data.map((vehicle) => (
          <ShowVehicleInfo vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Home;
