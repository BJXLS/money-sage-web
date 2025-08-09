# moneySage 静态官网（GitHub Pages）

这是一个可直接用 GitHub Pages 部署的静态官网模板，适合发布在仓库根目录的 `docs/`。主页包含：品牌区、功能介绍、截图占位、下载链接与 FAQ，整体以「科技感」为设计风格。

## 本地预览

直接用浏览器打开 `docs/index.html` 即可。

## 部署到 GitHub Pages

1. 推送到 GitHub 仓库。
2. 打开仓库 Settings → Pages。
3. Source 选择 `Deploy from a branch`，Branch 选择 `main`，目录选择 `/docs`。
4. 保存后等待构建完成，稍后即可访问站点。

> 若你使用的是 `gh-pages` 分支，请将 `docs/` 改为根目录或按需调整。

## 自定义

- 将 `index.html` 中 GitHub 仓库链接与下载地址替换为你的实际仓库与构建产物：
  - `https://github.com/your-org/moneySage` → 你的仓库地址
  - `releases/latest/download/xxx` → 你的发布产物文件名
- 在「界面预览」区块替换占位图为真实截图，或嵌入产品视频。
- 配色可在 `styles.css` 的 `:root` 变量中统一调整。
- 文案可直接编辑 `index.html`。

## 目录结构

- `docs/index.html`：首页
- `docs/styles.css`：样式
- `docs/app.js`：交互脚本（平滑滚动/年份）
- `docs/.nojekyll`：禁用 Jekyll 处理

## 常见问题

- 如果静态资源没有加载，检查 Pages 是否正确指向 `/docs`，以及分支是否与设置一致。
- 若需要自定义域名，前往 Settings → Pages 绑定 `Custom domain`，并在 DNS 添加 CNAME 记录。
