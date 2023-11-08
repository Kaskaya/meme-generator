import { useState, useEffect } from "react";

export default function Meme() {
  const [state, setState] = useState({});

  const [formState, setFormState] = useState({
    topText: "",
    bottomtext: "",
    randomImage: "",
  });

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setState(data));
  }, []);

  function changeMeme() {
    const randomNumber = Math.floor(Math.random() * state.data.memes.length);
    const url = state.data.memes[randomNumber].url;
    setFormState((prevState) => {
      return {
        ...prevState,
        randomImage: url,
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
      <div className=" flex justify-center align-middle items-center relative m-12 ">
        <img src={formState.randomImage} className=" mx-auto max-w-2xl " />
        <h2 className=" absolute top-5 text-center text-white text-5xl font-bold border-x-zinc-800 drop-shadow-[0_3.5px_3.2px_rgba(0,0,0,1)] ">
          {formState.topText}
        </h2>
        <h2 className=" absolute bottom-5 text-center text-white text-5xl font-bold drop-shadow-[0_3.5px_3.2px_rgba(0,0,0,1)] ">
          {formState.bottomtext}
        </h2>
      </div>
    </main>
  );
}
