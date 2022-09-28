const root = document.getElementById('root');
const firstDiv =document.createElement('div');
root.appendChild(firstDiv);
firstDiv.classList.add('container');
var formContainer= null;
var authUser=JSON.parse(localStorage.getItem("authUser"));


function index(){
    authUser=JSON.parse(localStorage.getItem("authUser"));
    if (authUser){

    
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

    const gender =document.createElement('p');
    gender.innerHTML=`<b> Gender:</b> ${authUser.gender}`;

    const logout=document.createElement('div');
    logout.className='logout';

    const logoutBtn=document.createElement('input');
    logoutBtn.type='button'
    logoutBtn.value="Logout"
    logoutBtn.classList.add('logout-btn');

    body.appendChild(fullName);
    body.appendChild(email);
    body.appendChild(phoneNumber);
    body.appendChild(gender);
    body.appendChild(logout);
    logout.appendChild(logoutBtn);

    logoutBtn.addEventListener("click",()=>{
        console.log('clicked');
        localStorage.setItem("authUser",null);
        userProfile.remove();
        index();
    });
}
else{
    setTimeout(login,500);


}
}


window.addEventListener('DOMContentLoaded', (event) => {

   authUser? index():login();
});