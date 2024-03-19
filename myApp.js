require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = `mongodb+srv://${process.env.MONGO_URI_DB_USERNAME}:${process.env.MONGO_URI_DB_PASSWORD}@${process.env.MONGO_URI_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((error) => console.error('MongoDB connection error:', error));


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema); // Create a Model

const createAndSavePerson = (done) => { // Create and Save a Record of a Model
  const person = new Person({
    name: 'Karim',
    age: 26,
    favoriteFoods: ['pizza', 'sushi']
  });

  person.save(function (err, data) {
    if (err) {
      done(err);
      return;
    }
    console.log(data);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => { // Create and Save Multiple Records of a Model
  Person.create(arrayOfPeople, function (err, data) {
    if (err) {
      done(err);
      return;
    }
    console.log(data);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => { // Search Your Database
  Person.find({ name: personName },
    function (err, data) {
      if (err) {
        done(err);
        return;
      }
      console.log(data);
      done(null, data);
    });
};

const findOneByFood = (food, done) => { // Return a Single Matching Document from Your Database
  Person.findOne({ favoriteFoods: food },
    function (err, data) {
      if (err) {
        done(err);
        return;
      }
      console.log(data);
      done(null, data);
    });
};

const findPersonById = (personId, done) => { // Search Your Database By _id
  Person.findById(personId,
    function (err, data) {
      if (err) {
        done(err);
        return;
      }
      console.log(data);
      done(null, data);
    });
};

const findEditThenSave = (personId, done) => { // Perform Classic Updates by Running Find, Edit, then Save
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) {
      done(err);
      return;
    }
    person.favoriteFoods.push(foodToAdd);
    person.markModified('favoriteFoods'); // Mark favoriteFoods as edited
    person.save((err, updatedPerson) => {
      if (err) {
        done(err);
        return;
      }
      console.log(updatedPerson);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => { // Perform New Updates on a Document
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) {
        done(err);
        return;
      }
      console.log(updatedPerson);
      done(null, updatedPerson);
    });
};

const removeById = (personId, done) => { // Delete One Document
  Person.findByIdAndRemove(personId,
    function (err, data) {
      if (err) {
        done(err);
        return;
      }
      console.log(data);
      done(null, data);
    });
};

const removeManyPeople = (done) => { // Delete Many Documents
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove },
    function (err, data) {
      if (err) {
        done(err);
        return;
      }
      console.log(data);
      done(null, data);
    });
};

const queryChain = (done) => { // Chain Search Query Helpers to Narrow Search Results
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: false })
    .exec(
      (err, data) => {
        if (err) {
          done(err);
          return;
        }
        console.log(data);
        done(null, data);
      });
};

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
