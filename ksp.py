import random

cont = str.upper('D')
rp = 0
pp = 0

while cont == str.upper('D'):

    bot = random.randint(1, 3)
    usr = input('[K]amen / [S]karje/ [P]apir: ')
    uper = str.upper(usr)



    if uper == str('K'):
        print('Ti izberes: Kamen')
    elif uper == str('S'):
        print('Ti izberes: Skarje')
    elif uper == str('P'):
        print('Ti izberes: Papir') 
    else:
        break



    if bot == int(1):
        print('Racunalnik izbere: Kamen')

    elif bot == int(2):
        print('Racunalnik izbere: Skarje')

    elif bot == int(3):
        print('Racunalnik izbere: Papir')

    

    while bot == int(1):
        if uper == str('K'):
            print('izenaceno')
            break
        elif uper == str('S'):
            print('racunalnik zmaga')
            rp += 1
            break
        elif uper == str('P'):
            print('ti zmagas')
            pp += 1
            break

    while bot == int(2):
        if uper == str('S'):
            print('izenaceno')
            break
        elif uper == str('P'):
            print('racunalnik zmaga')
            rp += 1
            break
        elif uper == str('K'):
            print('ti zmagas')
            pp += 1
            break

    while bot == int(3):
        if uper == str('P'):
            print('izenaceno')
            break
        elif uper == str('K'):
            print('racunalnik zmaga')
            rp += 1
            break
        elif uper == str('S'):
            print('ti zmagas')
            pp += 1
            break

    print('igralec: ', pp)
    print('racunalnik: ', rp)
    cont1 = input('Ali zelis nadaljevati? [D]a / katera koli druga crka za Ne: ')
    cont = str.upper(cont1)
