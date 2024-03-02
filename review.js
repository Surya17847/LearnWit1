
const btn=document.querySelector("#submit")
const greeting=document.querySelector(".reviewpage");
btn.addEventListener('click',()=>{
    if(greeting){
    greeting.innerHTML=
    `<link rel="stylesheet" type="text/css" href="styles.css">

    <h1>Thank you for your Review</h1>
    <a href="index.html" id="home"><button id="home-btn">HOME</button></a>
    `
    }
});