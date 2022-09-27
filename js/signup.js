function signup(){
    var label =null;
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
    fullName.classList.add('form-input');
    const fullNameLabel=document.createElement('label');
    fullNameLabel.innerHTML="This field is required!"
 
    const username= document.createElement('input');
    username.type='text';
    username.placeholder='Username';
    username.classList.add('form-input')
 
    const email= document.createElement('input');
    email.type='email';
    email.placeholder='Email';
    email.classList.add('form-input');

    const phoneNumber= document.createElement('input');
    phoneNumber.type='text';
    phoneNumber.placeholder='Phone Number';
    phoneNumber.classList.add('form-input');


    const gender= document.createElement('select');
    gender.classList.add('form-input');
    const chooseOption =document.createElement('option');
    chooseOption.text='Gender';
    chooseOption.value='';
    chooseOption.disabled=true;
    chooseOption.selected=true;

    const maleOptin =document.createElement('option');
    maleOptin.text='Male';
    maleOptin.value="Male";
    const femaleOptin =document.createElement('option');
    femaleOptin.text='Female';
    femaleOptin.value="Female";
    gender.add(chooseOption);
    gender.add(maleOptin);
    gender.add(femaleOptin);
 
    const password= document.createElement('input');
    password.type='password';
    password.placeholder='password';
    password.classList.add('form-input')
 
    const conformPassword= document.createElement('input');
    conformPassword.type='password';
    conformPassword.placeholder='Conform Password';
    conformPassword.classList.add('form-input');

    const haveAccount =document.createElement('div');
    haveAccount.classList.add('account-option');

    const haveAccountp =document.createElement('p');
    haveAccountp.innerHTML='Already have an Account?'
    const haveAccounta =document.createElement('p');
    haveAccounta.innerHTML='Login';
    haveAccounta.classList.add('link');
 
    const signupbtn =document.createElement('input');
    signupbtn.type ='button';
    signupbtn.value='SIGN UP';
    signupbtn.classList.add('form-input');
    signupbtn.classList.add('btn');

function getLabel(error){
    label=document.createElement('label');
    label.className='label';
    label.innerHTML=error;
}
 
    signUpForm.appendChild(fullName);
    signUpForm.appendChild(username);
    signUpForm.appendChild(email);
    signUpForm.appendChild(phoneNumber);
    signUpForm.appendChild(gender);
    signUpForm.appendChild(password);
    signUpForm.appendChild(conformPassword);
    signUpForm .appendChild(haveAccount);
    haveAccount.appendChild(haveAccountp);
    haveAccount.appendChild(haveAccounta);
    signUpForm.appendChild(signupbtn);

    signupbtn.addEventListener("click",()=>{
        label && label.remove();
        fullName.classList.remove('error');
        fields =[fullName, username, email, phoneNumber, gender, password,conformPassword];
        const formData={
            "firstName":fullName.value,
            "username":username.value,
            "email":email.value,
            "phoneNumber":phoneNumber.value,
            "gender":gender.value,
            "password":password.value
        }
        var valid=true;
        fields.forEach((field)=>{
            console.log(field.value.length);
            field.classList.remove('error');
            if(valid){
                if(field.value.length<=0){
                    valid=false;
                    getLabel("This field is required!");
                    field.classList.add('error');
                    field.parentNode.insertBefore(label, field.nextSibling);
                }
                else if(field.type='email' && !email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
                {
                    valid=false;
                    getLabel("Email is not valid!");
                    email.classList.add('error');
                    email.parentNode.insertBefore(label, email.nextSibling);

                }

            }
            

        });
        if((password.value!= conformPassword.value)&& valid)
        {
            valid=false;
            getLabel("Password do not match!");
            conformPassword.classList.add('error');
            conformPassword.parentNode.insertBefore(label, conformPassword.nextSibling);

        }
        // localStorage.setItem("Users",JSON.stringify([]));
        if (valid){
            var localData=JSON.parse(localStorage.getItem("Users"));
            const newData=[...localData, formData];
            localStorage.setItem("Users",JSON.stringify(newData));
            // localStorage.setItem("Users",JSON.stringify([...JSON.parse(localStorage.getItem('Users')),formData]));
            fields.forEach((field)=>{
                field.value='';
            })
            
        }
      









        // login();
    });

    
    haveAccounta.addEventListener("click",()=>{
        login();
    });
 
 
 }