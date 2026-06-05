import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(repoRoot, '.local', 'hugo-ui.json');

const readConfig = () => {
  if (!fs.existsSync(configPath)) {
    throw new Error(`Local config not found: ${path.relative(repoRoot, configPath)}`);
  }

  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
};

const resolveFromRepoRoot = (value) => {
  if (typeof value !== 'string' || value.trim() === '') {
    return undefined;
  }

  return path.isAbsolute(value) ? value : path.resolve(repoRoot, value);
};

const safeRealPath = (value) => {
  try {
    return fs.realpathSync(value);
  } catch {
    return undefined;
  }
};

const createBackupPath = (label) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupRoot = path.join(repoRoot, '.local', `hugo-ui-node-modules-backup-${timestamp}`);
  const safeLabel = label.replace(/[\\/]/g, '__');
  let backupPath = path.join(backupRoot, safeLabel);
  let suffix = 1;

  while (fs.existsSync(backupPath)) {
    backupPath = path.join(backupRoot, `${safeLabel}-${suffix}`);
    suffix += 1;
  }

  fs.mkdirSync(backupRoot, { recursive: true });
  return backupPath;
};

const moveNodeModulesAside = (sourcePath, label, repoNodeModulesRealPath) => {
  if (!fs.existsSync(sourcePath)) {
    return;
  }

  const sourceRealPath = safeRealPath(sourcePath);
  if (sourceRealPath === repoNodeModulesRealPath) {
    return;
  }

  const backupPath = createBackupPath(label);
  fs.renameSync(sourcePath, backupPath);
  console.log(`Moved ${label} node_modules aside to ${path.relative(repoRoot, backupPath)}`);
};

const ensureSharedNodeModules = (targetRoot) => {
  const repoNodeModules = path.join(repoRoot, 'node_modules');

  if (!fs.existsSync(repoNodeModules)) {
    console.log('Dashboard node_modules is not installed yet.');
    console.log('Run pnpm install, then rerun setup:local-hugo-ui to share node_modules.');
    return;
  }

  const repoNodeModulesRealPath = fs.realpathSync(repoNodeModules);
  const targetNodeModules = path.join(targetRoot, 'node_modules');

  moveNodeModulesAside(targetNodeModules, 'node_modules', repoNodeModulesRealPath);

  if (!fs.existsSync(targetNodeModules)) {
    fs.symlinkSync(
      repoNodeModules,
      targetNodeModules,
      process.platform === 'win32' ? 'junction' : 'dir'
    );
    console.log(`Created ${path.relative(repoRoot, targetNodeModules)} -> ${repoNodeModules}`);
  }

  for (const packageName of ['mui']) {
    moveNodeModulesAside(
      path.join(targetRoot, 'packages', packageName, 'node_modules'),
      `packages/${packageName}/node_modules`,
      repoNodeModulesRealPath
    );
  }
};

const config = readConfig();

if (config.enabled === false) {
  console.log('Local hugo-ui setup is disabled.');
  process.exit(0);
}

const targetRoot = resolveFromRepoRoot(config.root);
const linkPath = resolveFromRepoRoot(config.linkPath ?? 'hugo-ui');

if (!targetRoot) {
  throw new Error('`.local/hugo-ui.json` must define a `root` path.');
}

if (!fs.existsSync(path.join(targetRoot, 'package.json'))) {
  throw new Error(`No package.json found at configured hugo-ui root: ${targetRoot}`);
}

if (!fs.existsSync(path.join(targetRoot, 'packages', 'mui', 'src', 'index.ts'))) {
  throw new Error(`No @hugo-ui/mui source entry found under: ${targetRoot}`);
}

let canUseLocalLink = true;

if (fs.existsSync(linkPath)) {
  const stat = fs.lstatSync(linkPath);
  const currentRealPath = fs.realpathSync(linkPath);
  const targetRealPath = fs.realpathSync(targetRoot);

  if (currentRealPath === targetRealPath) {
    console.log(`Local hugo-ui link already points to ${targetRoot}`);
  } else if (stat.isSymbolicLink()) {
    throw new Error(
      `Existing ${path.relative(repoRoot, linkPath)} symlink points to ${currentRealPath}; remove it before relinking.`
    );
  } else {
    console.log(
      `Existing ${path.relative(repoRoot, linkPath)} directory is not a symlink; leaving it unchanged.`
    );
    console.log(
      'After the in-repo hugo-ui directory is removed, rerun this script to create the link.'
    );
    canUseLocalLink = false;
  }
} else {
  fs.symlinkSync(targetRoot, linkPath, process.platform === 'win32' ? 'junction' : 'dir');
  console.log(`Created ${path.relative(repoRoot, linkPath)} -> ${targetRoot}`);
}

if (!canUseLocalLink) {
  process.exit(0);
}

if (config.shareNodeModules === true) {
  ensureSharedNodeModules(targetRoot);
}
