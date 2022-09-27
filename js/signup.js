function signup(){
    formContainer && formContainer.remove();
    formContainer =document.createElement('div');
    firstDiv.appendChild(formContainer);
    formContainer.classList.add('form-container');
 
    const signupHeading =document.createElement('h2');
    signupHeading.innerHTML= 'SIGNUP';
    signupHeading.className='login-heading'
    formContainer.appendChild(signupHeading);
 
 
    const signUpForm = document.createElement('form');
    signUpForm.className='form';
    formContainer.appendChild(signUpForm);
 
    signUpForm.setAttribute('method', 'post')
    const fullName= document.createElement('input');
    fullName.type='text';
    fullName.placeholder='Full Name';
    fullName.classList.add('form-input')
 
    const username= document.createElement('input');
    username.type='text';
    username.placeholder='Username';
    username.classList.add('form-input')
 
    const email= document.createElement('input');
    email.type='email';
    email.placeholder='Email';
    email.classList.add('form-input')
 
    const password= document.createElement('input');
    password.type='password';
    password.placeholder='password';
    password.classList.add('form-input')
 
    const conformPassword= document.createElement('input');
    conformPassword.type='password';
    conformPassword.placeholder='Conform Password';
    conformPassword.classList.add('form-input')
 
    const signupbtn =document.createElement('input');
    signupbtn.type ='button';
    signupbtn.value='SIGN UP';
    signupbtn.classList.add('form-input');
    signupbtn.classList.add('btn')
 
    signUpForm.appendChild(fullName);
    signUpForm.appendChild(username);
    signUpForm.appendChild(email);
    signUpForm.appendChild(password);
    signUpForm.appendChild(conformPassword);
    signUpForm.appendChild(signupbtn);

    signupbtn.addEventListener("click",()=>{
        login();
    });
 
 
 }