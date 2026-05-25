import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const workspaceRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@mui/material$': path.resolve(workspaceRoot, 'packages/mui-material/build/index.mjs'),
      '@mui/material': path.resolve(workspaceRoot, 'packages/mui-material/build'),
      '@mui/system$': path.resolve(workspaceRoot, 'packages/mui-system/build/index.mjs'),
      '@mui/system': path.resolve(workspaceRoot, 'packages/mui-system/build'),
      '@mui/utils$': path.resolve(workspaceRoot, 'packages/mui-utils/build/index.mjs'),
      '@mui/utils': path.resolve(workspaceRoot, 'packages/mui-utils/build'),
      '@mui/styled-engine$': path.resolve(
        workspaceRoot,
        'packages/mui-styled-engine/build/index.mjs',
      ),
      '@mui/styled-engine': path.resolve(workspaceRoot, 'packages/mui-styled-engine/build'),
      '@mui/private-theming$': path.resolve(
        workspaceRoot,
        'packages/mui-private-theming/build/index.mjs',
      ),
      '@mui/private-theming': path.resolve(workspaceRoot, 'packages/mui-private-theming/build'),
    },
    extensions: ['.mjs', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
});
