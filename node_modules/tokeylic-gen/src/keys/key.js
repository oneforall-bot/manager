'use strict';

const { Error, TypeError } = require('../errors');

class Key {
    /**
     * @typedef {Object} Key options
     * @property {number} keyLength The key length
     * @property {boolean} useNumbers Add numbers to the key generation
     * @property {boolean} useSymbols Add symbols to the key generation
     * @property {boolean} useCaps Add caps to the key generation
     */


    constructor(options = {}) {


            /**
             * The key length
             * @type {number}
             * @param args
             */
        this.keyLength = options.keyLength || 50

        /**
         * Add numbers to the key generation
         * @type {boolean}
         */
        this.useNumbers = options.useNumbers || false

        /**
         * Add symbols to the key generation
         * @type {boolean}
         */
        this.useSymbols = options.useSymbols || false

        /**
         * Add caps to the key generation
         * @type {string}
         * @example
         * caps = "none" // No uppercase letters
         * caps = "mix" // Lowercase letters mixed with uppercase letters
         * caps = "all" // Only uppercase letters
         */
        this.caps = options.caps || "mix"
        
        this.validateOptions();

    }

    /**
     * Generates a key with specified parameters in the
     * @return {string} A string with mixed characters
     */
    gen() {
        var charChain = "abcdefghijklmnopqrstuvwxyz"
        if (this.caps == "mix") {
            charChain += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        } else if (this.caps == "all") {
            charChain = charChain.toUpperCase();
        }
        var key = ""
        if (this.useNumbers) {
            charChain += "0123456789"
        }
        if (this.useSymbols) {
            charChain += "`~!@#$%^&*()–_=+[]{}|;:‘“,./<>?" // missing \
        }
        for (var i = 0, n = charChain.length; i < this.keyLength; ++i) {
            key += charChain.charAt(Math.floor(Math.random() * n));
        }
        return key;
    }

    /**
     * Validates the key options.
     * @param {KeyOptions} [options=this.options] Options to validate
     * @private
     */
    validateOptions() {
        if (typeof this.keyLength !== "number" || isNaN(this.keyLength) || this.keyLength < 1) {
            throw new TypeError('KEY_INVALID_OPTION', 'keyLength', 'a number greater than or equal to 1');
        }
        if (typeof this.useNumbers !== "boolean") {
            throw new TypeError('KEY_INVALID_OPTION', 'useNumbers', 'a boolean');
        }
        if (typeof this.useSymbols !== "boolean") {
            throw new TypeError('KEY_INVALID_OPTION', 'useSymbols', 'a boolean');
        }
        if (typeof this.caps !== "string") {
            throw new TypeError('KEY_INVALID_OPTION', 'caps', 'a string');
        }
        if (!(this.caps == "none" || this.caps == "mix" || this.caps == "all")) {
            throw new TypeError('KEY_CAPS_INVALID_OPTION', 'caps', '"none", "mix" or "all"');
        }

    }
}

module.exports = Key;