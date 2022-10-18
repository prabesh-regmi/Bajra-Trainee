class Person:
  name = "John"
  age = 36
  country = "Norway"
  def post(self,name):
    self.name = name
class TestClass:
  pass
x = getattr(Person, 'post')
t=TestClass()
x(t,"Prabesh")
print(t.name)