import ctypes
b='b'
a='a'
c='ab'

print(hex(id(a)))
print(hex(id(b)))
print(hex(id(c)))
print(hex(id(a)+id(b)))

a = ctypes.cast(id(a), ctypes.py_object).value
