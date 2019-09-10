const path= require('path');
const bcrypt= require('bcrypt');
const client = require('../knexfile');
const knex = require('knex')(client);
const nodemailer= require('nodemailer');
function stock(req,res){
	const barcode=req.body.barcode;
	const itemname=req.body.itemname;
	const category=req.body.category;
	const size=req.body.size;
	const manufacturer=req.body.manufacturer;
	const price= req.body.price;
	const quantity=req.body.quantity;
	const total= req.body.total;
	const discount=req.body.discount;
	const bought=req.body.bought;
	knex("product").insert({
		barcode,
		itemname,
		category,
		size,
		manufacturer,
		price, quantity,
		total,
		discount,
		bought
	})
	.then(()=>res.json({status:"sucess", message:"registered successfully"}))
	.catch(()=> res.json({status:"fail", message:"registered unsuccessfull"}))

}
function record(req,res){
	const itemname=req.body.itemname;
	
	const price= req.body.price;
	const quantity=req.body.quantity;
	
	
	knex("record").insert({
		itemname,
		
		price, quantity,
		
		
	})
	.then(()=>res.json({status:"sucess", message:"registered successfully"}))
	.catch(()=> res.json({status:"fail", message:"registered unsuccessfull"}))

}
function bill(req,res){
	const billno = req.body.billno;
	const productname= req.body.productname;
	const quantity=req.body.quantity;
	const price= req.body.price;
	const total = req.body.total;
	const cashier= req.body.cashier;
	const manufacturer=req.body.manufacturer;
	const barcode=req.body.barcode;
	const category=req.body.category;
	knex("bill").insert({
		billno,
		productname,
		quantity,
		price,
		total,
		cashier,
		manufacturer,
		barcode,
		category
	})
	.then(()=>res.json({status:"sucess", message:"registered successfully"}))
	.catch(()=> res.json({status:"fail", message:"registered unsuccessfull"}))

}
function history(req,res){
	const billno = req.body.billno;
	const quantity=req.body.quantity;
	const total = req.body.total;
	const cashier= req.body.cashier;

	knex("datas").insert({
		billno,
		
		quantity,
		
		total,
		cashier
	})
	.then(()=>res.json({status:"sucess", message:"registered successfully"}))
	.catch(()=> res.json({status:"fail", message:"registered unsuccessfull"}))

}  
async function getstock(req,res){
	const page= req.query.page;
	try{
		const data=await knex("product").select().where({barcode:page})
		res.json({
			status:"sucess",
			data:data
		})
	}
	 catch(error){
    res.json({
      status:'fail'
    })
  }
}
module.exports={
	stock,
	getstock
}
async function getallstock(req,res){
	
	try{
		const data=await knex("product").select()
		res.json({
			status:"sucess",
			data:data
		})
	}
	 catch(error){
    res.json({
      status:'fail'
    })
  }
}
async function updatestock(req,res){
	const barcode=req.body.barcode;
	const quantity=req.body.quantity;
	const price=req.body.price;
	const bought=req.body.bought;
	console.log(price,bought)
	try{
		const data=await knex("product").update({quantity,price,bought}).where({barcode:barcode})
		res.json({
			status:"sucess",
			data:data
		})
	}
	 catch(error){
    res.json({
      status:'fail'
    })
  }
}
async function updatedis(req,res){
	const discount=req.body.discount;
	const page=req.query.page;
	try{
		const data = await knex("product").update({discount}).where({manufacturer:page})
		res.json({
			status:"sucess",
			message:"updated"
		})
	}
	catch(error){
    res.json({
      status:'fail'
    })
  }
} 
async function updateditem(req,res){
	const discount=req.body.discount;
	const page=req.query.page;
	try{
		const data = await knex("product").update({discount}).where({itemname:page})
		res.json({
			status:"sucess",
			message:"updated"
		})
	}
	catch(error){
    res.json({
      status:'fail'
    })
  }
} 
async function getbill(req,res){
	const page=req.query.page;
	try{
		const data= await knex("bill").select().where({billno:page})
		res.json({
			status:"sucess",
			data:data
		})

	}
	 catch(error){
    res.json({
      status:'fail'
    })
  }
}
async function getallbill(req,res){
	
	try{
		const data= await knex("bill").select()	
			res.json({
			status:"sucess",
			data:data
		})

	}
	 catch(error){
    res.json({
      status:'fail'
    })
  }
}
async function deletebill(req,res){
	const id=req.body.id;
	try{
		const data = await knex("bill").delete().where({id:id})
		res.json({
			status:"sucess"
		})
	}
	 catch(error){
    res.json({
      status:'fail'
    })
  }
}
async function getallhistory(req,res){
	
	try{
		const data= await knex("datas").select()	
			res.json({
			status:"sucess",
			data:data
		})

	}
	 catch(error){
    res.json({
      status:'fail'
    })
  }
}
async function gethistory(req,res){
	const page=req.query.page;
	
	try{
		const data= await knex("datas").select().where({billno:page})	
			res.json({
			status:"sucess",
			data:data
		})

	}
	 catch(error){
    res.json({
      status:'fail'
    })
  }
}
async function getmemberhistory(req,res){
	const page=req.query.page;
	
	try{
		const data= await knex("datas").select().where({email:page})	
			res.json({
			status:"sucess",
			data:data
		})

	}
	 catch(error){
    res.json({
      status:'fail'
    })
  }
}
async function getallrecord(req,res){
	
	try{
		const data= await knex("record").select()	
			res.json({
			status:"sucess",
			data:data
		})

	}
	 catch(error){
    res.json({
      status:'fail'
    })
  }
}
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'magaranub@gmail.com',
    pass: 'jimmy_@$'
  }
});
async function gmail(req,res){
const page=req.query.page;

var mailOptions = {
  from: 'magaranub@gmail.com',
  to: 'genjilama007@gmail.com',
  subject: 'Product is low',
  text: `Currently ${page} product is low`
};
try{

await transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
  	res.json({
  		staus:'sucess',
  	})
    conso
  }
});
}
 catch(error){
    res.json({
      status:'fail'
    })
  }
}

