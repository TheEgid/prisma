import log from "loglevel";
import chalk from "chalk";
import prefix from "loglevel-plugin-prefix";

const colors = {
    TRACE: chalk.magenta,
    DEBUG: chalk.cyan,
    INFO: chalk.blue,
    WARN: chalk.yellow,
    ERROR: chalk.red,
};

if (process.env.NODE_ENV == "development") {
    log.setLevel("debug");
}

prefix.reg(log);

prefix.apply(log, {
    format(level, name, timestamp) {
        // eslint-disable-next-line sonarjs/no-nested-template-literals, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        return `${chalk.gray(`[${String(timestamp)}]`)} ${(colors as any)[level.toUpperCase() as any](
            level
            // eslint-disable-next-line sonarjs/no-nested-template-literals
        )} ${chalk.green(`${name as string}:`)}`;
    },
});

export { log as logger };
