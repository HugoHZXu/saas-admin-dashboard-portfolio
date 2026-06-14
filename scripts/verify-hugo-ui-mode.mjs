import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(repoRoot, 'config', 'hugo-ui.json');
const dashboardPackages = [
  'packages/admin-console',
  'packages/admin-shared',
  'packages/org-management',
  'packages/user-management',
];

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const config = readJson(configPath);

if (config.mode !== 'npm') {
  fail(`Unsupported Hugo UI mode "${config.mode}". Expected "npm".`);
}

if (typeof config.expectedVersion !== 'string' || config.expectedVersion.trim() === '') {
  fail('config/hugo-ui.json must define expectedVersion.');
}

for (const packageDir of dashboardPackages) {
  const packageJsonPath = path.join(repoRoot, packageDir, 'package.json');
  const packageJson = readJson(packageJsonPath);
  const specifier = packageJson.dependencies?.['@hugo-ui/mui'];

  if (specifier !== config.expectedVersion) {
    fail(
      `${packageDir} must depend on @hugo-ui/mui as ${config.expectedVersion}; found ${specifier ?? '<missing>'}.`
    );
  }
}

if (typeof config.localPackagePath === 'string' && config.localPackagePath.trim() !== '') {
  const localPackageJsonPath = path.join(repoRoot, config.localPackagePath, 'package.json');

  if (fs.existsSync(localPackageJsonPath)) {
    const localPackageJson = readJson(localPackageJsonPath);

    if (localPackageJson.name !== '@hugo-ui/mui') {
      fail(`Expected @hugo-ui/mui, found ${localPackageJson.name ?? '<missing name>'}.`);
    }

    if (localPackageJson.version !== config.expectedVersion) {
      fail(
        `Local @hugo-ui/mui version mismatch: expected ${config.expectedVersion}, found ${localPackageJson.version}.`
      );
    }
  }
}

console.log(`@hugo-ui/mui ${config.expectedVersion} verified in npm mode.`);
