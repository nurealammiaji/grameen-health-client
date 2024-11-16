import React from 'react'
import { RiArrowLeftLine } from 'react-icons/ri';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {

  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="mx-auto mt-10 text-2xl text-center">
          <div className="font-semibold">{error.status}</div>
          <div className="my-5 font-bold">{error.statusText}</div>
          <div className="italic">{error.data}</div>
          <div className="mt-10 text-red-500">Page not found</div>
          <div className="mt-16 text-center">
            <Link to={"/"} className="text-lg font-bold btn btn-success btn-outline"><RiArrowLeftLine className="mr-2 text-2xl" />Go to Home</Link>
          </div>
        </div>
      );
    }

    if (error.status === 401) {
      return (
        <div className="mx-auto mt-10 text-2xl text-center">
          <div className="font-semibold">{error.status}</div>
          <div className="my-5 font-bold">{error.statusText}</div>
          <div className="italic">{error.data}</div>
          <div className="mt-10 text-red-500">You aren't authorized to see this</div>
          <div className="mt-16 text-center">
            <Link to={"/"} className="text-lg font-bold btn btn-success btn-outline"><RiArrowLeftLine className="mr-2 text-2xl" />Go to Home</Link>
          </div>
        </div>
      );
    }

    if (error.status === 503) {
      return (
        <div className="mx-auto mt-10 text-2xl text-center">
          <div className="font-semibold">{error.status}</div>
          <div className="my-5 font-bold">{error.statusText}</div>
          <div className="italic">{error.data}</div>
          <div className='mt-10 text-red-500'>Looks like our API is down</div>
          <div className="mt-16 text-center">
            <Link to={"/"} className="text-lg font-bold btn btn-success btn-outline"><RiArrowLeftLine className="mr-2 text-2xl" />Go to Home</Link>
          </div>
        </div>
      );
    }

    if (error.status === 418) {
      return (
        <div className="mx-auto mt-10 text-2xl text-center">
          <div className="font-semibold">{error.status}</div>
          <div className="my-5 font-bold">{error.statusText}</div>
          <div className="italic">{error.data}</div>
          <div className='mt-10 text-red-500'>🫖</div>
          <div className="mt-16 text-center">
            <Link to={"/"} className="text-lg font-bold btn btn-success btn-outline"><RiArrowLeftLine className="mr-2 text-2xl" />Go to Home</Link>
          </div>
        </div>
      );
    }
  }

  return <>
    <div>
      <br /><br />
      <div className="text-center">
        <h1 className="text-3xl font-bold text-error">Something went wrong !!</h1>
      </div>
      <div className="mt-16 text-center">
        <Link to={"/"} className="text-lg font-bold btn btn-success btn-outline"><RiArrowLeftLine className="mr-2 text-2xl" />Go to Home</Link>
      </div>
    </div>
  </>;
}

export default ErrorBoundary