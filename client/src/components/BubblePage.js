import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {

    const token = localStorage.getItem('token');

    axiosWithAuth()
        .get('/api/colors', {
            headers: {
                authorization: token
            }
        })
        .then(res => {
            // console.log(`getColors axios > colorsList:`, res)
            setColorList(res.data)
            // console.log(`setColorList:`, colorList);
        })
        .catch(err => console.log(`ERROR: getColors axios > colorsList:`, err))
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
