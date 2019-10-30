window.onload=function(){
	let fildate=document.getElementById('date').value;
	let edate=document.getElementById('date');
	

 var today = new Date();
            var m= (today.getMonth()+1);
                  var d= today.getDate();
      var date = today.getFullYear()+'-'+(m<=9 ? '0' + m : m)+'-'+(d <= 9 ? '0' + d : d);
      console.log(date)
      if (edate.value==="") {
		 
      edate.value=date;
      console.log(edate.value)
	}
     function pie(){
      	let invent=[];
		let newmem=0;
	let allin=[];
	let secondarr=[];
	let finaldata=[];
	let mempoint=[];
	let fg=edate.value;
	let todaymeme=[];
	let upld=[]
	
	fetch(`http://localhost:3000/getalluser`)
      .then(re => re.json())
      .then(res => {
      	let dat=res.data;
		console.log(dat)
      	for (var i = 0; i < dat.length; i++) {
      			let dt=dat[i].date;
      		let sp=dt.split("T",2);
      		let newsp=sp[0];
      		if (dat[i].usertype==="member") {
      			mempoint.push(dat[i].membership)
				upld.push({name:dat[i].fullname,point:dat[i].membership})
      		}

      	if (fg===newsp && dat[i].usertype==="member") {
      		newmem+=1;
      		todaymeme.push(dat[i].membership)
      	}
      	}
      	   console.log(mempoint)
      })

	fetch('http://localhost:3000/getallbill')
      .then(re => re.json())
      .then(res => {
      	console.log(res)
    
      	for (var i = 0; i < res.data.length; i++) {
      		let dt=res.data[i].date;
      		let sp=dt.split("T",2);
      		let newsp=sp[0];
      		
      		console.log(fg)
      		if (fg===newsp) {
      		// if (invent === undefined || invent.length == 0) {
  invent.push(res.data[i].cashier)
 
  secondarr.push(res.data[i])
}
// }}
// console.log()
// else if(invent[invent.length - 1]!==res.data[i].cashier){
// 	invent.push(res.data[i].cashier)
// }
      	}
      	console.log(invent)
var val = new Set(invent)

let rg=[...val]
let rh=rg.length;
console.log(rh)

// allin.push(val)

for (var j = 0; j < rg.length; j++) {
	let tot=0;
	for (var i = 0; i < secondarr.length; i++) {
		
		if (rg[j]===secondarr[i].cashier) {
			tot+=secondarr[i].quantity;
		}
	}
	finaldata.push({"cashier":rg[j],"quantity":tot})
	console.log(finaldata);
}

})
     


setTimeout(function() {
 //            for(i=0, k=0; i<finaldata.length; i++) {
 //      for(j=0; j<i; j++) {
 //        if(finaldata[i].quantity>finaldata[j].quantity) {
 //          k = finaldata[i].quantity;
 //          finaldata[i].quantity = finaldata[j].quantity;
 //          finaldata[j].quantity = k;
 //        }
 //      }
 //    }
 // console.log(finaldata[0].quantity);
 let num=[];
 

 for (var i = 0; i < finaldata.length; i++) {
 	num.push(finaldata[i].quantity)
 }
  
 let ji=Math.max(...num);
 let miin=Math.min(...num);
 let memmax=Math.max(...mempoint);
 let todmax=Math.max(...todaymeme);
 console.log(upld.length)
 let newrec=upld.length;
 let rep= upld[(newrec)-1].name;
 console.log(rep)
 for (let i = 0; i < upld.length; i++) {
	 if (upld[i].point===memmax) {
		document.getElementById('topone').innerHTML=upld[i].name;
		document.getElementById('bottomone').innerHTML=upld[i].point;
	}
	 
 }
 document.getElementById('toptwo').innerHTML=`<h1> Todays NO.Of Member </h1>`;
		document.getElementById('bottomtwo').innerHTML=newmem;
		document.getElementById('topthree').innerHTML=`<h1> Latest Member </h1>`;
		document.getElementById('bottomthree').innerHTML=rep;
console.log(newmem)
for (var i = 0; i < finaldata.length; i++) {
	if (ji===finaldata[i].quantity) {
		console.log(finaldata[i].cashier)
	}
	if (miin===finaldata[i].quantity) {
		console.log(finaldata[i].cashier)
	}
}


 }, 1000);


}

	pie()
	 edate.addEventListener("change",function(e){
	 	pie();

})
 	


	
  
}
