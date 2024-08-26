"use client";
import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

const Card = ({ hotel }) => {
  const [clicked, setClicked] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    clicked ? setClicked(false) : setClicked(true);
  };
  return (
    <>
      <motion.div
        className=" bg-[#fffef2] p-10 rounded-3xl flex h-78 justify-between items-center cursor-pointer z-10"
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px 0px #000000" }}
        onClick={handleSubmit}
      >
        <div className="flex flex-col gap-5">
          <h1 className=" text-3xl font-bold">{hotel.Hotel_Name}</h1>
          <h3>{hotel.Hotel_Address}</h3>
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-mono text-2xl font-bold">{hotel.Stars}⭐</span>
          <span className="text-xl font-bold">€ {hotel.Price}</span>
        </div>
      </motion.div>
      <motion.div
        className={` bg-[#D5B990] -mt-8 rounded-b-3xl scale-95 p-2 flex flex-col justify-center items-start gap-5`}
        animate={{ height: clicked ? "15vh" : "0vh", opacity: clicked ? 1 : 0 }}
      >
        <span className=" bg-[#B39B78] p-2 rounded-2xl"># Tags</span>
        <h3 className="h-1/2 rounded-3xl px-10">{hotel.Tags}</h3>
      </motion.div>
    </>
  );
};

export default Card;
