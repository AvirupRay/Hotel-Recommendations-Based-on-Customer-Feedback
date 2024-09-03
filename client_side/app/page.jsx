"use client";

import axios from "axios";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import img from "../public/room2.jpg";
import hotel1 from "../public/room.jpg";
import Card from "@/components/Card";
import { motion } from "framer-motion";
import { GoPerson } from "react-icons/go";

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
  //country top
  const [countryHotel, setCountryHotel] = useState([]);

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

  const hotelCountry = async (country) => {
    const data = {
      country: country,
    };
    console.log(data);
    await axios
      .post("http://localhost:5000/hotelCountry", data)
      .then((res) => {
        console.log(res.data);
        setCountryHotel(res.data);
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
          <div className="flex flex-col gap-6 p-10 w-[80vw] h-auto">
            {result.map((hotel) => (
              <Card hotel={hotel} />
            ))}
          </div>
        </div>
        {/*  */}
        {/* third */}
        {/*  */}
        <div className="h-[120vh] flex flex-col justify-center items-center w-full gap-5">
          <h1 className="text-5xl font-bold text-[#291F0F] font-sans">
            Popular Destination
          </h1>
          <p className=" font-mono">
            Explore the best hotels in top destinations.
          </p>
          <div className=" flex flex-col gap-10">
            <div className="flex justify-center items-center gap-10">
              <motion.div
                className="w-[20vw] bg-[#D4C3AA] h-[46vh] overflow-hidden"
                whileHover={
                  ({ scale: 1.02 }, { boxShadow: "0px 0px 10px 0px #857359" })
                }
                onClick={() => hotelCountry("NL")}
              >
                <img
                  src="https://images.unsplash.com/photo-1646388264694-2c854514bd66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5ldGhlcmxhbmRzfGVufDB8fDB8fHww"
                  alt=""
                  whileHover={{ scale: 1.2 }}
                />
                <h1 className=" font-sans text-2xl font-bold px-2">
                  Netherlands
                </h1>
                <p className="font-mono px-2">
                  Discover the enchanting land of windmills and tulips. Book
                  your stay in the heart of the Netherlands today.
                </p>
              </motion.div>
              <motion.div
                className="w-[20vw] bg-[#D4C3AA] h-[46vh] overflow-hidden "
                whileHover={
                  ({ scale: 1.02 }, { boxShadow: "0px 0px 10px 0px #857359" })
                }
                onClick={() => hotelCountry("UK")}
              >
                <img
                  src="https://images.unsplash.com/photo-1660814065563-943aada21d2e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <h1 className=" font-sans text-2xl font-bold px-2">
                  United Kingdom
                </h1>
                <p className="font-mono px-2">
                  Experience the breathtaking landscapes of the United Kingdom.
                  Explore rugged coastlines, rolling hills, and serene
                  countryside.
                </p>
              </motion.div>
              <motion.div
                className="w-[20vw] bg-[#D4C3AA] h-[46vh] overflow-hidden "
                whileHover={
                  ({ scale: 1.02 }, { boxShadow: "0px 0px 10px 0px #857359" })
                }
                onClick={() => hotelCountry("FR")}
              >
                <img
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <h1 className=" font-sans text-2xl font-bold px-2">France</h1>
                <p className="font-mono px-2">
                  Experience the magic of France. Find your perfect haven amidst
                  picturesque vineyards and charming villages.
                </p>
              </motion.div>
            </div>

            {/* second row */}
            <div className="flex gap-10">
              <motion.div
                className="w-[20vw] bg-[#D4C3AA] h-[46vh] overflow-hidden "
                whileHover={
                  ({ scale: 1.02 }, { boxShadow: "0px 0px 10px 0px #857359" })
                }
                onClick={() => hotelCountry("ES")}
              >
                <img
                  src="https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <h1 className=" font-sans text-2xl font-bold px-2">Spain</h1>
                <p className="font-mono px-2">
                  Discover the vibrant culture and rich history of Spain. Book
                  your stay and explore a world of flamenco, tapas, and ancient
                  architecture.
                </p>
              </motion.div>
              <motion.div
                className="w-[20vw] bg-[#D4C3AA] h-[46vh] overflow-hidden "
                whileHover={
                  ({ scale: 1.02 }, { boxShadow: "0px 0px 10px 0px #857359" })
                }
                onClick={() => hotelCountry("IT")}
              >
                <img
                  src="https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <h1 className=" font-sans text-2xl font-bold px-2">Italy</h1>
                <p className="font-mono px-2">
                  Discover the enchanting land of romance and culture. Book your
                  stay in the heart of Italy today.
                </p>
              </motion.div>
              <motion.div
                className="w-[20vw] bg-[#D4C3AA] h-[46vh] overflow-hidden "
                whileHover={
                  ({ scale: 1.02 }, { boxShadow: "0px 0px 10px 0px #857359" })
                }
                onClick={() => hotelCountry("AT")}
              >
                <img
                  src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <h1 className=" font-sans text-2xl font-bold px-2">Austria</h1>
                <p className="font-mono px-2">
                  From the iconic Vienna State Opera to the breathtaking Alps,
                  Austria offers a wealth of cultural experiences. Book your
                  stay and discover it all.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        {/* fourth */}
        {/*  */}
        {/*  */}
        <div className="h-[120vh] flex flex-col justify-center items-center w-full gap-5 bg-[#D4C3AA]">
          <motion.h1
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl font-bold text-[#291F0F] font-sans"
          >
            Popular Destination
          </motion.h1>
          <p className=" font-mono">
            Explore the best hotels in top destinations.
          </p>
          <div className=" flex flex-col gap-10">
            <motion.div
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex justify-center items-center gap-10"
            >
              <motion.div
                className="w-[25vw] bg-[#E6D5BC] h-[60vh] overflow-hidden flex flex-col justify-start items-center py-10 border-2 border-[#C7A26B]"
                whileHover={
                  ({ scale: 1.2 }, { boxShadow: "0px 0px 10px 0px #857359" })
                }
              >
                <Image
                  src={hotel1}
                  width={800}
                  alt="Hotel"
                  className=" object-cover mb-10"
                />
                <div className="flex items-center justify-between w-[80%] mb-5">
                  <h1 className=" font-sans text-2xl font-bold px-2">
                    The Grand Hotel
                  </h1>
                  <p>⭐ 4.9</p>
                </div>

                <p className="font-mono px-2 w-[80%] mb-5">
                  Luxurious accommodations in the heart of the city
                </p>
                <div className="flex items-center justify-between w-[80%]">
                  <span className="flex items-center gap-2">
                    <GoPerson className="text-[#291F0F] text-2xl" />{" "}
                    <p className="font-semibold text-[#291F0F]">2 persons</p>
                  </span>
                  <span className="font-semibold text-[#291F0F]">€250</span>
                </div>
              </motion.div>
              <motion.div
                className="w-[25vw] bg-[#E6D5BC] h-[60vh] overflow-hidden flex flex-col justify-start items-center py-10 border-2 border-[#C7A26B]"
                whileHover={
                  ({ scale: 1.2 }, { boxShadow: "0px 0px 10px 0px #857359" })
                }
              >
                <img
                  src="https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className=" object-cover mb-10"
                />
                <div className="flex items-center justify-between w-[80%] mb-5">
                  <h1 className=" font-sans text-2xl font-bold px-2">
                    The Ritz-Carlton
                  </h1>
                  <p>⭐ 4.7</p>
                </div>

                <p className="font-mono px-2 w-[80%] mb-5">
                  Elegant and luxurious hotel with stunning views.
                </p>
                <div className="flex items-center justify-between w-[80%]">
                  <span className="flex items-center gap-2">
                    <GoPerson className="text-[#291F0F] text-2xl" />{" "}
                    <p className="font-semibold text-[#291F0F]">2 persons</p>
                  </span>
                  <span className="font-semibold text-[#291F0F]">€180</span>
                </div>
              </motion.div>
              <motion.div
                className="w-[25vw] bg-[#E6D5BC] h-[60vh] overflow-hidden flex flex-col justify-start items-center py-10 border-2 border-[#C7A26B]"
                whileHover={
                  ({ scale: 1.2 }, { boxShadow: "0px 0px 10px 0px #857359" })
                }
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className=" object-cover mb-10"
                />
                <div className="flex items-center justify-between w-[80%] mb-5">
                  <h1 className=" font-sans text-2xl font-bold px-2">
                    The Westin
                  </h1>
                  <p>⭐ 4.8</p>
                </div>

                <p className="font-mono px-2 w-[80%] mb-5">
                  Modern and comfortable hotel with great amenities.
                </p>
                <div className="flex items-center justify-between w-[80%]">
                  <span className="flex items-center gap-2">
                    <GoPerson className="text-[#291F0F] text-2xl" />{" "}
                    <p className="font-semibold text-[#291F0F]">2 persons</p>
                  </span>
                  <span className="font-semibold text-[#291F0F]">€200</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
