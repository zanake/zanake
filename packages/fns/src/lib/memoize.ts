import { func } from "./typings";

export default (fn: func): func  => {
    const cache = new WeakMap();

    return (...args) => {
        if (cache.has(args)) return cache.get(args);

        cache.set(args, fn.apply(this, args));
        return cache.get(args);
    }
}