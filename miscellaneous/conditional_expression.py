def normalElseIf(num):
    if num<0:
        return "less than zerro"
    elif num==0:
        return "Zerro"
    elif num==1:
        return "One"
    elif num==2:
        return "Two"
    elif num==3:
        return "Three"
    elif num==4:
        return "Four"
    elif num==4:
        return "Five"
    else:
        return "Greter than five"

def oneLineIfElse(num):
    return "Less than zerro" if num<0 else "Zerro" if num==0 else "One" if num==1 else "Two" if num==2 else "Three" if num==3 else "four" if num==4 else "Five" if num==5 else "Greter than five"

print(normalElseIf(-14))
print(oneLineIfElse(51))