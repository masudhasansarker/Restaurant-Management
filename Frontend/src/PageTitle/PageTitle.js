import React from 'react'
import {helmet} from "helmet";

function PageTitle({title}) {
  return (
    <div>
      <helmet>
        <title>{title}</title>
      </helmet>
    </div>
  )
}

export default PageTitle
