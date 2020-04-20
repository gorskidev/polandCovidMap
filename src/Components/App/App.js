import React from 'react';


import './App.css';

import Map from '../Map/Map'
import StatsDisplay from '../StatsDisplay/StatsDisplay'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showStats: false,
      focused: null,
      selected: [],
      comparison_infected: false,
      comparison_death_cases: false,
      stats: {
          podkarpackie: {
              infected: 263,
              death_cases: 16
          },
          malopolskie: {
              infected: 672,
              death_cases: 17
          },
          slaskie: {
              infected: 1496,
              death_cases: 74
          },
          dolnoslaskie: {
              infected: 1065,
              death_cases: 30
          },
          opolskie: {
              infected: 292,
              death_cases: 14
          },
          swietokrzyskie: {
              infected: 214,
              death_cases: 4
          },
          lubelskie: {
              infected: 311,
              death_cases: 10
          },
          lodzkie: {
              infected: 660,
              death_cases: 10
          },
          mazowieckie: {
              infected: 1992,
              death_cases: 108
          },
          wielkopolskie: {
              infected: 1034,
              death_cases: 53
          },
          lubuskie: {
              infected: 81,
              death_cases: 0
          },  
          kujawsko_pomorskie: {
              infected: 421,
              death_cases: 16
          },
          podlaskie: {
              infected: 324,
              death_cases: 3
          },
          zachodnio_pomorskie: {
              infected: 274,
              death_cases: 4
          },
          warminsko_mazurskie: {
              infected: 143,
              death_cases: 1
          },
          pomorskie: {
              infected: 211,
              death_cases: 2
          },
      }
    }
    
    this.addToSelected = this.addToSelected.bind(this)
    this.shouldShowStats = this.shouldShowStats.bind(this)
    this.setComparisonInfected = this.setComparisonInfected.bind(this)
    this.setComparisonDeathCases = this.setComparisonDeathCases.bind(this)
  }

  shouldShowStats(value, focused) {
    this.setState({
      showStats: value,
      focused: focused
    })
  }

  addToSelected(e) {
    const arr = this.state.selected
    if (arr.length < 2) {
      arr.push(e)
      this.setState({
        selected: arr
      })
    } else {
      arr.splice(0, 2)
      arr.push(e)
      this.setState({
        selected: arr
      })
    }
  }

  setComparisonInfected(value) {
    this.setState({
      comparison_infected: value
    })
  }

  setComparisonDeathCases(value) {
    this.setState({
      comparison_death_cases: value
    })
  }

  /*shouldComponentUpdate(nextState) {
    return this.state == nextState
  }*/

  sum(object, key) {
    let x = 0;
    for (const property in object) {
        x += object[property][key]
    }
    return x
  }

  render() {
    return (
      <div className="App">
        <div className="instructions">
          <p>Aby porównać województwa, kliknij kolejno na te które chcesz porównać.</p>
        </div>
        <div className="absolute">
          <p className="voivodeship-name">Polska</p>
          <p>Zakażonych łącznie: {this.sum(this.state.stats, "infected")}</p>
          <p>Zmarłych łącznie: {this.sum(this.state.stats, "death_cases")}</p>
        </div>
        <div className="map-container">
          <Map stats={this.state.stats} 
            showStats={this.state.showStats}
            shouldShowStats={this.shouldShowStats}
            focused={this.state.focused}
            addToSelected={this.addToSelected} 
            selected={this.state.selected}
            setComparisonInfected = {this.setComparisonInfected}
            setComparisonDeathCases = {this.setComparisonDeathCases}
          />
        </div>
        <StatsDisplay className="stats-container"
          voivodeship={this.state.focused}
          stats={this.state.stats}
          selected={this.state.selected}
          comparisonInfected={this.state.comparison_infected}
          comparisonDeathCases={this.state.comparison_death_cases}
        />
      </div>
    );
  }
}



export default App;
