import * as url from 'node:url';
export const getDirname = () => url.fileURLToPath(new URL('.', import.meta.url));
