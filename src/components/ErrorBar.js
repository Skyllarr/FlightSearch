import React from 'react'

import './ErrorBar.css'

const ErrorBar = ({appError, dismissError}) => (
    <div className="alert alert-warning alert-dismissible fade show error-bar" role="alert" key="warn">
        {appError}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                onClick={dismissError}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
)

export default ErrorBar
