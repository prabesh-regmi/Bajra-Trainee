
class Base:
	def __init__(self):

		self._a = 2

# class Derived(Base):
# 	def __init__(self):

# 		Base.__init__(self)
# 		print("Calling protected member of base class: ",
# 			self._a)

# 		self._a = 3
# 		print("Calling modified protected member outside class: ",
# 			self._a)


# obj1 = Derived()

# obj2 = Base()

# print("Accessing protected member of obj1: ", obj1._a)
# obj1._a=4
# print("Accessing protected member of obj1: ", obj1._a)

# print("Accessing protected member of obj2: ", obj2._a)


# class Modifiers:
#     def __init__(self,name):
#         self._protected_member = name # Protected Attribute
# m = Modifiers("SKAUL05")
# print(m._protected_member)

class Modifiers:
	_a=4
	def __init__(self,name):
		self._protected_member =name
		self.public="Public"
	def sum(a,b):
		return a+b

m=Modifiers("Protected member")
print(m._protected_member)
m._protected_member="Protected member is changed"
print(m.public)
print(m._protected_member)
# m._protected_member="hello"