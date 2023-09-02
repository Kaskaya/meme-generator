const Memes = function () {
  fetch("https://api.imgflip.com/get_memes")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data.memes);
      return data.data.memes;
    });
};

export default Memes;
