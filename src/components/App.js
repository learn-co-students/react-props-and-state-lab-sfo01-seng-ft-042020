import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === 'all') {
    fetch('/api/pets')
      .then(res => res.json())
      .then(data => {
        this.setState({
          pets: data
        })
      })
      .catch(err => console.log("there was an error: ", err))
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            pets: data
          })
        })
        .catch(err => console.log("there was an error: ", err))
    }
  }

  onChangeType = (event) => {
    const petType = event.target.value;

    this.setState({
      filters: {
        type: petType,
      },
    });
  };

  onAdoptPet = (petId) => {
    const currentPets = this.state.pets 
    const newPets = currentPets.map((pet) => {
      if (pet.id === petId) {
        return { ...pet, isAdopted: true };
      } else {
        return pet;
      }
    });
    this.setState({ pets: newPets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onFindPetsClick={this.onFindPetsClick}
                onChangeType={this.onChangeType}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;