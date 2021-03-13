import React from 'react';
import '../Common/styles/Error.scss'

export default function FormError(props) {
  return (
    <p className="error">{props.message}</p>
  )
}

