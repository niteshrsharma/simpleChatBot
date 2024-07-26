// server.js

const express = require('express');
const { spawn } = require('child_process');
const app = express();
const cors=require("cors")
app.use(express.json());

app.use(cors());
const port = 3000;

app.use(express.static("public"));

app.post('/chat', (req, res) => {
    const input = req.body.prompt
    console.log(input);
    const process = spawn('python', ['chatBot.py']);

    process.stdin.write(input);
    process.stdin.end();

    let result = '';
    process.stdout.on('data', (data) => {
        result += data.toString();
    });

    process.stdout.on('end', () => {
        res.json({
            result: result
        });
    });

    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
