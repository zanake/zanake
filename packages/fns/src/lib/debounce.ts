import { func } from "./typings";

export default (fn: func, delay = 200, log = false): func => {
    let timeoutID : any = undefined;
    if (log) console.log(`The timeout ID at immediate load: ${timeoutID}`);

    return (...args) => {
        if (log) console.log(`The previous timeout ID: ${timeoutID}`);

        if (timeoutID) clearTimeout(timeoutID);

        timeoutID = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}