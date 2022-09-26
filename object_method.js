const Persion ={
	firstName:"Prabesh",
	lastName:"Regmi",
	email:"prabesh.regmi@bajratechnologies.com",
	phoneNumber:"9841993575",
	fullName:function(){return (this.firstName +" " +this.lastName)}
}

const fullName=Persion.fullName();
console.log(fullName);
