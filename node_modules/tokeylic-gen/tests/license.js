function licenseTest() {
    const { License } = require("../index")

    const token = new License().gen()

return token;
}

function licenseTestValue() {
    const { License } = require("../index")

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

return license;
}
module.exports = {
    licenseTest,
    licenseTestValue
};