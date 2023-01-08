import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

/*
 ** This hook can be used when you only want a useEffect to NOT run on the first
 ** render. The scenario is that you are using useOnce to only run an effect on
 ** the first render, but you have a separate effect to allow data to be reloaded:
 **
 ** const [reloadFlag, setReloadData] = useState(false)
 **
 ** useEffect(() => {
 **   fetchData()
 ** }, [reloadFlag])
 **
 ** In this case the effect will be triggered the first time the component is
 ** rendered with reloadFlag === false whereas the intuitive behaviour is that
 ** it won't trigger the first time and then only when the value changes from
 ** false to true, and true to false etc...
 **
 ** Usage (exactly the same as useEffect):
 **
 ** useAfterFirstRender(() => {
 **   ...
 **   fetchData()
 ** }, [reloadFlag])
 **
 */

export const useAfterFirstRender = (callback: EffectCallback, deps?: DependencyList) => {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) {
      callback()
    } else {
      didMount.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
