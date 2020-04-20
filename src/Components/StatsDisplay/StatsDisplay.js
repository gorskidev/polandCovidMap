import React from 'react'

import { CSSTransitionGroup } from 'react-transition-group'


import './StatsDisplay.css'

function Comparison(props) {
    return (
        <div>   
            {
                (props.comparisonDeathCases !== false && props.comparisonInfected !== false && props.selected[0] && props.selected[1]) ? 
                <div>
                    <p className="comparison-title">
                        Porównuję {props.changeChar(props.toUpperCaseUpgraded(props.selected[0], "_"), "_", "-")} z {props.changeChar(props.toUpperCaseUpgraded(props.selected[1], "_"), "_", "-")}
                    </p>
                    <div>
                        {props.comparisonInfected ? <div><p className="nocases">{props.comparisonInfected}</p> <p className="legend">Różnica zakażeń</p></div> : null}
                    </div>
                    <div>
                        {props.comparisonDeathCases ? <div><p className="nocases">{props.comparisonDeathCases}</p> <p className="legend">Różnica ofiar śmiertelnych</p></div> : null}
                    </div>
                </div>
                    : null 
            }
        </div>
    )
}

class StatsDisplay extends React.Component {
    removeChar(string, char) {
        if (string.includes("-")) {
            let charIndex = string.indexOf(char)
            let newString = string.slice(0, charIndex) + string.slice(charIndex + 1, string.length)
            return newString
        }

        return string
    }

    toUpperCaseUpgraded(string, char) {
        if (string === "malopolskie") {
            string = "małopolskie"
        } else if (string === "slaskie") {
            string = "śląskie"
        } else if (string === "dolnoslaskie") {
            string = "dolnośląskie"
        } else if (string === "lodzkie") {
            string = "łódzkie"
        } else if (string === "warminsko-mazurskie") {
            string = "warmińsko-mazurskie"
        } else if (string === "swietokrzyskie") {
            string = "świętokrzyskie"
        }

        if (string.includes(char)) {
            let charIndex = string.indexOf(char)
            return string[0].toUpperCase() + string.slice(1, charIndex) + char + string[charIndex + 1].toUpperCase() + string.slice(charIndex + 2, string.length)
        }

        return string[0].toUpperCase() + string.slice(1, string.length)
    }

    changeChar(string, charToRemove, charToPut) {
        if (string.includes(charToRemove)) {
            let charIndex = string.indexOf(charToRemove)
            
            return string.slice(0, charIndex) + charToPut + string.slice(charIndex + 1, string.length)
        }

        return string
    }

    sum(object, key) {
        let x = 0;
        for (const property in object) {
            x += object[property][key]
        }
        return x
    }

    static defaultProps = {
        voivodeship: "Mazowieckie"
    }


    render() {
        const { voivodeship, stats } = this.props
        return (
            <div className="stats-container">
                <div className="stats">
                    <p className="voivodeship-name">{voivodeship ? this.toUpperCaseUpgraded(this.changeChar(voivodeship, "_", "-"), "-") : "Mazowieckie"}</p>
                    <p className="nocases">{voivodeship ? stats[this.removeChar(voivodeship, "_")].infected : stats[this.removeChar("mazowieckie", "_")].infected} </p>
                    <p className="legend"> Suma zakażeń</p>
                    <p className="nocases">{voivodeship ? stats[this.removeChar(voivodeship, "_")].death_cases : stats[this.removeChar("mazowieckie", "_")].death_cases} </p>
                    <p className="legend">Śmiertelne przypadki</p>
                    <CSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        <Comparison comparisonInfected={this.props.comparisonInfected} 
                            comparisonDeathCases={this.props.comparisonDeathCases}
                            selected={this.props.selected}
                            changeChar={this.changeChar}
                            toUpperCaseUpgraded={this.toUpperCaseUpgraded} 
                        />
                    </CSSTransitionGroup>
                </div>
            </div>
        )
    }
}

export default StatsDisplay