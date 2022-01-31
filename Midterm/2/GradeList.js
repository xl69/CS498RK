export default function GradeList(props) {
    let dataDiv = props.list

    let sort = props.sort  // 0 ascending // 1 descending
    let minimum = parseInt(props.min)
    let maximum = parseInt(props.max)
    let highlight = props.highlight

    if (parseInt(sort) === 1) {
        dataDiv.sort(function(a, b) {
            return parseInt(a.grade) < parseInt(b.grade) ? 1 : -1
        });
    } else {
        dataDiv.sort(function(a, b) {
            return parseInt(a.grade) > parseInt(b.grade) ? 1 : -1
        });
    }

    let highlights = []
    for (let i = 0; i < dataDiv.length; i++) {
      if(highlight) {
        if (dataDiv[i].grade >= minimum && dataDiv[i].grade <= maximum) {
          highlights.push(
            <li style = {{color: "red"}}>{dataDiv[i].name} {dataDiv[i].grade}</li>
          )
        } else {
          highlights.push(
            <li style = {{color: "black"}}>{dataDiv[i].name} {dataDiv[i].grade}</li>
          );
        } 
      } else {
        highlights.push(
          <li style = {{color: "black"}}>{dataDiv[i].name} {dataDiv[i].grade}</li>
        );
      }
    }

    return (
        <ul>
            {highlights}
        </ul>
    );
}

