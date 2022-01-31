
export default function GradeEntry(props) {
    function submit(){
        let name = document.getElementById("name").value;
        let grade = document.getElementById("grade").value
        if(name.length> 0 && grade.length > 0) {
            let li = props.list
            li.push({
                "name": name,
                "grade": grade
            })
            props.onChange(li)
        }
        props.setChange(!props.change)
    }

    return (
        <div className = "container">
        Name
        <input id = "name"></input>
        Grade 
        <input id = "grade"></input>
        <button onClick={submit}>Submit</button>
        </div>
    );
}