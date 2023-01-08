import { useEffect, useRef } from 'react'

/*
 ** This hook can be used when you only want something to occur at most one time
 ** after page load, typically loading data from a server. A separate useEffect
 ** is required for data refresh.
 **
 ** useOnce(() => {
 **   console.log('I'll only ever happen once')
 ** })
 **
 ** or:
 **
 ** useOnce(() => {
 **   console.log('I'll only ever happen once and when isLoaded is truthy')
 ** }, isLoaded)
 **
 */

export const useOnce = (callback: Function, condition = true) => {
  const isCalled = useRef(false)

  useEffect(() => {
    if (condition && !isCalled.current) {
      isCalled.current = true
      callback()
    }
  }, [callback, condition])
}
