const expect = require('expect');
const request = require('supertest');
const {ObjectID}= require('mongodb');

const {app} = require('./../server.js');
const {ToDo} = require('./../models/todo.js');

const todos =[{
    _id: new ObjectID(),
    text :'first test todo'
},{
      _id: new ObjectID(),
    text:'second test todo'
}];

beforeEach((done)=>{
ToDo.remove({}).then(()=> {
    return ToDo.insertMany(todos);
}).then(()=>done());
});

describe('POST /todos',()=>{

    it(`should create a new Todo`,(done)=>{

        var text = 'test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return  done(err);
            }

        ToDo.find(text).then((todos)=>{
         expect(todos.length).toBe(1);
         expect(todos[0].text).toBe(text);
         done();
        }).catch((e)=>{done()});

        });
    });


     it(`should not create a Todo with invalid body data`,(done)=>{      

        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        // .expect((res)=>{
        //     expect(res.body.text).toBe(text);
        // })
        .end((err,res)=>{
            if(err){
                return  done(err);
            }

        ToDo.find().then((todos)=>{
         expect(todos.length).toBe(2);
        //  expect(todos[0].text).toBe(text);
         done();
        }).catch((e)=>{done()});

        });
    });

});

describe('GET /todos',()=>{

    it(`should get all todos`,(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done)
    });
});

describe('GET /todos/:id',()=>{
it(`Should return a todo doc`,(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done);
       });

    it(`Should return a 404 if todo not found`,(done)=>{
        var newId = new ObjectID().toHexString();
    request(app)
    .get(`/todos/${newId}`)
    .expect(404)
    // .expect((res)=>{
    //     expect(res.body.todo.text).toBe(todos[0].text)
    // })
     .end(done); 
});

 it(`Should return a 400 for non-object ids`,(done)=>{
       // var newId = 123;
    request(app)
    .get(`/todos/123abc`)
    .expect(400)
    // .expect((res)=>{
    //     expect(res.body.todo.text).toBe(todos[0].text)
    // })
     .end(done); 
});


});

 describe('DELETE /todo/:id',()=>{

     it('Should remove a todo',(done)=>{
        var hexId = todos[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res)=>{
           expect(res.body.todo._id).toBe(hexId);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }

        ToDo.findById(hexId).then((todo)=>{
            expect(todo).toNotExist();
            done();
        }).catch((e)=>done(e));

        });
});


    it(`Should return a 404 if todo not found`,(done)=>{
        var newId = new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${newId}`)
    .expect(404)   
    .end(done); 
});

it(`Should return a 400 for non-object ids`,(done)=>{
       // var newId = 123;
    request(app)
    .delete(`/todos/123abc`)
    .expect(400)    
     .end(done); 
});

 });
