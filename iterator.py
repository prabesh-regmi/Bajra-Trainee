class Class:
    def __init__(self,students):
        self.student=students
    
    def __iter__(self):
        self.n=0
        return self
    
    def __next__(self):
        if self.n< len(self.student):
            self.n +=1
            return self.student[self.n-1]
        else:
            raise StopIteration


class1 =Class(["kirti","Aditya","Aayush","Anish","Binita"])
class1Iterator =iter(class1);
print(next(class1Iterator))

for name in class1Iterator:
    print(name)