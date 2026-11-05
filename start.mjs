import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n🚀 Starting Project 3D Services (Decoupled Architecture)...');

// 1. Launch Backend Server (Port 5001)
const backend = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit'
});

// 2. Launch Frontend Dev Server (Port 3000)
const frontend = spawn('node', ['dev-server.js'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit'
});

function cleanup() {
  console.log('\n🛑 Shutting down services...');
  backend.kill();
  frontend.kill();
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
backend.on('exit', (code) => {
  if (code !== 0 && code !== null) console.error(`Backend exited with code ${code}`);
});
frontend.on('exit', (code) => {
  if (code !== 0 && code !== null) console.error(`Frontend exited with code ${code}`);
});
