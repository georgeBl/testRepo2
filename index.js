// THIS IS A NEAR COMPLETED TEMPLATE FOR YOUR CA1
// Everything is commented and explained step by step
// If there are any questions, please let me know
// EDIT/UPDATE and DELETE is not finished yet
// Make sure to also check the "dog.js" file


//declarations 
//express for server and routes
const express = require('express')
//bodyParser for x-www-urlencoded (html form like) variables
const bodyParser = require('body-parser')
// defining the actual app to handle the requests (e.g. push, get, etc.)
const app = express()
const port = 3000
// require the driver to connect to the database
const mongoose = require('mongoose')
// require the class constructor from different file
const Dog = require ('./dog.js')
const { findByIdAndDelete } = require('./dog.js')
//defining one object using our new constructor
//only as a testing purpose, this code should be deleted after testing is completed
//let dog = new Dog({age:5, name: "Boris", breed: "Golden Retriever", isNeutred: false})


//make the app use the bodyParser
app.use(bodyParser.urlencoded({extended:false}))

//API ROUTES
//show all dogs from the database using GET request
app.get('/dog', (req,res) =>{
  //find all dogs in the database and store them in the "result" variable
  //use the Model created in the dog.js file to retrieve all dog entries from the database
  Dog.find((err, dogs)=>{
    //in case there is an error with our Dog model, we we will send it to the user(postman)
    if(err){
      res.send("Error occured no dog retrieved")
      return
    }
    //if no error send the array conting dogs to the user/postman
    res.send(dogs)
    //log the result in the console as well
    console.log(dogs)
  })
})
// FIND ONE BY ID, using a GET REQUEST and A PARAMETER (id)
app.get('/dog/:id', (req,res)=>{
  const id = req.params.id;
  // we use the findById query, details on https://mongoosejs.com/docs/queries.html
  // this query only returns one element
  // you can also use findOneById
  // you can also use findOne({_id:req.paramas.id}) - this query will find depending on other properties,
  //                                    e.g. breed, name
  //                                    will only return first element found
  // to return more then 1 element use find({}) // see previous request
  Dog.findById(id, (err, dog)=>{
    if(err){
      res.send("Dog not found")
      return
    }
    //"dog" is an object file retrieved from the database
    //"dog" will only be defined if there is a dog with the specific id
    // inside the Database
    // for a wrong ID, "dog" will be undefined

    //we will send it back to the user/postman
    res.send(dog)
    console.log(dog)
  })
})

//insert request using POST to add a dog into the database
app.post('/dog',(req,res)=>{
  console.log("Inserting a dog in the database")
  //inser the dog into the database
  // dog.save() // insert the dog into the database
  
  let isNeutred = false;
  if (req.body.isNeutred === 'true'){
    isNeutred = true;
  }
  let dog = new Dog({
    age: parseInt(req.body.age), //Number
    name: req.body.name, //String
    breed: req.body.breed  ||  "No breed inserted", //String
    isNeutred: isNeutred //Boolean
  });
  //inserting a dog and checking to see if any errors occured
  dog.save(err=>{
    if (err){
    // if error send a message to let the user know
      res.send(`Dog not inserted into the database, error is: ${err}`)
      //return to be used in order to not send to res.send and crash the program
      return
    }
    //send a message to the user with the result
      res.send("Dog inserted into the database")
      console.log("Dog is in the database")
  })

  //if return runs, code will start from here
  return
})
// -->
// PUT request to update or modify one dog from the database
app.put('/dog/:id', (req,res)=>{
  // you can use fineOneAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
  // or
  // you can use findByIdAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
  // You can use req.params.id to send the _id and req.body for your new variables
  // or you can send all variables, including id, in req.body
  console.log("Trying to edit dog")
  console.log(parseInt(req.body.age))
  
  
  Dog.findByIdAndUpdate(req.params.id, 
    {
      name: req.body.name, 
      age: ((parseInt(req.body.age) == NaN)? 0 : parseInt(req.body.age)),
      breed: req.body.breed,
      isNeutred: (req.body.isNeutred === 'true')
    } , err=>{
    if(err){
      res.send("It didn't edit. The error is: "+ err)
      return;
    }
    res.send("It did edit")
  })
})


//delete request using DELETE and a PARAMETER (id)
app.delete('/dog/:id', (req,res)=>{
  
  // You can use findOneAndDelete({_id:})
  // or
  // You can use findByIdAndDelete(id)
  //see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
  Dog.findByIdAndDelete(req.params.id, err=>{
    if (err){
      res.send("Dog did not delete")
      return  
    }
    res.send("Dog deleted")
    console.log(`Dog with id ${req.params.id} is now deleted`)
    // console.log("Dog with id "+req.params.id + "is now deleted")
  })
})

//start the server
app.listen(port, () => { 
  //change the link to your database
  mongoose.connect('mongodb+srv://admin:admin@dogapi.evr2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
  catch(error => console.log(error));
  console.log(`Example app listening at http://localhost:${port}`)
})

//OLD CODE! NOT REQUIRED!  ONLY FOR REFERENCE

// //test get or browser requets // should be deleted after testing is done
// app.get('/', (req, res) => {
//   res.send('George Blanaru')
// })

// app.get('/message', (req, res) => {
//     res.send('Hi, this is a nice message');
// })

// app.get('/othermessage', (req, res) => {
//     res.send('This is the second message');
// })

// app.get('/showdog', (req, res) =>{
//     console.log('Someone is requiring a dog;')
//     res.send(dogs)
// })

// app.post('/showdog', (req, res) =>{
//   //insert using post!
//     console.log('Someone is trying to post something');
//     res.send('Congrats, you posted something');
//     console.log(req.body);
//     // let name = req.body.name;
//     // let age = parseInt(req.body.age);
//     // let breed = req.body.breed;
//     let isNeutred = (req.body.isNeutred === 'true');
//     let dog = new Dog({age: parseInt(req.body.age),name: req.body.name,breed: req.body.breed,isNeutred: isNeutred});
//     dogs.push(dog)
//     console.log(dog)
// })



// app.delete('/deletedog/:name', (req, res) =>{
//   //"dogs" is the database
//   //newDogsArray is a holder for the updated Database
//   let newDogsArray =[];
//   //for loop in JavaScript, takes each element and assigns it to the variable "d"
//   //
//   dogs = dogs.forEach(d =>{
//     //checks to see if the name from the parameter matches the dogs name
//     if(!(d._name === req.params.name)){
//       //if it doesn't match, add it to the new array
//        newDogsArray.push(d)
//     }
//   })
//   console.log("Dog deleted, new database looks like this")
//   console.log(newDogsArray);
//   //update the "database / dogs"
//   dogs = newDogsArray;
//   //send a result to postman/user so it doesn't get stuck on loading
//   res.send("Delete in progress");
  

// })