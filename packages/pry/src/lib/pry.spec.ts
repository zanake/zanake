import path from "path";
import fs from "fs/promises";
import pry, { Pry } from './pry';

const logs = [
    {level: "log", title: "Hi", message: "Hello, World"},
    {level: "info", title: "Reporting", message: "Status 200 OK"},
    {level: "warn", title: "Ignored issue", message: "Houston, we've had a problem here."},
    {level: "error", title: "App failure", message: "Mayday! Mayday! We are going down."},
    {level: "debug", title: "Blocker bug", message: "Not what's happening here."}
];

const mkdir = async(directory: string)  => await fs.mkdir(path.resolve(process.cwd(), directory), {recursive:true});
const rimraf = async(directory: string) => await fs.rm(path.resolve(process.cwd(), directory), {recursive: true, force: true});


describe('pry', () => {
    describe('writes to standard error / output', () => {
        logs.forEach((log) => {
            const name = Object.values(log).join(' - ');
            test(name, async () => await pry(log as Pry));
        });
    });
    
    describe('writes to file given an absolute path', () => {
        const directory = path.join(process.cwd(), 'tmp', 'pry', 'logs');

        beforeAll((done) => {
            mkdir(directory);
            done();
        });

        afterAll((done) => {
            rimraf(path.join(process.cwd(), 'tmp'));
            done();
        });

        logs.forEach((log) => {
            test(Object.values(log).join(' - '), async () => {
                const logger = async (config: Pry) => await pry({...config, directory});

                await logger(log as Pry);
            });
        });
    });

    describe('writes to file given a relative path', () => {
        const directory = path.join('.', 'tmp', 'pry', 'logs');

        beforeAll((done) => {
            mkdir(directory);
            done();
        });

        afterAll((done) => {
            rimraf(path.join('.', 'tmp'));
            done();
        });

        logs.forEach((log) => {
            test(Object.values(log).join(' - '), async () => {
                const logger = async (config: Pry) => await pry({...config, directory});

                await logger(log as Pry);
            });
        });
    });
});
