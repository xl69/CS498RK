import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class GalleryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            type: null,
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
                        'type2': null,
                        'spriteUrl': null
                    })
                }
                for(let i = 0; i < data.length; i++) {
                    axios.get(data[i].url).then(
                        response=>{
                            let type1 = response.data.types[0].type.name
                            let type2 = null
                            let spriteUrl = response.data.sprites.front_default
                            // console.log(response.data.types)
                            if(response.data.types.length > 1) {
                                type2 = response.data.types[1].type.name
                                console.log(type2)
                            }
                            data[i].type1 = type1
                            data[i].type2 = type2
                            data[i].spriteUrl = spriteUrl
                            this.setState({ data: data})
                        }
                    )
                }
                });
        }
    }

    handleTypeClicker = (type) => {
        this.setState({
            type: type
        })
    }

    getTypeData = (type) => {
        if(this.state.type === "All") {
            return this.state.data;
        } else if(this.state.type === "Normal") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "normal" || data[i].type2 === "normal") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Fire") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "fire" || data[i].type2 === "fire") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Water") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "water" || data[i].type2 === "water") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Grass") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "grass" || data[i].type2 === "grass") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Flying") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "flying" || data[i].type2 === "flying") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Fighting") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "fighting" || data[i].type2 === "fighting") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Poison") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "poison" || data[i].type2 === "poison") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Electric") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "electric" || data[i].type2 === "electric") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Ground") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "ground" || data[i].type2 === "ground") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Rock") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "rock" || data[i].type2 === "rock") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Psychic") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "psychic" || data[i].type2 === "psychic") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Ice") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "ice" || data[i].type2 === "ice") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Bug") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "bug" || data[i].type2 === "bug") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Ghost") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "ghost" || data[i].type2 === "ghost") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Steel") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "steel" || data[i].type2 === "steel") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Dragon") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "dragon" || data[i].type2 === "dragon") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Dark") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "dark" || data[i].type2 === "dark") {
                    typeData.push(data[i])
                }
            }
            return typeData
        } else if(this.state.type === "Fairy") {
            let data = this.state.data
            let typeData = []
            for(let i = 0; i < data.length; i++) {
                if(data[i].type1 === "fairy" || data[i].type2 === "fairy") {
                    typeData.push(data[i])
                }
            }
            return typeData
        }
    }

    displayView = (type) => {
        let data = this.getTypeData(this.state.type);
        var newData = []
        if(data) {
            for(let i = 0; i < data.length; i++) {
                let url = "/details/"+String(data[i].index)
                newData.push(
                    <Link className = "pokemonBox" to = {url}>
                        <div className = "pokemonBoxInfo">{data[i].index}</div>
                        <div className = "pokemonBoxInfo">{data[i].name}</div>
                        <div className = "pokemonBoxInfo">{data[i].type1}</div>
                        <div className = "pokemonBoxInfo">{data[i].type2}</div>
                        <img src = {data[i].spriteUrl} alt = "pic" />
                    </Link>
                )
            }
            return (
                <div className = "typeBox">
                    {newData}
                </div>
            )
        }
        return (
            <div>
                Please select a type
            </div>
        )
    }


    render() {
        return (
            <div className = "galleryPage">
                <div className = "types">
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("All")}}>All</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Normal")}}>Normal</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Fire")}}>Fire</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Water")}}>Water</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Grass")}}>Grass</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Flying")}}>Flying</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Fighting")}}>Fighting</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Poison")}}>Poison</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Electric")}}>Electric</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Ground")}}>Ground</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Rock")}}>Rock</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Psychic")}}>Psychic</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Ice")}}>Ice</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Bug")}}>Bug</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Ghost")}}>Ghost</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Steel")}}>Steel</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Dragon")}}>Dragon</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Dark")}}>Dark</span>
                    <span className = "type" onClick = {()=>{this.handleTypeClicker("Fairy")}}>Fairy</span>
                </div>
                {this.displayView(this.state.type)}
            </div>
        );
    }
}

GalleryPage.propTypes = {
    data: PropTypes.array,
    type: PropTypes.string
  }

export default GalleryPage;