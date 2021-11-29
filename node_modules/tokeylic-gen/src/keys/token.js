'use strict';

const { Error, TypeError } = require('../errors');
const Key = require('./key');

class Token extends Key {
	constructor({ keyOptions = {}, tokenOptions = {} } = {}) {
		super(keyOptions);
		/**
		 * Number of parts of the token to be generated.
		 * @type {number}
		 */
		this.numberOfParts = tokenOptions.numberOfParts || 4;

		/**
		 * Separates the parts by separator is given a string.
		 * @type {string}
		 */
		this.separator = tokenOptions.separator || '-';

		/**
		 * Minimum length of each part
		 * @type {number}
		 */
		this.minPartLength = tokenOptions.minPartLength || 3;

		/**
		 * Maximum length of each part
		 * @type {number}
		 */
		this.maxPartLength = tokenOptions.maxPartLength || 10;

		/**
		 * List of extra symbols or characters that you want to include in each part
		 * @type {Array}
		 */
		this.extras = tokenOptions.extras || [];
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
		for (var i = 0; i < this.numberOfParts; ++i) {
			key += this.generatePart(charChain, i);
		}
		return key;
	}
	/**
	 * Generates a part of a chain
	 * @param {string} charChain
	 */
	generatePart(charChain, count) {
		var part = '';
		if (count > 0) {
			part += this.separator;
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
	 * Validates the token options.
	 * @param {TokenOptions} [options=this] Options to validate
	 * @private
	 */
	_validateOptions() {
		if (typeof this.numberOfParts !== 'number') {
			throw new TypeError('KEY_INVALID_OPTION', 'numberOfParts', 'a number');
		}
		if (typeof this.separator !== 'string') {
			throw new TypeError('KEY_INVALID_OPTION', 'separator', 'a string');
		}
		if (typeof this.minPartLength !== 'number') {
			throw new TypeError('KEY_INVALID_OPTION', 'minPartLenght', 'a number');
		}
		if (typeof this.maxPartLength !== 'number') {
			throw new TypeError('KEY_INVALID_OPTION', 'maxPartLength', 'a number');
		}
		if (!Array.isArray(this.extras)) {
			throw new TypeError('KEY_INVALID_OPTION', 'extras', 'an array of strings');
		}
	}
}
module.exports = Token;
