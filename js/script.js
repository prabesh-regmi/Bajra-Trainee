const newBtn=document.getElementById("newBtn");
const cancelBtn=document.getElementById("cancel");
const createBtn=document.getElementById("create");
const tableArea=document.getElementById("todo-table");
const modal=document.getElementById("modal");
var label=null;

// const data=[
//     {
//         "title":"Launch",
//         "description":"I am very hungry",
//         "date":"2/2/2020",
//         "complete":false
//     }
// ]

// var table = document.createElement('table');
// // const tr=document.createElement('tr');
// const th=document.createElement('th');
// const td=document.createElement('td');

// tableArea.appendChild(table);
// const tr=document.createElement('tr');
// table.appendChild(tr)
// for (var key in data[0]){
//     if (data[0].hasOwnProperty(key)) {
//         // const th=document.createElement('th');
//         // th.innerHTML=key;
//         console.log(key)
//     }
// }
function getLabel(error){
    label=document.createElement('label');
    label.className='label';
    label.innerHTML=error;
}



newBtn.addEventListener("click",()=>{
    modal.classList.toggle('modal-show');

});

cancelBtn.addEventListener("click",()=>{
    modal.classList.toggle('modal-show');

});
const form =document.getElementById('form');
form.addEventListener("submit",(event)=>{
    event.preventDefault();

    console.log(event.target[0].value)
    const title =event.target[0].value;
    const description =event.target[1].value;
    const date =event.target[2].value;
    const fields =[event.target[0],event.target[1], event.target[2]]
    var valid=true;
    label&&label.remove();
    fields.forEach((field)=>{
        field.classList.remove('error');
        console.log(field.value)
        if(valid){
            if(field.value.length<=0){
                valid=false;
                getLabel("This field is required!");
                field.classList.add('error');
                field.parentNode.insertBefore(label, field.nextSibling);
            }
        }
        
    });

    const newdata ={
        "title":title,
        "description":description,
        "date":date
    }
    if(valid){
        var localData = JSON.parse(localStorage.getItem('todo'));
        localData=[...localData, newdata];
        localStorage.setItem('todo',JSON.stringify(localData));

    }

    // console.log(localData)
    // modal.classList.toggle('modal-show');

});
// localStorage.setItem('todo',JSON.stringify([]));