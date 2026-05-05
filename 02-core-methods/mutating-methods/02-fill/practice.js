
//  array literals :

let num = [1, 2, 3, 4];

// fill(): this is also a mutable methods : 

num.fill(12, 0)
console.log(num);//[1 ,2 , 12 , 4];

const arrNUM = new Array(5).fill(14);
console.log(arrNUM);