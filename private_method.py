import datetime
class Student:
    def __init__(self,fName,lName,rollNo,section,dob):
        self.fName =fName
        self.lName =lName
        self.rollNo =rollNo
        self.section =section
        self.dob =dob
        self.age =self.__age()
    
    def __age(self):
        return (datetime.date.today().year-datetime.date.fromisoformat(self.dob).year)
    
    def getAge(self):
        return (datetime.date.today().year-datetime.date.fromisoformat(self.dob).year)

student =Student("Aditya", "Nepal",4,'B','1999-07-18')
print(student.age)
print(student.getAge())
    
