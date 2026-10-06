module.exports = class person{  // export the class to another file it will be available to public to use
    age = 25

    // if we need to hold multiple properties we can use get method

    get location(){
        return "Canada"
    }
}


const personDetails = new javaScriptPractice2.js();
console.log(personDetails.age);
console.log(person.location)

//constructor is method which execute by default when you create object of the class

constructor (firstname, lastname)
{
    this.firstname = firstname
    this.lastname = lastname
}

fullName()
{
console.log(this.firstname+this.lastname)
}


let Person = new person("Tim","Joseph");
console.log(Person.age);
console.log(Person.location);
console.log(person.fullName());