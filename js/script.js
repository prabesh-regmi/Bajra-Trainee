const newBtn = document.getElementById("newBtn");
const cancelBtn = document.getElementById("cancel");
const createBtn = document.getElementById("create");
const tableArea = document.getElementById("todo-table");
const modal = document.getElementById("modal");
const form = document.getElementById('form');
var label = null;
var localData = JSON.parse(localStorage.getItem('todo') || []);


var table = document.createElement('table');
const tr = document.createElement('tr')
const th = document.createElement('th');

tableArea.appendChild(table);
table.appendChild(tr);
const snTh = document.createElement('th');
snTh.innerHTML = "S.N";
const titleTh = document.createElement('th');
titleTh.innerHTML = "Title";
const descriptionTh = document.createElement('th');
descriptionTh.innerHTML = "Description";
const dateTh = document.createElement('th');
dateTh.innerHTML = 'Date';
const actionTh = document.createElement('th');
actionTh.innerHTML = 'Action';
tr.appendChild(snTh);
tr.appendChild(titleTh);
tr.appendChild(descriptionTh);
tr.appendChild(dateTh);
tr.appendChild(actionTh);

// createTable(localData);
localData.forEach((item, index) => {
    const tr = document.createElement('tr');
    table.appendChild(tr);

    const snTd = document.createElement('td');
    snTd.innerHTML = `${index + 1}`;
    const titleTd = document.createElement('td');
    titleTd.innerHTML = item.title;
    const descriptionTd = document.createElement('td');
    descriptionTd.innerHTML = item.description;
    const dateTd = document.createElement('td');
    dateTd.innerHTML = item.date;
    const actionTd = document.createElement('td');
    const actionDiv = document.createElement('div');
    actionDiv.classList.add('action-div');
    const editTag = document.createElement('a');
    editTag.classList.add('edit')
    editTag.innerHTML = 'Edit';
    actionDiv.appendChild(editTag)
    const completeTag = document.createElement('a');
    completeTag.innerHTML = '&#10004;';
    actionDiv.appendChild(completeTag)

    actionTd.appendChild(actionDiv);
    tr.appendChild(snTd);
    tr.appendChild(titleTd);
    tr.appendChild(descriptionTd);
    tr.appendChild(dateTd);
    tr.appendChild(actionTd);


});
// localData.forEach((item, index) => {
//     const tr = document.createElement('tr');
//     console.log(index)
//     table.appendChild(tr);
//     for (const key in item) {
//         switch (key) {
//             case 'id':
//                 const td1 = document.createElement('td');
//                 td1.innerHTML = `${index + 1}`;
//                 tr.appendChild(td1);
//             case 'title':
//                 const td2 = document.createElement('td');
//                 td2.innerHTML = item[key];
//                 tr.appendChild(td2);
//             case 'description':
//                 const td3 = document.createElement('td');
//                 td3.innerHTML = item[key];
//                 tr.appendChild(td3);
//             case 'date':
//                 const td4 = document.createElement('td');
//                 td4.innerHTML = item[key];
//                 tr.appendChild(td4);
//             case 'complete':
//                 const td5 = document.createElement('td');
//                 td5.innerHTML = item[key];
//                 tr.appendChild(td5);

//         }
//         // if (key == "id") {
//         //     const td = document.createElement('td');
//         //     td.innerHTML = item[key];
//         //     tr.appendChild(td);

//         // }
//         // else if (key == "id") {
//         //     const td = document.createElement('td');
//         //     td.innerHTML = item[key];
//         //     tr.appendChild(td);

//         // }
//         // else if (key == "id") {
//         //     const td = document.createElement('td');
//         //     td.innerHTML = item[key];
//         //     tr.appendChild(td);

//         // }
//         // else if (key == "id") {
//         //     const td = document.createElement('td');
//         //     td.innerHTML = item[key];
//         //     tr.appendChild(td);

//         // }


//     }
// });



function getLabel(error) {
    label = document.createElement('label');
    label.className = 'label';
    label.innerHTML = error;
}



newBtn.addEventListener("click", () => {
    modal.classList.toggle('modal-show');

});

cancelBtn.addEventListener("click", () => {
    form.reset();
    label && label.remove();
    form.elements[0].classList.remove('error');
    form.elements[1].classList.remove('error');
    form.elements[2].classList.remove('error');

    modal.classList.toggle('modal-show');

});
form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log(event.target[0].value)
    const title = event.target[0].value;
    const description = event.target[1].value;
    const date = event.target[2].value;
    const fields = [event.target[0], event.target[1], event.target[2]]
    var valid = true;
    label && label.remove();
    fields.forEach((field) => {
        field.classList.remove('error');
        console.log(field.value)
        if (valid) {
            if (field.value.length <= 0) {
                valid = false;
                getLabel("This field is required!");
                field.classList.add('error');
                field.parentNode.insertBefore(label, field.nextSibling);
            }
        }

    });

    const newdata = {
        "id": `${Math.floor(Math.random()) * 9999 + Date.now()}`,
        "title": title,
        "description": description,
        "date": date,
        "complete": false
    }
    if (valid) {
        localData = [...localData, newdata];
        localStorage.setItem('todo', JSON.stringify(localData));
        form.reset();

    }

    // console.log(localData)
    // modal.classList.toggle('modal-show');

});
// localStorage.setItem('todo',JSON.stringify([]));
localStorage.getItem('todo') || localStorage.setItem('todo', JSON.stringify([]));

var table = document.createElement('table');
var tableBody = document.createElement('tbody');

// function createTable(tableData) {
//     tableData.forEach(function (rowData) {
//         var row = document.createElement('tr');

//         rowData.forEach(function (cellData) {
//             var cell = document.createElement('td');
//             cell.appendChild(document.createTextNode(cellData));
//             row.appendChild(cell);
//         });

//         tableBody.appendChild(row);
//     });

//     table.appendChild(tableBody);
//     document.body.appendChild(table);
// }
// function createTable(array) {
//     for (var i = 0; i < array.length; i++) {
//         var row = document.createElement('tr');
//         for (var j = 0; j < array[i].length; j++) {
//             var cell = document.createElement('td');
//             cell.textContent = array[i][j];
//             row.appendChild(cell);
//         }
//         table.appendChild(row);
//     }
//     return table;
// }