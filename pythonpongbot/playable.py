import pygame
import sys
import math
from math import atan2, degrees, pi
import numpy
import random
import time


player_pts = 0
opponent_pts = 0

def ball_animation():
    global ball_speed_x, ball_speed_y, opponent_pts, player_pts, score_time
    ball.x += ball_speed_x
    ball.y += ball_speed_y

    if ball.top <= 0 or ball.bottom >=screen_height:
        ball_speed_y *= -1

    if ball.left <= 0:
        opponent_pts += 1
        #ball_restart()
        score_time = pygame.time.get_ticks()
 
        


    if ball.right >= screen_width:
        player_pts +=1
        ball_restart()
        score_time = pygame.time.get_ticks()


    if ball.colliderect(player) or ball.colliderect(opponent):
        ball_speed_x *= -1






def ball_restart():
    global ball_speed_x, ball_speed_y, score_time, basic_font
    current_time = pygame.time.get_ticks()

    ball.center = (screen_width / 2, screen_height / 2) 

    if current_time - score_time < 700:
       number_three = font.render("3",False, light_grey)
       screen.blit(number_three,(screen_width/2-20,screen_height/2+20))

    if 700 < current_time - score_time < 1400:
       number_2 = font.render("2",False, light_grey)
       screen.blit(number_2,(screen_width/2-20,screen_height/2+20))

    if 1400 < current_time - score_time < 2100:
       number_1 = font.render("1",False, light_grey)
       screen.blit(number_1,(screen_width/2-20,screen_height/2+20))


    if current_time - score_time < 2100:
        ball_speed_x = 0
        ball_speed_y = 0
    else:

        ball_speed_y = 7
        ball_speed_x = -7
        score_time = None



pygame.init()
clock = pygame.time.Clock()

screen_width = 1280
screen_height = 960
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Pong")

#game objects

ball = pygame.Rect(screen_width/2 - 15,screen_height/2 - 15,30,30)
opponent = pygame.Rect(screen_width - 20,screen_height/2 - 70, 10, 140)
player = pygame.Rect(10, screen_height/2 - 70, 10, 140)



bg_color = pygame.Color('grey12')
light_grey = (200,200,200)
red = (255,0,0)

ball_speed_y = 7
ball_speed_x = -7
player_speed = 0
opponent_speed = 0
dot1x = 0
dot1y = 0

tim = 0
dot2x = 0
dot2y = 0





#time
score_time = None

