const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');
   
    var ObjId = new ObjectID('58f12b08c365ace37dd81a28');

 db.collection('Users').findOneAndDelete({_id:ObjId}).then((result)=>{
     console.log(result);
    // console.log(docs)
  
    });


    // db.close();
});
