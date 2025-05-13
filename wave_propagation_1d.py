#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue May 13 16:04:08 2025

@author: luka
"""

import numpy as np
import matplotlib.pyplot as plt
# (d^2u)/(dt^2) = c^2*(d^2u)/(dx^2)
#u[i] = 2*up[i] - upp[i] + s^2*(up[i+1]-2*up[i]+up[i-1])

#define wave propagation speed, time step and distance step (chatgpt je rek da so tte vrednosti vredi)
width = 20
c = 1
dt = 1
nt = 1000
dx = 1
nx = 1000
s = c * dt / dx 



#t-1 
upp = np.zeros(nx)
#t 
up = np.zeros(nx)
#t+1 
u = np.zeros(nx)


#ful fajn val za zecetek pa take fore (hvala chatgpt)
x = np.arange(nx)
center = nx // 2
upp = np.exp(-((x - center) / width)**2)
up = np.exp(-((x - center+1) / width)**2)





for t in range(nt): #pomembne zadeve
    for i in range(nx-1): #indeksi se zacnejo pr 0
        u[i] = 2*up[i] - upp[i] + s**2 * (up[i+1] - 2*up[i] + up[i-1]) #una kul furmula1
        
    #hvala chatgpt tud za debugganje (mav prevec indentov je bvo)     
    u[0] = u[-1] = 0 #boundary       
    
    if t == 600:    #plot neke tocke v casu
        plt.plot(u)
        print(u)

    upp, up, u = up, u, np.zeros(nx) #zamejavanje prejsnega pa zdajsnega pa whatever

            
            
plt.title('1D Wave Propagation')
plt.xlabel('Position')
plt.ylabel('Displacement')
plt.show()
