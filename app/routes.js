var Course = require('./models/course');

module.exports = function(app) {

  app.get('*', function(req, res) {
    res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

  //get all courses
  app.get('/api/meals', function(req,res){
    Course.find(function(err, courses){
      if(err){
        res.send(err);
      }
      res.json(courses);
    });
  });

  //add a course
  app.post('/api/meals', function(req, res){
    Course.create({
      title: req.body.title,
      name: req.body.name
    }, function(err, course){
      if(err){
        res.send(err);
      }
      Course.find(function(err, courses){
        if(err){
          res.send(err);
        }
        res.json(courses);
      });
    });
  });

  //delete a course
  app.delete('/api/meals/:course_id', function(req, res){
    Course.remove({
      _id: req.params.course_id
    }, function(err, course){
      if(err){
        res.send(err);
      }
      Course.find(function(err, courses){
        if(err){
          res.send(err);
        }
        res.json(courses);
      });
    });
  });
}