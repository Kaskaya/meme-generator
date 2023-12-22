import { useState, useEffect } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import Draggable from "react-draggable";

export default function Main() {
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
      .then((data) =>
        setState(
          data.data.memes.filter((meme) => {
            return meme.box_count <= 2;
          })
        )
      );
  }, []);

  function changeMeme() {
    const randomNumber = Math.floor(Math.random() * state.length);
    const url = state[randomNumber].url;
    const name = state[randomNumber].name;
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
      .catch(() => console.log("Failed to download"));
  }

  return (
    <main className=" flex flex-col justify-center items-center">
      <div className="flex justify-center my-4 ">
        <input
          type="text"
          placeholder="1"
          onChange={handleChange}
          name="topText"
          value={formState.topText}
        />
        <input
          type="text"
          placeholder="2"
          onChange={handleChange}
          name="bottomtext"
          value={formState.bottomtext}
        />
      </div>
      <div id="div1">
        <button
          onClick={changeMeme}
          className="bg-gradient-to-r from-custom-main to-custom-secondary px-16 py-4 mb-2 text-white text-xl md:text-3xl rounded-3xl "
        >
          Get A New Meme
        </button>
      </div>

      <div id="image-wrapper" className="relative m-2 ">
        <img src={formState.randomImage} className=" w-screen max-w-2xl " />
        <Draggable bounds="parent">
          <h2 className="cursor-move break-all text-center whitespace-normal block absolute top-5 text-white text-3xl sm:text-4xl md:text-5xl font-bold border-x-zinc-800 drop-shadow-[0_3.5px_3.2px_rgba(0,0,0,1)] ">
            {formState.topText}
          </h2>
        </Draggable>
        <Draggable bounds="parent">
          <h2 className="cursor-move break-all text-center block absolute bottom-5 text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-[0_3.5px_3.2px_rgba(0,0,0,1)] ">
            {formState.bottomtext}
          </h2>
        </Draggable>
      </div>

      <div id="div2">
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
