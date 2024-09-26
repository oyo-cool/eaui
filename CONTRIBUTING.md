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
src
└── package // 组件库
    ├── index.ts // 组件库入口
    └── schedule // 组件
        ├── __tests__ // 测试
        ├── index.ts // 组件入口
        ├── props.ts // 组件 props
        ├── src // 组件源码
        ├── style // 组件样式
        └── type.ts // 组件类型
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

### 目录的命名规范

1.目录名全部使用小写，单词需采用复数形式，kebab-case形式命名，如果需要有多个单词表达，使用中划线连接。如new-page、components。

### 文件的命名规范

文件的命名规范按照不同情况进行命名

1.如果该文件是单文件组件/类，采用PascalCase形式命名，方便导入和使用。如TDesignSelect.vue

2.如果该文件是目录下的主文件，采用 index 名称命名，方便导入。如 index.ts, index.vue

3.如果该文件是接口定义文件，采用camelCase形式命名，方便区分文件关联性。如 list.ts 和 listModel.ts

4.如果该文件是资源/样式文件，采用kebab-case形式命名。

### 类及接口的命名规范

1.采用PascalCase形式命名。
