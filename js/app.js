const root = document.getElementById('root');
const firstDiv =document.createElement('div');
root.appendChild(firstDiv);
firstDiv.classList.add('container');
var formContainer= null;
const authUser=JSON.parse(localStorage.getItem("authUser"));


function index(){
    formContainer && formContainer.remove();
    const userProfile = document.createElement('div');
    userProfile.classList.add('user-profile');
    firstDiv.appendChild(userProfile);

    const heading= document.createElement('div');
    heading.className='profile-heading'
    userProfile.appendChild(heading);

    const nameTitle = document.createElement('h1');
    nameTitle.innerHTML=authUser.fullName;
    heading.appendChild(nameTitle);

    const usernameArea =document.createElement('div');
    usernameArea.className='user-name-area';
    heading.appendChild(usernameArea);


    const userImage =document.createElement('img');
    userImage.src='img/user.png';
    userImage.alt ='Can not load';
    userImage.className='user-img';

    const username =document.createElement('h4');
    username.innerHTML=authUser.username;

    usernameArea.appendChild(userImage);
    usernameArea.appendChild(username);

    const body = document.createElement('div');
    body.className='body';
    userProfile.appendChild(body);

    const fullName =document.createElement('p');
    fullName.innerHTML=`<b> Full Name:</b> ${authUser.fullName}`;

    const email =document.createElement('p');
    email.innerHTML=`<b> Email:</b> ${authUser.email}`;


    const phoneNumber =document.createElement('p');
    phoneNumber.innerHTML=`<b> Phone Number:</b> ${authUser.phoneNumber}`;

    body.appendChild(fullName);
    body.appendChild(email);
    body.appendChild(phoneNumber);



}

























// const data =[
//       {
//          "firstName": "Joe",
//          "lastName": "Jackson",
//          "gender": "male",
//          "age": 28,
//          "number": "7349282382"
//       },
//       {
//          "firstName": "James",
//          "lastName": "Smith",
//          "gender": "male",
//          "age": 32,
//          "number": "5678568567"
//       },
//       {
//          "firstName": "Emily",
//          "lastName": "Jones",
//          "gender": "female",
//          "age": 24,
//          "number": "456754675"
//       }
//    ]
// localStorage.setItem("name", JSON.stringify(data));
// const newdata= {
//              "firstName": "James",
//              "lastName": "Smith",
//              "gender": "male",
//              "age": 32,
//              "number": "5678568567"
//           }
// var getData = JSON.parse(localStorage.getItem("name"));
// // localStorage.setItem("name",JSON.stringify(getData))
// // getData =[...getData, newdata];
// console.log(getData);


window.addEventListener('DOMContentLoaded', (event) => {

//    authUser &&  index();
localStorage.setItem("authUser", JSON.stringify({
             "fullName": "Joe Jackson",
             "username": "Jackson",
             "gender": "male",
             "email": "prabesh.regmi@bajratechnologies.com",
             "number": "7349282382"
          },))
signup(); 
});