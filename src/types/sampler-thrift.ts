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

export type ProbabilisticSamplingStrategy = {
  samplingRate: number
}

export type RateLimitingSamplingStrategy = {
  maxTracesPerSecond: number
}

// OperationSamplingStrategy defines a sampling strategy for a given operation
// that randomly samples a fixed percentage of traces.
export type OperationSamplingStrategy = {
  operation: string
  probabilisticSampling: ProbabilisticSamplingStrategy
}

// PerOperationSamplingStrategies defines a collection of sampling strategies
// per operation name, and a pair of parameters for the default sampling strategy
// applicable to unknown operation names.
export type PerOperationSamplingStrategies = {
  defaultSamplingProbability: number
  defaultLowerBoundTracesPerSecond: number
  perOperationStrategies: Array<OperationSamplingStrategy>
}

export type SamplingStrategyResponse = {
  strategyType: string
  probabilisticSampling?: ProbabilisticSamplingStrategy
  rateLimitingSampling?: RateLimitingSamplingStrategy
  operationSampling?: PerOperationSamplingStrategies
}
