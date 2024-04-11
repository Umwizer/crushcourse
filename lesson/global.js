//global object
console.log(global);
setTimeout
global.setTimeout(() => {
  console.log('IN Timeout')  
  clearInterval(interval)
}, 3000);

//interval
const interval = setInterval(() =>{
console.log('In the interval')
},1000)
console.log(__dirname)
console.log(__filename)
