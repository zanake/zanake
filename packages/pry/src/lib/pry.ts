type Level = "log"|"info"|"error"|"debug";

const logger = async ({level, entry, message, directory = null}: {level: Level, entry: string, message: string, directory: string | null}) : Promise<void> => {
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
        case "error":
            emoji = "❌";
            break;
        case "debug":
            emoji = "🦋";
            break;
        default:
            emoji = "📌";
            break;
    }

    writer(`${emoji} [${date}] ${entry}`, `\n${JSON.stringify(message, null, "....")}\n`);

    if (window === undefined && directory !== null) {
        try {
            const path = await import("path");
            const fs = await import("fs/promises");

            const handle = await fs.open(path.resolve(directory, `${level}.log`));

            const stream = handle.createWriteStream();
            stream.write(`${emoji} [${date}] ${entry}\n`);
            stream.end(`${JSON.stringify(message, null, "....")}\n\n`);
        } catch (error) {
            console.error(error);
            writer(`${emoji} [${date}] ${entry}`, `\n${JSON.stringify(message, null, "....")}\n`);
        }
    }
};

export default logger;