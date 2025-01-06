const http = require('http');
const express = require('express');
const { Server : SocketServer} = require('socket.io');
const pty = require('node-pty');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');
const chokidar = require('chokidar');

const ptyProcess = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.cwd() + '/user',
    env: process.env
});

const app = express();
const server = http.createServer(app);

const io = new SocketServer(server, {
    cors: { origin: '*' }
});

app.use(cors());

// io.attach(server);

chokidar.watch('./user').on('all', (event, path) => {
    io.emit('file:change', path);
  });

ptyProcess.onData((data) => {
    io.emit('console:data', data);
});

io.on('connection', (socket) => {
    console.log('New connection', socket.id);
    socket.on('console:write', (data) => {
        ptyProcess.write(data);
    });

    socket.on('file:change', async ({path, content}) => {
        await fs.writeFile(process.cwd() + '/user' + path, content);
    });
        
});


app.get('/files', async(req, res) => {
    const fileTree = await generateDirTree(process.cwd() + '/user');
    return res.json(fileTree);
});

app.get('/file/content/', async(req, res) => {
    const path = req.query.path;
    const content = await fs.readFile(process.cwd() + '/user' + path, 'utf-8');
    return res.json({ content });
});

server.listen(9000, () => {
    console.log(' 🐳 Docker Server is running on port 9000');
});

async function generateDirTree(dir) {
    const tree = {};
    async function buildTree(currentDir, currentTree) {
        const files = await fs.readdir(currentDir);
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stats = await fs.stat(filePath);
            if (stats.isDirectory()) {
                currentTree[file] = {};
                await buildTree(filePath, currentTree[file]);
            } else {
                currentTree[file] = null;
            }
        }
    }

    await buildTree(dir, tree)
    return tree;
}