#the loop
while True:



    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()


        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_DOWN:
                player_speed +=7
            if event.key == pygame.K_UP:
                player_speed -=7
        if event.type == pygame.KEYUP:
            if event.key == pygame.K_DOWN:
                player_speed -=7
            if event.key == pygame.K_UP:
                player_speed +=7

    ball_animation()
    
    player.y += player_speed
    if player.top <= 0:
        player.top = 0
    if player.bottom >=screen_height:
        player.bottom = screen_height
    

    screen.fill(bg_color)
    pygame.draw.rect(screen, light_grey, player)
    pygame.draw.rect(screen, light_grey, opponent)
    pygame.draw.ellipse(screen, light_grey, ball)
    pygame.draw.aaline(screen, light_grey, (screen_width/2,0), (screen_width/2,screen_height))

    opponent.y += opponent_speed
    if opponent.top <= 0:
        opponent.top = 0
    if opponent.bottom >=screen_height:
        opponent.bottom = screen_height





    if ball.left <= 30:
        dot1x = ball.centerx
        dot1y = ball.centery
    
    strplayer = str(player_pts)
    stropponent = str(opponent_pts)

    font = pygame.font.Font('freesansbold.ttf', 80)
    playert = font.render(strplayer, True, light_grey, bg_color)
    playerect = playert.get_rect()
    playerect.center = ((1280 // 2) - 40, 40)

    opponentt = font.render(stropponent, True, light_grey, bg_color)
    opponentetc = opponentt.get_rect()
    opponentetc.center = ((1280 // 2) + 40, 40)





    if player_pts >= 0:
        screen.blit(opponentt, opponentetc)
        screen.blit(playert, playerect)
    
    #dot1 = pygame.Rect(dot1x,dot1y,10,10)
    #pygame.draw.ellipse(screen, red, dot1)


    if 70 >= ball.left >= 60 :
        dot2x = ball.centerx
        dot2y = ball.centery


    #dot2 = pygame.Rect(dot2x,dot2y,10,10)
    #pygame.draw.ellipse(screen, red, dot2)

    dot3xm = dot1x - dot2x

    dot3ym = dot1y - dot2y
    dot4y = 0
    kt = 0
    nt = 0
    dot4x = 0
    dot5y = 0
    dot5x = 0

   
    if dot3xm != 0:
        kt = dot3ym/dot3xm
        nt = dot2y - kt * dot2x
        if dot2y <= dot1y:
            if kt != 0:
                dot4x = 0-nt/kt
                dot4y = 0
        if dot2y >= dot1y:
            if kt != 0:
                dot4x = 960-nt/kt
                dot4y = 960


    dot5y = dot4y
    dot5x = dot4x - 100

    #dot5 = pygame.Rect(dot5x,dot5y,10,10)
    #pygame.draw.ellipse(screen, red, dot5)


    dot3x = dot2x + 2000
    dot3y = kt * dot3x + nt



    dot6x = dot5x
    dot6y =kt * dot6x + nt
    
    #dot6 = pygame.Rect(dot6x,dot6y,10,10)
    #pygame.draw.ellipse(screen, red, dot6)


    #dot4 = pygame.Rect(dot4x,dot4y,10,10)
    #pygame.draw.ellipse(screen, red, dot4)



    disthip = math.hypot(dot6x-dot4x, dot6y-dot4y)
    
    radx = 100/disthip
    res = math.degrees (numpy.arccos (radx))
    


    dot7x = dot6x + 200
    dot7y = dot6y

    #dot7 = pygame.Rect(dot7x,dot7y,10,10)
    #pygame.draw.ellipse(screen, red, dot7)

    dot8xm = dot4x - dot7x
    dot8ym = dot4y - dot7y
  

    dot8x = 0
    dot8y = 0


    if dot8xm != 0:
        kt8 = dot8ym/dot8xm
        nt8 = dot7y - kt8 * dot7x
        if dot7y <= dot4y:
            if kt8 != 0:
                dot8x = 0 - nt8/kt8
                dot8y = 0
        if dot7y >= dot4y:
            if kt8 != 0:    
                dot8x = 955-nt8/kt8
                dot8y = 955

    
    dot9x = dot8x - 20
    dot9y = dot8y
    dot10x = dot9x
    dot10y =kt8 * dot10x + nt8
    dot11y = dot10y
    dot11x = dot9x + 40

    dot14xm = dot4x - dot7x
    dot14ym = dot4y - dot7y
    dot14x = 0
    dot14y = 0


    
    kt14 = dot14ym/dot14xm
    nt14 = dot7y - kt14 * dot7x
    dot14x = 1275
    dot14y = kt14*1280+nt14
        
    if 0 < dot14y < 960:
        if opponent.centery >= dot14y:
            opponent_speed = -7
        if opponent.centery <= dot14y:
            opponent_speed = 7
        if opponent.centery == dot14y:
            opponent_speed = 0


    if dot14y > 960 or dot14y < 0:
        if opponent.centery >= dot12y:
            opponent_speed = -7
        if opponent.centery <= dot12y:
            opponent_speed = 7
        if opponent.centery == dot12y:
            opponent_speed = 0  
     
    #if dot8x >= 1276:
        #if opponent.y <= dot12y:
            #opponent_speed = -7
        #if opponent.y >= dot12y:
            #opponent_speed = 7        

    #dot8 = pygame.Rect(dot8x,dot8y,10,10)
    #pygame.draw.ellipse(screen, red, dot8)

    #dot14 = pygame.Rect(dot14x,dot14y,10,10)
    #pygame.draw.ellipse(screen, red, dot14)


    dot12xm = dot8x-dot11x
    dot12ym = dot8y-dot11y

    kt12 = dot12ym/dot12xm
    nt12 = dot11y - kt12 * dot11x
    dot12x = 1275
    dot12y = kt12*1279+nt12


    if score_time:
        ball_restart()
        




    #dot12 = pygame.Rect(dot12x,dot12y,10,10)
    #pygame.draw.ellipse(screen, red, dot12)
#screen_width = 1280
    #pygame.draw.aaline(screen, red, (dot11x,dot11y), (dot12x,dot12y))
    #pygame.draw.aaline(screen, red, (dot8x,dot8y), (dot11x,dot11y))
    #pygame.draw.aaline(screen, red, (dot7x,dot7y), (dot8x,dot8y))
    #pygame.draw.aaline(screen, red, (dot4x,dot4y), (dot7x,dot7y))
    #pygame.draw.aaline(screen, red, (dot1x,dot1y), (dot2x,dot2y))
    #pygame.draw.aaline(screen, red, (dot2x,dot2y), (dot3x,dot3y))




   
    pygame.display.flip()
    clock.tick(60)
