let mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env['MONGO_URI'];



let personSchema = new mongoose.Schema({
  name : {type: String, required: true},
  age :  Number,
  favoriteFoods : [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var newPerson =  new Person({name: "Hello World", age: 60, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
  console.log(newPerson);
  newPerson.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
   Person.findOne({favoriteFoods: food}, function (err, favoriteFood) {
    if (err) return console.log(err);
    done(null, favoriteFood);
  });
};

const findPersonById = (personId, done) => {
   Person.findById({_id: personId}, function (err, personById) {
    if (err) return console.log(err);
    done(null, personById);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 

    person.favoriteFoods.push(foodToAdd);

    
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

   Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

const removeManyPeople = (done) => {
const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
console.log(foodToSearch)
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1 }).limit(2)
    .select({age: 0}).exec((error, people) => {
    console.log(people)
     if(error) return console.log(error);
    done(null,people);
  });
  
};


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
