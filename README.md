# Hope Interview

面向前端面试的本地题库 Demo：管理端维护题目，学习端刷题、组卷、错题回顾。数据全部落在 `localStorage`，无需后端。

[![Angular](https://img.shields.io/badge/Angular-16.2-DD0031?logo=angular)](https://angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 功能

- **双角色**：管理员 / 学员，路由守卫隔离
- **题库**：判断、单选、多选、简答；分类、难度、上下架
- **组卷答题**：按分类/难度抽题，可选限时，会话可续答
- **错题本**：客观题自动判分，错题可再练
- **学习记录**：浏览、收藏、成绩历史
- **导入导出**：JSON 合并或覆盖
- **主题**：蓝 / 紫切换

内置 **6 个分类、70 道题**（前端基础、JavaScript、框架与工程、计算机网络、算法、行为面试）。

## 演示账号

| 角色 | 账号 | 密码 |
|------|------|------|
| 管理员 | `admin` | `admin123` |
| 学员 | `user` | `user123` |

也可在 `/register` 自行注册（默认学员）。

## 快速开始

```bash
npm install
npm start
```

打开 [http://localhost:4200](http://localhost:4200)。

```bash
npm run build   # 产物在 dist/hope_ng_demo
npm test        # Karma + Jasmine
```

要求：Node.js 16+。

## 页面

| 路径 | 说明 |
|------|------|
| `/login` `/register` | 登录 / 注册 |
| `/admin/dashboard` | 管理端工作台 |
| `/admin/questions` | 题库 CRUD、导入导出 |
| `/admin/categories` | 分类管理 |
| `/admin/users` | 用户列表 |
| `/user/dashboard` | 学习首页 |
| `/user/questions` | 浏览 / 详情 |
| `/user/exam` | 组卷、答题、成绩 |
| `/user/wrong` | 错题本 |
| `/admin\|user/profile` | 个人中心 |

## 结构

```
src/app/
├── core/
│   ├── data/bank.seed.ts      # 种子题库
│   ├── guards/                # auth / guest / role / exam-session
│   ├── models/
│   └── services/              # auth、题库、组卷、学习、主题、导入导出
├── layout/                    # 侧栏 + 顶栏
├── pages/
│   ├── auth/
│   ├── admin/
│   ├── user/
│   └── shared/
└── shared/theme-switcher/
```

数据键：`hope_users`、`hope_session`、`hope_theme`，以及按用户隔离的浏览/收藏/试卷记录。

## 技术栈

Angular 16（模块化）· RxJS 7 · SCSS · `localStorage`

## License

MIT
