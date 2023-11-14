import React from 'react'
import { useState } from 'react';
import './Display.css';

const Display = ({ contract, account }) => {
  const [data, setData] = useState('')
  const getData = async() => {
    let dataArray;
    const otherAddess = document.querySelector('.address').value 
    try {
      if (otherAddess) {
        dataArray = await contract.display(otherAddess)
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account)
        
      }
    } catch (error) {
      alert("you don't have access")
    }

    const isEmpty = Object.keys(dataArray).length === 0
    if (!isEmpty) {
      const str = dataArray.toString()
      const str_array = str.split(",")
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank" rel="noreferrer">
            <img src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} alt=""  className='image-list'/>
          </a>
        )
      })
      setData(images)  
      
    }
    else {
      alert("No image to display")
    }
  }
 

 
  return (
    <div>
      <div className='image-list'>
        {data}
        
      </div>
      <input type="text" placeholder='Enter address' className='address' />
      <button className='center button' onClick={getData}>
        Get data
      </button>

    </div>
  )
}

export default Display