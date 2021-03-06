// Copyright (c) 2017 Uber Technologies, Inc.
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

import { Restriction } from './restriction'

export const DEFAULT_MAX_VALUE_LENGTH = 2048

/**
 * Creates a BaggageRestrictionManager that allows any baggage key.
 */
export class DefaultBaggageRestrictionManager {
  _restriction: Restriction

  constructor(maxValueLength?: number | null ) {
    let length = maxValueLength || DEFAULT_MAX_VALUE_LENGTH
    this._restriction = new Restriction(true, length)
  }

  getRestriction(service: string, key: string): Restriction {
    return this._restriction
  }
}
