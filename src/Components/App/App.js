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
              infected: 259,
              death_cases: 15
          },
          malopolskie: {
              infected: 630,
              death_cases: 16
          },
          slaskie: {
              infected: 1273,
              death_cases: 69
          },
          dolnoslaskie: {
              infected: 949,
              death_cases: 30
          },
          opolskie: {
              infected: 271,
              death_cases: 13
          },
          swietokrzyskie: {
              infected: 203,
              death_cases: 4
          },
          lubelskie: {
              infected: 293,
              death_cases: 10
          },
          lodzkie: {
              infected: 640,
              death_cases: 10
          },
          mazowieckie: {
              infected: 1936,
              death_cases: 107
          },
          wielkopolskie: {
              infected: 880,
              death_cases: 49
          },
          lubuskie: {
              infected: 81,
              death_cases: 0
          },  
          kujawsko_pomorskie: {
              infected: 398,
              death_cases: 16
          },
          podlaskie: {
              infected: 316,
              death_cases: 3
          },
          zachodnio_pomorskie: {
              infected: 249,
              death_cases: 2
          },
          warminsko_mazurskie: {
              infected: 139,
              death_cases: 1
          },
          pomorskie: {
              infected: 207,
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
