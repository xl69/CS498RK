import './App.css';
import React from 'react'
import SearchPage from './searchPage'
import GalleryPage from './galleryPage'
import axios from 'axios'
import PropTypes from 'prop-types';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      detailData: null,
      get: 0
    }
  }

   componentDidMount() {
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
        let detailData = []
        for(let i = 0; i < data.length; i++) {
            axios.get(data[i].url).then(
                response=>{
                  if(i=== 3) {
                    console.log(response.data)
                  }
                    let type1 = response.data.types[0].type.name
                    let spriteUrl = response.data.sprites.front_default
                    let spriteShinyUrl = response.data.sprites.front_shiny
                    let spriteUrlBack = response.data.sprites.back_default
                    let spriteShinyUrlBack = response.data.sprites.back_shiny

                    let stats_hp = response.data.stats[0].base_stat
                    let stats_attack = response.data.stats[1].base_stat
                    let stats_defense = response.data.stats[2].base_stat
                    let stats_special_attack = response.data.stats[3].base_stat
                    let stats_special_defense = response.data.stats[4].base_stat
                    let stats_speed = response.data.stats[5].base_stat

                    let type2 = null

                    if(response.data.types.length > 1) {
                        type2 = response.data.types[1].type.name
                    }
                    data[i].type1 = type1
                    data[i].type2 = type2
                    data[i].spriteUrl = spriteUrl
                    data[i].spriteShinyUrl = spriteShinyUrl
                    data[i].spriteUrlBack = spriteUrlBack
                    data[i].spriteShinyUrlBack = spriteShinyUrlBack
                    data[i].stats_hp = "hp: " + String(stats_hp)
                    data[i].stats_attack = "attack: " + String(stats_attack)
                    data[i].stats_defense = "defense: " + String(stats_defense)
                    data[i].stats_special_attack = "special attack: " + String(stats_special_attack)
                    data[i].stats_special_defense = "special defense: " + String(stats_special_defense)
                    data[i].stats_speed = "speed: " + String(stats_speed)

                    let detail = "/details/" + String(i+1)
                    let prev = null
                    if(i > 0) {
                      prev = "/details/" + String(i)
                    } else {
                      prev = "/details/" + String(1118)
                    }

                    let next = null
                    if(i < 1117) {
                      next = "/details/" + String(i+2)
                    } else {
                      next = "/details/" + String(1)
                    }
                    detailData.push(
                      <Route path = {detail}>
                        <div className = "detailPage">
                          <div className = "half">
                            <div className = "picContainer">
                              <div className = "normal">
                                <img alt = "sprite" src = {data[i].spriteUrl} className = "pic"/>
                                <img alt = "spriteBack" src = {data[i].spriteUrlBack} className = "pic"/>
                              </div>
                              <div className = "shiny">
                                <img alt = "spriteShiny" src = {data[i].spriteShinyUrl} className = "pic"/>
                                <img alt = "spriteShinyBack" src = {data[i].spriteShinyUrlBack} className = "pic"/>
                              </div>
                            </div>
                            <div className = "nameIndex">
                              <div className = "index">{data[i].index}</div>
                              <div className = "name">{data[i].name}</div>
                            </div>
                          </div>
                          <div className = "half">
                            <div className = "statsContainer">
                              <div className = "stats">{data[i].stats_hp}</div>
                              <div className = "stats">{data[i].stats_attack}</div>
                              <div className = "stats">{data[i].stats_defense}</div>
                              <div className = "stats">{data[i].stats_special_attack}</div>
                              <div className = "stats">{data[i].stats_special_defense}</div>
                              <div className = "stats">{data[i].stats_speed}</div>
                            </div>
                            <div className = "typeContainer">
                              <div className = "type">{data[i].type1}</div>
                              <div className = "type">{data[i].type2}</div>
                            </div>
                          </div>
                          

                          <div className = "linkButton" id = "left">
                            <Link className = "linkContent" to = {prev}>Previous</Link>
                          </div>
                          <div className = "linkButton" id = "right">
                            <Link className = "linkContent" to = {next}>Next</Link>
                          </div>
                        </div>
                      </Route>
                    )
                    this.setState({ data: data})
                    this.setState({detailData: detailData})
                  }
              )
        }
        }); 
  }


  handlePageChange = (page) => {
    this.setState({
      viewType: page,
    });
  } 
  
  render() {
    return (
      <Router className="App">
        <div className = "title">POKEMON INDEX</div>
        <div className = "viewType">
          <div className = "viewOption">
            <Link to="/list" className = "button">Search</Link>
          </div>
          <div className = "viewOption">
            <Link to="/gallery" className = "button">Gallery</Link>
          </div>
        </div>
        <Switch>
          <Route exact path = "/list" >
            <SearchPage data = {this.state.data}/>
          </Route>
          <Route path = "/gallery">
            <GalleryPage data = {this.state.data}/>
          </Route>
          <Route path = "/details">
            <div className = "details">
              <Switch>
                {this.state.detailData}
              </Switch> 
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  data: PropTypes.array,
  detailData: PropTypes.array,
  get: PropTypes.number
}

export default App;
