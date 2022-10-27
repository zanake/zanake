import { numeral } from "../lib/typings";

export const _even = (x: number) => x % 2 === 0;

export const _half = (x: number) => Math.abs(x) % 1 === 0.5;

export const _defined = (x: any) => typeof x !== 'undefined';

export const _string = (x: any) => typeof x === 'string' || x instanceof String;

export const _decimal = (x: numeral) => !isNaN(parseFloat((x).toString())) && isFinite(+x) && !Number.isInteger(+x);

export const _integer = (x: numeral) => !isNaN(parseInt((x).toString(), 10)) && isFinite(+x) && Number.isInteger(+x);

export const _ratio = (x: Array<numeral>) => x.length > 1 && x.every((term) => term >= 0) && x.some((term) => term > 0);