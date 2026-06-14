import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReactPackageVitestConfig } from '../../config/vitest/reactPackageConfig';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default createReactPackageVitestConfig({ dirname });
