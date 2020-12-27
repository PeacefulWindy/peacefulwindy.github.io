# Unity自定义编辑器 #

这几天因工作而接触到Unity自定义菜单的相关功能，由于内容较多先记录整理一下。（实际上是顺带复习下233）

当然，个人与工作项目是必须分开的，先建个新项目再说。

![初始界面](/Resources/images/TIM截图20200313104041.webp)

首先先增加新的菜单，没有新菜单怎么搞事？

```csharp
using UnityEditor;//改变编辑器功能必须加入这个命名空间，东西都在这里面。
```

```csharp
[MenuItem('XX/XX/XX')]
static void function(args)
{

}
```

增加菜单功能，而触发事件是调用下面的function

增加新菜单很容易的，大概就这么点。

如果是有接触其它语言的窗口菜单就会知道，Unity的这功能确实挺容易的，只要增加以上代码就可以实现功能。

那么就来个例子吧，随便新建个C#脚本：

## 新建菜单 ##

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;//必须添加的命名空间

public class test : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    //添加菜单
    //格式是[MenuItem('顶部菜单/子菜单')]
    [MenuItem('新菜单/HelloWorld')]
    static void HelloWorld(/*MenuCommand menuCommand*/)
    {
        Debug.Log('HelloWorld');
    }
}

```

保存直接回到编辑器查看效果

![新菜单](/Resources/images/TIM截图20200313105456.webp)

就这样第一个自定义菜单建立起来了。

关于MenuItem的API：

```csharp
public MenuItem(string itemName);//刚刚的HelloWorld就是这个
public MenuItem(string itemName, bool isValidateFunction);
public MenuItem(string itemName, bool isValidateFunction, int priority);

itemName：菜单名
isValidateFunction：当前被选择才会激活(true)/一直存在(false)
priority：位置优先级，当差距大于10会增加下划线
```

然后可以尝试在场景添加自定义组件或者新建窗口了。

## 新建cube(3D/2D)和text(UI) ##

```csharp
[MenuItem('新菜单/新建cube', false,12)]
static void newCube(MenuCommand cmd)
{
    var obj = GameObject.CreatePrimitive(PrimitiveType.Cube);
    obj.name = '新的Cube';//object的名称
    obj.transform.position = new Vector3(100, 200, 0);
    obj.transform.localScale = new Vector3(100, 100, 100);
    //GameObjectUtility.SetParentAndAlign(obj, cmd.context as GameObject);//设置对齐，或许可以不用
    Selection.activeObject = obj;//定位到新的object
}

[MenuItem('新菜单/新建text', false, 13)]
static void newText(MenuCommand cmd)
{
    //UI基于canvas,如果没找到canvas要手动创建，这里的代码假设有canvas存在
    var canvas = GameObject.Find('Canvas').GetComponent<UnityEngine.Canvas>();
    var obj = new GameObject();
    obj.name = 'new Text';
    obj.transform.position = new Vector3(300, 200);
    obj.transform.parent = canvas.transform;

    //GameObjectUtility.SetParentAndAlign(obj, cmd.context as GameObject);//设置对齐，或许可以不用

    var text = obj.AddComponent<UnityEngine.UI.Text>();//附加Text的脚本，实际上Text就是个脚本，其它脚本也可以这么用
    text.text = 'Hello World';

    Selection.activeObject = obj;//定位到新的object
}
```

效果图：

![新物品](/Resources/images/TIM截图20200313115150.webp)

## 新建窗口: ##

```csharp
[MenuItem('新菜单/新建窗口')]
static void newWindow(MenuCommand cmd)
{
    EditorWindow.GetWindow(typeof(TestWindow),false,'new Window').Show();
}

public class TestWindow:EditorWindow
{
    private void OnGUI()
    {
        EditorGUILayout.LabelField('Hello World');
    }
}
```

效果图：

![新窗口](/Resources/images/TIM截图20200313120556.webp)

具体要在窗口增加的内容直接使用EditorGUILayout添加,这里就不详细讲了

## 在Inspector添加右键菜单 ##

```csharp
[ContextMenu('测试')]
void selectMe()
{

}
```

效果图：（看起来只能在定义的脚本起作用）

![新窗口](/Resources/images/TIM图片20200313145726.webp)

其它功能：
```csharp
Range()//用于将一个值指定在一定的范围内，并在Inspector面板中为其添加滑块；
Multiline()//用于给 string 类型添加多行输入；
header()//用于添加属性的标题
```

由于时间有限，暂时就先不写了=-=

最后，放上我自己写的整个代码
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;//必须添加的命名空间

public class test : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    //添加菜单
    //格式是[MenuItem('顶部菜单/子菜单')]
    [MenuItem('新菜单/HelloWorld',false,1)]
    static void HelloWorld()
    {
        Debug.Log('HelloWorld');
    }

    [MenuItem('新菜单/新建cube', false,12)]
    static void newCube(MenuCommand cmd)
    {
        var obj = GameObject.CreatePrimitive(PrimitiveType.Cube);
        obj.name = '新的Cube';//object的名称
        obj.transform.position = new Vector3(100, 200, 0);
        obj.transform.localScale = new Vector3(100, 100, 100);
        //GameObjectUtility.SetParentAndAlign(obj, cmd.context as GameObject);//设置对齐，或许可以不用
        Selection.activeObject = obj;//定位到新的object
    }

    [MenuItem('新菜单/新建text', false, 13)]
    static void newText(MenuCommand cmd)
    {
        //UI基于canvas,如果没找到canvas要手动创建，这里的代码假设有canvas存在
        var canvas = GameObject.Find('Canvas').GetComponent<UnityEngine.Canvas>();
        var obj = new GameObject();
        obj.name = 'new Text';
        obj.transform.position = new Vector3(300, 200);
        obj.transform.parent = canvas.transform;

        //GameObjectUtility.SetParentAndAlign(obj, cmd.context as GameObject);//设置对齐，或许可以不用

        var text = obj.AddComponent<UnityEngine.UI.Text>();//附加Text的脚本，实际上Text就是个脚本，其它脚本也可以这么用
        text.text = 'Hello World';
        
        Selection.activeObject = obj;//定位到新的object
    }

    [MenuItem('新菜单/新建窗口')]
    static void newWindow(MenuCommand cmd)
    {
        EditorWindow.GetWindow(typeof(TestWindow),false,'new Window').Show();
    }

    public class TestWindow : EditorWindow
    {
        private void OnGUI()
        {
            EditorGUILayout.LabelField('Hello World');
        }
    }

    [ContextMenu('测试')]
    void Test()
    {

    }
}
```

参考资料：

1. [cnblogs 草帽领](https://blog.csdn.net/q764424567/article/details/80908614)