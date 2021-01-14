## skynet的Hello World ##

# 前提 #

在学习此篇章前，假设你已经掌握以下知识：

* linux操作

* git

* gcc编译

# 操作 #

一、下载并编译skynet

1.使用git clone下载skynet
```
git clone https://github.com/cloudwu/skynet
```

2.进入到skynet目录
```
cd skynet
```

3.安装必要依赖
```
sudo apt install autoconf
```

4.编译
```
make linux
```

二、新建测试文件
skynet/examples/echo.lua
```lua
local skynet = require "skynet"
require "skynet.manager"

local command = {}

function command.HELLO(what)
    return "i am echo server,get this:"..what
end

function dispatcher()
    skynet.dispatch("lua",function(session,address,cmd,...)
        cmd = cmd:upper()
        if cmd == "HELLO" then
            local f =command[cmd]
            assert(f)
            skynet.ret(skynet.pack(f(...)))
        end
    end)
end

skynet.start(dispatcher)
```

skynet/examples/test_echo.lua
```lua
local skynet = require "skynet"

skynet.start(function() 
    local echo = skynet.newservice("echo")
    print(skynet.call(echo, "lua", "HELLO", "world"))
end);
```
skynet/examples/config
```
include "config.path"

-- preload = "./examples/preload.lua"	-- run preload.lua before every lua service run
thread = 8
logger = nil
logpath = "."
harbor = 1
address = "127.0.0.1:2526"
master = "127.0.0.1:2013"
start = "test_echo"	-- main script
bootstrap = "snlua bootstrap"	-- The service for bootstrap
standalone = "0.0.0.0:2013"
-- snax_interface_g = "snax_g"
cpath = root.."cservice/?.so"
-- daemon = "./skynet.pid"
```

当这3个文件都弄完之后，运行
```
./skynet ./examples/config
```

运行结果
```
[:01000002] LAUNCH snlua bootstrap
[:01000003] LAUNCH snlua launcher
[:01000004] LAUNCH snlua cmaster
[:01000004] master listen socket 0.0.0.0:2013
[:01000005] LAUNCH snlua cslave
[:01000005] slave connect to master 127.0.0.1:2013
[:01000004] connect from 127.0.0.1:3294 4
[:01000006] LAUNCH harbor 1 16777221
[:01000004] Harbor 1 (fd=4) report 127.0.0.1:2526
[:01000005] Waiting for 0 harbors
[:01000005] Shakehand ready
[:01000007] LAUNCH snlua datacenterd
[:01000008] LAUNCH snlua service_mgr
[:01000009] LAUNCH snlua test_echo
[:0100000a] LAUNCH snlua echo
i am echo server,get this:world
[:01000002] KILL self
```

# 知识点 #
```lua
local skynet = require "skynet" -- 这是调用lualib/skynet.lua的代码，学过lua的人应该熟悉

skynet.dispatch("lua",function(session,address,cmd,...)
end
这个是skynet接收消息时的回调函数处理。开发者可根据不同需求调用不同的函数处理。

skynet.call(echo,"lua","HELLO","world")
调用skynet.dispatch回调的函数

skynet.pack()
编码字符串

skynet.ret()
返回打包的数据

skynet.start(function)
启动服务函数(实际上就是注册回调事件)

skynet.newservice(serviceName)
新建一个服务，服务名为文件名？
```

