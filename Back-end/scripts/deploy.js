const { ethers } = require("hardhat")

async function main  () {
    const [deployer] = await ethers.getSigners()
    const Upload = await ethers.getContractFactory("Upload")
    const upload = await Upload.deploy()
    console.log(upload.address);
}

main().then(() => {
    process.exit(0)
}).catch((err) => {
    console.error(err)
    process.exit(1)
})