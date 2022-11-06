import path from 'path';
import { sync } from 'glob';

/**
 * 
 * @param {string} directory - A path relative to your NodeJS process.cwd()
 * @returns {Array}
 */
export default (directory: string) => {
    // Get the directory to search through for MDX files
    const dir = path.join(process.cwd(), ...directory.split(path.sep));

    // use the glob NPM package to find MDX files with RegExp
    const files = sync(`${dir}/**/*.mdx`);

    // ensure the array only includes pathnames with a .mdx extension
    return Array.isArray(files) && files.length && files.every((item) => item.endsWith('.mdx')) ? files : [];
};