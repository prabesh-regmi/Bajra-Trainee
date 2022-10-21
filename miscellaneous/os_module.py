import os
print(os.getcwd())
os.mkdir("os module")
os.chdir("os module")
print(os.getcwd())
os.chdir("..")
print(os.getcwd())
os.rmdir("os module")
[print(f) for f in os.listdir('.')]