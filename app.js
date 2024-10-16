var express = require('express');
var app = express();
var mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://venkateshknr01:venkat@projectcluster.yy2ig.mongodb.net/umodel?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB connection error:", err));

var Schema = mongoose.Schema;

var personSchema = new Schema({
    firstname: String,
    lastname: String,
    address: String
});

var Person = mongoose.model('Person', personSchema);

// Function to save a person
async function savePerson(personData) {
    try {
        const person = new Person(personData);
        await person.save();
        console.log('Person saved:', personData);
    } catch (err) {
        console.error('Error saving person:', err);
    }
}

// Save John
savePerson({
    firstname: 'John',
    lastname: 'Doe',
    address: '555 Main St.'
});

// Save Jane
savePerson({
    firstname: 'Jane',
    lastname: 'Doe',
    address: '555 Main St.'
});

var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');

var port = process.env.PORT || 3000;

var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', async function (req, res, next) {
    console.log('Request Url:' + req.url);
    
    try {
        const users = await Person.find({});
        console.log(users);  
    } catch (err) {
        console.error('Error fetching users:', err);
    }
    
    next();
});

htmlController(app);
apiController(app);


var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
