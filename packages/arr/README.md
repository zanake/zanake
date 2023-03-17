# @zanake/arr

A JavaScript utility that provides useful functions to handle various tasks / procedures in an array.

> **arr** . _noun_
>
> :short for array(a data structure consisting of a collection of elements i.e numbers, strings, objects etc)

<br>

## Install

Install the package from the NPM registry using the command below:

`npm install @zanake/arr`

<br>

## Modules

> `*` - represents anything the `any` type

> `array` - represents an array

> `array<*>` - represents an array of any type of objects

| Name      | Desc                               | Signature                   |
| --------- | ---------------------------------- | --------------------------- |
| `arr`     | Checks if the input is an array    | `*` = 𝑓 (`any`)             |
| `lottery` | Picks a random element in an array | `*` = 𝑓 (`array<*>`)        |
| `shuffle` | Randomly re-arranges a given array | `array<*>` = 𝑓 (`array<*>`) |

<br>

## Examples

### arr()

```javascript
import { arr } from '@zanake/arr';

console.log(arr([]]))           // []

console.log(arr(null))          // []

console.log(arr(undefined))     // []

console.log(arr([1, 2,3 ]))     // [1,2,3]
```

### lottery()

```javascript
import { lottery } from '@zanake/arr';

const randomNumber = lottery([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
```

### shuffle()

```javascript
import { shuffle } from '@zanake/arr';

const reArrangedNumbers = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
```

> Powered By [Nx](https://nx.dev)
