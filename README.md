# GWBoard

GWBoard 是一個以單頁白板操作為核心的網頁專案。介面參考平板手寫工具的工作流，但使用自製元件與圖示，並將底層方向改為可無限延伸的畫布。

## 目前進度：階段 1

本階段建立可部署、可互動、可測試的產品骨架：

- Vanilla JavaScript ES modules + Vite 多檔案架構
- 深色白板畫面、浮動工具列、頂部控制列與底部快捷列
- 鋼筆、鉛筆、螢光筆、橡皮擦、選取、加入、直尺、圓規、雷射筆、手勢與文字入口
- 可拖曳工具列、背景樣式切換、加入內容面板與專注模式
- 高 DPI 畫布容器與 resize 管線（本階段尚不產生筆畫）
- ESLint、Vitest、Playwright 與 GitHub Actions
- GitHub Pages 專案路徑 `/GWBoard/` 部署設定

正式繪圖、無限平移縮放、物件選取、媒體匯入，以及圓規的圓心／半徑／預覽圓互動，會在後續階段依序加入。

## 本機開發

需求：Node.js 24 以上。

```bash
npm install
npm run dev
```

完整檢查：

```bash
npm run check
npm run test:e2e
```

## 部署

正式網址預定為 [GWBoard GitHub Pages](https://a1593711534-droid.github.io/GWBoard/)。`main` 與本階段檢查點分支會透過 GitHub Actions 建置並發布 `dist/`。

## 專案界線

GWBoard 是獨立實作，未使用 Notability 的程式碼或官方圖像資產，也不隸屬於 Notability。
