def mygenerator():
    print('First item')
    yield 10

    print('Second item')
    yield 20

    print('Last item')
    yield 30

gen =mygenerator()
next(gen)
next(gen)
next(gen)
# next(gen)  # Gives StopIteration exception when there is no item left to iterate 

square =(x*x for x in range(5)) # Generator with for loop
for x in square:
    print(x)
