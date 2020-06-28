import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  // this is a callback function that gets passed down to <Filter/> via props
  // and "Onclick" in child <Filter/> triggers this function & get passed back up to parents <App/>
  onFindPetsClick = () => {
    const filteredUrl = `/api/pets${this.state.filters.type === "all" ? "" : "?type=" + this.state.filters.type}`;
    fetch(filteredUrl)
      .then((response) => response.json())
      .then((petsData) => {
        this.setState({
          pets: petsData
        })
      })
  }
  // another callback function for <Filter/>
  onChangeType = (event) => {
    const petType = event.target.value
    this.setState({
      filters: {
        type: petType
      }
    })
  }

  onAdoptPet = (petId) => {
    const mappedPets = this.state.pets.map((pet) => {
      if (pet.id === petId) {
        return {...pet, isAdopted: true}
      } else {
        return pet
      }
    });
    this.setState({
      pets: mappedPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.onFindPetsClick} onChangeType={this.onChangeType} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
