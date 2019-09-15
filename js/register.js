window.onload=function(){

	let button=document.getElementById('register');

	button.addEventListener("click",function(e){

		e.preventDefault();
			let fullname=document.getElementById('fullname').value;
	let address=document.getElementById('address').value;
	let phone= document.getElementById('phone').value;
	let password=document.getElementById('password').value;
	let email=document.getElementById('email').value;
	let usertype="member";
	let membership=5;
		console.log(fullname);
		fetch('http://localhost:3000/register',{
			method:'POST',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				fullname,
				address,
				phone,
				password,
				email,
				usertype,
				membership
			})
		})
		.then(data=>{
			return data.json();
		})
		.then(json=>{
			
			if (json.status==='sucess') {
				window.location.href='./login.html'	
			}
		})
		.catch(error=>{
			console.log(error);
		})
	})
}