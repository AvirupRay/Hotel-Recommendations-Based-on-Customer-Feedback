"use client";

import axios from "axios";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import img from "../public/room2.jpg";
import Card from "@/components/Card";
import { motion } from "framer-motion";

const page = () => {
  // setting range
  const [fromNum, setFromNum] = useState(0);
  const [toNum, setToNum] = useState(0);
  //setting country
  const [country, setCountry] = useState("NL");
  //setting stars
  const [stars, setStars] = useState(0);
  //setting sort
  const [sort, setSort] = useState(0);
  //setting text
  const [text, setText] = useState("");
  //submit
  const [result, setResult] = useState([]);
  //result
  const [clicked, setClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fromNum > toNum || toNum < 1) {
      alert("From price should be less than to price");
      return;
    }
    setClicked(true);
    const data = {
      country: country,
      sortBy: sort,
      stars: stars,
      range: [fromNum, toNum],
      description: text,
    };
    console.log(data);
    await axios
      .post("http://localhost:5000/findHotel4", data)
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      {/* https://colorhunt.co/palette/1a363640534c677d6ad6bd98 */}
      {/* https://colorhunt.co/palette/f8ede3dfd3c3d0b8a8c5705d */}
      {/* body */}
      <div className=" flex flex-col justify-center items-center w-full h-auto overflow-y-hidden text-lg">
        {/*  */}
        {/* first */}
        {/*  */}
        <div className=" w-full h-[80vh] flex justify-center gap-10 items-center bg-[#D5B990]">
          {/* form */}
          <div className=" flex flex-col w-1/2 p-5 items-center justify-center">
            <h1 className=" text-5xl font-mono font-bold text-[#291F0F]">
              Find Your Perfect Hotel
            </h1>
            <h5 className=" font-mono">
              Discover the best hotels for your next trip.
            </h5>
            <form
              action=""
              className="bg-[#C3A983] p-14 pr-24 flex flex-col items-center justify-center gap-4 font-sans
              "
            >
              <div className="flex flex-row items-center justify-center gap-8 w-full">
                {/* country */}
                <div className="flex flex-col w-1/3">
                  <label htmlFor="country">Select country: </label>
                  <select
                    id="country"
                    name="country"
                    className="outline-none p-1 bg-[#ECE3D4] border-[#D5B990] border-2"
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="NL">Netherlands</option>
                    <option value="UK">United Kingdom</option>
                    <option value="FR">France</option>
                    <option value="ES">Spain</option>
                    <option value="IT">Italy</option>
                    <option value="AT">Austria</option>
                  </select>
                </div>
                {"      "}
                {/* stars */}
                <div className="flex flex-col w-1/3">
                  <label htmlFor="stars">Rating: </label>
                  <select
                    id="stars"
                    name="stars"
                    className=" outline-none p-1 bg-[#ECE3D4] border-[#D5B990] border-2"
                    onChange={(e) => setStars(parseInt(e.target.value))}
                  >
                    <option value={0}>All Stars</option>
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>
                {/* sort */}
                <div className="w-1/3">
                  <label htmlFor="sort">Sort by:</label>
                  <br />
                  <select
                    id="sort"
                    name="sort"
                    className=" outline-none p-1 bg-[#ECE3D4] border-[#D5B990] border-2"
                    onChange={(e) => setSort(parseInt(e.target.value))}
                  >
                    <option value="0">Hotel Rating</option>
                    <option value="1">Customer Review Score</option>
                    <option value="2">Price per night</option>
                  </select>
                </div>
              </div>

              {/* price */}
              <div className=" w-full flex flex-col justify-start items-start">
                <div>
                  <label htmlFor="price">Price range:</label>
                </div>
                <div>
                  <label htmlFor="from">From: </label>
                  <input
                    type="number"
                    required
                    className="w-50 p-1  outline-none bg-[#B39B78] border-[#857359] border-2"
                    min="0"
                    onChange={(e) => setFromNum(parseInt(e.target.value))}
                  />{" "}
                  - <label htmlFor="till">To: </label>
                  <input
                    type="number"
                    className="w-50 p-1 outline-none bg-[#B39B78] border-[#857359] border-2"
                    required
                    min="0"
                    onChange={(e) => setToNum(parseInt(e.target.value))}
                  />
                </div>
              </div>

              {/* text */}
              <div className="w-full">
                <label htmlFor="user_message">Decribe preference: </label>
                <br />
                <textarea
                  name="user_message"
                  rows={2}
                  className=" outline-none lg:resize-none w-full h-20 p-1 bg-[#B39B78] border-[#857359] border-2"
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              {/* submit */}
              <motion.button
                className="bg-[#d1bb99] rounded-md p-2 w-3/4 font-mono font-thin text-xl cursor-pointer border-[#b19876] border-2"
                onClick={handleSubmit}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 0px 10px 0px #857359",
                }}
                whileTap={{
                  scale: 0.9,
                  boxShadow: "0px 0px 10px 0px #857359",
                }}
              >
                <b> Submit </b>
              </motion.button>
            </form>
          </div>
          {/* image */}
          <div className=" w-1/2">
            <Image
              src={img}
              width={800}
              alt="Hotel"
              className=" object-cover"
            />
          </div>
        </div>
        {/*  */}
        {/* second */}
        {/*  */}
        <div
          className={`${
            clicked ? "h-[156vh] opacity-100" : "h-0 opacity-0"
          } mt-10`}
        >
          <h1 className=" text-5xl font-mono font-bold text-[#291F0F]">
            Hotel Listings
          </h1>
          <div className="flex flex-col gap-6 p-10 w-[80vw] h-[150vh]">
            {result.map((hotel) => (
              <Card hotel={hotel} />
            ))}
          </div>
        </div>
        {/*  */}
        {/* third */}
        {/*  */}
        <div className="h-[80vh] flex flex-col justify-center items-center w-full ">
          <h1 className="text-5xl font-bold text-[#291F0F] font-sans">
            Popular Destination
          </h1>
          <p className=" font-mono">
            Explore the best hotels in top destinations.
          </p>
          <div>
            <div className="flex justify-center items-center ">
              <div className="w-[16vw] bg-[#D4C3AA]">
                <img
                  src="https://images.unsplash.com/photo-1646388264694-2c854514bd66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5ldGhlcmxhbmRzfGVufDB8fDB8fHww"
                  alt=""
                />
                <h1 className=" font-sans text-2xl font-bold px-2">
                  Netherlands
                </h1>
                <p className="font-mono px-2">
                  Discover the enchanting land of windmills and tulips. Book
                  your stay in the heart of the Netherlands today.
                </p>
              </div>
              <div className="w-[16vw] bg-[#D4C3AA]">
                <img
                  src="https://images.unsplash.com/photo-1646388264694-2c854514bd66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5ldGhlcmxhbmRzfGVufDB8fDB8fHww"
                  alt=""
                />
                <h1 className=" font-sans text-2xl font-bold px-2">
                  Netherlands
                </h1>
                <p className="font-mono px-2">
                  Discover the enchanting land of windmills and tulips. Book
                  your stay in the heart of the Netherlands today.
                </p>
              </div>
              <div className="w-[16vw] bg-[#D4C3AA]">
                <img
                  src="https://images.unsplash.com/photo-1646388264694-2c854514bd66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5ldGhlcmxhbmRzfGVufDB8fDB8fHww"
                  alt=""
                />
                <h1 className=" font-sans text-2xl font-bold px-2">
                  Netherlands
                </h1>
                <p className="font-mono px-2">
                  Discover the enchanting land of windmills and tulips. Book
                  your stay in the heart of the Netherlands today.
                </p>
              </div>
            </div>
          </div>
          <div className="flex ">
            <div className="w-[16vw] bg-[#D4C3AA]">
              <img
                src="https://images.unsplash.com/photo-1646388264694-2c854514bd66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5ldGhlcmxhbmRzfGVufDB8fDB8fHww"
                alt=""
              />
              <h1 className=" font-sans text-2xl font-bold px-2">
                Netherlands
              </h1>
              <p className="font-mono px-2">
                Discover the enchanting land of windmills and tulips. Book your
                stay in the heart of the Netherlands today.
              </p>
            </div>
            <div className="w-[16vw] bg-[#D4C3AA]">
              <img
                src="https://images.unsplash.com/photo-1646388264694-2c854514bd66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5ldGhlcmxhbmRzfGVufDB8fDB8fHww"
                alt=""
              />
              <h1 className=" font-sans text-2xl font-bold px-2">
                Netherlands
              </h1>
              <p className="font-mono px-2">
                Discover the enchanting land of windmills and tulips. Book your
                stay in the heart of the Netherlands today.
              </p>
            </div>
            <div className="w-[16vw] bg-[#D4C3AA]">
              <img
                src="https://images.unsplash.com/photo-1646388264694-2c854514bd66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5ldGhlcmxhbmRzfGVufDB8fDB8fHww"
                alt=""
              />
              <h1 className=" font-sans text-2xl font-bold px-2">
                Netherlands
              </h1>
              <p className="font-mono px-2">
                Discover the enchanting land of windmills and tulips. Book your
                stay in the heart of the Netherlands today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
