import './App.css';
import {useEffect, useState, useReducer} from "react";
import { shdx} from './info/shdx.js';
import { ghdx} from './info/ghdx.js';
import { hdx } from './info/hdx.js';
import { HDX_ABI, SHDX_ABI } from './info/abi.js';
import { ADDRESS, SHDXADDRESS } from './info/address.js';
var Web3 = require('web3')

function App() {
 
  const [check, setCheck] = useState(true);
  const [blockNumber, setBlockNumber] = useState("");
  const [balances, setBalances] = useState([]);

  const [Eng, setEng] = useState(true);
  const [totalHdx, setTotalHdx] = useState("");
  const [stakedHdx, setStakedHdx] = useState("");

  const rpcURL = "https://arb-mainnet.g.alchemy.com/v2/h4bsS1_3SZC0JOou9tz3xgg-fvrnG5-U"
  var web3 = new Web3(rpcURL);
  var _HdxToken = new web3.eth.Contract(HDX_ABI, ADDRESS);
  // const provider = new ethers.providers.AlchemyProvider( "arbitrum" , "h4bsS1_3SZC0JOou9tz3xgg-fvrnG5-U" );
  // const _HdxToken = new ethers.Contract(ADDRESS,HDX_ABI,provider);
  // const _ShdxToken = new ethers.Contract(SHDXADDRESS, SHDX_ABI,provider);
  
  // if (typeof web3 !== 'undefined') {
  //   web3 = new Web3(web3.currentProvider);
  // } else {
  //   // set the provider you want from Web3.providers
  // }

  useEffect(()=>{
    // _HdxToken.methods.totalSupply().call()
    // .then((e) => console.log(e))
    
    // for (var i=0; i<hdx.length;i++){
    // _HdxToken.methods.balanceOf(hdx[i]).call()
    // .then((a)=> console.log(a))
    // } 
    add();
    },[]);



  const comma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// _HdxToken.getPastEvents('Transfer', {
//   fromBlock: 29000000,
//   toBlock: 'latest'
// }, function(error, events){})
// .then(function(events){
//   console.log(events[0].returnValues.to) // same results as the optional callback above
// });

//   const addAddress = async () => {
//    _HdxToken.events.Transfer( (from,to,value,event ) => {
//     let info = {
//       from: from,
//       to: to,
//       value: value,
//       data: event,
//     } 
//     console.log(JSON.stringify(info , null, 4));
//    })
//  }
//  fetch('https://api.coingecko.com/api/v3/coins/hydranet/tickers')
//  .then( a => a.json())
//  .then( b => {console.log(b.tickers[0].last.toString().substr(0,6))})

  var addressin = {
    address: "",
    amount: ""
  }

  var addressArray = []
  var shdxArray = []
  var ghdxArray = []

  for (var i=0 ; i<hdx.length;i=i+2){
    let addressin = {
      address: hdx[i],
      amount: Number(hdx[i+1]).toFixed(0)
    }
    addressArray.push(addressin)
  }
  for (var i=0 ; i<shdx.length;i=i+2){
    let addressin = {
      address: shdx[i],
      amount: Number(shdx[i+1]).toFixed(0)
    }
    shdxArray.push(addressin)
  }
  for (var i=0 ; i<ghdx.length;i=i+2){
    let addressin = {
      address: ghdx[i],
      amount: Number((ghdx[i+1])*142/100).toFixed(0)
    }
    ghdxArray.push(addressin)
  }

  ghdxArray.forEach(element => {
    for(var i=0 ; i<shdxArray.length ; i++){
      if(shdxArray[i].address == element.address){
        element.amount = Number(shdxArray[i].amount) + Number(element.amount)
        shdxArray[i] = {
          address: "",
          amount: ""
        }
        ghdxArray[i] = {
          address: "",
          amount: ""
        }
      }
    }
  });

  addressArray.forEach(element => {
    for(var i=0 ; i<shdxArray.length ; i++){
      if(shdxArray[i].address == element.address){
        element.amount = Number(shdxArray[i].amount) + Number(element.amount)
        shdxArray[i] = {
          address: "",
          amount: ""
        }
      }
    }
  });
  // addressArray.forEach(element => {
  //   for(var i=0 ; i<ghdxArray.length ; i++){
  //     if(ghdxArray[i].address == element.address){
  //       element.amount = Number(ghdxArray[i].amount) + Number(element.amount)
  //       ghdxArray[i] = {
  //         address: "",
  //         amount: ""
  //       }
  //     }
  //   }
  // });

  shdxArray.forEach(element => {
    addressArray.push(element)
  });
  ghdxArray.forEach(element => {
    addressArray.push(element)
});

  // addressArray.forEach(element => {
  //   for(var i=0 ; i<shdxArray.length ; i++){
  //   if(shdxArray[i].address !== element.address){
  //     element.amount = Number(shdxArray[i].amount) + Number(element.amount)
  // }
  // }
  // });
  
  addressArray.sort(function(a, b){return b.amount - a.amount});
  shdxArray.sort(function(a, b){return b.amount - a.amount});
  ghdxArray.sort(function(a, b){return b.amount - a.amount});
  console.log(shdxArray)
  console.log(ghdxArray)
  // shdxArray.forEach(element => {
  //   for(var i=0 ; i<addressArray.length ; i++){
  //   if(element.address == addressArray[i].address){
  //     addressArray[i].amount = Number(addressArray[i].amount) +Number(element.amount)
  // }
  // }
  // });
  
   
  

  var add2 = 1;
  const add = () =>{
    for (var i=0 ; i<addressArray.length ; i++){
      const body1 = document.getElementById('body1')
      let div1 = document.createElement("div")
      let divinfo1 = document.createElement("div")
      let divinfo2 = document.createElement("div")
      let divinfo3 = document.createElement("div")
      div1.className = "line"
      divinfo1.className = "order"
      divinfo1.textContent = add2;
      divinfo2.className = "address"
      divinfo2.textContent = addressArray[i].address;
      divinfo3.className = "amount"
      divinfo3.textContent = comma(addressArray[i].amount);
      div1.appendChild(divinfo1)
      div1.appendChild(divinfo2)  
      div1.appendChild(divinfo3)
      body1.appendChild(div1)
      add2++
    }
  }
 


  return (
    <div className="App">
      <div className='Navbar' >
            <div className='hydranet'>HYDRANET</div>
            <div ><img className='hdxlogo'src='https://i.hizliresim.com/ocna173.png'/></div>
          <div className='navs'>
          <div className='nav'>
            <div className='navtext'>Total Supply:</div>
            <div className='navnumber'>{totalHdx} </div>
          </div>
          <div className='nav'>
            <div className='navtext'>Staked HDX:</div>
            <div className='navnumber'>{stakedHdx} </div>
          </div>
          <div className='nav'>
            <div className='navtext'>Staked Ratio:</div>
            <div className='navnumber'> {stakedHdx}</div>
          </div>
          </div>

      </div>
      <div className='body' id='body1' >
        
      </div>
    </div>
  );
}

export default App;
