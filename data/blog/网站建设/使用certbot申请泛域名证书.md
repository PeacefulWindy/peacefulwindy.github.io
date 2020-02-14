## 使用certbot申请泛域名证书 ##

系统环境：Ubuntu18.04

1. 下载certbot-auto
```
wget https://dl.eff.org/certbot-auto
```

2. 需要将certbot-auto赋予为可执行权限
```
chmod +x certbot-auto wget https://dl.eff.org/certbot-auto
```
3. 运行certbot-auto生成证书：
```
./certbot-auto certonly --email 邮箱 -d 域名 -d 域名2 --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory
```
"certonly" 表示安装模式，Certbot 有安装模式和验证模式两种类型的插件。
--manual 表示手动交互模式，Certbot 有很多插件，不同的插件都可以申请证书，用户可以根据需要自行选择

-d 为那些主机申请证书，如果是通配符，输入 *.xxxx.com （可以替换为你自己的域名）

--preferred-challenges 使用 DNS 方式校验域名所有权

--server Let's Encrypt ACME v2 版本使用的服务器不同于 v1 版本，需要显示指定。

1. 将会出现需要操作的提示，同意条款和绑定IP之类的
```
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You muse agree in order to register with the ACME server at https://acme-v02.api.letsencrypt.org/directory
-------------------------------------
(A)gree/(C)ancle:A
-------------------------------------
Would you be willing to share your email address with the Electronic FrontierFoundation, a founding partner of the Let's Encrypt project and the non-profitorgani zation that develops Certbot? we 'd like to send you email about our workencrypting the web,  EFF news , campaigns, and waya to support digital freedom.
-------------------------------------
(Y)es/(N)o:Y
-------------------------------------
Are you OK with your IP being logged?
-------------------------------------
(Y)es/(N)o:Y
```

然后会出现最关键的：
```
Please deploy a DNS TXT record under the name
_acme-challenge.peacefulwindy.xyz with the following value:

TXT值（复制这段）

Before continuing, verify the record is deployed.
```
复制之后，在申请的域名列表里添加TXT记录
```
hostname:_acme-challenge
type:TXT
value:TXT值
```
注意：更新需要时间，具体取决于你设置的TTL值
确认更新完成之后按回车键即可验证
```
失败提示：
Challenge failed for domain ***（这段是红色的）
然后下面一堆东西就不管他了

成功提示：
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/域名/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/域名/privkey.pem
   Your cert will expire on 2020-05-14. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot-auto
   again. To non-interactively renew *all* of your certificates, run
   "certbot-auto renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```
证书路径在/etc/letsencrypt/live/域名/，这样就申请成功了

### 参考资料： ###

1. [Willh's Blog](https://www.willh.cn/articles/2018/07/27/1532676216270.html)