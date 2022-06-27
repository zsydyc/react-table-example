import React from 'react'


interface LoaderProps {
  error?: boolean
  retry?: (event: React.MouseEvent<HTMLElement>) => void
  timedOut?: boolean
  pastDelay?: boolean
}

export const Loader: React.FC<LoaderProps> = ({ error, retry, timedOut, pastDelay }) => {
  return (
    <div>
      {error && (
        <div>
          Error! <button onClick={retry}>Retry</button>
        </div>
      )}
      {timedOut && (
        <div>
          Taking a long time... <button onClick={retry}>Retry</button>
        </div>
      )}
      {pastDelay && <div>Loading...</div>}
      {/* <CircularProgress /> */}
    </div>
  )
}
