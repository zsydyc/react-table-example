export const apiCall = async <ResultType>(cb: (num: number) => ResultType, param: number): Promise<ResultType> => {
  await new Promise(resolve => setTimeout(resolve, 5000))
  return cb(param)
}
