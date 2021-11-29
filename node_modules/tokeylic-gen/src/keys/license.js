'use strict';

const { Error, TypeError } = require('../errors');
const Key = require('./key');

class License extends Key {
	constructor({ keyOptions = {}, licenseOptions = {} } = {}) {
		super(keyOptions);
		/**
		 * Number of parts of the license to be generated.
		 * @type {number}
		 */
		this.numberOfParts = licenseOptions.numberOfParts || 4;

		/**
		 * Add a prefix before the license generation
		 * @type {string}
		 */
        this.prefix = licenseOptions.prefix || 'LIC';
        
		/**
		 * Separates the prefix by separator is given a string.
		 * @type {string}
		 */
		this.prefixSeparator = licenseOptions.prefixSeparator || '-';

		/**
		 * Use parts in the license
		 * @type {boolean}
		 */
        this.useParts = licenseOptions.useParts || false;
        
		/**
		 * Separates the parts by separator is given a string.
		 * @type {string}
		 */
		this.partSeparator = licenseOptions.partSeparator || "-";

		/**
		 * Minimum length of each part
		 * @type {number}
		 */
		this.minPartLength = licenseOptions.minPartLength || 3;

		/**
		 * Maximum length of each part
		 * @type {number}
		 */
		this.maxPartLength = licenseOptions.maxPartLength || 10;

		/**
		 * List of extra symbols or characters that you want to include in each part
		 * @type {Array}
		 */
		this.extras = licenseOptions.extras || [];
		this._validateOptions();
	}

	gen() {
		var charChain = 'abcdefghijklmnopqrstuvwxyz';
		if (this.caps == 'mix') {
			charChain += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		} else if (this.caps == 'all') {
			charChain = charChain.toUpperCase();
		}
		var key = '';
		if (this.useNumbers) {
			charChain += '0123456789';
		}
		if (this.useSymbols) {
			charChain += '`~!@#$%^&*()–_=+[]{}|;:‘“,./<>?'; // missing \
		}
		// if (this.extras.length > 0) {
		//     this.extras.forEach((char) => {
		//         charChain += char;
		//     })
		// }
		if (this.useParts) {
			for (var i = 0; i < this.numberOfParts; ++i) {
				key += this.generatePart(charChain, i);
			}
        } else {
            for (var i = 0, n = charChain.length; i < this.keyLength; ++i) {
                key += charChain.charAt(Math.floor(Math.random() * n));
            }
            
        }
        key = this.prefix + this.prefixSeparator + key
		return key;
	}
	/**
	 * Generates a part of a chain
	 * @param {string} charChain
	 */
	generatePart(charChain, count) {
		var part = '';
		if (count > 0) {
			part += this.partSeparator;
		}
		const partLength = Math.floor(
			Math.random() * (this.maxPartLength - this.minPartLength + 1) +
				this.minPartLength
		);
		for (var c = 0, n = charChain.length; c < partLength; ++c) {
			part += charChain.charAt(Math.floor(Math.random() * n));
		}
		if (this.extras.length > 0) {
			this.extras.forEach((char) => {
				part += char;
			});
		}
		return part;
	}

	/**
	 * Validates the license options.
	 * @param {TokenOptions} [options=this] Options to validate
	 * @private
	 */
	_validateOptions() {
		if (typeof this.numberOfParts !== 'number') {
			throw new TypeError('KEY_INVALID_OPTION', 'numberOfParts', 'a number');
		}
		if (typeof this.prefixSeparator !== 'string') {
			throw new TypeError('KEY_INVALID_OPTION', 'prefixSeparator', 'a string');
		}
		if (typeof this.useParts !== 'boolean') {
            throw new TypeError('KEY_INVALID_OPTION', 'useParts', 'a boolean');
		}
		if (this.useParts == true && typeof this.minPartLength !== 'number') {
            throw new TypeError('KEY_INVALID_OPTION', 'minPartLenght', 'a number');
		}
		if (this.useParts == true && typeof this.maxPartLength !== 'number') {
            throw new TypeError('KEY_INVALID_OPTION', 'maxPartLength', 'a number');
		}
		if (this.useParts == true && !Array.isArray(this.extras)) {
            throw new TypeError('KEY_INVALID_OPTION', 'extras', 'an array of strings');
        }
        if (this.useParts == true && typeof this.partSeparator !== 'string') {
            throw new TypeError('KEY_INVALID_OPTION', 'partSeparator', 'a string');
        }
	}
}
module.exports = License;
