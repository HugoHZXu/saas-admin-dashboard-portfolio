import fs from 'node:fs';
import path from 'node:path';

export type ViteAliasEntry = {
  find: string | RegExp;
  replacement: string;
};

export type HugoUiSourceLink = {
  enabled: boolean;
  aliases: ViteAliasEntry[];
};

type LocalHugoUiConfig = {
  enabled?: boolean;
  linkPath?: string;
};

type HugoUiModeConfig = {
  expectedVersion?: string;
};

const exactVersionPattern = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;
const disabledEnvValues = new Set(['0', 'false', 'off', 'no']);

const readJson = <T>(filePath: string): T | null => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
  } catch {
    return null;
  }
};

const resolveFromRoot = (repoRoot: string, value: string) =>
  path.isAbsolute(value) ? value : path.resolve(repoRoot, value);

const readExpectedHugoUiVersion = (packageDir: string) => {
  const repoRoot = path.resolve(packageDir, '../..');
  const modeConfig = readJson<HugoUiModeConfig>(path.join(repoRoot, 'config', 'hugo-ui.json'));

  if (modeConfig?.expectedVersion) {
    return modeConfig.expectedVersion;
  }

  const packageJson = readJson<{
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  }>(path.join(packageDir, 'package.json'));

  return (
    packageJson?.dependencies?.['@hugo-ui/mui'] ??
    packageJson?.devDependencies?.['@hugo-ui/mui'] ??
    null
  );
};

const normalizeExpectedHugoUiVersion = (versionSpecifier: string | null) => {
  if (!versionSpecifier) {
    return null;
  }

  if (exactVersionPattern.test(versionSpecifier)) {
    return versionSpecifier;
  }

  return null;
};

export const getHugoUiSourceLink = (packageDir: string): HugoUiSourceLink => {
  const envOverride = process.env.VITE_HUGO_UI_SOURCE_LINK?.toLowerCase();

  if (envOverride && disabledEnvValues.has(envOverride)) {
    return { enabled: false, aliases: [] };
  }

  const repoRoot = path.resolve(packageDir, '../..');
  const localConfig = readJson<LocalHugoUiConfig>(path.join(repoRoot, '.local', 'hugo-ui.json'));

  if (!localConfig || localConfig.enabled === false) {
    return { enabled: false, aliases: [] };
  }

  const linkPath = resolveFromRoot(repoRoot, localConfig.linkPath ?? 'hugo-ui');
  const packageRoot = path.join(linkPath, 'packages', 'mui');
  const sourceRoot = path.join(packageRoot, 'src');
  const localPackageJson = readJson<{ version?: string }>(path.join(packageRoot, 'package.json'));
  const expectedVersion = normalizeExpectedHugoUiVersion(readExpectedHugoUiVersion(packageDir));

  if (
    !fs.existsSync(path.join(sourceRoot, 'index.ts')) ||
    !localPackageJson?.version ||
    !expectedVersion ||
    expectedVersion !== localPackageJson.version
  ) {
    return { enabled: false, aliases: [] };
  }

  return {
    enabled: true,
    aliases: [
      {
        find: '@hugo-ui/mui/styles/theme',
        replacement: path.join(sourceRoot, 'styles', 'theme.ts'),
      },
      {
        find: '@hugo-ui/mui/utils/wcagUtils',
        replacement: path.join(sourceRoot, 'utils', 'wcagUtils.ts'),
      },
      {
        find: /^@hugo-ui\/mui$/,
        replacement: path.join(sourceRoot, 'index.ts'),
      },
    ],
  };
};
