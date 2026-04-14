# 开源软件课作业：AI + 社区拼装式网页开发（类淘宝）

本项目是一个“类淘宝”前端作业演示，目标是按课程要求，利用 AI 与社区代码思路快速完成网页功能，不手写后端。

## 已实现功能

- 首页、商品页、详情页、购物车页四页跳转
- 商品搜索、分类筛选、排序
- 购物车动态刷新（加减数量、删除、清空）
- 购物车数据本地持久化（`localStorage`）
- 响应式布局（手机、平板、桌面可用）
- 首页限时推荐自动刷新 + 倒计时

## 快速运行

在项目根目录执行：

```bash
python -m http.server 8080
```

浏览器打开：

```text
http://localhost:8080/index.html
```

## 项目结构

```text
index.html       首页
products.html    商品列表
product.html     商品详情
cart.html        购物车
styles.css       全局样式（响应式）
products.js      商品数据
store.js         购物车状态管理
app.js           页面逻辑与交互
SUBMISSION.md    作业提交说明
```

## 技术说明

- 纯前端（HTML + CSS + 原生 JS 模块）
- 无后端依赖，开箱即跑
- 适合课堂演示与 GitHub 提交
