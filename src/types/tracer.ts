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

import { SpanContext } from '../span_context'
import { Reference } from './jaeger-thrift'

// startSpanOptions is used to type-check Trace.startSpan() options.
export type startSpanOptions = {
  operationName?: string
  childOf?: SpanContext
  references?: Array<Reference>
  tags?: any
  startTime?: number
}