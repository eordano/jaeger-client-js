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

import { Restriction } from '../baggage/restriction'

/**
 * BaggageRestrictionManager is an interface for a class that manages baggage
 * restrictions for baggage keys. The manager will return a Restriction
 * for a specific baggage key which will determine whether the baggage key is
 * allowed and any other applicable restrictions on the baggage value.
 */
export interface BaggageRestrictionManager {
  getRestriction(service: string, key: string): Restriction
}