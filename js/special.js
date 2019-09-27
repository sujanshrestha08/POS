window.onload=function(){

	let button=document.getElementById('register');

	button.addEventListener("click",function(e){

		e.preventDefault();
			let offername=document.getElementById('offername').value;
	let dateto=document.getElementById('dateto').value;
	let datefrom= document.getElementById('datefrom').value;
	let offerdiscount=document.getElementById('discount').value;
	
		console.log(offername);
		fetch('http://localhost:3000/offe',{
			method:'POST',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				offername,
				dateto,
				datefrom,
				offerdiscount
				
			})
		})
		.then(data=>{
			console.log(data);
		})
		.catch(error=>{
			console.log(error);
		})
	})
}