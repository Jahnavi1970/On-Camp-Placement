import { Typography, Button } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
import interview from "../images/interview.svg";
const Home = () => {
  return (
    <div className="full-width-container">
      <div className="half-width-container">
        <Typography variant="h1" gutterBottom>
          <strong>OnCamp</strong>
        </Typography>
        <Typography>
          OnCamp is a comprehensive platform designed to streamline and optimize
          the management of training and placement data for educational
          institutions' Training and Placement Offices (TPOs). This platform
          empowers TPOs to efficiently organize, track, and administer the
          placement process, offering a range of features for seamless data
          management.
        </Typography>
      </div>
      <div className="half-width-container">
        <img className="img-container" src={interview} />
      </div>
    </div>
  );
};

export default Home;
