# ToKeyLic-Gen
ToKeyLic-Gen is a cool library to generate tokens, licenses, keys and much more.
## Getting Started
```
npm install ToKeyLic-Gen
```
## Overview
> ToKeyLic-Gen is made to be handfull and available for everyone. 
Imagine you have an API that needs authentication, well using this module will surelly help you to create simple auth tokens and make your API safe to use.

## Key Options
- keyLenght {Integer}
`Choose the length of your key`
> Default: 50 | Example: { keyLenght: 20 } | Content: abcdefghijklmnopqrstuvwxyz

- useNumbers {Boolean}
`Add numbers or not to your key`
> Default: false | Example: { useNumbers: true } | Content: 0123456789

- useSymbols {Boolean}
`Add symbols or not to your key`
> Default: false | Example: { useSymbols: true } | Content: `~!@#$%^&*()–_=+[]{}|;:‘“,./<>?

- caps {String}
`Choose between [none | mix | all]`
> Default: mix | Example: { caps: "all" }

## Token Options
> You can also add the [key options](#key-options) in the same object. (See [example](#token-generation))

- numberOfParts {Integer}
`Choose the number of parts in your token`
> Default: 4 | Example: { numberOfParts: 5 }

- minPartLength {Integer}
`The minimum length of a part in your token`
> Default: 3 | Example: { minPartLength: 5 }

- maxPartLength {Integer}
`The maximum length of a part in your token`
> Default: 10 | Example: { maxPartLength: 5 }

- separator {String}
`The character that separates the parts in your token`
> Default: - | Example: { separator: "_" }

- extras {String}
`An array of characters which will be added at the end of each part `
> Default: [] | Example: { separator: ["a", "b", "0", "13"] }


## License Options
> You can also add the [key options](#key-options) in the same object. (See [example](#token-generation))

- useParts {Boolean}
`Add parts or not to your license`
> Default: false | Example: { useParts: true }

- numberOfParts {Integer}
`Choose the number of parts in your license`
> Default: 4 | Example: { numberOfParts: 5 }

- minPartLength {Integer}
`The minimum length of a part in your license`
> Default: 3 | Example: { minPartLength: 5 }

- maxPartLength {Integer}
`The maximum length of a part in your license`
> Default: 10 | Example: { maxPartLength: 5 }

- prefix {String}
`The prefix that you want to add in the begining of your license`
> Default: LIC | Example: { prefix: "FREE" }

- prefixSeparator {String}
`The character that separates the prefix in your token`
> Default: - | Example: { prefixSeparator: "_" }

- partSeparator {String}
`The character that separates the prefix in your token`
> Default: _ | Example: { partSeparator: "-" }

- extras {String}
`An array of characters which will be added at the end of each part `
> Default: [] | Example: { separator: ["a", "b", "0", "13"] }

## Examples

### Key Generation:
__Simple Key Generation:__
<details open>
<summary>Example</summary>

```js
const { Key } = require("tokeylic-gen");

const key = new Key().gen();
console.log(key);
```
<details>
<summary>Expected output</summary>

Type: String<br/> Example Output: `AhfEYSWmuqpdEeLLTeXGGqimRKYeuKjQNOPDfcKsBsWQjZozZc`
</details>
</details>

__Customised Key Generation:__ 
<details open>
<summary>Example</summary>

```js
const { Key } = require("tokeylic-gen");

const key = new Key({
    keyLenght: 20,
    useNumbers: true,
    useSymbols: true,
    caps: "mix"
}).gen();
console.log(key);
```
<details>
<summary>Expected output</summary>

Type: String<br/> Example Output: `Yb%wG![<rgqr}:PqPX3Ie@Z<kymEAuQWlzcGtQw#SH~Y0IrRaC)`
</details>
</details>

### Token Generation
__Simple Token Generation:__
<details open>
<summary>Example</summary>

```js
const { Token } = require("tokeylic-gen");

const token = new Token().gen();
console.log(token);
```
<details>
<summary>Expected output</summary>

Type: String<br/> Example Output: `mbxlJxIUq-SliMAJ-zFjBkOl-uIkoToqPXE)`
</details>
</details>

__Customised Token Generation:__ 
<details open>
<summary>Example</summary>

```js
const { Token } = require("tokeylic-gen");

const token = new Token({
    keyOptions: {
        useNumbers: true,
        useSymbols: true,
        caps: "mix",
    },
    tokenOptions: {
        numberOfParts: 5,
        minPartLength: 3,
        maxPartLength: 5,
        extras: ["KEYGEN"]
    }
}).gen()
console.log(token);
```
<details>
<summary>Expected output</summary>

Type: String<br/> Example Output: `[<fJKEYGEN-YBa8nKEYGEN-sRK7KEYGEN-qxxkKEYGEN-:<w]KEYGEN)`
</details>
</details>

### License Generation
__Simple License Generation:__
<details open>
<summary>Example</summary>

```js
const { License } = require("tokeylic-gen");

const license = new License().gen();
console.log(license);
```
<details>
<summary>Expected output</summary>

Type: String<br/> Example Output: `LIC-vrPhLLGQdsKzQkTSzcGqVTOznJnuTmLjnsWhDZpYRdQUDQOJvB)`
</details>
</details>

__Customised License Generation:__ 
<details open>
<summary>Example</summary>

```js
const { License } = require("tokeylic-gen");

const license = new License({
    keyOptions: {
        useNumbers: true,
        useSymbols: true,
        caps: "mix",
    },
    licenseOptions: {
        prefix: "KEYGEN",
        partSeparator: "_",
        useParts: true,
        numberOfParts: 5,
        minPartLength: 3,
        maxPartLength: 5,
        extras: ["KEYGEN"]
    }
}).gen()
console.log(license);
```
<details>
<summary>Expected output</summary>

Type: String<br/> Example Output: `KEYGEN-<hQ}KEYGEN_uOPKEYGEN_%yfKEYGEN_=raKEYGEN_P+lbKEYGEN)`
</details>
</details>


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

## Module License
This module is licensed under [MIT](https://opensource.org/licenses/MIT) license.

## Thanks
Made by [@TsWin](https://github.com/TsWin) and [@matheo-debal](https://github.com/matheo-debal) with ❤️
