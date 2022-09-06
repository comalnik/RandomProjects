import random
repin = int(input("Number of repetitions: "))
i = 0
ls = []
while i < repin:
    file = open("list.txt", "r")
    lines = file.read().splitlines()
    x = random.choice(lines)
    ls.append(x)
    lstr = " ".join(str(z) for z in ls)
    i = i+1
print(lstr)

