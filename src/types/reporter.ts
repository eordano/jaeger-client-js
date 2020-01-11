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

import { Span } from '../span'
import { Tag } from './jaeger-thrift'

export interface Reporter {
  report(span: Span): void
  close(callback?: () => void): void
  setProcess(serviceName: string, tags: Array<Tag>): void
}

export interface Sender {
  append(span: Span, callback?: SenderCallback): void
  flush(callback?: SenderCallback): void
  close(): void
  setProcess(process: any): void
}

export type SenderCallback = (numSpans: number, err?: string) => void
