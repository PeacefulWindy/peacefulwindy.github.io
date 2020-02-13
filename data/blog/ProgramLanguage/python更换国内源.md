# python更换国内源

### 文章参考来源：
* [CSDN](https://blog.csdn.net/qq_14994573/article/details/80934201)

以前有在博客里存着放在数据库的，结果服务器一出问题不好拿数据了。重新记录一次比较好

1. Windows

在windows的X:/Users/XXX/pip目录下建立pip.ini，内容如下：
```
[global]
index-url=https://mirrors.163.com/pypi/simple/
```

2. Linux

以后补充w

![pic](TIM截图20180801205708.png)