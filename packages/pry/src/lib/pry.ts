type Level = 'log' | 'info' | 'warn' | 'error' | 'debug' | 'success';

export type Stdout = { level?: Level; title: string; message: string };

/**
 * A terminal logging utility for both the NodeJS & browser JavaScript environments
 *
 * @param {Level} config.level - Importance of the information being logged
 * @param {string} config.title - Headline or caption for the log entry
 * @param {string} config.message - Detailed content for the log entry
 */
export const stdout = ({ level = 'log', title, message }: Partial<Stdout>): void => {
    const date = new Date().toISOString();

    let icon;
    let head;
    switch (level) {
        case 'log':
            icon = '📌';
            // blue tag
            head = '\x1b[34m[LOG]\x1b[0m';
            break;
        case 'info':
            icon = '🛟';
            // cyan tag
            head = '\x1b[36m[INFO]\x1b[0m';
            break;
        case 'warn':
            icon = '❗';
            // yellow tag
            head = '\x1b[33m[WARNING]\x1b[0m';
            break;
        case 'error':
            icon = '❌';
            // red tag
            head = '\x1b[31m[ERROR]\x1b[0m';
            break;
        case 'debug':
            icon = '🐞';
            // magenta tag
            head = '\x1b[35m[DEBUG]\x1b[0m';
            break;
        case 'success':
            icon = '✅';
            // green tag
            head = '\x1b[32m[SUCCESS]\x1b[0m';
            break;
        default:
            icon = '🚩';
            // orange tag
            head = '\x1b[38;5;202m[FLAG]\x1b[0m';
            break;
    }

    console.log(icon, head, ` - [${date}]`, title, `\n${JSON.stringify(message, null, '....')}\n`);
};

export type Logger = { level: Exclude<Level, 'success'>; title: string; message: string; directory?: string | null };

/**
 * A file logging utility for both the NodeJS & browser JavaScript environments
 *
 * @param {Level} config.level - Importance of the information being logged
 * @param {string} config.title - Headline or caption for the log entry
 * @param {string} config.message - Detailed content for the log entry
 * @param {string|null} config.directory - Absolute path where your log files be created
 */
export const logger = async ({ level = 'log', title, message, directory = null }: Partial<Logger>): Promise<void> => {
    const writer = typeof console[level] === 'function' ? console[level] : console.log;

    const date = new Date().toISOString();

    let emoji;
    switch (level) {
        case 'log':
            emoji = '📌';
            break;
        case 'info':
            emoji = '🛟';
            break;
        case 'warn':
            emoji = '❗';
            break;
        case 'error':
            emoji = '❌';
            break;
        case 'debug':
            emoji = '🐞';
            break;
        default:
            emoji = '🚩';
            break;
    }

    writer(`${emoji} [${date}] ${title}`, `\n${JSON.stringify(message, null, '....')}\n`);

    if (directory !== null) {
        try {
            const path = await import('path');
            const fs = await import('fs/promises');

            const handle = await fs.open(path.resolve(process.cwd(), directory, `${level}.log`), 'a+');

            const stream = handle.createWriteStream();

            stream.write(`${emoji} [${date}] ${title}\n`);
            stream.end(`${JSON.stringify(message, null, '....')}\n\n`);
        } catch (error) {
            console.error(error);
        }
    }
};
