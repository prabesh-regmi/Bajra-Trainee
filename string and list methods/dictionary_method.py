#FROMKEYS

x = ('key1', 'key2', 'key3')
y = 0

thisdict = dict.fromkeys(x, y)


print(thisdict)

#GET
car = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
}

x = car.get("model")

print("Get:{}".format(x))

#ITEMS
x = car.items()

print("Items: {}".format(x))

#KEYS
x = car.keys()

print("Keys: {}".format( x))
#POP
car.pop("model")

print("POP: {}".format(car))

#POPITEM
car.popitem()

print("PopItem: {}".format( car))
#DETDEFAULT
x = car.setdefault("model", "Bronco")

print(x)
#UPDATE
car.update({"color": "White"})

print("update: {}".format( car))
#VALUES
x = car.values()

print("values: {}".format( x))

# CLEAR

car.clear()

print("clear: {}".format(car))