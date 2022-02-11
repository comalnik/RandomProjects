import random






bot = random.randint(1, 3)
usr = input('[K]amen / [S]karje/ [P]apir: ')
uper = str.upper(usr)


if uper == str('K'):
    print('Ti izberes: Kamen')
elif uper == str('S'):
    print('Ti izberes: Skarje')
elif uper == str('P'):
    print('Ti izberes: Papir') 



if bot == int(1):
    print('Racunalnik izbere: Kamen')

elif bot == int(2):
    print('Racunalnik izbere: Skarje')

elif bot == int(3):
    print('Racunalnik izbere: Papir')





rp = 0
pp = 0

while bot == int(1):
    if uper == str('K'):
        print('izenaceno')
        print("racunalnik-tocke:", rp)
        print("igralec-tocke:", pp)
        break
    elif uper == str('S'):
        print('racunalnik zmaga')
        rp += 1
        print("racunalnik-tocke:", rp)
        print("gralec-tocke:", pp)
        break
    elif uper == str('P'):
        print('ti zmagas')
        pp += 1
        print("racunalnik-tocke:", rp)
        print("gralec-tocke:", pp)
        break

while bot == int(2):
    if uper == str('S'):
        print('izenaceno')
        print("racunalnik-tocke:", rp)
        print("gralec-tocke:", pp)
        break
    elif uper == str('P'):
        print('racunalnik zmaga')
        rp += 1
        print("racunalnik-tocke:", rp)
        print("gralec-tocke:", pp)
        break
    elif uper == str('K'):
        print('ti zmagas')
        pp += 1
        print("racunalnik-tocke:", rp)
        print("gralec-tocke:", pp)
        break

while bot == int(3):
    if uper == str('P'):
        print('izenaceno')
        print("racunalnik-tocke:", rp)
        print("gralec-tocke:", pp)
        break
    elif uper == str('K'):
        print('racunalnik zmaga')
        rp += 1
        print("racunalnik-tocke:", rp)
        print("gralec-tocke:", pp)
        break
    elif uper == str('S'):
        print('ti zmagas')
        pp += 1
        print("racunalnik-tocke:", rp)
        print("gralec-tocke:", pp)
        break