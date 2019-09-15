window.onload=function(){
	const button=document.getElementById('login');
	login.addEventListener("click",function(e){
		e.preventDefault();
		let email=document.getElementById('email').value;
		let password= document.getElementById('password').value;
		fetch('http://localhost:3000/authenticate',{
			method:'POST',
			headers:{
				"Content-Type":'application/json'
			},
			body:JSON.stringify({
				email,
				password,


			})
		})
		.then(data =>{
			return data.json();
		})
		.then(json=>{
			
			if (json.status==='sucess') {
				localStorage.setItem("Usertype",json.usertype);
				localStorage.setItem("ID",json.id);
				localStorage.setItem("Name",json.fullname);
				localStorage.setItem("Email",json.email);
				let pass=localStorage.getItem("Usertype");
				let emaillocal=localStorage.getItem("Email");
				console.log(pass,emaillocal)
				
				if (pass==="admin") {
					window.location.href='./front-end/admindashboard.html'				
				}
				else if(pass=="user"){
					window.location.href='./front-end/home.html'
				console.log(json.id);
				}
				else{
					window.location.href=`./front-end/memberdashboard.html?page=${emaillocal}`
				console.log(json.id);
				}
			}
			else{
				window.location.href='admindashboard.html'
			}
		})
		.catch(error =>{
			console.log(error)
		})
	})

}