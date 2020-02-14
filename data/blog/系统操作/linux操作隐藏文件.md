本来是移动git仓库里的所有文件到上一个目录，结果发现隐藏文件.git没有移动。
查了下资料发现是\*的问题。
因为bash默认\*不会匹配到隐藏文件。

那么解决办法呢？
或许你会想到以下方案：
```
mv .* ../
```
但是这会报错
```
mv: -r not specified; omitting directory '.'
mv: -r not specified; omitting directory '..'
```
原因：.和..都是系统的隐藏目录，是没法

解决办法：使用正则表达式匹配
```
mv .[^.]* ../
```

### 参考资料： ###

1. [Chinaunix wwr](http://blog.chinaunix.net/uid-1800058-id-3146934.html)