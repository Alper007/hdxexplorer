import './App.css';
import {useEffect, useState, useReducer} from "react";
import { shdx} from './info/shdx.js';
import { ghdx} from './info/ghdx.js';
import { hdx } from './info/hdx.js';
import { hdxmap } from './info/hdxmap.js';
import { shdxmap } from './info/shdxmap.js';
import { ghdxmap } from './info/ghdxmap.js';
import { alladdress } from './info/alladdress.js';
import { hdxtxobjarr } from './info/hdxtxobj.js';
import { HDX_ABI, SHDX_ABI } from './info/abi.js';
import { ADDRESS, SHDXADDRESS } from './info/address.js';
var Web3 = require('web3')

function App() {
 
  const [check, setCheck] = useState(true);
  const [blockNumber, setBlockNumber] = useState("");
  const [balances, setBalances] = useState([]);
  const [coin,setCoin] = useState("HDX")

  const [totalHdx, setTotalHdx] = useState("");
  const [stakedHdx, setStakedHdx] = useState("");

  const rpcURL = "https://arb-mainnet.g.alchemy.com/v2/h4bsS1_3SZC0JOou9tz3xgg-fvrnG5-U"
  var web3 = new Web3(rpcURL);
  var _HdxToken = new web3.eth.Contract(HDX_ABI, ADDRESS);

  useEffect(()=>{

    addhdx()
    },[]);



  const comma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

  var hdxtxarray = [];

  var addressin = {
    address: "",
    amount: ""
  }
  var hdxtxobj = {
    Txhash : "",
    BlockNo : "",
    DateTime:"",
    From: "",
    To: "",
    Quantity: "",
  }

  // for (var i=0 ; i<hdxtx.length; i=i+8){
  //   hdxtxobj = {
  //       Txhash : hdxtx[i],
  //       BlockNo : hdxtx[i+1],
  //       DateTime:hdxtx[i+3],
  //       From: hdxtx[i+4],
  //       To: hdxtx[i+5],
  //       Quantity: hdxtx[i+6],
  //     }
  //     hdxtxarray.push(hdxtxobj)
  // }

  var addresses = [];

  hdxmap.forEach((a)=>{
    addresses.push(a.address)
  })
  shdxmap.forEach((a)=>{
    addresses.push(a.address)
  })
  ghdxmap.forEach((a)=>{
    addresses.push(a.address)
  })

  const addresses1 = addresses.filter((item, index) => {
    return addresses.indexOf(item) === index;
});

  

var allmap = [];  

var allobj = {
    address: 0,
    hdx: 0,
    shdx: 0,
    ghdx: 0,
    all: 0
  }  
  alladdress.forEach((e)=>{
    allmap.push(
      allobj = {
        address: e,
        hdx: 0,
        shdx: 0,
        ghdx: 0,
        all: 0
      }  )
  })

  hdxmap.forEach((element)=>{
    for(var i=0 ; i<allmap.length ; i++){
      if(element.address == allmap[i].address){
        allmap[i].hdx = element.amount;
        allmap[i].all = Number(allmap[i].all) + Number(element.amount);
      }
  }
    }
  )
  
  shdxmap.forEach((element)=>{
    for(var i=0 ; i<allmap.length ; i++){
      if(element.address == allmap[i].address){
        allmap[i].shdx = element.amount;
        allmap[i].all = Number(allmap[i].all) + Number(element.amount);
      }
  }
    }
  )
  ghdxmap.forEach((element)=>{
    for(var i=0 ; i<allmap.length ; i++){
      if(element.address == allmap[i].address){
        allmap[i].ghdx = element.amount;
        allmap[i].all = (Number(allmap[i].all) + Number((element.amount)*142/100)).toFixed(0);
      }
  }
    }
  )
  // console.log(allmap)



  // var hdxaddressmap = []

  // for (var i=0 ; i<hdx.length;i++){
  //   let addressin = {
  //     address: hdx[i],
  //     amount: Number(hdx[i+1]).toFixed(0)
  //   }
  //   hdxaddressmap.push(addressin)
  // }
  // console.log(hdxaddressmap)

  // for (var i=0 ; i<hdxtxobjarr.length; i++){
  //   hdxaddressarray.push(hdxtxobjarr[i].To)
  // }
  // var hdxaddressarray1 = hdxaddressarray.filter((item,index) =>{
  //   return hdxaddressarray.indexOf(item) === index;
  // })


  var addressArray = []
  var shdxArray = []
  var ghdxArray = []

  // var ghdxArray1 = []
  // for (var i=0 ; i<ghdx.length;i=i+2){
  //   let addressin = {
  //     address: ghdx[i],
  //     amount: Number(ghdx[i+1]).toFixed(0)
  //   }
  //   ghdxArray1.push(addressin)
  // }
  // console.log(ghdxArray1)



  // for (var i=0 ; i<shdx.length;i=i+2){
  //   let addressin = {
  //     address: shdx[i],
  //     amount: Number(shdx[i+1]).toFixed(0)
  //   }
  //   shdxArray.push(addressin)
  // }
  // for (var i=0 ; i<ghdx.length;i=i+2){
  //   let addressin = {
  //     address: ghdx[i],
  //     amount: Number((ghdx[i+1])*142/100).toFixed(0)
  //   }
  //   ghdxArray.push(addressin)
  // }

  // ghdxArray.forEach(element => {
  //   for(var i=0 ; i<shdxArray.length ; i++){
  //     if(shdxArray[i].address == element.address){
  //       element.amount = Number(shdxArray[i].amount) + Number(element.amount)
  //       shdxArray[i] = {
  //         address: "",
  //         amount: ""
  //       }
  //       ghdxArray[i] = {
  //         address: "",
  //         amount: ""
  //       }
  //     }
  //   }
  // });

  // addressArray.forEach(element => {
  //   for(var i=0 ; i<shdxArray.length ; i++){
  //     if(shdxArray[i].address == element.address){
  //       element.amount = Number(shdxArray[i].amount) + Number(element.amount)
  //       shdxArray[i] = {
  //         address: "",
  //         amount: ""
  //       }
  //     }
  //   }
  // });


  // addressArray.forEach(element => {
  //   for(var i=0 ; i<shdxArray.length ; i++){
  //   if(shdxArray[i].address !== element.address){
  //     element.amount = Number(shdxArray[i].amount) + Number(element.amount)
  // }
  // }
  // });


  




  // hdxmap.sort(function(a, b){return b.amount - a.amount});
  // shdxmap.sort(function(a, b){return b.amount - a.amount});
  // ghdxmap.sort(function(a, b){return b.amount - a.amount});
  // var coins = [hdxmap,shdxmap,ghdxmap]
  var add1 = 1;
  // var add2 = 1;
  // var add3 = 1;

  allmap.sort(function(a, b){return b.all - a.all});

  const addhdx = () =>{
    allmap.forEach((element)=>{

        var bodyhdx = document.getElementById('bodyhdx')
        // var bodyshdx = document.getElementById('bodyshdx')
        // var bodyghdx = document.getElementById('bodyghdx')
        let div1 = document.createElement("div")
        let divinfo1 = document.createElement("div")
        let divinfo2 = document.createElement("div")
        let divinfo3 = document.createElement("div")
        let divinfo4 = document.createElement("div")
        let divinfo5 = document.createElement("div")
        let divinfo6 = document.createElement("div")
        div1.className = "line"
        divinfo1.className = "order"
        divinfo1.textContent = add1;
        add1++
        // if(element == hdxmap){
        //   divinfo1.textContent = add1;
        //   add1++
        // }else if(element == shdxmap){
        // divinfo1.textContent = add2;
        // add2++
        // }else if(element == ghdxmap){
        //   divinfo1.textContent = add3;
        //   add3++
        // }
        divinfo2.className = "address"
        divinfo2.textContent = element.address;
        divinfo3.className = "amount"
        divinfo3.textContent = comma((element.all).toString());
        divinfo4.className = "amount"
        divinfo4.textContent = comma((element.shdx).toString());
        divinfo5.className = "amount"
        divinfo5.textContent = comma((element.hdx).toString());
        divinfo6.className = "amount"
        divinfo6.textContent = comma((element.ghdx).toString());
        div1.appendChild(divinfo1)
        div1.appendChild(divinfo2)
        div1.appendChild(divinfo3)
        div1.appendChild(divinfo4)
        div1.appendChild(divinfo5)
        div1.appendChild(divinfo6)
        bodyhdx.appendChild(div1)
        // if(element == hdxmap){
        //   bodyhdx.appendChild(div1)
        // }else if(element == shdxmap){
        //   bodyshdx.appendChild(div1)
        // }else if(element == ghdxmap){
        //   bodyghdx.appendChild(div1)
        // }
  })}
 

  // const changeCoin = (x) => {
  //   var bodyhdx = document.getElementById('bodyhdx')
  //   var bodyshdx = document.getElementById('bodyshdx')
  //   var bodyghdx = document.getElementById('bodyghdx')
  //   var bodyall = document.getElementById('bodyall')
  //   bodyshdx.style.display = "none"
  //   bodyhdx.style.display = "none"
  //   bodyghdx.style.display = "none"
  //   bodyall.style.display = "none"
  //   switch (x) {
  //     case "hdxmap":
  //       bodyhdx.style.display = "block"
  //     return;
  //     case "shdxmap":
  //       bodyshdx.style.display = "block"
  //     return;
  //     case "ghdxmap":
  //       bodyghdx.style.display = "block"
  //     return;
  //     case "allmap":
  //       bodyall.style.display = "block"
  //     return;
  //     default: 
  //     return;
  //   }
  // }



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
      <div className='body0' id='body0' >
        {/* <button onClick={()=>{changeCoin("hdxmap"); setCoin("HDX")}}>hdx</button>
        <button onClick={()=>{changeCoin("shdxmap"); setCoin("SHDX")}}>shdx</button>
        <button onClick={()=>{changeCoin("ghdxmap"); setCoin("GHDX")}}>ghdx</button>
        <button onClick={()=>{changeCoin("allmap"); setCoin("ALL")}}>hdx+shdx+(ghdx*1.42)</button> */}
      </div>
      <div className="line1">
          <div className="order">RANK</div>
          <div className="address">ADDRESS</div>
          <div className="amount">hdx+shdx+(ghdx*1.42)</div>
          <div className="amount">SHDX</div>
          <div className="amount">HDX</div>
          <div className="amount">GHDX</div>
      </div>
      <div className='bodyhdx' id='bodyhdx' >
      </div>
      <div className='bodyshdx' id='bodyshdx' >
      </div>
      <div className='bodyghdx' id='bodyghdx' >
      </div>
      <div className='bodyall' id='bodyall' >
      </div>
    </div>
  );
}

export default App;
