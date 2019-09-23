window.onload=function(e){

	
	let bar=document.getElementById('barcode');
	let tb= document.getElementById('tbody');
  let quant = document.getElementById('quantity');
  let billcode=document.getElementById('bill');
  let print=document.getElementById('print');
    let totdi=document.getElementById("totfin");
    let qut=document.getElementById('qut');
    let email=document.getElementById('email');
	let rg=[];
 
let ghi=localStorage.getItem("Name");
console.log(ghi)
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var cdate=today.getDate();
var dateTime = date+"-"+time;
let gp=[];
let disc=0;
let finalquantity=0;
console.log(date);
 
    fetch(`http://localhost:3000/getoffer`)
      .then(re => re.json())
      .then(res => {
        console.log(res)
        let dat=res.data;
        let da= [...dat];
        let gj=da.filter(function(val,i){let a= val.dateto;let d= val.datefrom;
var toda = new Date();
 let gh=toda.getFullYear()+'-'+(toda.getMonth()+1)+'-'+toda.getDate(); let b="";let day1= new Date(a);let day2= new Date(d);  console.log(day1);if (toda>=day1 && toda<=day2) {
          b+=val;
        };return b})
        gp.push(gj);
      });
   e.preventDefault();
   
 quant.addEventListener('keypress',function(e){
  if (e.key === 'Enter') {
  e.preventDefault();

 
    billcode.innerHTML=(Math.floor((Math.random() * 100000) + 1))+"-"+dateTime;
    let barcode= bar.value;
    let quantity=quant.value;
    
    fetch(`http://localhost:3000/getstock?page=${barcode}`)
      .then(re => re.json())
      .then(res => {
        console.log(gp);
     
        let final=0;
      

                           dat=res.data;
                             let html="";
                             
                          
                                rg.push({"id":dat[0].id,"barcode":dat[0].barcode,"itemname":dat[0].itemname,"quantity":quantity,"price":dat[0].price,"discount":dat[0].discount,"category":dat[0].category,"manufacturer":dat[0].manufacturer,"profit":((parseInt(dat[0].price)-dat[0].bought)*parseInt(quantity)),"newquantity":(dat[0].quantity-quantity)});
                                console.log(rg);
                                     for (var i = 0; i <rg.length; i++) {
                           let tot=(quantity*rg[i].price);
                           let dis=rg[i].discount;
                           let finaldis=(tot-(tot *(dis/100)));
                         
                         

                              html+=`<tr><td>${rg[i].itemname}</td><td>${rg[i].quantity}</td><td>${rg[i].price}</td><td>${rg[i].discount}%</td><td>${finaldis}</td><td><button data-delete="${rg[i].id}">Delete</button></td></tr>`;
                               console.log(html);
                              final+=finaldis;
                          //     let parsequnt= parseInt(rg[i].quantity);
                          // let parseprive=parseInt(rg[i].price);
                          //  let finalboug=((parseprive-rg[i].bought)* parsequnt)
                        
                       }
                        let iquant=parseInt(quantity)
                              finalquantity+=iquant;
                        document.getElementById('tbodyone').innerHTML=html;
                          console.log(final)
                          let specialoff=gp[0][0].offerdiscount;
                          let oldbought=gp[0][0].bought;
                         
                          let finaltotal=(final-(final * (specialoff/100)));
                          disc+=(final * (specialoff/100));
                         
                          // finalbought+=finalboug
                          console.log(finaltotal);
                          totdi.innerHTML=final;

console.log(disc)

   })

    
      if (barcode!=="") {
        bar.value="";
        quant.value="";
      }
// 	scan.addEventListener("click", function(e){
// 		e.preventDefault();
//     let rand=Math.floor((Math.random() * 10000) + 1);

//     billcode.innerHTML=Math.floor((Math.random() * 10000) + 1);
// 		let barcode= bar.value;
//     let quantity=quant.value;
// 		console.log(rand);
// 		fetch(`http://localhost:3000/getstock?page=${barcode}`)
//       .then(re => re.json())
//       .then(res => {
//       	console.log(res)

//                            dat=res.data;
//                              let html="";

                          
//                              	  rg.push(dat);
//                              	       for (var i = 0; i <rg.length; i++) {
//                            let tot=(quantity*rg[i][0].price);
//                            console.log(tot)

//                               html+=`<tr><td>${rg[i][0].itemname}</td><td>${1}</td><td>${rg[i][0].price}</td><td><button data-delete="${rg[i][0].id}">Delete</button></td></tr>`;
//                                console.log(html);
                              
                        
//                        }
//                         document.getElementById('tbodyone').innerHTML=html;
  

// // else
// // {
	  
// // 	  console.log(rg)
// // 	for (var i = 0; i <rg.length; i++) {
// // 		let rk=(1-1);

// //                        //     	// let gh=rg[([i]-1)][0].itemname;
// //                        //     	// if(i!==0){
// //                        //     	let gh=rg[i-1][0].barcode;
// //                        //      let lr=parseInt(barcode);

// //                        //     	// console.log(barcode);

// //                        //     	if (gh==lr){
                           		
// //                        //        console.log('fck')
// //                        //        rg.pop()
// //                        //     	}
// //                        // //     	 else{
                       
// //                        // //     	rg.push(dat);
                           	

// //                        // //        html+=`<tr><td>${rg[i][0].barcode}</td><td>${rg[i][0].itemname}</td><td>${1}</td><td>${rg[i][0].price}</td><td><button data-delete="${rg[i][0].id}">Delete</button></td></tr>`;
// //                        // //         console.log(html);
                              
                        
// //                        // // }
// //                        //     // 	    	console.log(i)
// //                        //     // }
// //                        //    else{
                       
                           	
// //                            	rg.push(dat);

// //                               html+=`<tr><td>${rg[i][0].barcode}</td><td>${rg[i][0].itemname}</td><td>${1}</td><td>${rg[i][0].price}</td><td><button data-delete="${rg[i][0].id}">Delete</button></td></tr>`;
// //                                console.log(html);
                              
                        
// //                        // }
// //                    }
// //                         document.getElementById('tbodyone').innerHTML=html;
  


                           
// //                       }


                    
//       })
}
 console.log(rg)    
	})
email.addEventListener('keypress',function(e){

  if (e.key === 'Enter') {
  e.preventDefault();
   let total=totdi.innerHTML;
   let parstot=parseInt(total)
     
  if (email.value!=="") {
    let emailval= email.value;
   let j=0;
    
    fetch(`http://localhost:3000/getmember?page=${emailval}`)
      .then(re => re.json())
      .then(res => {
        let oldmem=res.data[0].membership;

        console.log(parstot)
        if (parstot>=500 && parstot<1000) {
         j+=5;
        }
        else if (parstot>=1000 && parstot<2000) {
         j+=10;
        }
        else if (parstot>=2000 && parstot<5000) {
         j+=15;
        }
        else  if (parstot>=5000 && parstot<10000) {
         j+=20;
        }
        else  if (parstot>=10000 ) {
         j+=50;
        }
         let newmem=(oldmem+ j);
        console.log(newmem);

        fetch('http://localhost:3000/memberpoint',{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
     email:email.value,
     membership:newmem
    })
  })
  .then(data =>{
    console.log(data)
  })
  .catch(error =>{
    console.log(error)
  })
        
      })
      
  }



}
})
qut.addEventListener("click",function(e){
   for (var i = 0; i <rg.length; i++) {
    let barcode=rg[i].barcode;
    let quantity=rg[i].newquantity;
     fetch('http://localhost:3000/updatestock',{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
     barcode,
     quantity
    })
  })
  .then(data =>{
    console.log(data)
  })
  .catch(error =>{
    console.log(error)
  })

   }
  console.log('click',barcode,quantity);

})
print.addEventListener("click",function(e){
  e.preventDefault();
  console.log(finalquantity)
    let billno=billcode.innerHTML;
    let total=totdi.innerHTML;
    let gquantity=finalquantity;
      let cashier=localStorage.getItem("Name");;
      
      let finalbought=0;
     for (var i = 0; i <rg.length; i++) {
     let barcode=rg[i].barcode;
      let productname=rg[i].itemname;
      let quantity=rg[i].quantity;
      let price=rg[i].price;
      let manufacturer=rg[i].manufacturer;
      let category=rg[i].category
      finalbought+=rg[i].profit
      console.log(billno,total)
      fetch('http://localhost:3000/bill',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
     billno,
     productname,
      price,
      quantity,
      total,
      cashier,
      manufacturer,
      barcode,
      category
    })
  })
  .then(data =>{
    console.log(data)
  })
  .catch(error =>{
    console.log(error)
  })

     }
     console.log(finalbought)
     fetch('http://localhost:3000/datas',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
     billno,
      quantity:gquantity,
      total,
      discount:disc,
      cashier,
      profit:finalbought
    })
  })
  .then(data =>{
    console.log(data)
  })
  .catch(error =>{
    console.log(error)
  })

for (var i = 0; i <rg.length; i++) {
    let barcode=rg[i].barcode;
    let quantity=rg[i].newquantity;
    let gmitem= rg[i].itemname;
     fetch('http://localhost:3000/updatestock',{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
     barcode,
     quantity
    })
  })
  .then(data =>{
    console.log(data)
  })
  .catch(error =>{
    console.log(error)
  })
if (quantity<5) {
  fetch(`http://localhost:3000/gmail?page=${gmitem}`)
      .then(re => re.json())
      .then(res => {
       console.log(res)
  console.log("corr");
})
}
   }
  console.log(barcode,quantity);

})
}