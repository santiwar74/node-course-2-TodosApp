const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');
   
    var ObjId = new ObjectID('58f119f7fc362526e80ebea1');

//  db.collection('ToDos').findOneAndUpdate({_id:ObjId},{
//      $set:{completed:true}
//  }).then((result)=>{
//      console.log(result);
//     // console.log(docs)
  
// });

 db.collection('Users').findOneAndUpdate({_id:ObjId},{
     $set:{Name:"Polly"},$inc:{Age:-4}
 },{
     returnOriginal:false
 }).then((result)=>{
     console.log(result);
    // console.log(docs)
  
});




    // db.close();
});
