import pygame
import sys
import math
from math import atan2, degrees, pi
import numpy


def ball_animation():
    global ball_speed_x, ball_speed_y
    ball.x += ball_speed_x
    ball.y += ball_speed_y

    if ball.top <= 0 or ball.bottom >=screen_height:
        ball_speed_y *= -1
    if ball.left <= 0 or ball.right >= screen_width:
        ball_restart()

    if ball.colliderect(player) or ball.colliderect(opponent):
        ball_speed_x *= -1

pygame.init()
clock = pygame.time.Clock()

screen_width = 1280
screen_height = 960
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Pong Test")

#game objects

ball = pygame.Rect(screen_width/2 - 15,screen_height/2 - 15,30,30)
opponent = pygame.Rect(screen_width - 20,screen_height/2 - 70, 10, 140)
player = pygame.Rect(10, screen_height/2 - 70, 10, 140)

def ball_restart():
    global ball_speed_x, ball_speed_y

    ball.center = (screen_width/2, screen_height/2)
    ball_speed_y = 7
    ball_speed_x = -7



bg_color = pygame.Color('grey12')
light_grey = (200,200,200)
red = (255,0,0)

ball_speed_y = 7
ball_speed_x = 7
player_speed = 0
opponent_speed = 0
dot1x = 0
dot1y = 0

dot2x = 0
dot2y = 0


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

    if ball.left <= 20:
        dot1x = ball.centerx
        dot1y = ball.centery


    #dot1 = pygame.Rect(dot1x,dot1y,10,10)
    #pygame.draw.ellipse(screen, red, dot1)


    if 60 >= ball.left >= 50 :
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
        if dot2y <= dot1y and kt != 0:
            dot4x = 0-nt/kt
            dot4y = 0
        if dot2y >= dot1y and kt != 0 :
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
    print(res)


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

    #dot12 = pygame.Rect(dot12x,dot12y,10,10)
    #pygame.draw.ellipse(screen, red, dot12)

    sres = str(res)
    font = pygame.font.Font('freesansbold.ttf', 15)
    verlog1 = font.render(sres, True, light_grey, bg_color)
    verlog2 = verlog1.get_rect()
    verlog2.center = (1200, 7)
    screen.blit(verlog1, verlog2)


    #screen_width = 1280
    pygame.draw.aaline(screen, red, (dot11x,dot11y), (dot12x,dot12y))
    pygame.draw.aaline(screen, red, (dot8x,dot8y), (dot11x,dot11y))
    pygame.draw.aaline(screen, red, (dot7x,dot7y), (dot8x,dot8y))
    pygame.draw.aaline(screen, red, (dot4x,dot4y), (dot7x,dot7y))
    pygame.draw.aaline(screen, red, (dot1x,dot1y), (dot2x,dot2y))
    pygame.draw.aaline(screen, red, (dot2x,dot2y), (dot3x,dot3y))
    pygame.display.flip()
    clock.tick(90)
