window.onload=function(){
	let mailid=document.getElementById('mailid');
	let  cname=document.getElementById('cname');
	let  scan=document.getElementById('scan')
		let cnameid=document.getElementById("cnameid")
	 fetch(`http://localhost:3000/getallstock`)
      .then(re => re.json())
      .then(res => {
      	console.log(res.data[0].manufacturer);
      	let dat= res.data;
      
      	let ec="";
      
      	for (var i = 0; i <dat.length; i++) {
      		ec+=`<option>${dat[i].itemname}</option>`;
      	}
      	
      	cname.innerHTML=ec;
      })
      scan.addEventListener("click", function(e){
      	e.preventDefault();
      	let page= mailid.value;
      	
      	let product=cname.value;
      	let amount=cnameid.value;
      	 fetch(`http://localhost:3000/productmail?page=${page}&product=${product}&amount=${amount}`)
      .then(re => re.json())
      .then(res => {
      	console.log(res)
      })




      })
}