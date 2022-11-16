import { numeric } from "../typings";

export const toInteger = (x: numeric) => parseInt(x.toString());

export const toDecimal = (x: numeric) => parseFloat(x.toString());