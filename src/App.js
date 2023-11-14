import Upload from './artifacts/contracts/gdrive3.0.sol/Upload.json';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Modal from './component/Modal';
import FileUpload from './component/FileUpload';
import Display from './component/Display';

function App() {
  const [account, setAccount] = useState('')
  const [contract, setContract] = useState(null)
  const [provider, setProvider] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)


  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload()
        })

        window.ethereum.on("accountsChanged", () => {
          window.location.reload()
        })

        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setAccount(address)
        let contractAddress = "0x0291A4C9Ad3c156411813298DE07f4A4872C8CC9"
        const contract = new ethers.Contract(
          contractAddress, Upload.abi, signer
        )
        setContract(contract)
        setProvider(provider)
      } else {
        console.error("metamask is not installed");
      }
    }
    provider && loadProvider()

  }, [])

  return (
    < >
      {!modalOpen && (
        <button className='share' onClick={() => { setModalOpen(true) }}>Share</button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
  );
}

export default App;




