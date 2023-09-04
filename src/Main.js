import { useState, useEffect } from "react";
import Api from "./Api";

export default function Meme() {
  const [state, setState] = useState("https://i.imgflip.com/30b1gx.jpg");

  function changeMeme() {
    const randomNumber = Math.floor(Math.random() * Api.length);
    setState(Api[randomNumber].url);
  }

  return (
    <main className=" grid justify-center items-center">
      <div className="flex justify-center m-12  ">
        <input
          type="text"
          placeholder="1"
          className="w-72 h-14 border-2 border-slate-300 rounded-xl mx-4 px-3 outline-none text-xl"
        />
        <input
          type="text"
          placeholder="2"
          className="w-72 h-14 border-2 border-slate-300 rounded-xl mx-4 px-3 outline-none text-xl"
        />
      </div>
      <button
        onClick={changeMeme}
        className="bg-gradient-to-r from-custom-main to-custom-secondary px-32 py-4 text-white text-3xl rounded-3xl"
      >
        Get A New Meme
      </button>
      <div className="w-96">
        <img src={state} className=" h-full" />
      </div>
    </main>
  );
}
