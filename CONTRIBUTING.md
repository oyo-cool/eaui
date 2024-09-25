# CONTRIBUTING

`EAUI` 主要使用 `pnpm` 作为包管理工具，使用 `pnpm` 安装依赖。所有的封装组件都存放在 `src/package` 目录下。

## 开发

建议使用`node v20.15.0`进行开发。

### 安装依赖

```shell
pnpm install
```

### 本地开发

```shell
pnpm run dev
```

## 目录结构

```
// TOOD 待完善
eaui
├── package.json
├── src
│   ├── package
│   │   ├── index.ts
│   │   ├── index.vue
│   │
```

## 分支规范

### 分支

遵循使用 `git flow` 规范，新组件分支从 develop checkout：https://nvie.com/posts/a-successful-git-branching-model/

以下内容处理 fork 仓库后，远端仓库的更新如何同步到 fork 仓库

```shell
# 建立 upstream remote
git remote add upstream git@github.com:oyo-cool/eaui.git

# 更新 upstream
git fetch upstream develop

# 合并 upstream develop 到本地
git checkout develop

git merge upstream/develop
```

### 提交

项目使用基于 angular 提交规范：https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional

每次提交会自动触发提交验证

- 使用工具 commitizen 协助规范 git commit 信息
- fix & feat 的提交会被用来生成 changelog
- 提交会触发 git pre-commit 检查，修复提示的 eslint 错误，

## 开发规范

// TODO 待完善
