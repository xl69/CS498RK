import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';
import {
    Link
  } from "react-router-dom"


class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            search: 'none',
            sort: 'Name',
            order: 'ascending',
        }
    }

    componentDidMount() {
        if(this.state.data === null) {
            axios.get('https://pokeapi.co/api/v2/pokemon?limit=1118')
            .then(response => {
                let results = response.data.results
                let data = []
                for(let i = 0; i < results.length; i++) {
                    let url = results[i].url
                    data.push({
                        'name': results[i].name,
                        'index': i+1,
                        'url': url,
                        'type1': null,
                        'type2': null
                    })
                }
                for(let i = 0; i < data.length; i++) {
                    axios.get(data[i].url).then(
                        response=>{
                            let type1 = response.data.types[0].type.name
                            let type2 = null
                            if(response.data.types.length > 1) {
                                type2 = response.data.types[1].type.name
                            }
                            data[i].type1 = type1
                            data[i].type2 = type2
                            this.setState({ data: data})
                        }
                    )
                }
                });
        } else {
        }       
    }

    

    onTodoChange = (value) => {
        this.setState({
            search: value  
        })
    }

    onSortChange = (value) => {
        this.setState({
            sort: value
        })
    }

    onOrderChange = (value) => {
        this.setState({
            order: value
        })
    }

    displayList = () => {
        if(this.state.data) {
            let searchValue = this.state.search
            if(this.state.sort === "Name") {
                var newData = []
                let data = JSON.parse(JSON.stringify(this.state.data))
                if(searchValue === 'none' || searchValue.length === 0) {
                    return (
                        <div>     
                        </div>
                    )
                }
                if (this.state.order === "descending") {
                    data.sort(function(a, b) {
                        return a.name < b.name ? 1 : -1
                    });
                } else if (this.state.order === "ascending") {
                    data.sort(function(a, b) {
                        return a.name > b.name ? 1 : -1
                    });
                }
                for(let i = 0; i < data.length; i++) {
                    if(data[i].name.startsWith(searchValue)) {
                        let detail = "/details/"
                        detail = detail + String(data[i].index)
                        newData.push(
                            <Link className = "pokemon" to = {detail}>
                                <div className = "pokemonInfo">{data[i].index}</div>
                                <div className = "pokemonInfo">{data[i].name}</div>
                            </Link>
                        )
                    }
                }
                return (
                    <div className = 'list'> 
                        {newData}
                    </div>
                )
            } else if(this.state.sort === "Index"){
                let newData = []
                let data = JSON.parse(JSON.stringify(this.state.data))
                if(this.state.order === "descending") {
                    data.sort(function(a, b) {
                        return a.index < b.index ? 1 : -1
                    });
                } else if (this.state.order === "ascending") {
                    data.sort(function(a, b) {
                        return a.index > b.index ? 1 : -1
                    });
                }
                if(searchValue.length === 0) {
                    return (
                        <div>     
                        </div>
                    )
                }
                for(let i = 0; i < data.length; i++) {
                    if(data[i].name.startsWith(searchValue)) {
                        let detail = "/details/"
                        detail = detail + String(i+1)
                        newData.push(
                            <Link className = "pokemon" to = {detail}>
                                <div className = "pokemonInfo">{data[i].index}</div>
                                <div className = "pokemonInfo">{data[i].name}</div>
                            </Link>
                        )
                    }
                }
                return (
                    <div className = 'list'> 
                        {newData}
                    </div>
                )
            }   
        } else {
            return(
                <div>
                    Marvel SUCKS
                </div>
            )
        }
    }
    

    render() {
        return (
            <div>
                <div className = "searchPage">
                    <div className = "searchBoxContainer">
                        <div className = "searchBox">
                            <input type = "text" placeholder = "Search..." className = "searchBoxContent" onChange={e => this.onTodoChange(e.target.value)}></input>
                        </div>
                        <div className = "sortedBy"> 
                            <div className = "text">
                                Sorted by:
                            </div>

                            <select className = "selectSort" onChange = {e=>this.onSortChange(e.target.value)}>
                                <option value="Name">
                                    Name
                                </option>
                                <option value="Index">Index</option>
                            </select>
                        </div>
                        
                        <div className = "order">
                            <select className = "selectOrder" onChange = {e=>this.onOrderChange(e.target.value)}>
                                <option value="ascending">
                                    ascending
                                </option>
                                <option value="descending">
                                    descending
                                </option>
                            </select>
                        </div>   
                    </div>
                    {this.displayList()}   
                </div>
            </div>
        );
    }
}

SearchPage.propTypes = {
    data: PropTypes.array,
    search: PropTypes.string,
    sort: PropTypes.string,
    order: PropTypes.string
  }

export default SearchPage;