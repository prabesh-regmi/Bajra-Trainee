class Person:
    def __init__(self,firstName,lastName):
        self.firstName=firstName
        self.lasrName=lastName
    
    @classmethod
    def fullName(cls,fullName):
        fName =fullName.split(' ')[0]
        lName =fullName.split(" ")[1]
        return cls(fName,lName)

obj1=Person("Prabesh", "Regmi")
obj2=Person.fullName("Aditya Nepal")
print(obj1.firstName)
print(obj2.firstName)
