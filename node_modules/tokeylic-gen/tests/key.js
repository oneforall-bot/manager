function keyTest() {
    const { Key } = require("../index")

    const key = new Key().gen()

    return key;
}

function keyTestValue() {
    const { Key } = require("../index")

    const key = new Key({
        keyLenght: 20,
        useNumbers: true,
        useSymbols: true,
        caps: "mix"
    }).gen();

    return key;
}

module.exports = {
    keyTest,
    keyTestValue
};