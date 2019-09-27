window.onload=function(){
	let button= document.getElementById('update');
	let barcod=document.getElementById('bar');
	let scan=document.getElementById('scan');
		let tr= document.getElementById('try');
	scan.addEventListener("click",function(e){
		e.preventDefault();
		let bar=barcod.value;
		console.log(bar);
		if (bar==="") {
			alert('please scan the product')
		}
		else{
		 fetch(`https://api.barcodelookup.com/v2/products?barcode=${bar}&formatted=y&key=owf4mrad0vbsgh46iy6cbhdl62885t`)
                  .then(re => re.json())
                  .then(res => {
                  	console.log(res.products[0])
                  	const dat=res.products[0];
                  	document.getElementById('itemname').value=dat.product_name;
                  		
                  			document.getElementById('size').value=dat.weight;
                  				document.getElementById('manufacturer').value=dat.brand;
                  					document.getElementById('quantity').value=1;
                  });
		}
		
	})
	button.addEventListener('click',function(e){
		e.preventDefault();

		let bar=barcod.value;
		const barcode=bar;
		const itemname=document.getElementById('itemname').value;
	const category=document.getElementById('category').value;
	const size=document.getElementById('size').value;
	const manufacturer=document.getElementById('manufacturer').value;
	const price= document.getElementById('price').value;
	const quantity=document.getElementById('quantity').value;
  const bought=document.getElementById('bought').value;
	const discount=0;
	const total = (quantity * price);
	console.log(total)
  console.log(category)
  fetch('http://localhost:3000/record',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      itemname,
     
      price,
      quantity,
      
      
    })
  })
  .then(data =>{
    console.log(data)
  })
  .catch(error =>{
    console.log(error)
  })
	fetch(`http://localhost:3000/getallstock`)
      .then(re => re.json())
      .then(res => {
      	let dat=res.data;
      	let rl=[...dat];
      	let po=[]
      
      	rl.filter(function(value){
      		let a =value.barcode; let b=0;
      		if (a===bar) {po.push(a); b+=1}
      		
      		return b;
      	})
      
      	let finalquantity=parseInt(quantity);
   console.log(po[0])
      	
      	if (bar===po[0]) {
      		for (var i = 0; i < dat.length; i++) {
      		if (bar===dat[i].barcode) {
          
      		let gp=(finalquantity+dat[i].quantity);
         
            console.log(price,bought)
      		 fetch('http://localhost:3000/updatestock',{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
     barcode:bar,
     quantity:gp,
     price,bought
    })
  })
  .then(data =>{
    console.log(data)
  })
  .catch(error =>{
    console.log(error)
  })
}
      	}
      }
      	else{
      		if (itemname!=="") {
	fetch('http://localhost:3000/stock',{
		method:"POST",
		headers:{
			"Content-Type":"application/json"
		},
		body:JSON.stringify({
			barcode,
			itemname,
			category,
			size,
			manufacturer,
			price,
			quantity,
			total,
      bought,
			discount
		})
	})
	.then(data =>{
		console.log(data)
	})
	.catch(error =>{
		console.log(error)
	})
}


      	}
      
  })
	
	})
tr.addEventListener("click",function(e){
	e.preventDefault();
	 fetch(`http://localhost:3000/getallstock`)
      .then(re => re.json())
      .then(res => {
      	let dat=res.data;
      	let rl=[...dat];
      	let po=[]
      
      	let bg=rl.filter(function(value){
      		let a =value.barcode; let b=value.quantity;
      		if (a===bar) {po.push(a);return value;}
      		
      		
      	})
      	console.log(bg)
      })
})

}