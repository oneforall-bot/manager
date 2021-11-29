function tokenTest() {
    const { Token } = require("../index")

    const token = new Token().gen()

return token;
}

function tokenTestValue() {
    const { Token } = require("../index")

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

return token;
}
module.exports = {
    tokenTest,
    tokenTestValue
};