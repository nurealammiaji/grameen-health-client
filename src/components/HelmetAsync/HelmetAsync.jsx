import React from 'react'
import { Helmet } from 'react-helmet-async';

const HelmetAsync = ({ title }) => {
  return (
    <Helmet>
      <title>{title} || Grameen Health</title>
      <link rel="canonical" href="https://www.grameen.com.bd/" />
    </Helmet>
  )
}

export default HelmetAsync