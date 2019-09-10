const path=require('path');
const bcrypt= require('bcrypt');
const client= require('../knexfile.js');
const knex=require('knex')(client);
const jwt = require('jsonwebtoken');
const secret='anubhav12';

function register(req,res){
	const fullname= req.body.fullname;
	const email= req.body.email;
	const phone= req.body.phone;
	const password=req.body.password;
	const address=req.body.address;
	const hashpass=bcrypt.hashSync(password,10);
	const usertype=req.body.usertype;
	const membership=req.body.membership;
	knex('user')
	.insert({
		fullname,
		email,
		phone,
		password,
		address,
		password:hashpass,
		usertype,
		membership
	})
	.then(()=>res.json({status:"sucess", message:"registered successfully"}))
	.catch(()=> res.json({status:"fail", message:"registered unsuccessfull"}))

}
async function authenticate(req,res){
	const email= req.body.email;
	const fontpassword= req.body.password;
	try{
		const data=await knex("user").select().where({email:email});
		if (!data) {
			res.json({
				status:"fail"
			})
		}
		else{
			const password= data[0].password;
			const compare=bcrypt.compareSync(fontpassword,password);
			if(compare){
				res.json({
					status:"sucess",
					id:data[0].id,
					usertype:data[0].usertype,
					fullname:data[0].fullname,
					email:data[0].email,
					accesdToken:jwt.sign({
						email
					}, secret)
				})
			}
			else{
				res.json({
					status:"fail"
				})
			}
		}
	}
	catch(error){
	res.json({
		status:'fail'
	});
}

}
function unauthenticated(response){
  response.json({
    status:'fail',
    message:'not authenticated',
      code: 404
  })
}
function tokenauth(token){
	if (!token) {
		return false;
	}
	try{
		const payload = jwt.verify(token,secret);
		return payload;
	}
	catch(error) {
    return false
  }
}
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
function offe(req,res){
	const offername= req.body.offername;
		const dateto=req.body.dateto;
	const datefrom=req.body.datefrom;
	const offerdiscount= req.body.offerdiscount;
	
	knex('offers')
	.insert({
		offername,
		datefrom,
		dateto,
		offerdiscount
	})
	.then(()=>res.json({status:"sucess", message:"registered successfully"}))
	.catch(()=> res.json({status:"fail", message:"registered unsuccessfull"}))

}
async function datas(req,res){
	const billno= req.body.billno;
		const quantity=req.body.quantity;
	const 	total=req.body.	total;
	const cashier= req.body.cashier;
	const discount= req.body.discount;
	const profit=req.body.profit;
	
	try{
	const data= await knex('datas').insert({
	billno,
	quantity,
	total,
	discount,
	cashier,
	profit,

	})
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
async function getoffer(req,res){
	
	try{
		const data=await knex("offers").select()
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
async function getmember(req,res){
	const page=req.query.page;
	
	try{
		const data=await knex("user").select().where({email:page})
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
async function getalluser(req,res){

	
	try{
		const data=await knex("user").select()
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
async function deluser(req,res){
  const id= req.body.id;
  
	try{
		const data=await knex("user").delete().where({
    id:id
  })
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

async function memberpoint(req,res){
	const email=req.body.email;
	const membership=req.body.membership;
	console.log(membership,email)
	try{
		const data=await knex("user").update({membership}).where({email:email})
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
async function updateuser(req,res){
	const fullname= req.body.fullname;
	const email= req.body.email;
	const phone= req.body.phone;
	const id=req.body.id;
	const address=req.body.address;

	const usertype=req.body.usertype;
	try{
		const data=await knex("user").update({fullname,email,phone,address,usertype}).where({id:id})
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
register,
authenticate,
offe,
getoffer,
datas,
getmember,
memberpoint,
getalluser,
deluser,
updateuser
}