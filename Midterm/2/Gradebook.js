import './App.css';
import React from 'react'
import GradeEntry from './GradeEntry.js'
import GradeList from './GradeList.js'
import Options from './Options.js'

export default function Gradebook() {
  const [list, setList] = React.useState([])
  const [change, setChange] = React.useState(0)
  const [option, setOption] = React.useState(false)
  const [sort, setSort] = React.useState(0)
  const [highlight, setHighlight] = React.useState(false)
  const [min, setMin] = React.useState(0)
  const [max, setMax] = React.useState(100)


  function submitData(data) {
    setList(data)
  }

  function changeOption() {
    setOption(!option)
    setSort(0)
    setMin(0)
    setMax(100)
    setHighlight(false)
  }

  function changeSort(value) {
    setSort(parseInt(value))
  }

  function changeHighlight() {
    setHighlight(!highlight)
  }

  function changeMin(min) {
    setMin(min)
  }

  function changeMax(max) {
    setMax(max)
  }

  // We pass a callback to Child
  return (
    <div>
      <GradeEntry list={list} onChange={submitData} change={change} setChange={setChange}/>
      <GradeList list={list} change={change} highlight={highlight} min={min} max={max} sort={sort} change={change}/>
      <Options option={option} changeOption={changeOption} changeSort={changeSort} changeHighlight={changeHighlight} changeMin={changeMin} changeMax={changeMax} min={min} max={max}/>
    </div>
  );
}