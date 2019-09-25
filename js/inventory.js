window.onload=function(){
	let fildate=document.getElementById('date').value;
	let edate=document.getElementById('date');
	
	let selid=document.getElementById('men');
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
      	let invent=[]
	let manuf=[];
	let allin=[];
	let secondarr=[];
	let finaldata=[];
	let manudata=[];
	let update=[];
	let cat=[];
	let catdata=[];
	let fg=edate.value;
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
  invent.push(res.data[i].productname)
  manuf.push(res.data[i].manufacturer)
  cat.push(res.data[i].category)
  secondarr.push(res.data[i])
}
// }}
// console.log()
// else if(invent[invent.length - 1]!==res.data[i].productname){
// 	invent.push(res.data[i].productname)
// }
      	}
var val = new Set(invent)
var manufval=new Set(manuf)
let catval= new Set(cat);
let rg=[...val]
let finalmanuf=[...manufval]
let finalcat=[...catval]
// allin.push(val)
console.log(finalmanuf)
for (var j = 0; j < rg.length; j++) {
	let tot=0;
	for (var i = 0; i < secondarr.length; i++) {
		
		if (rg[j]===secondarr[i].productname) {
			tot+=secondarr[i].quantity;
		}
	}
	finaldata.push({"productname":rg[j],"quantity":tot})
	console.log(tot);
}
for (var j = 0; j < finalmanuf.length; j++) {
	let amt=0;
	for (var i = 0; i < secondarr.length; i++) {
		
		if (finalmanuf[j]===secondarr[i].manufacturer) {
			amt+=1
		}
	}
	manudata.push({"manufacturer":finalmanuf[j],"quantity":amt})
	
}
for (var j = 0; j < finalcat.length; j++) {
	let amt=0;
	for (var i = 0; i < secondarr.length; i++) {
		
		if (finalcat[j]===secondarr[i].category) {
			amt+=1
		}
	}
	catdata.push({"category":finalcat[j],"quantity":amt})
	
}
})
      fetch('http://localhost:3000/getallrecord')
      .then(re => re.json())
      .then(res => {
      	console.log(res.data)
      	let dat=res.data;

      		for (var j = 0; j < dat.length; j++) {
      		let dt=dat[j].date;
      		let sp=dt.split("T",2);
      		let newsp=sp[0];
      		let newtim=sp[1];
      		let ssp=newtim.split(".",2);
      		let newtime=ssp[0];
      		let qnt=0;

      		

  		if (newsp===fg) {
  			
      				update.push({"productname":dat[j].itemname,"quantity":dat[j].quantity})
      				
      				
      			
      			
      			



      		}

      	}
      	console.log(update)
      	console.log(fildate)
      })
console.log(manudata)

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
 let numone=[];
 let numtwo=[];
 let numthree=[];

 for (var i = 0; i < finaldata.length; i++) {
	 num.push(finaldata[i].quantity)

 }
  for (var i = 0; i < manudata.length; i++) {
 	numone.push(manudata[i].quantity)
 }
  for (var i = 0; i < catdata.length; i++) {
 	numtwo.push(catdata[i].quantity)
 }
 let ji=Math.max(...num);
 let jione=Math.max(...numone);
 let jitwo=Math.max(...numtwo);
 let ht='';
 let bt='';
 console.log(jione,jitwo)

for (var i = 0; i < finaldata.length; i++) {
	if (ji===finaldata[i].quantity) {
		
		ht=finaldata[i].productname;
		bt=finaldata[i].quantity
	}
	document.getElementById('topone').innerHTML=ht;
	document.getElementById('bottomone').innerHTML=bt;
}
for (var i = 0; i < manudata.length; i++) {
	if (jione===manudata[i].quantity) {
		ht=manudata[i].manufacturer;
		bt=manudata[i].quantity;
		console.log(manudata[i].manufacturer)
	}
	document.getElementById('toptwo').innerHTML=ht;
	document.getElementById('bottomtwo').innerHTML=bt;
}
for (var i = 0; i < catdata.length; i++) {
	if (jitwo===catdata[i].quantity) {
		ht=catdata[i].category;
		bt=catdata[i].quantity
		console.log(catdata[i].category)
	}
	document.getElementById('topthree').innerHTML=ht;
	document.getElementById('bottomthree').innerHTML=bt;
}

console.log(manudata)
 }, 1000);
 
setTimeout(function() {
	
	
	let trp=[]
	let ryu=""
	
	
	console.log(selid.value)
	selid.addEventListener('change',function(){
	 trp=[];
if(selid.value==="Product"){
// trp=finaldata;
// ryu="productname"
for (let i = 0; i < finaldata.length; i++) {
	trp.push({name:finaldata[i].productname, quantity:finaldata[i].quantity})
	
}
console.log(trp,finaldata)
}
else if(selid.value==="Category"){
	// trp=finaldata;
	// ryu="productname"
	for (let i = 0; i < catdata.length; i++) {
		trp.push({name:catdata[i].category, quantity:catdata[i].quantity})
		
	}
	console.log(trp,catdata)
}
else if(selid.value==="Manufacturer"){
	// trp=finaldata;
	// ryu="productname"
	for (let i = 0; i < manudata.length; i++) {
		trp.push({name:manudata[i].manufacturer, quantity:manudata[i].quantity})
		
	}
	console.log(trp,manudata)
}

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text: "Email Categories",
		horizontalAlign: "left"
	},
	data: [{
		type: "doughnut",
		startAngle: 60,
		//innerRadius: 60,
		indexLabelFontSize: 17,
		indexLabel: "{label} - #percent%",
		toolTipContent: "<b>{label}:</b> {y} (#percent%)",
		dataPoints: [
			{ y: trp[0].quantity, label:trp[0].name},
			{ y: trp[1].quantity, label: trp[1].name },
			{ y: trp[2].quantity, label: trp[2].name },
			{ y: 4, label: "miscallinious"},
			
		]
	}]
});

chart.render();
})
 }, 1000);

}
// setTimeout(function() {

// if (selid.value==="Product"){
// 	selid.value="Category"
// 	}
// }, 5000);
	pie()
	 edate.addEventListener("change",function(e){
	 	pie();

})

 	


	
  
}
