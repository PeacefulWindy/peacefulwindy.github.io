# Unity使用协程处理编辑器逻辑 #

会想到这个的主要因素是，工作中上级时不时要求做编辑器功能，然后这Unity的API是真的废，各种坑人的。

上次是写Spine相关代码的时候，各种处理必须在下一帧才能进行。而Unity提供的API是同步的，IDE本身是异步加载的。这就是一个特大矛盾之处，写得特不爽。

由于最近改了一个协程相关的代码，从而学会协程的使用。于是诞生了用协程应对这废接口的办法。

1. 安装Unity官方的Editor Coroutines插件

2. 调用代码API更改：由原来的Unity协程
```CSharp
MonoBehaviour.StartCoroutine(IEmulator)
```
变更为
```CSharp
EditorCoroutineUtility.StartCoroutine(IEmulator,object)
```
其它逻辑跟写协程一样就行了。

实测关于文件修改相关的代码，逻辑清晰一大堆。