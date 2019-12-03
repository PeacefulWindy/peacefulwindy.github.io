import os

repository="origin"
branch="master"

defaultIgnoreList=[
    "__pycache__",
    "migrations",
    ".git",
    ".log",
    ".vscode",
]

ignoreList=[
    "uwsgi",
    "config",
]


os.system("git pull "+repository+" "+branch)
fetchList=os.listdir()
filesList=[]
i=0
while i<len(fetchList):
    path=fetchList[i]
    if os.path.isdir(path):
        l2=os.listdir(path)
        for it in l2:
            fetchList.append(os.path.join(path,it))
    else:
        isFind=False
        for it in defaultIgnoreList:
            if path.find(it) != -1:
                isFind=True
                break
        
        if not isFind:
            for it in ignoreList:
                if path.find(it)!= -1:
                    isFind=True
                    break

        if not isFind:
            filesList.append(path)

    i+=1

for it in filesList:
    os.system("git add "+it)

os.system("git commit")
os.system("git push "+repository+" "+branch)
