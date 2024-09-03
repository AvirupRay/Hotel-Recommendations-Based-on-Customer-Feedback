"use client";
import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdLocalDining } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { LuTv } from "react-icons/lu";
import { FaWifi } from "react-icons/fa6";
import { MdOutlineRoomService } from "react-icons/md";
import { PiBathtub } from "react-icons/pi";
import { GiBiceps } from "react-icons/gi";
import { MdPool } from "react-icons/md";
import { RiParkingFill } from "react-icons/ri";
import { FaSprayCanSparkles } from "react-icons/fa6";

// const [hover, setHover] = useState(second);
const Card = ({ hotel }) => {
  const [clicked, setClicked] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    clicked ? setClicked(false) : setClicked(true);
  };
  const amenitiesLogo = (amenity) => {
    if (amenity === "Air Conditioning") {
      return <motion.TbAirConditioning className="text-3xl" />;
    } else if (amenity === "TV") {
      return <LuTv className="text-3xl" />;
    } else if (amenity === "Fine dining") {
      return <MdLocalDining className="text-3xl" />;
    } else if (amenity === "Wifi") {
      return <FaWifi className="text-3xl" />;
    } else if (amenity === "Room Service") {
      return <MdOutlineRoomService className="text-3xl" />;
    } else if (amenity === "Gym") {
      return <GiBiceps className="text-3xl" />;
    } else if (amenity === "Swimming Pool") {
      return <MdPool className="text-3xl" />;
    } else if (amenity === "Parking") {
      return <RiParkingFill className="text-3xl" />;
    } else if (amenity === "BathTub") {
      return <PiBathtub className="text-3xl" />;
    } else if (amenity === "Spa") {
      return <FaSprayCanSparkles className="text-3xl" />;
    }
  };
  return (
    <>
      <div
        className={`bg-[#c4a428] ${
          hotel.isRecent ? " opacity-100" : "opacity-0"
        } w-52 -my-8 mx-10 px-5 rounded-xl p-2 pb-4 font-semibold text-lg text-center`}
      >
        Recently Reviewed
      </div>
      <motion.div
        className=" bg-[#fffef2] p-10 rounded-3xl flex h-78 justify-between items-center cursor-pointer z-10 gap-5"
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px 0px #000000" }}
        onClick={handleSubmit}
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-16 items-center">
            <h1 className=" text-3xl font-bold">{hotel.Hotel_Name}</h1>
            <motion.span className="flex gap-3">
              {hotel.Amenities.map((i) => amenitiesLogo(i))}
            </motion.span>
          </div>
          <h3>{hotel.Hotel_Address}</h3>
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-mono text-2xl font-bold">{hotel.Stars}⭐</span>
          <span className="text-xl font-bold">€ {hotel.Price}</span>
        </div>
      </motion.div>
      <motion.div
        className={` bg-[#D5B990] -mt-8 mb-4 rounded-b-3xl scale-95 p-5 flex flex-col justify-evenly items-start gap-5 overflow-y-hidden`}
        animate={{ height: clicked ? "auto" : "0vh", opacity: clicked ? 1 : 0 }}
      >
        <div className="flex justify-between items-start w-full px-5">
          <span className="font-mono text-2xl font-bold">
            Review Score-
            {hotel.Reviewer_Score}
          </span>
          <span className="font-mono text-2xl font-bold">
            Hotel Rating-
            {hotel.Average_Score}
          </span>
        </div>
        <div className="flex justify-evenly items-start gap-5 overflow-y-hidden ">
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
        </div>
      </motion.div>
    </>
  );
};

export default Card;
