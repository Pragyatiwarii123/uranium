let text =  ' functionUp '

const trim = function trim(){
console.log(text.trim());
}
module.exports.trim1 = trim

const changetoLowerCase = function changetoLowerCase() {
   console.log(text.toLowerCase()); 

}
module.exports.changetoLowerCase1 = changetoLowerCase

const changeToUpperCase = function changeToUpperCase(){ 
   console.log(text.toUpperCase())


}
module.exports.changeToUpperCase1 = changeToUpperCase
