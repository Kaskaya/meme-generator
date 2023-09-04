import { useState, useEffect } from "react";
/* const URL = "https://api.imgflip.com/caption_image"; */

const Memes = function () {
  const [resourceType, setResourceType] = useState("get_memes");
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`https://api.imgflip.com/${resourceType}`)
      .then((res) => res.json())
      .then((json) => {
        setItems(json.data.memes);
        console.log(json.data.memes);
      });

    /* return () => {
      console.log(data.data.memes);
    }; */
  }, [resourceType]);

  return <div></div>;
};

export default Memes;
