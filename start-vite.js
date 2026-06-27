import { spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const path = require('path');

const vitePath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');

console.log('Checking for vite at:', vitePath);

const cp = spawn(vitePath, ['dev', '--host', '0.0.0.0', '--port', '5173'], {
  cwd: process.cwd(),
  stdio: 'inherit'
});

cp.on('exit', (code) => {
  console.log('Vite exited with code:', code);
});

cp.on('error', (err) => {
  console.error('Error starting vite:', err);
});
