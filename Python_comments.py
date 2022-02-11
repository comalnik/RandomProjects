#this is a very important line of code that imports a library critical to the function of this amazing python program
import random
#this is the most important line of code that generates a random number between 1 and 6
dice = random.randint(1, 6)
#this line of code is even more important than the most important line of code. it prints the random number generated in the previous line of code
print(dice)
#this line of code is very important because it asks you if you want to "roll the dice" again or not
usrc = input('Would you like to roll the dice again? [Y]es / any key for no: ')
#this is one of the most important lines of code in this program. it turns the input from the previous line into uppercase
uper = str.upper(usrc)
#this is a while loop: while the value of the variable 'userc' is y or Y it generates the random number again and asks you if you want to "roll the dice" again. if your input is Y or y it will roll the dice, else it will break and your computer will explode
while uper == 'Y':
    dice = random.randint(1, 6)
    print(dice)
    usrc = input('Would you like to roll the dice again? [Y]es / any key for no: ')
    uper = str.upper(usrc)
    

