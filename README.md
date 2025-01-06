# CompileX

An **online code editor and compiler** supporting multiple languages with real-time compilation capabilities. CompileX provides a seamless coding experience right in your browser, offering a fully interactive terminal and file tree. Perfect for demos, workshops, or just hacking around!

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Features

1. **Multiple Language Support**  
   Write and compile code in multiple languages (e.g., C, C++, Java, Python, etc.).

2. **Real-Time Compilation**  
   Watch your code’s output update as you type. No manual refresh needed.

3. **Integrated Terminal**  
   A terminal embedded in the browser, powered by Socket.IO and node-pty. Execute commands in real time.

4. **File Tree**  
   Create, edit, and navigate project files in a folder-like structure on the client.

5. **Full-Stack Setup**  
   - **Backend:** Node.js + Express + Socket.IO + node-pty  
   - **Frontend:** React + Socket.IO client

---

## Prerequisites

- **Node.js** (Recommended LTS version or later)
- **npm** (bundled with Node.js)
- A modern browser (Chrome, Firefox, Edge, Safari, etc.)

*(Optional)* If you plan to run inside Docker, ensure you have **Docker** installed.

---

## Installation

Below are the steps for a typical local installation and usage.

### 1. Clone the repository

```bash
git clone https://github.com/shihabshahrier/CompileX.git
cd CompileX
```

### 2. Install and run the server

```bash
cd server
npm install
npm run dev
```

> **Note:** Keep this terminal open to continue running the server in the background.

### 3. Install and run the client

Open a **new** terminal window (so the server remains running in the old one):

```bash
cd ../client
npm install
npm run dev
```

### 4. Access the app

Open your browser and go to:
```
http://localhost:5173/
```

You should now see the CompileX interface.

---

## Usage

1. **Create or select a file** from the file tree on the left side of the screen.  
2. **Write or paste your code** in the built-in editor.  
3. Watch the **real-time output** in the integrated terminal. You can also type commands in this terminal if needed.  
4. **File changes** automatically sync with the server, so you can collaborate or work in multiple tabs without losing your edits.

---

## Project Structure

```
CompileX
 ├─ client/                # Frontend (React + Socket.IO client)
 │   ├─ public/            # Public static assets
 │   ├─ src/
 │   │   ├─ components/    # React components (Terminal, FileTree, Editor, etc.)
 │   │   ├─ App.jsx        # Main app component
 │   │   └─ ...
 │   ├─ package.json
 │   └─ ...
 ├─ server/                # Backend (Node.js + Express + Socket.IO + node-pty)
 │   ├─ user/              # Folder for user code/files
 │   ├─ index.js           # Main server script
 │   ├─ package.json
 │   └─ ...
 └─ README.md              # This file
```

---

## Contributing

1. **Fork** this repository.  
2. **Clone** your fork locally.  
3. **Create a new branch** for your feature/fix:  
   ```bash
   git checkout -b feature/my-awesome-feature
   ```
4. **Commit** your changes:  
   ```bash
   git commit -m "Add my awesome feature"
   ```
5. **Push** to your branch:  
   ```bash
   git push origin feature/my-awesome-feature
   ```
6. **Open a Pull Request** on GitHub.

We welcome all contributions—bug fixes, new features, or documentation improvements!

---


## Contact

- **Author**: [@shihabshahrier](https://github.com/shihabshahrier)
- **Project Repository**: [https://github.com/shihabshahrier/CompileX](https://github.com/shihabshahrier/CompileX)