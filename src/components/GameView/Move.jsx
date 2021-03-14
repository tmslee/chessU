import React from 'react'

export default function Move(props){
  return(
    <tr>
      <td>{props.move.player}</td>
      <td>{props.move.from}</td>
      <td>{props.move.to}</td>
    </tr>
  )
}