## Ubuntu18.04安装Mysql ##
网上确实是有不少如何安装Mysql的资料，但是有一些是过时或系统不对应的。所以这里记录一下。

系统：Ubuntu18.04

Mysql版本：5.7.25

Ubuntu可以使用apt-get安装

```
sudo apt-get install mysql-server
```

但是安装过程不像Ubutnu16那时候，全程默认安装不会弹密码设置。

然后你傻乎乎的输入：
```
mysql -u root -p
```
突然想起来密码是啥？root？123456？想多了

还是老老实实看配置文件吧
```
vim /etc/mysql/debian.cnf
```

```
\# Automatically generated for Debian scripts. DO NOT TOUCH!
[client]
host     = localhost
user     = debian-sys-maint
password = ****************
socket   = /var/run/mysqld/mysqld.sock
[mysql_upgrade]
host     = localhost
user     = debian-sys-maint
password = ****************
socket   = /var/run/mysqld/mysqld.sock
```
把这2个坑人的复制然后登录上去修改就对了
```
mysql -u debian-sys-maint -p
```

成功登录上去之后，接下来就是要更改用户名和密码了
```
update user set authentication_string=password('你的密码') where user='root' and host='localhost';
```

别忘了还要修改密码验证方式，这也是新的坑点。忘了改？那就别跟我说密码输对了还是登录不上去
```
update user set plugin="mysql_native_password";
```

记得刷新验证
```
flush privileges;
```

最后重启mysql
```
sudo service mysql restart
```

如果你成功的话，就能正常登录mysql了。
这可能是为了安全，Mysql才这么做的。
但是有些麻烦啊= =

PS：
实际上不找配置文件也行，使用跳过密码验证的方式也能做到

在/etc/mysql/mysql.cnf底部添加以下内容：
```
[mysqld]
skip-grant-tables
```

照样跳过直接登录

#### 参考资料 ####
1. [CSDN Jax liu](https://blog.csdn.net/verylonglongago/article/details/85479704)