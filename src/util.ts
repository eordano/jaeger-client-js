// Copyright (c) 2016 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
// in compliance with the License. You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under the License
// is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
// or implied. See the License for the specific language governing permissions and limitations under
// the License.

import { Tag } from './types/jaeger-thrift'

export class Utils {
  /**
   * Determines whether a string contains a given prefix.
   *
   * @param {string} text - the string for to search for a prefix
   * @param {string} prefix - the prefix to search for in the text given.
   * @return {boolean} - boolean representing whether or not the
   * string contains the prefix.
   **/
  static startsWith(text: string, prefix: string): boolean {
    return text.indexOf(prefix) === 0
  }

  /**
   * Determines whether a string contains a given suffix.
   *
   * @param {string} text - the string for to search for a suffix
   * @param {string} suffix - the suffix to search for in the text given.
   * @return {boolean} - boolean representing whether or not the
   * string contains the suffix.
   **/
  static endsWith(text: string, suffix: string): boolean {
    return text.lastIndexOf(suffix) === text.length - suffix.length
  }

  /**
   * Get a random buffer representing a random 64 bit.
   *
   * @return {Buffer}  - returns a buffer representing a random 64 bit
   * number.
   **/
  static getRandom64(): Buffer {
    let buf = this.newBuffer(8)
    return crypto.getRandomValues(buf)
  }

  /**
   * Get a random buffer representing a random 128 bit.
   *
   * @return {Buffer}  - returns a buffer representing a random 128 bit
   * number.
   **/
  static getRandom128(): Buffer {
    let buf = this.newBuffer(128)
    return crypto.getRandomValues(buf)
  }

  /**
   * @param {string|number} numberValue - a string or number to be encoded
   * as a 64 bit byte array.
   * @return {Buffer} - returns a buffer representing the encoded string, or number.
   **/
  static encodeInt64(numberValue: any): any {
    return Buffer.from([numberValue])
  }

  /**
   * @param {string} input - the input for which leading zeros should be removed.
   * @return {string} - returns the input string without leading zeros.
   **/
  static removeLeadingZeros(input: string): string {
    let counter = 0
    let length = input.length - 1
    for (let i = 0; i < length; i++) {
      if (input.charAt(i) === '0') {
        counter++
      } else {
        break
      }
    }

    return input.substring(counter)
  }

  static myIp(): string {
    return '127.0.0.1'
  }

  static clone(obj: any): any {
    let newObj: Record<string, any> = {}
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = obj[key]
      }
    }

    return newObj
  }

  static convertObjectToTags(dict: any): Array<Tag> {
    let tags: Array<Tag> = []
    for (let key in dict) {
      let value = dict[key]
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        tags.push({key: key, value: value})
      }
    }

    return tags
  }

  static httpGet(
    host: string,
    port: number,
    path: string,
    success: Function,
    error: Function,
  ) {
    return fetch(`${host}:${port}/${path}`).then(_ => _.text)
  }

  /**
   * @param {string|number} input - a hex encoded string to store in the buffer.
   * @return {Buffer} - returns a buffer representing the hex encoded string.
   **/
  static newBufferFromHex(input: string): Buffer {
    const encoding = 'hex'
    // check that 'Buffer.from' exists based on node's documentation
    // https://nodejs.org/en/docs/guides/buffer-constructor-deprecation/#variant-3
    if (Buffer.from && Buffer.from !== Uint8Array.from) {
      return Buffer.from(input, encoding)
    }
    return new Buffer(input, encoding)
  }

  /**
   * @param {number} input - a number of octets to allocate.
   * @return {Buffer} - returns an empty buffer.
   **/
  static newBuffer(size: number): Buffer {
    if (Buffer.alloc) {
      return Buffer.alloc(size)
    }
    const buffer = new Buffer(size)
    buffer.fill(0)
    return buffer
  }

  /**
   * Creates a callback function that only delegates to passed <code>callback</code>
   * after <code>limit</code> invocations. Useful in types like CompositeReporter that
   * needs to invoke the top level callback only after all delegates' close() methods
   * are called.
   */
  static countdownCallback(
    limit: number,
    callback?: () => void | null ,
  ): () => void {
    let count = 0
    return () => {
      count++
      if (count >= limit && callback) {
        callback()
      }
    }
  }
}
