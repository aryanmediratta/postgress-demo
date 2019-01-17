var express = require('express');
var app = express();

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'india@111', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});
//'user' will become plural in the next line on its own.
const User = sequelize.define('users', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync()
  .then(() => User.create({
    username: 'johndoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });

app.use(express.static("./public"))

app.get('/',function(req,res){
	res.sendFile('public/index.html',{root : __dirname})
})


app.get("users/:id",function(req,res){
	let id = req.params.id;
	console.log('requested1')
	User.findAll({
		where: { id : id }
	}).then((users)=>{
		res.json(users);
	})
})

app.get('/users',function(req,res){
		console.log('requested2')
	User.findAll().then((users)=>{
		console.log(users);
		res.json(users);

	});
})



app.listen(3000)
console.log("Express app running on port 3000");

module.exports = app;