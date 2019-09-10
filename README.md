# PageNow（基于VUE的数据可视化开发平台）

### 介绍
基于Vue的数据可视化页面开发平台，拖拽式设计，独创布局块概念，基于iView的栅格系统原生支持响应式栅格布局，以获得更好的移动设备兼容性，集成百度Echarts以实现丰富的数据可视化图表，原生通用组件满足你各种可视化页面的开发需求。

#### DEMO：[http://120.77.253.134:8080/pagenow/](http://120.77.253.134:8080/pagenow/)

 **相关文档会逐步完善，请耐心等待。。。** 

#### 系统截图：
![后台管理](https://images.gitee.com/uploads/images/2019/0910/093644_ac46a0e2_145187.png "系统管理主界面.png")
![设计器](https://images.gitee.com/uploads/images/2019/0910/093714_91fb9ac9_145187.png "设计器主界面.png")

### 特性
- 支持响应式和绝对定位布局方案
- 拖拽式页面设计器：支持多选拖拽与方向键移动、支持拖拽式调整尺寸、网格对其等功能
- 支持自定义样式编辑，让你的设计不局限与平台预设配置（系统以实现原生css代码转换VueStyleObject的适配器，让你编写样式更方便，无需使用驼峰命名）
- 支持组件模块的进出场动画配置，让你的页面动起来
- 支持运行时自定义代码编辑，更方便的实现你的个性化需求
- 动态编译运行的Echart图表，让你的Echart图表开发更灵活
- 支持工程级别与页面级别的图表主题切换
- 支持事件总线，全局触发与监听自定义事件，配合动态代码编辑的功能，实现组件功能定制化

注：后续将会迎来重大更新，实现真正的数据可视化配置，敬请期待。。。

### 软件架构
- 前端架构：Vue+iView+Echarts
- 后端架构：SpringBoot+JFinal
- 数据库：MySql

### 安装教程

1. 数据库初始化：

注意：MySql数据库建议版本在5.6以上，字符集设置为utf-8。

先创建数据库命名为：pagenow，然后运行项目目录server下的xxx.sql脚本，初始化完成之后，应该拥有如下图所示的数据库表：

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/102924_de45055c_145187.png "数据库截图.png")

提示：如果是纯前端开发人员不会初始化数据库的，私信我或在Q群中提问或者自行某度。

2. 后端程序部署

注意：建议JDK版本在1.8及以上，环境变量自行某度配置。

- 运行环境检测：在cmd中运行

```
java -version
```

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/103618_e5d86616_145187.png "java-version.png")

- 进入项目server目录，使用解压缩工具打开pagenow-0.0.1-SNAPSHOT.jar文件，以window下部署为例：

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/105057_41c11068_145187.png "使用压缩文件打开配置文件目录.png")

修改application.properties配置文件，这里主要配置附件上传的目录路径与启动端口号，下图截图中已备注讲解：

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/105253_dba37caa_145187.png "application.properties.png")

修改db.properties配置文件，这里主要修改数据库连接池相关配置：

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/105511_0f9fa5c3_145187.png "db.properties.png")

以上两个配置文件的修改在解压缩工具中修改保存，关闭解压缩工具即可，然后在命令行工具cmd中进入server目录，执行如下命令启动项目：

```
java -jar pagenow-0.0.1-SNAPSHOP.jar
```

启动成功如下图：

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/110558_4891dcb0_145187.png "启动springboot.png")

测试运行情况：打开浏览器，输入http://localhost:8090，看到如下界面即为启动成功：

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/111154_633d0efb_145187.png "springboost测试访问.png")

3. 前端项目安装：

进入项目web目录：

安装相关依赖包：

```
# 使用 npm    
npm install

# 使用 yarn    
yarn install
```

修改相关配置文件：打开.env文件

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/111915_3ad6def4_145187.png "evn文件.png")

启动项目：前端项目默认使用8081端口启动

```
# 使用 npm    
npm run serve

# 使用 yarn    
yarn serve
```


### 使用说明

简单录制一段使用视频，详细使用说明后续持续更新。。

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/115819_344b7524_145187.gif "1568087645577.gif")


1. 创建工程：

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/153345_b7e2da63_145187.png "工程管理.png")

2. 组件库管理

组件库管理是对系统中开发的组件的统一信息管理，用于在设计器中展示组件库而使用，只有在代码中编写相关组件，并在此添加组件信息才可在设计器中拖拽使用， **目前系统没有设置权限登录，因此不建议各位乱修改通用组件栏目内的信息** ，组件的开发文档后续会更新。。。

3. 图表主题管理

此处可以统一管理Echart的图表主题，可在Echarts官网中配置相关主题数据[ Echart主题配置工具 ](https://echarts.baidu.com/theme-builder/)，配置好之后，将json复制粘贴至本系统即可。

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/154632_9826dc49_145187.png "图表主题管理.png")

4. 设计器介绍

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/155129_1a8eb295_145187.png "设计器介绍.png")

### 捐助

生活艰苦，码字不易，如果您觉得项目还不错，请作者喝杯奶茶吧！

![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/113217_c381929b_145187.jpeg "支付宝.jpg")
![输入图片说明](https://images.gitee.com/uploads/images/2019/0910/113234_c0b3857e_145187.jpeg "微信.jpg")

### 联系方式

作者QQ：229041307