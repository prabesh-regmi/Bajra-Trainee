const newBtn=document.getElementById("newBtn");
const cancelBtn=document.getElementById("cancel");
const createBtn=document.getElementById("create");
const tableArea=document.getElementById("todo-table");
const modal=document.getElementById("modal");



const table =document.createElement('table');


newBtn.addEventListener("click",()=>{
    modal.classList.toggle('modal-show');

});

cancelBtn.addEventListener("click",()=>{
    modal.classList.toggle('modal-show');

});
createBtn.addEventListener("click",()=>{
    modal.classList.toggle('modal-show');

});
const data=[
    {
        
    }
]