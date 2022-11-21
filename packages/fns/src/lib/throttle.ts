import { func } from "./typings";

export default (fn: func, interval = 200, log = false): func => {
    let lastTime = 0;
    if (log) console.log('Initial call of the function being throttled');

    let hits = 0;
    return (...args) => {
        const now = new Date().getTime();

        hits++;
        if (now - lastTime < interval) return;
        lastTime = now;

        if (log) console.log(`Trigger function after ${hits} hits at ${now}`);
        fn(...args);
    }
}
