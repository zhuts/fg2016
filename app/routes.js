var Food = require('./models/food');

module.exports = function(app) {

  app.get('*', function(req, res) {
    res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

  //get all food
  app.get('/api/meal', function(req,res){
    Course.find(function(err, meal){
      if(err){
        res.send(err);
      }
      res.json(meal);
    });
  });

  //add a food
  app.post('/api/meal', function(req, res){
    Course.create({
      title: req.body.title,
      name: req.body.name
    }, function(err, food){
      if(err){
        res.send(err);
      }
      Course.find(function(err, meal){
        if(err){
          res.send(err);
        }
        res.json(meal);
      });
    });
  });

  //delete a food
  app.delete('/api/meal/:course_id', function(req, res){
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