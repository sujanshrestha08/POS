window.onload=function(){
	let srch= document.getElementById('search');
	let billno=document.getElementById('billno');
	let frontdate=document.getElementById('searchdate')
	srch.addEventListener('click',function(e){
		e.preventDefault();
		let  finalbill= billno.value;
		if (finalbill==="") {
		 fetch('http://localhost:3000/getallhistory')
      .then(re => re.json())
      .then(res => {
      	console.log(res);
      	let dat=res.data;
      	let update=frontdate.value;
      	let tbodyone=document.getElementById('tbodyone')
      	let html="";
      	  		
      	console.log(update)
      	for (var i = 0; i < dat.length; i++) {
      		let dt=dat[i].date;
      		let sp=dt.split("T",2);
      		let newsp=sp[0];
      		let newtim=sp[1];
      		let ssp=newtim.split(".",2);
      		let newtime=ssp[0];

      		
      		console.log(newtime);
      		if (newsp===update) {
      		
      				
      			
      			html+=`<tr><td>${[i+1]}</td><td><a href="exchange.html?page=${dat[i].billno}">${dat[i].billno}</a></td><td>${newsp}</td><td>${newtime}</td></tr>`
      			
      		
      		}
      		
      		
      	}

tbodyone.innerHTML=html;
      })
	}
	else{
		 fetch(`http://localhost:3000/gethistory?page=${finalbill}`)
      .then(re => re.json())
      .then(res => {
      	console.log(res);
      	let dat=res.data;
      	let html="";
      	for (var i = 0; i < dat.length; i++) {
      		let dt=dat[i].date;
      		let sp=dt.split("T",2);
      		let newsp=sp[0];
      		let newtim=sp[1];
      		let ssp=newtim.split(".",2);
      		let newtime=ssp[0];

      		
      		console.log(newtime);
      		
      				
      			
      			html+=`<tr><td>${[i+1]}</td><td><a href="exchange.html?page=${dat[i].billno}">${dat[i].billno}</a></td><td>${newsp}</td><td>${newtime}</td></tr>`
      			
      		
      		
      		
      		
      	}

tbodyone.innerHTML=html;
      })
	}
	})
}