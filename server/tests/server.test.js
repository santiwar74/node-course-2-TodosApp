const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {ToDo} = require('./../models/todo.js');

const todos =[{
    text :'first test todo'
},{
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

