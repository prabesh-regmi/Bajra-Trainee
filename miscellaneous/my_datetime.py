import datetime
# from datetime import datetime

datetime_now = datetime.datetime.now()
print(datetime_now)

date_today = datetime.datetime.today()
print(date_today)

print(dir(datetime))
d = datetime.date(2019, 4, 13)
print(d)


# current date and time
now = datetime.now()

t = now.strftime("%H:%M:%S")
print("time:", t)

s1 = now.strftime("%m/%d/%Y, %H:%M:%S")
# mm/dd/YY H:M:S format
print("s1:", s1)

s2 = now.strftime("%d/%m/%Y, %H:%M:%S")
# dd/mm/YY H:M:S format
print("s2:", s2)
