"use client";

import React from "react";

const page = () => (
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
            <select id="country" name="country" className="rounded-lg">
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
            <select id="stars" name="stars" className="rounded-lg">
              <option value="5">5⭐</option>
              <option value="4">4⭐</option>
              <option value="3">3⭐</option>
              <option value="others">others</option>
            </select>
            <br />
            <br />
            {/* price */}
            <label htmlFor="price">Price range:</label>
            <br />
            <label htmlFor="from">From: </label>
            <input type="number" className="w-32 rounded-lg" /> -{" "}
            <label htmlFor="till">To: </label>
            <input type="number" className="w-32 rounded-lg" />
            <br />
            <br />
            {/* sort */}
            <label htmlFor="sort">Sort by:</label>
            <br />
            <select id="sort" name="sort" className="rounded-lg">
              <option value="price">Hotel Rating</option>
              <option value="stars">Customer Review Score</option>
              <option value="name">Price per</option>
            </select>
            <br />
            <br />
            {/* text */}
            <label htmlFor="user_message">Description: </label>
            <br />
            <textarea
              name="user_message"
              rows={2}
              className=" outline-none lg:resize-none rounded-lg w-80 h-20 p-1"
            />
            <br />
            <br />
            {/* submit */}
            <button className="bg-[#C5705D] p-2 rounded-xl w-3/4">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
);

export default page;
