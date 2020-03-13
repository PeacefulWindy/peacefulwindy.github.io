import markdown
from markdown.extensions.fenced_code import FencedCodeExtension
import os
import platform
from lxml import etree
import re
import shutil

def run():
    file_path  = os.getcwd()
    if not "peacefulwindy.github.io" in file_path:
        print("路径错误，退出")
        return

    mdList=list()
    grideList=dict()
    ignoreList=list()
    ignoreList.append(".git")
    ignoreList.append("data")
    ignoreList.append("template")
    ignoreList.append("generate.py")
    ignoreList.append("BlackList")

    slash="/"
    if platform.system() == "Windows":
        slash="\\"

    titleList=dict()
    titleList["index"]="欢迎来到PeacefulWindy的主页"
    titleList["app"]="应用"

    # 遍历文件夹
    def walkFile(fileList,file):
        for root, dirs, files in os.walk(file):

            # root 表示当前正在访问的文件夹路径
            # dirs 表示该文件夹下的子目录名list
            # files 表示该文件夹下的文件list

            # 遍历文件
            for f in files:
                fileList.append(os.path.join(root, f))

            # 遍历所有的文件夹
            for d in dirs:
                os.path.join(root, d)

    def readMDFile(path):
        content=""
        with open(path,mode="r",encoding="utf-8") as file:
            content=file.read()

        return markdown.markdown(content,output_format="html5",extensions=
        [
            "markdown.extensions.fenced_code"
        ])

    fileList=os.listdir()
    for it in fileList:
        if it in ignoreList:
            continue

        if os.path.isfile(it):
            os.remove(it)
        else:
            shutil.rmtree(it)
        
    templateIndex=""
    walkFile(mdList,"data")
    with open("template/index.html","r",encoding="utf-8") as file:
        templateIndex=file.read()

    resList=list()
    walkFile(resList,"template/Resources")
    for it in resList:
        path=it.replace("template","")
        path=path.replace("/","",1)
        try:
            os.makedirs(os.path.abspath(os.path.dirname(path)+os.path.sep+"."))
        except Exception as e:
            pass
        shutil.copyfile(it,path)

    grideList["gride.md"]=readMDFile("data"+slash+"gride.md")

    for it in mdList:
        if it=="data"+slash+"gride.md":
            continue

        html=readMDFile(it)
        html=re.sub(r'<a href="" title="([\w|/|.]*)">',r'<a href="\1">',html)
        path=it
        path=path.replace("data","",1)

        curPathCount=0
        path=path.replace(slash,"",1)
        curPathCount=len(path.split(slash))

        fileName=os.path.basename(path)
        stem=fileName.split('.')[0]
        path=path.replace(fileName,"")
        
        try:
            os.makedirs(os.path.abspath(os.path.dirname(path)+os.path.sep+"."))
        except Exception as e:
            pass

        try:
            with open(path,mode="w+",encoding="utf-8") as file:
                pass
        except Exception as e:
            pass

        tmp=templateIndex
        root=etree.HTML(tmp)
        node=root.xpath("//div[@class='leftGride']")
        node[0].text=grideList["gride.md"]

        tree=etree.ElementTree(root)
        node=root.xpath("//div[@class='markdown-body']")
        node[0].text=html

        node=root.xpath("//title")
        if not titleList.get(stem):
            node[0].text=stem
        else:
            node[0].text=titleList.get(stem)

        node=root.xpath("div[@class='markdown-body']/*")
        for it2 in node:
            url=it2.get("title")
            if url:
                it2.set("href",url)
                it2.set("title","")

        tree.write(path+stem+".html",pretty_print=True, xml_declaration=True, encoding='utf-8')

        body=""
        with open(path+stem+".html",mode="r",encoding="utf-8") as file:
            body=file.read()

        body=body.replace("&lt;","<")
        body=body.replace("&gt;",">")
        body=body.replace("\"/>","\"></script>")

        with open(path+stem+".html",mode="w+",encoding="utf-8") as file:
            file.write(body)
        
        #print(os.path.getatime(it))
        
run()