type Level = 'log' | 'info' | 'warn' | 'error' | 'debug' | 'success' | string;

export type Metadata = {
    icon: string;
    ansi: { resetColour: string; foregroundColour: string; backgroundColour: string };
};

export const writer = (level: Level) =>
    typeof console[level as Exclude<Level, 'success' | string>] === 'function'
        ? console[level as Exclude<Level, 'success' | string>]
        : console.log;

export const meta = (level: undefined | Level): Metadata => {
    const resetColour = '\x1b[0m';

    switch (level) {
        case 'log':
            // blue
            return {
                icon: '⚡️',
                ansi: { resetColour, foregroundColour: '\x1b[34m', backgroundColour: '\x1b[44m' },
            };
        case 'info':
            // cyan
            return {
                icon: '💡',
                ansi: { resetColour, foregroundColour: '\x1b[36m', backgroundColour: '\x1b[46m' },
            };
        case 'warn':
            // yellow
            return {
                icon: '🚧',
                ansi: { resetColour, foregroundColour: '\x1b[33m', backgroundColour: '\x1b[43m' },
            };
        case 'error':
            // red
            return {
                icon: '❌',
                ansi: { resetColour, foregroundColour: '\x1b[31m', backgroundColour: '\x1b[41m' },
            };
        case 'debug':
            // magenta
            return {
                icon: '🐞',
                ansi: { resetColour, foregroundColour: '\x1b[35m', backgroundColour: '\x1b[45m' },
            };
        case 'success':
            // green
            return {
                icon: '✅',
                ansi: { resetColour, foregroundColour: '\x1b[32m', backgroundColour: '\x1b[42m' },
            };
        default:
            // orange
            return {
                icon: '🚩',
                ansi: { resetColour, foregroundColour: '\x1b[38;5;202m', backgroundColour: '\x1b[48;5;202m' },
            };
    }
};

export type Stdout = { level?: Level; title: string; message: string };

/**
 * A terminal logging utility for both the NodeJS & browser JavaScript environments
 *
 * @param {Level} config.level - Importance of the information being logged
 * @param {string} config.title - Headline or caption for the log entry
 * @param {string} config.message - Detailed content for the log entry
 */
export const stdout = ({ level, title, message }: Partial<Stdout>): void => {
    const date = new Date().toISOString();
    const func = console.log;

    const {
        icon,
        ansi: { resetColour, foregroundColour, backgroundColour },
    } = meta(level);

    func(
        icon,
        `${backgroundColour}${level}${resetColour}`,
        `[${date}]`,
        `${foregroundColour}${title}${resetColour}`,
        `\n${JSON.stringify(message, null, '....')}\n`
    );

    return;
};

export type Logger = { level: Level; title: string; message: string; directory?: string | null };

/**
 * A file logging utility for both the NodeJS & browser JavaScript environments
 *
 * @param {Level} config.level - Importance of the information being logged
 * @param {string} config.title - Headline or caption for the log entry
 * @param {string} config.message - Detailed content for the log entry
 * @param {string|null} config.directory - Absolute path where your log files be created
 */
export const logger = async ({ level = 'log', title, message, directory = null }: Partial<Logger>): Promise<void> => {
    const date = new Date().toISOString();

    const { icon } = meta(level);

    if (directory !== null) {
        try {
            const path = await import('path');
            const fs = await import('fs/promises');

            const handle = await fs.open(path.resolve(process.cwd(), directory, `${level}.log`), 'a+');

            const stream = handle.createWriteStream();

            stream.write(`${icon} [${date}] ${title}\n`);
            stream.end(`${JSON.stringify(message, null, '....')}\n\n`);
        } catch (error) {
            console.error(error);
        }
    } else {
        const func = writer(level);

        func(`${icon} [${date}] ${title}`, `\n${JSON.stringify(message, null, '....')}\n`);
    }
};
