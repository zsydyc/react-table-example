import React, { useState, useEffect, useCallback } from 'react'

import { makeData } from '.';

export enum LoadingStatus {
  loadingInitial,
  lazyLoading,
  lazyLoaded,
  loadingSearch,
  backendHasMore
}

export const apiMaxNum = 8196;

interface ApiMock<ApiType> extends ApiReturn<ApiType> {
  isLoaded: boolean
  fetchData: () => void
}

interface ApiReturn<ApiType> {
  Results: ApiType[];
  NextToken: string | undefined;
}

export type ApiCall<ApiType> = (
  cb: ApiCall<ApiType>, param: number, shouldHaveNextToken: boolean
) => Promise<ApiReturn<ApiType[]>>;

// Note we'll need to extned this record for the actual API data shape
export type GenericApiType = Record<string, string | boolean | number | GenericApiType[]>

export const useApiMockCall = (
  cb: makeData<GenericApiType> | undefined,
  param: number,
  shouldHaveNextToken = true,
  loadInitial = true,
): ApiMock<GenericApiType> => {
  const [data, setData] = useState<GenericApiType[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const fetchData = async () => {
    setIsLoaded(false)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setData(cb?.(param) ?? [])
    setIsLoaded(true)
  }

  useEffect(() => {
    loadInitial && fetchData()
  }, []);

  return {
    isLoaded,
    fetchData,
    Results: data,
    NextToken: shouldHaveNextToken ? 'nextToken' : undefined
  }
}

export const apiSearch = async <ResultType>(
  cb: (num: number) => ResultType
): Promise<ResultType> => {
  await new Promise(resolve => setTimeout(resolve, 4000))
  return cb(apiMaxNum)
}
