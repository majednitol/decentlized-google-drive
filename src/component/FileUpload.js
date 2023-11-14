import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null)
  const [filename, setFilename] = useState("No image selected")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (file) {
      try {
        const formData = new FormData()
        formData.append("file", file)

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `cd464d35243d0c6d000d`,
            pinata_secret_api_key: `4c3d3e4211b69326b43d6def2550caafd0a7d9a5e73cff6a3fa8fde001396384`,
            "Content-Type": "multipart/form-data",
          },
        })

        console.log("kkkkk", resFile);

        const imgHash = `ipfs://${resFile.data.IpfsHash}`
        contract.add(account, imgHash)
        alert("Successfully Image Uploaded")
        setFilename("No image selected")
        setFile(null)
      } catch (error) {
        alert("Unable to upload image to Pinata");
      }
    }

  }
  const retrieveFile = (e) => {
    const data = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(data)
    reader.onloadend = () => {
      setFile(e.target.files[0])
    }
    setFilename(e.target.files[0].name)
    e.preventDefault()
  }
  return (
    <div className='top'>
      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className='choose'>
          Choose Image
        </label>
        <input type="file" disabled={!account} id="file-upload" name='data' onChange={retrieveFile} />
        <span className='textArea'>
          Image : {filename}
          {console.log(filename)}
        </span>
        <button type='submit' className='upload' disabled={!file}>Upload file</button>
      </form>
    </div>
  )
}

export default FileUpload