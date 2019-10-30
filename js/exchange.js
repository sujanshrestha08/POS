window.onload=function(e){

	let billno=document.getElementById('billno');
	let bill= document.getElementById('bill');
	let total=document.getElementById('totfin');
	let hr=window.location.href;
	let spl= hr.split("=",2);
	let sspl=spl[1]
		document.getElementById('billno').value=sspl;
	console.log(sspl)
	e.preventDefault();
	billno.addEventListener("keypress",function(e){
		if (e.key ==="Enter") {
			e.preventDefault();
			let finalbill=billno.value;
			 fetch(`http://localhost:3000/getbill?page=${sspl}`)
      .then(re => re.json())
      .then(res => {
      	console.log(finalbill);
      	console.log(res);
      	let dat=res.data;
      	bill.innerHTML=dat[0].billno;
      	total.innerHTML=dat[0].total;
      	let tbodyone=document.getElementById('tbodyone')
      	let html="";
      	for (var i = 0; i < dat.length; i++) {
      		if (dat[i].quantity>1) {
      		html+=`<tr><td>${([i+1])}</td><td>${dat[i].productname}</td><td>${dat[i].quantity}</td><td>${dat[i].price}</td> <td><button data-edit="${dat[i].id}">Edit</button> <td><button data-delete="${dat[i].id}">Delete</button></tr>`
      	}
      	else{
      		html+=`<tr><td>${([i+1])}</td><td>${dat[i].productname}</td><td>${dat[i].quantity}</td><td>${dat[i].price}</td><td></td> <td><button data-delete="${dat[i].id}">Delete</button></tr>`

      	}
      }
      	tbodyone.innerHTML=html;

                         let butt= document.querySelectorAll('#tbodyone button');

                        [...butt].forEach(function(data) {
                          data.addEventListener("click",function() {
                            let del=this.getAttribute("data-delete");
                            let edt=this.getAttribute("data-edit");
                            if (this.getAttribute("data-delete")) {
                            	 fetch('http://localhost:3000/deletebill', {
                          method: 'DELETE',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            id:del
                         
                          })
                      })
                           .then(data => {
                                   return data.json();
                                  
                                  })
                         .catch(error => {

                                    console.log(error)
                                  })
                            }
                        })
                        })
      })
		}

	})
}