const person =require('tests/javaScriptPractice2') // this should me mentioned what class should be imported

console.log("Hello world")

// Object is collection of properties

let person = {
    firstName : 'Tim',
    lastName : 'joe',
    fullName : function()
    {
    console.log(this.firstName + this.lastName);
    }

}

// funtion call
console.log(person.fullName());

console.log(person.lastName)
console.log(person['firstName'])
person.firstName('Tim Dane') // replace the name 
console.log(person.firstName);
person.gender = 'male'
console.log(person)
delete person.gender  // delete the value
console.log('gender' in person)   //  check property is exist in object


//interview question

//print all the values of the javascript object

for(let key in person){
    console.log(person[key]);
}

