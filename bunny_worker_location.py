def bunnyLocation(q,w):
    m=q+w
    list=[]
    
    for i in range(0,m):
        num=1 if i==0 else col[0]+1
        col=[]
        v=i
        for j in range(0,m-i):
            num +=j+v

            col.append(num)
        list.append(col)
    return list[q-1][w-1]
    # return list

userInput =input("Enter location: ")

print(bunnyLocation(int(userInput.split(",")[0]),int(userInput.split(",")[1])))
# 16
# 11 17 
# 7 12 18 
# 4 8 13 19
# 2 5 9 14 20
# 1 3 6 10 15 21