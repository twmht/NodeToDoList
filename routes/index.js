
/*
 * GET home page.
 */
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
var title = "NodeTodoList"
var utils = require('connect').utils;

exports.index = function(req, res){
  Todo.find().sort('-updated_at').exec(function(err,todos){
      res.render('index',{
          title: title,
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
            title: title,
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

exports.current_user = function(req,res,next){
    var user_id = req.cookies? req.cookies.user_id : undefined;
    if(!user_id){
        res.cookie('user_id',utils.uid(32));
    }
    next();
};
