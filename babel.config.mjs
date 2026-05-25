// @ts-check
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import getBaseConfig from '@mui/internal-code-infra/babel-config';

/**
 * @typedef {import('@babel/core')} babel
 */

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * @param {string} relativeToBabelConf
 * @returns {string}
 */
function resolveAliasPath(relativeToBabelConf) {
  const resolvedPath = path.relative(process.cwd(), path.resolve(dirname, relativeToBabelConf));
  return `./${resolvedPath.replace('\\', '/')}`;
}

/** @type {babel.ConfigFunction} */
export default function getBabelConfig(api) {
  const baseConfig = getBaseConfig(api);

  const defaultAlias = {
    '@mui/material': resolveAliasPath('./packages/mui-material/src'),
    '@mui/styled-engine': resolveAliasPath('./packages/mui-styled-engine/src'),
    '@mui/system': resolveAliasPath('./packages/mui-system/src'),
    '@mui/private-theming': resolveAliasPath('./packages/mui-private-theming/src'),
    '@mui/utils': resolveAliasPath('./packages/mui-utils/src'),
    '@mui/types': resolveAliasPath('./packages/mui-types/src'),
  };

  const basePlugins = (baseConfig.plugins || []).filter(
    (/** @type {[unknown, unknown, string]} */ [, , pluginName]) =>
      pluginName !== '@mui/internal-babel-plugin-display-name',
  );

  return {
    ...baseConfig,
    plugins: basePlugins,
    overrides: [
      {
        exclude: /\.test\.(m?js|ts|tsx)$/,
        plugins: ['@babel/plugin-transform-react-constant-elements'],
      },
    ],
    env: {
      development: {
        plugins: [
          [
            'babel-plugin-module-resolver',
            {
              alias: defaultAlias,
              root: ['./'],
            },
          ],
        ],
      },
    },
  };
}
