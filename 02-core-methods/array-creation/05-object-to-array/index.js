// lets backend developer send api response in object format instead of sending 
// in array formate : how we process at frontend side : 
// Object.values(): in this we passes the object response and it will wrap all object 
// //into array 

const apiResponse = {
    0: {
        name: "ashutosh",
        age: 21
    },
    1: {
        name :"Amit",
        age:22
    }
}

// object.value(): this will return all object value into array formate : 


const arrayResponse = Object.values(apiResponse);
console.log(arrayResponse);
// Object.keys(): this will return all object keys into array formate : 
// Object.entries is also a methods through which we can convert object to array 


const user= {
    name:"Ashutosh",
    age:21,
}


const userArray = Object.entries(user).map(([key,value])=>console.log(key,value))
// console.log(userArray); // object key and value converted into array 

// Object.keys(); return the array of objects  the keys 
// Object.values(); return the array of object values 
// Object.entries(); return the array of each key and values of the object 
