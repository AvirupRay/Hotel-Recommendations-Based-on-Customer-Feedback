"use client";

import React from "react";
import { useState } from "react";

const page = () => {
  // setting range
  const [fromNum, setFromNum] = useState(0);
  const [toNum, setToNum] = useState(0);
  //setting country
  const [country, setCountry] = useState("");
  //setting stars
  const [stars, setStars] = useState(0);
  //setting sort
  const [sort, setSort] = useState(0);
  //setting text
  const [text, setText] = useState("");
  //submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromNum > toNum) {
      alert("From price should be less than to price");
      return;
    }
    console.log("submitted");
    console.log(stars);
    console.log(fromNum);
    console.log(toNum);
    console.log(country);
    console.log(sort);
    console.log(text);
  };

  return (
    <>
      {/* https://colorhunt.co/palette/1a363640534c677d6ad6bd98 */}
      {/* https://colorhunt.co/palette/f8ede3dfd3c3d0b8a8c5705d */}
      {/* body */}
      <div className=" flex flex-col justify-center items-center w-full h-auto overflow-x-auto">
        {/* first */}
        <div className=" bg-white w-[100vw] h-[100vh] text-black">
          <div>adad</div>
        </div>

        {/* second */}
        <div className=" w-[100vw] h-[100vh] flex bg-[#DFD3C3] justify-center items-center">
          <div className="bg-[#D0B8A8] w-1/2 h-3/4 p-10 rounded-3xl flex justify-evenly items-center">
            <form action="">
              {/* country */}
              <label htmlFor="country">Select country: </label>
              <select
                id="country"
                name="country"
                className="rounded-lg outline-none"
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="NL">Netherlands</option>
                <option value="UK">United Kingdom</option>
                <option value="FR">France</option>
                <option value="ES">Spain</option>
                <option value="IT">Italy</option>
                <option value="AT">Austria</option>
              </select>
              {"      "}
              {/* stars */}
              <label htmlFor="stars">Rating: </label>
              <select
                id="stars"
                name="stars"
                className="rounded-lg outline-none"
                onChange={(e) => setStars(parseInt(e.target.value))}
              >
                <option value={0}>Any</option>
                <option value={5}>5⭐</option>
                <option value={4}>4⭐</option>
                <option value={3}>3⭐</option>
              </select>
              <br />
              <br />
              {/* price */}
              <label htmlFor="price">Price range:</label>
              <br />
              <label htmlFor="from">From: </label>
              <input
                type="number"
                className="w-32 rounded-lg outline-none"
                min="0"
                onChange={(e) => setFromNum(parseInt(e.target.value))}
              />{" "}
              - <label htmlFor="till">To: </label>
              <input
                type="number"
                className="w-32 rounded-lg outline-none"
                min="0"
                onChange={(e) => setToNum(parseInt(e.target.value))}
              />
              <br />
              <br />
              {/* sort */}
              <label htmlFor="sort">Sort by:</label>
              <br />
              <select
                id="sort"
                name="sort"
                className="rounded-lg outline-none"
                onChange={(e) => setSort(parseInt(e.target.value))}
              >
                <option value="0">Hotel Rating</option>
                <option value="1">Customer Review Score</option>
                <option value="2">Price per night</option>
              </select>
              <br />
              <br />
              {/* text */}
              <label htmlFor="user_message">Decribe preference: </label>
              <br />
              <textarea
                name="user_message"
                rows={2}
                className=" outline-none lg:resize-none rounded-lg w-80 h-20 p-1"
                onChange={(e) => setText(e.target.value)}
              />
              <br />
              <br />
              {/* submit */}
              <button
                className="bg-[#C5705D] p-2 rounded-xl w-3/4"
                onClick={handleSubmit}
              >
                <b> Submit </b>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
