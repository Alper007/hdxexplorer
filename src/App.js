import './App.css';
import {useEffect, useState, useReducer} from "react";
import {BigNumber, ethers} from "ethers";
import { HDX_ABI, SHDX_ABI } from './info/abi.js';
import { ADDRESS, SHDXADDRESS } from './info/address.js';
function App() {

  const [check, setCheck] = useState(true);
  const [blockNumber, setBlockNumber] = useState("");
  const [balances, setBalances] = useState([]);

  const [Eng, setEng] = useState(true);
  const [totalHdx, setTotalHdx] = useState(BigNumber.from(0).toString());
  const [stakedHdx, setStakedHdx] = useState(BigNumber.from(0).toString());


  const provider = new ethers.providers.AlchemyProvider( "arbitrum" , "h4bsS1_3SZC0JOou9tz3xgg-fvrnG5-U" );
  const _HdxToken = new ethers.Contract(ADDRESS,HDX_ABI,provider);
  const _ShdxToken = new ethers.Contract(SHDXADDRESS, SHDX_ABI,provider);

  useEffect(()=>{
    _HdxToken.totalSupply()
    .then( (e) => setTotalHdx(e));
    _HdxToken.balanceOf("0xd20cdf95a08acdf8aa360232caeda6e59a06951d")
    .then( (a)=> setStakedHdx(a));
    
  },[]);

  const comma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  const changeLange = () =>{
    if (Eng === true){
      setEng(false)
    }else{
      setEng(true);
    }
  }
  const addAddress = async () => {
   _HdxToken.Transfer( (from,to,value,event ) => {
    let info = {
      from: from,
      to: to,
      value: ethers.utils.formatUnits(value, 6),
      data: event,
    } 
    console.log(JSON.stringify(info , null, 4));
   })
 }
 const hdxprice = () => fetch('https://whitebit.com/api/v1/public/ticker?market=HDX_USDT').then((a)=>{
    console.log(a)
})  
hdxprice();


  return (
    <div className="App">
      <div className='Navbar' >
            <div className='hydranet'>HYDRANET</div>
            <div ><img className='hdxlogo'src='https://i.hizliresim.com/ocna173.png'/></div>
          <div className='navs'>
          <div className='nav'>
            <div className='navtext'>Total Supply:</div>
            <div className='navnumber'>{comma(BigNumber.from(totalHdx).toString().slice(0,-9))} </div>
          </div>
          <div className='nav'>
            <div className='navtext'>Staked HDX:</div>
            <div className='navnumber'>{comma(BigNumber.from(stakedHdx).toString().slice(0,-9))} </div>
          </div>
          <div className='nav'>
            <div className='navtext'>Staked Ratio:</div>
            <div className='navnumber'> {(BigNumber.from(stakedHdx).toString().slice(0,-9)/BigNumber.from(totalHdx).toString().slice(0,-9)*100).toString().slice(0,-12)}%</div>
          </div>
          </div>
          <div className='button'>
            <button className="btn btn-primary" onClick={changeLange}>{Eng ? "TURKISH" : "ENGLISH"}</button>
          </div>
          <button onClick={addAddress}>click</button>
      </div>
    </div>
  );
}

export default App;
