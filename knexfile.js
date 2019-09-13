const path= require('path');
module.exports={
	client:"mysql",
	connection:{
		host:"localhost",
		user:"root",
		password:"",
		database:"agile"
	},
	migrations:{
		tablename:'migrations',
		directory: path.resolve(__dirname,'./migrations'),
	},
	useNullAsDefault: false
}