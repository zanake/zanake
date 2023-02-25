type Level = "log"|"info"|"warn"|"error"|"debug";

export interface Pry {level: Level,title: string,message: string, directory: string | null}

/**
 * A logging utility for both the NodeJS & browser JavaScript environments
 * 
 * @param {Level} config.level - Importance of the information being logged
 * @param {string} config.title - Headline or caption for the log entry
 * @param {string} config.message - Detailed content for the log entry
 * @param {string|null} config.directory - Absolute path where your log files be created
 */
const logger = async ({level = 'log', title, message, directory = null}: Partial<Pry>) : Promise<void> => {
    const writer = typeof console[level] === "function"
        ? console[level]
        : console.log;

    const date = new Date().toISOString();

    let emoji;
    switch (level) {
        case "log":
            emoji = "📌";
            break;
        case "info":
            emoji = "✅";
            break;
        case "warn":
            emoji = "❗";
            break;
        case "error":
            emoji = "❌";
            break;
        case "debug":
            emoji = "🐞";
            break;
        default:
            emoji = "🚩";
            break;
    }

    writer(`${emoji} [${date}] ${title}`, `\n${JSON.stringify(message, null, "....")}\n`);

    if (directory !== null) {
        try {
            const path = await import("path");
            const fs = await import("fs/promises");

            const handle = await fs.open(path.resolve(process.cwd(), directory, `${level}.log`), 'a+');

            const stream = handle.createWriteStream();

            stream.write(`${emoji} [${date}] ${title}\n`);
            stream.end(`${JSON.stringify(message, null, "....")}\n\n`);
        } catch (error) {
            console.error(error);
        }
    }
};

export default logger;