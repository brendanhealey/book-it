import constants from 'constants/appConstants'

export const fetchWithTimeout = (url: string, options: any, httpTimeout = constants.HTTP_TIMEOUT) => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((resolve, reject) => setTimeout(() => reject(new Error('timeout')), httpTimeout)),
  ])
}

export default fetchWithTimeout