async function productmail(req,res){
const page=req.query.page;
const product=req.query.product;
const amount=req.query.amount;

console.log(page,product)

var mailOptions = {
  from: 'magaranub@gmail.com',
  to: `${page}`,
  subject: 'Product is low',
  text: `Currently we need ${product} around ${amount} quantity`
};
try{

await transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
  	res.json({
  		staus:'sucess',
  	})
    conso
  }
});
}
 catch(error){
    res.json({
      status:'fail'
    })
  }
}
//  function special(req,res){
// 	const offername=req.body.offername;
// 	const dateto=req.body.dateto;
// 	const datefrom=req.body.datefrom;
// 	const offerdiscount=req.body.offerdiscount;
// 	console.log(offerdiscount)
// 	knex("specialoffer").insert({
// 		offername,
// 		dateto,
// 		datefrom,
// 		offerdiscount
// 	})

// 	.then(()=>res.json({status:"sucess", message:"registered successfully"}))
// 	.catch(()=> res.json({status:"fail", message:"registered unsuccessfull"}))

// }

// function offerspec(req,res){
// 	const offername=req.body.offername;
// 	const dateto=req.body.dateto;
// 	const datefrom=req.body.datefrom;
// 	const offerdiscount=req.body.offerdiscount;
// 	knex("specialoffer").insert({
// 		offername,
// 		dateto,
// 		datefrom,
// 		offerdiscount
// 	})
// 	.then(()=>res.json({status:"sucess", message:"registered successfully"}))
// 	.catch(()=> res.json({status:"fail", message:"registered unsuccessfull"}))

// }

module.exports={
	stock,
	getstock,
	getallstock,
	updatedis,
	updateditem,
	bill,
getbill,
getallbill,
history,
getallhistory,
gethistory,
getmemberhistory,
deletebill,
updatestock,
productmail,
record,
getallrecord,
gmail}
	