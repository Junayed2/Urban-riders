import React from "react";
import { useParams } from "react-router";
import Bike from "../images/Frame.png";
import Car from "../images/Frame-2.png";
import Bus from "../images/Frame-1.png";
import Train from "../images/Group.png";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Map from "../GoogleMap/Map";

const Destination = () => {
  const { name } = useParams();
  return (
    <div>
      {/* <h1>This is destination page</h1> */}
      <div className='col-md-4'>
      <h1>Thank You For Choosing '{name}'</h1>
      {name === "Bike" ? <img src={Bike} alt="" /> : ""}
      {name === "Car" ? <img src={Car} alt="" /> : ""}
      {name === "Bus" ? <img src={Bus} alt="" /> : ""}
      {name === "Train" ? <img src={Train} alt="" /> : ""}
      <h4>Please Select your destination.Where you want to go.</h4>
      </div>
      <br />
      <div className="row">
        <div className="col-md-4">
          <div
            style={{
              border: "2px solid black",
              textAlign: "center",
              width: "80%",
              margin: "auto",
              backgroundColor: "gray",
              borderRadius: "5px",
            }}
          >
            <form style={{ paddingBottom: "35px" }} action="">
              <label for="cars">Pick From</label>
              <br />
              <select
                style={{ width: "80%", height: "40px", borderRadius: "5px" }}
                id="from"
                name="from"
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Khulna">Khulna</option>
                <option value="Narsingdi">Narsingdi</option>
              </select>
              <br />
              <label for="cars">Pick To</label>
              <br />
              <select
                style={{ width: "80%", height: "40px", borderRadius: "5px" }}
                id="from"
                name="from"
              >
                <option value="Dhaka">Chittagong</option>
                <option value="Chittagong">Dhaka</option>
                <option value="Khulna">Khulna</option>
                <option value="Narsingdi">Narsingdi</option>
              </select>
              <br />
              <br />
              <input
                style={{ width: "80%", height: "40px", borderRadius: "5px" }}
                type="submit"
                value="Search"
              />
            </form>
          </div>
        </div>
        <div  className="col-md-8">
        <Map></Map>
        </div>
      </div>
    </div>
  );
};

export default Destination;
