function login(){
    formContainer && formContainer.remove();
    formContainer =document.createElement('div');
    firstDiv.appendChild(formContainer);
    formContainer.classList.add('form-container');
 
    const loginHeading =document.createElement('h2');
    loginHeading.innerHTML= 'LOGIN';
    loginHeading.className='login-heading'
    formContainer.appendChild(loginHeading);
 
 
    const loginForm = document.createElement('form');
    loginForm.className='form';
    formContainer.appendChild(loginForm);
 
    loginForm.setAttribute('method', 'post')
    const username= document.createElement('input');
    username.type='text';
    username.placeholder='Username';
    username.classList.add('form-input')
 
    const password= document.createElement('input');
    password.type='password';
    password.placeholder='password';
    password.classList.add('form-input')

    const noAccountp =document.createElement('p');
    noAccount.innerHTML='Do not have Account?'
    const noAccounta =document.createElement('a');
    noAccount.innerHTML='Click here';
 
    const loginbtn =document.createElement('input');
    loginbtn.type ='button';
    loginbtn.value='LOGIN';
    loginbtn.classList.add('form-input');
    loginbtn.classList.add('btn')
 
 
    loginForm.appendChild(username);
    loginForm.appendChild(password);
    loginForm.appendChild(loginbtn);

    loginbtn.addEventListener("click",()=>{
        signup();
    });
 
 }