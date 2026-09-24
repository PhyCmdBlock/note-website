# 做题笔记

**以下内容由AI生成。**

VitePress 项目。共享工作目录为 Windows `D:\Projects\note-website`、Linux `/mnt/shared/Projects/note-website`。

## Windows

使用 Node.js 22（至少 22.12），首次使用或锁文件变化时运行 `npm ci`。

```powershell
cd D:\Projects\note-website
npm ci
npm run docs:dev
```

## Linux

Linux 使用 ext4 上的独立依赖，通过 bind mount 覆盖共享目录中的 Windows 依赖。

```bash
cd /mnt/shared/Projects/note-website
bash scripts/linux-npm.sh ci
bash scripts/linux-npm.sh run docs:dev
```

开发预览默认地址为 http://localhost:5173/，以终端实际输出为准。
Linux 必须使用此脚本；挂载缺失时它会停止，防止 npm ci 删除 Windows 依赖。
两边共用 Markdown、配置、package-lock.json 和 .git；切换系统后依赖无需混用。
修改依赖时，两边分别重新安装。不要同时编辑同一文件或执行 Git 写操作。

## 构建与 Cloudflare Pages

Windows：`npm run docs:build`，Linux：`bash scripts/linux-npm.sh run docs:build`。
构建后的本地预览使用 `docs:preview` 替换上述脚本名。

Cloudflare Pages 连接原 GitHub 仓库 `PhyCmdBlock/note-website`：

- 仓库根目录：根目录（留空）
- 构建命令：`npm run docs:build`
- 输出目录：`docs/.vitepress/dist`
- Node.js：建议 `NODE_VERSION=22.23.2`（Vite 要求至少 22.12）

本地磁盘路径不影响 GitHub 和 Cloudflare。Cloudflare 自行安装 Linux 依赖，
不要在云端构建命令中使用 `scripts/linux-npm.sh`。
提交需要发布的文章和项目配置后，推送 `main` 才会触发已连接的自动部署。

参考：https://vitepress.dev/guide/deploy

## 共享分区

共享分区沿用博客项目的 D 盘映射。双系统使用时 Windows 应完整关机；
不要在 Windows 休眠期间跨系统写入 NTFS。更详细的挂载与验证记录见 `LINUX-HANDOFF.md`。
