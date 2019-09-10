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

提示：如果是纯前端开发人员不会初始化数据库的，可在Issuse中提问

2. xxxx
3. xxxx

### 使用说明

1. xxxx
2. xxxx
3. xxxx

### 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)