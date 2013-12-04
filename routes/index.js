
/*
 * GET home page.
 */
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

exports.index = function(req, res){
  //res.render('index', { title: 'Express' });
  Todo.find(function(err,todos,count){
      res.render('index',{
          title: 'Express Todo',
          todos: todos
      });
  })
};


exports.create = function(req,res){
    new Todo({
        content: req.body.content,
        updated_at: Date.now()
    }).save(function(err,todo,count){
        res.redirect('/');
    });
};

exports.destroy = function(req,res){
    Todo.findById(req.params.id,function(err,todo){
        todo.remove(function(err,todo){
            res.redirect('/');
        });
    });
};

exports.edit = function(req,res){
    Todo.find(function(err,todos){
        res.render('edit',{
            title: 'Express Todo',
            todos: todos,
            current : req.params.id
        });
    });
};

exports.update = function(req,res){
    Todo.findById(req.params.id,function(err,todo){
        todo.content = req.body.content;
        todo.updated_at = Date.now();
        todo.save(function(err,todo,count){
            res.redirect('/');
        });
    });
};
