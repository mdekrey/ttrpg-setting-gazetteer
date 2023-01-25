import path from 'node:path';
import { processSrcRoot } from '@/util/paths';

// const processUrlRoot = pathToFileURL(processSrcRoot);

export const gazetteerFsRoot = path.join(processSrcRoot, 'gazetteer');
// export const gazetteerImportRoot = pathToFileURL(gazetteerFsRoot).href;
