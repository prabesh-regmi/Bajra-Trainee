 function login(){
    authUser=JSON.parse(localStorage.getItem("authUser"));
    if(!authUser){
    var label =null;
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

    const noAccount =document.createElement('div');
    noAccount.classList.add('account-option');

    const noAccountp =document.createElement('p');
    noAccountp.innerHTML='Do not have Account?'
    const noAccounta =document.createElement('p');
    noAccounta.innerHTML='Sign Up';
    noAccounta.classList.add('link');

    const loginbtn =document.createElement('input');
    loginbtn.type ='button';
    loginbtn.value='LOGIN';
    loginbtn.classList.add('form-input');
    loginbtn.classList.add('btn')
 
 
    loginForm.appendChild(username);
    loginForm.appendChild(password);
    loginForm.appendChild(noAccount);
    noAccount.appendChild(noAccountp);
    noAccount.appendChild(noAccounta);
    loginForm.appendChild(loginbtn);

    function getLabel(error){
        label=document.createElement('label');
        label.className='label';
        label.innerHTML=error;
    }

    loginbtn.addEventListener("click",async()=>{
        label && label.remove();
        fields =[ username, password];
        const formData={
            "username":username.value,
            "password":password.value
        }
        var valid=true;
        fields.forEach((field)=>{
            field.classList.remove('error');
            if(valid){
                if(field.value.length<=0){
                    valid=false;
                    getLabel("This field is required!");
                    field.classList.add('error');
                    field.parentNode.insertBefore(label, field.nextSibling);
                }
            }
            

        });
       
        if (valid){
            var localData=JSON.parse(localStorage.getItem("Users"));
            var user = localData.filter(obj=>{
                return obj.username===username.value;
                
            });
            if(user.length==0){
                getLabel("This username does not exists!");
                username.classList.add('error');
                username.parentNode.insertBefore(label, username.nextSibling);
            }else if (user[0].password===password.value){
            await localStorage.setItem("authUser",JSON.stringify(user[0]));
            setTimeout(index,500);
        }
            else{
                getLabel("Password is incorrect1");
                password.classList.add('error');
                password.parentNode.insertBefore(label, password.nextSibling);

            }


        }
      









        // login();
    });
    noAccounta.addEventListener("click",()=>{
        signup();
    });
}
else{
    index();
}
 }