import log from "loglevel";
import chalk, { ChalkInstance } from "chalk";
import prefix from "loglevel-plugin-prefix";

interface IChalkInstances {
    [key: string]: ChalkInstance;
}

const colors: IChalkInstances = {
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

// try {
//     // Выполнение кода, который может сгенерировать ошибку
//     throw new Error("Ошибка: CustomError");
// } catch (err) {
//     // Проверка имени ошибки
//     if (err.name === "CustomError") {
//         // Пропуск ошибки
//         return;
//     }

//     // Вывод сообщения об ошибке
//     log.error(err.message);
// }

prefix.apply(log, {
    format(level, name, timestamp) {
        const stamp = "[" + timestamp.toString() + "]";
        return `${chalk.gray(stamp)} ${colors[level.toUpperCase()](level)} ${chalk.green(name as string)}`;
    },
});

export { log as logger };
