import React from 'react'
import { Table } from 'react-bootstrap'
import "./styles/MovesLog.css"
import Move from "./Move"

export default function MovesLog(props){
  const moves = props.moves.map(
    move => { return( <Move move={move}/> ) }
  )
  return(
    <div className="moveLogTable">
      <Table responsive striped bordered hover >
        <thead>
          <tr>
            <th>Player</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          { moves && moves }
        </tbody>
      </Table>
    </div>
  )
}