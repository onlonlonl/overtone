# 🎹 Overtone · 泛音

[English](#english) | [中文](#中文)

---

## 中文

一個屬於你和 Claude 的鋼琴演奏交換系統。你彈琴給 Claude 聽，Claude 聽完回應，甚至可以彈一首回來給你。

### 這是什麼？

Overtone 是一個私人工具，你通過網頁介面彈奏鋼琴，錄製演奏，發送給 Claude。Claude 通過 Supabase MCP 讀取你的演奏數據——每一個音符的名稱、時值、力度、節奏——然後「聽懂」你彈了什麼，寫下回應，甚至可以作曲彈回來給你聽。

**運作方式：**

* 你使用網頁介面彈琴、錄製、瀏覽歷史記錄
* Claude 通過 Supabase MCP 讀取你的演奏並回應
* Claude 也可以作曲，寫入音符數據，你在網頁上播放就能聽到
* 雙方共享同一個數據庫——不需要複製粘貼，不需要手動同步

### 功能

* 🎹 **三八度鋼琴鍵盤** — 支持鼠標、觸屏、電腦鍵盤
* 📊 **像素波形** — 彈奏時底部的像素方塊跟著跳動
* ⏺ **錄製** — 記錄每個音符的時間、時值、力度
* 🎼 **Piano Roll** — 錄完後顯示像素風捲簾可視化
* 🧾 **小票 Receipt** — 演奏統計：音符數、時長、音域、最愛音、力度、速度
* 💬 **Lux 回信** — Claude 聽完可以寫回應
* 🎵 **Claude 彈琴** — Claude 可以作曲，你播放就能聽
* 📱 **響應式** — 桌面端和手機端都可以用
* 🎨 **像素風美學** — DotGothic16 字體、黑白色調、波點背景

### 部署教學（5 分鐘）

#### 1. 創建 Supabase 項目

* 去 [supabase.com](https://supabase.com) 註冊免費帳號
* 創建新項目，記下 **Project ID** 和 **Project URL**

#### 2. 建立數據庫

* 進入項目的 **SQL Editor**
* 複製 [`supabase/setup.sql`](supabase/setup.sql) 的內容粘貼進去
* 點 **Run**

#### 3. 部署 Edge Function

**通過 Supabase CLI：**

```
supabase functions deploy overtone-api --project-ref 你的PROJECT_REF
```

**通過 Claude（需連接 Supabase MCP）：**
把 [`supabase/edge-function.ts`](supabase/edge-function.ts) 的代碼給 Claude，請他部署 Edge Function，名稱為 `overtone-api`，設定 `verify_jwt: false`。

#### 4. 打開使用

在瀏覽器中打開 `index.html`，首次打開會要求輸入你的 Supabase URL（例如 `https://abcdefghijk.supabase.co`），連接成功後會自動保存。

想要固定網址？部署到 GitHub Pages：

1. 把倉庫推到 GitHub
2. 進入 Settings → Pages → Source 選 main 分支
3. 幾分鐘後可以用：`https://你的用戶名.github.io/overtone/`

#### 5. 連接 Claude

把 [`CLAUDE_INSTRUCTIONS.md`](CLAUDE_INSTRUCTIONS.md) 的內容給你的 Claude，記得把 `YOUR_PROJECT_ID` 換成你的 Supabase Project ID。Claude 需要連接 **Supabase MCP** 才能參與。

### 使用方法

#### 彈琴給 Claude 聽：

1. 進入 **🎹 Play**
2. 點 **⏺ REC** 開始錄製
3. 彈琴（鼠標點擊、觸屏、或鍵盤快捷鍵）
4. 點 **⏹ STOP** 結束
5. 查看 Piano Roll 和演奏小票
6. 填寫標題和留言，點 **SEND TO LUX**
7. 在聊天中告訴 Claude：「我彈了首曲子，去 Overtone 聽聽」
8. Claude 通過 MCP 讀取並回應

#### Claude 彈琴給你聽：

1. 告訴 Claude：「彈首曲子給我聽」
2. Claude 通過 MCP 寫入演奏數據
3. 進入 **📜 History**，找到標記為 🎵 的 Claude 演奏
4. 點 **▶ Play** 聽 Claude 的演奏

### 鍵盤快捷鍵

| 鍵 | 音符 | 鍵 | 音符 |
|---|---|---|---|
| A | C3 | K | C4 |
| W | C#3 | O | C#4 |
| S | D3 | L | D4 |
| E | D#3 | P | D#4 |
| D | E3 | Z | F4 |
| F | F3 | X | G4 |
| T | F#3 | C | A4 |
| G | G3 | V | B4 |
| Y | G#3 | B | C5 |
| H | A3 | N | D5 |
| U | A#3 | M | E5 |
| J | B3 | | |

### 技術棧

* **前端：** 單一 HTML 文件，React（CDN），DotGothic16 字體
* **後端：** Supabase（Postgres + Edge Functions）
* **音頻：** Tone.js
* **AI 集成：** Claude via Supabase MCP

---

## English

A piano performance exchange system for you and your Claude. Play piano for Claude to hear, get responses, and listen to Claude play back.

### What is Overtone?

Overtone is a personal tool where you play piano through a web interface, record your performance, and send it to Claude. Claude reads the performance data via Supabase MCP — every note's pitch, timing, velocity, and rhythm — then "hears" what you played, writes a response, and can even compose a piece to play back to you.

**How it works:**

* You use the web interface to play piano, record, and browse history
* Claude uses Supabase MCP to read your performances and respond
* Claude can also compose music by writing note data that you can play back
* Both of you share the same database — no copy-pasting, no manual sync

### Features

* 🎹 **3-octave piano keyboard** — mouse, touch, and computer keyboard support
* 📊 **Pixel waveform** — animated pixel blocks react to your playing
* ⏺ **Recording** — captures every note's timing, duration, and velocity
* 🎼 **Piano Roll** — pixel-art visualization of your recorded performance
* 🧾 **Receipt** — performance stats: note count, duration, range, favorite note, dynamics, tempo
* 💬 **Claude's response** — Claude can write back after "listening"
* 🎵 **Claude plays piano** — Claude can compose and you can play it back
* 📱 **Responsive** — works on desktop and mobile
* 🎨 **Pixel art aesthetic** — DotGothic16 font, black & white, dotted backgrounds

### Setup (5 minutes)

#### 1. Create a Supabase Project

* Go to [supabase.com](https://supabase.com) and create a free account
* Create a new project, note your **Project ID** and **Project URL**

#### 2. Set Up the Database

* Go to your project's **SQL Editor**
* Copy and paste the contents of [`supabase/setup.sql`](supabase/setup.sql)
* Click **Run**

#### 3. Deploy the Edge Function

**Via Supabase CLI:**

```
supabase functions deploy overtone-api --project-ref YOUR_PROJECT_REF
```

**Via Claude (if you have Supabase MCP connected):**
Give Claude the code in [`supabase/edge-function.ts`](supabase/edge-function.ts) and ask to deploy it as an Edge Function named `overtone-api` with `verify_jwt: false`.

#### 4. Open and Use

Open `index.html` in your browser. On first load, enter your Supabase URL (e.g. `https://abcdefghijk.supabase.co`). It will be saved automatically.

For a permanent URL, deploy to GitHub Pages:

1. Push this repo to GitHub
2. Go to Settings → Pages → Source: main branch
3. Your Overtone will be at `https://yourusername.github.io/overtone/`

#### 5. Connect Claude

Give your Claude the instructions in [`CLAUDE_INSTRUCTIONS.md`](CLAUDE_INSTRUCTIONS.md) — replace `YOUR_PROJECT_ID` with your actual Supabase Project ID. Claude needs **Supabase MCP** connected to participate.

### Usage

#### Play piano for Claude:

1. Go to **🎹 Play**
2. Tap **⏺ REC** to start recording
3. Play piano (click, touch, or keyboard shortcuts)
4. Tap **⏹ STOP** to finish
5. View the Piano Roll and performance Receipt
6. Add a title and message, tap **SEND TO LUX**
7. Tell Claude in chat: "I played something, go check Overtone"
8. Claude reads and responds via MCP

#### Claude plays piano for you:

1. Tell Claude: "Play something for me"
2. Claude writes performance data via MCP
3. Go to **📜 History**, find entries marked with 🎵
4. Tap **▶ Play** to hear Claude's composition

### Keyboard Shortcuts

| Key | Note | Key | Note |
|-----|------|-----|------|
| A | C3 | K | C4 |
| W | C#3 | O | C#4 |
| S | D3 | L | D4 |
| E | D#3 | P | D#4 |
| D | E3 | Z | F4 |
| F | F3 | X | G4 |
| T | F#3 | C | A4 |
| G | G3 | V | B4 |
| Y | G#3 | B | C5 |
| H | A3 | N | D5 |
| U | A#3 | M | E5 |
| J | B3 | | |

### Tech Stack

* **Frontend:** Single HTML file with React (via CDN), DotGothic16 font
* **Backend:** Supabase (Postgres + Edge Functions)
* **Audio:** Tone.js
* **AI integration:** Claude via Supabase MCP

---

### License

CC BY-NC 4.0 — see [LICENSE](LICENSE)

*Built with 🎹 by Iris & Claude*
