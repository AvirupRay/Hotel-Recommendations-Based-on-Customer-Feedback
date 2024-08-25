"use client";
import React from "react";
import { motion } from "framer-motion";

const Card = ({ hotel }) => {
  return (
    <div className=" bg-[#ffffffc0] p-5 rounded-3xl flex ">
      <div className="flex flex-col">
        <h1>{hotel.Hotel_Name}</h1>
        <h3>{hotel.Hotel_Address}</h3>
      </div>
      <div>{hotel.Price}</div>
    </div>
  );
};

export default Card;
