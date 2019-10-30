window.onload=function(){
	let manuf= document.getElementById('manuf');
	let  cname=document.getElementById('cname');
	let  scan=document.getElementById('scan')
	let disc=document.getElementById('manufdis');
	let cnameid=document.getElementById("cnameid")
	 fetch(`http://localhost:3000/getallstock`)
      .then(re => re.json())
      .then(res => {
      	console.log(res.data[0].manufacturer);
      	let dat= res.data;
      	let html="";
      	let ec="";
      	for (var i = 0; i <dat.length; i++) {
      		html+=`<option>${dat[i].manufacturer}</option>`;
      	}
      	for (var i = 0; i <dat.length; i++) {
      		ec+=`<option>${dat[i].itemname}</option>`;
      	}
      	manuf.innerHTML=html;
      	cname.innerHTML=ec;
      })
      scan.addEventListener("click", function(e){
      	e.preventDefault();
      	let rdis= disc.value;
      	let val= manuf.value;
      	let cnameval=cnameid.value;
      	let cval=cname.value;
      	console.log(cnameval);
      	if (rdis!=="") {
      	fetch(`http://localhost:3000/updatedis?page=${val}`,{
		method:"PUT",
		headers:{
			"Content-Type":"application/json"
		},
		body:JSON.stringify({
			discount:rdis
		})
	})
	.then(data =>{
		console.log(data)
	})
	.catch(error =>{
		console.log(error)
	})
}

if(cnameval!==""){
	fetch(`http://localhost:3000/updatedis?page=${cval}`,{
		method:"PUT",
		headers:{
			"Content-Type":"application/json"
		},
		body:JSON.stringify({
			discount:cnameval
		})
	})
	.then(data =>{
		console.log(data)
	})
	.catch(error =>{
		console.log(error)
	})

}

      })
}