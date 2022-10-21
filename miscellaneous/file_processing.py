f = open("test.txt")    # open file in current directory

# f = open("test.txt")      # equivalent to 'r' or 'rt'
f = open("test.txt", 'w')  # write in text mode

f = open("test.txt", mode='r', encoding='utf-8')

f.close()

try:
    f = open("test.txt", encoding='utf-8')
    # perform file operations
finally:
    f.close()

with open("test.txt", 'w', encoding='utf-8') as f:
    f.write("my first file\n")
    f.write("This file\n\n")
    f.write("contains three lines\n")

f = open("test.txt",'r',encoding = 'utf-8')
print(f.read(100))
f.tell()

f.seek(0)   # bring file cursor to initial position


# print(f.readlines())
# print(f.readlines())
print(f.readline())
print(f.readlines())



import csv
with open('chocolate.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)


import json
with open('movie.json') as f:
    content = json.load(f)
    print(content)
