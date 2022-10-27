import math
#(a+b)^n
#print("(a+b)^n")

ques = input("Display values for 1 [Y]es/[N]o: ").upper()

if ques == "Y":
	print("(1+1)^n")
	a = 1
	b = 1
else:
	print("(a+b)^n")
	a = int(input("a: "))
	b = int(input("b: "))


n = int(input("n: "))
k = 0

print("("+str(a)+"+"+str(b)+")"+"^"+str(n))

list = []
result = 0

for i in range(n):
	while k <= n:
		res = (math.factorial(n) / (math.factorial(k) * math.factorial(n-k)))  * a**(n-k) * b**k
		k = k + 1
		list.append(res)
		result = result + res

mystr = ""
for i in range(len(list)):
	x=list[i]
	if str(x)[0] == "-":
		x = "("+str(x)+")"
	if i != 0:
		mystr += " + "+ str(x)
		
	else:
		 mystr += ""+ str(x)
		 

if n == 0:
	result = 1

if ques == "Y":
	if n == 0:
		print(result)
	#print(list)
	print(mystr)

else:
	
	#print(list)
	#stri = " + ".join(map(str, list))
	#print(stri)
	print(result)
	print(mystr)
