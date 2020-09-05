import React, { Component } from 'react'
import { shuffle, first } from 'lodash'
import Select from 'react-select'
import './App.css'

class App extends Component {
  state = {
    arrayBox: [],
    colorCheckbox: '',
    colors: [{
      'label': 'red',
      'value': 1
    }, {
      'label': 'green',
      'value': 2
    }, {
      'label': 'yellow',
      'value': 3
    }, {
      'label': 'blue',
      'value': 4
    }, {
      'label': 'brown',
      'value': 5
    }, {
      'label': 'gray',
      'value': 6
    }, {
      'label': 'purple',
      'value': 7
    }, {
      'label': 'pink',
      'value': 8
    }],
    colorSelected: undefined,
  }

  componentDidMount(){
    this.handleBox()
  }

  // handle for random color box
  handleBox = () => {
    const { colors } = this.state
    const lengthBox = new Array(40)
    const boxs = []

    for(let ps = 0; ps < lengthBox.length; ps++){
      let colorSuffle = ''
      shuffle(colors).map(item => (
        colorSuffle = item.label 
      ))

      boxs.push({
        name: `Box-${ps}`,
        color: colorSuffle
      })
    }

    this.setState({ arrayBox: boxs })
  }

  // handle for filter color by select
  handleSelectColor = (data) => {
    this.setState({ colorSelected: data.label })
  }

  // handle for filter color by checkbox
  handleCheckboxColor = (data) => {
    const { colors } = this.state

    this.setState({
      colorCheckbox: data.target.checked ? first(shuffle(colors)).label : ''
    })
  }

  render(){
    const {
      arrayBox,
      colors,
      colorSelected,
      colorCheckbox
    } = this.state

    return (
      <div className="App">
        <h2>Gallery Random Box</h2>

        {/* Filter for color box */}

        <div className="filter-color">
          <div className="wrapper-select">
            <label>Filter Color:</label><br/>
            <Select
              value={colorSelected}
              options={colors}
              name='select-color'
              onChange={(e) => this.handleSelectColor(e)}
            />
          </div>
          <div>
            <input
              type="checkbox"
              name="darker"
              value="darker"
              onChange={(e) => this.handleCheckboxColor(e)}
            />
            <label>Darker</label>
          </div>
        </div>

        {/* Mapping color box */}

        <div className="wrapper-box">
          {
            arrayBox.map((item, index) => {
              return(
                <div
                  className="box"
                  style={{
                    background: `${ item.color }`,
                    borderColor: `${ item.color }`,
                    display: `${ colorSelected === item.color || !colorSelected ? 'block' : 'none' }`,
                    backgroundColor: `${ colorCheckbox === item.color ? 'rgba(0, 0, 0, 0.8)' : item.color }`
                  }}
                  key={Math.random()}
                >
                  <p>Box-{item.color}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
