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
        className={` bg-[#D5B990] -mt-8 rounded-b-3xl scale-95 p-5 flex justify-evenly items-start gap-5 overflow-y-hidden`}
        animate={{ height: clicked ? "15vh" : "0vh", opacity: clicked ? 1 : 0 }}
      >
        <div className="w-1/2">
          <span className=" bg-[#B39B78] p-2 rounded-2xl"># Tags</span>
          <h3 className="h-1/2 p-2 rounded-2xl px-10 border-4 border-[#968264]">
            {hotel.Tags}
          </h3>
        </div>
        <span className=" h-full bg-[#685a43] w-[2px]" />
        <div className="w-1/2">
          <span className=" bg-[#B39B78] p-2 rounded-2xl">Top Review</span>
          <h3 className="h-1/2 p-2 rounded-2xl px-10 border-4 border-[#968264]">
            {hotel.Positive_Review}
          </h3>
        </div>
      </motion.div>
    </>
  );
};

export default Card;
