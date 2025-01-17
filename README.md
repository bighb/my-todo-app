# Todo List Monorepo

这是一个使用 pnpm 管理的全栈项目，包含前端、后端和文档项目。

## 项目结构

- **Client**: React + TailwindCSS
- **Server**: Node.js + MySQL
- **Docs**: VitePress 文档

## 快速启动

````bash
pnpm install
pnpm --filter client dev
pnpm --filter server start
pnpm --filter docs dev


---

### **5. 添加模拟数据**

在 MySQL 中初始化数据库和表：

```sql
CREATE DATABASE todolist;

USE todolist;

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(255) NOT NULL
);

INSERT INTO todos (task) VALUES ("Learn React"), ("Build a Monorepo"), ("Write Documentation");
````
