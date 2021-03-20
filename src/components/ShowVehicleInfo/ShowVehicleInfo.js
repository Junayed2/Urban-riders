import React from "react";
import { Link } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const ShowVehicleInfo = (props) => {
  const { name, image } = props.vehicle;
  return (
    <Link style={{ textDecoration: "none" }} to={`/destination/${name}`}>
      <div style={{ color: "black", marginLeft:'40px' }} className="col-md-3">
        <div>
          <img
            style={{ borderRadius: "8px", height: "180px" }}
            src={image}
            alt=""
          />
        </div>
        <div>
          <h1>{name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default ShowVehicleInfo;
