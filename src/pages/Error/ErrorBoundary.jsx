import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {

  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="mt-10 mx-auto text-center text-2xl">
          <div className="font-semibold">{error.status}</div>
          <div className="my-5 font-bold">{error.statusText}</div>
          <div className="italic">{error.data}</div>
          <div className='mt-10 text-red-500'>Page not found</div>
        </div>
      );
    }

    if (error.status === 401) {
      return (
        <div className="mt-10 mx-auto text-center text-2xl">
          <div className="font-semibold">{error.status}</div>
          <div className="my-5 font-bold">{error.statusText}</div>
          <div className="italic">{error.data}</div>
          <div className="mt-10 text-red-500">You aren't authorized to see this</div>
        </div>
      );
    }

    if (error.status === 503) {
      return (
        <div className="mt-10 mx-auto text-center text-2xl">
          <div className="font-semibold">{error.status}</div>
          <div className="my-5 font-bold">{error.statusText}</div>
          <div className="italic">{error.data}</div>
          <div className='mt-10 text-red-500'>Looks like our API is down</div>
        </div>
      );
    }

    if (error.status === 418) {
      return (
        <div className="mt-10 mx-auto text-center text-2xl">
          <div className="font-semibold">{error.status}</div>
          <div className="my-5 font-bold">{error.statusText}</div>
          <div className="italic">{error.data}</div>
          <div className='mt-10 text-red-500'>🫖</div>
        </div>
      );
    }
  }

  return <div>Something went wrong</div>;
}

export default ErrorBoundary