import math
#(a+b)^n
a = int(input("a: "))
b = int(input("b: "))
n = int(input("n: "))
k = 0

list = []
result = 0

for i in range(n):
	while k <= n:
		res = (math.factorial(n) / (math.factorial(k) * math.factorial(n-k)))  * a**(n-k) * b**k
		k = k + 1
		list.append(res)
		result = result + res

print(list)
print(result)
