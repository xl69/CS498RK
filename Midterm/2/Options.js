
export default function Options(props) {
    let x = props.option

    function cMin() {
        let x = document.getElementById("mi").value
        props.changeMin(x)
    }

    function cMax() {
        let x = document.getElementById("ma").value
        props.changeMax(x)
    }

    if(!x) {
        return (
            <div>
                <button onClick = {props.changeOption}>Show Options</button>
            </div>
        )
    } else {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <button onClick = {props.changeOption}>Hide Options</button>
                 <select onChange = {e=>props.changeSort(e.target.value)}>
                    <option value ="0">
                        Ascending
                    </option>
                    <option value="1">
                        Descending
                    </option>
                </select>
                highlight
                <input type="checkbox" id="highlight" value ="on" onInput = {props.changeHighlight}></input>
                Min: 
                <input type="range" id = "mi" defaultValue={props.min} onInput = {cMin}></input>
                <div>{props.min}</div>
                Max: 
                <input type="range" id = "ma" defaultValue={props.max} onInput = {cMax}></input>
                <div>{props.max}</div>
            </div>
        )
    }
}

// Options = () => {
  //   let opt = this.state.option
  //   // no option, need to show
  //   if(opt === 0) {
  //     return (
  //       <div>
  //         <button onClick = {this.getOption}>Show Options</button>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div style = {{display: 'flex', flexDirection: 'column'}}>

  //       </div>
  //     )
  //   }
  // }