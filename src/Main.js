import { useState, useEffect } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";

export default function Meme() {
  const [state, setState] = useState({});

  const [formState, setFormState] = useState({
    topText: "",
    bottomtext: "",
    randomImage: "",
    randomName: "",
  });

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setState(data));
  }, []);

  function changeMeme() {
    const randomNumber = Math.floor(Math.random() * state.data.memes.length);
    const url = state.data.memes[randomNumber].url;
    const name = state.data.memes[randomNumber].name;
    setFormState((prevState) => {
      return {
        ...prevState,
        randomImage: url,
        randomName: name,
      };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((prevFormState) => {
      return {
        ...prevFormState,
        [name]: value,
      };
    });
  }

  const wrapper = document.getElementById("image-wrapper");

  function downloadImage() {
    toPng(wrapper)
      .then((data) => {
        download(data, `${formState.randomName}`);
      })
      .catch(() => console.log("Failed"));
  }

  return (
    <main className=" grid justify-center items-center">
      <div className="flex justify-center m-12 ">
        <input
          type="text"
          placeholder="1"
          className="w-72 h-14 border-2 border-slate-300 rounded-xl mx-4 px-3 outline-none text-xl"
          onChange={handleChange}
          name="topText"
          value={formState.topText}
        />
        <input
          type="text"
          placeholder="2"
          className="w-72 h-14 border-2 border-slate-300 rounded-xl mx-4 px-3 outline-none text-xl"
          onChange={handleChange}
          name="bottomtext"
          value={formState.bottomtext}
        />
      </div>
      <div className="flex justify-center align-middle items-center">
        <button
          onClick={changeMeme}
          className="bg-gradient-to-r from-custom-main to-custom-secondary px-32 py-4 text-white text-3xl rounded-3xl  w-auto  "
        >
          Get A New Meme
        </button>
      </div>
      <div
        id="image-wrapper"
        className=" flex justify-center align-middle items-center relative m-2 "
      >
        <img src={formState.randomImage} className=" mx-auto max-w-2xl " />
        <h2 className=" absolute top-5 text-center text-white text-5xl font-bold border-x-zinc-800 drop-shadow-[0_3.5px_3.2px_rgba(0,0,0,1)] ">
          {formState.topText}
        </h2>
        <h2 className=" absolute bottom-5 text-center text-white text-5xl font-bold drop-shadow-[0_3.5px_3.2px_rgba(0,0,0,1)] ">
          {formState.bottomtext}
        </h2>
      </div>
      <div className="flex justify-center align-middle items-center">
        <button
          onClick={downloadImage}
          id="download-button"
          className="bg-slate-300 px-8 py-2 text-black text-3xl rounded-lg  border-2 border-slate-800 "
        >
          Download
        </button>
      </div>
    </main>
  );
}
