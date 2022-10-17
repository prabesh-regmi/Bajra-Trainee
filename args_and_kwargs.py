#EXAMPLE OF *args 
class car(): 
	def __init__(self,*args): 
		self.speed = args[0] 
		self.color=args[1]
				
		
audi=car(200,'red')
bmw=car(250,'black')
mb=car(190,'white')
	
print(audi.color)
print(bmw.speed)

#EXAMPLE OF *kwargs

class car(): 
	def __init__(self,**kwargs): 
		self.speed = kwargs['s'] 
		self.color = kwargs['c']
				
		
audi=car(s=200,c='red')
bmw=car(s=250,c='black')
mb=car(s=190,c='white')

print(audi.color)
print(bmw.speed)
