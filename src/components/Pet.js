import React from 'react'

class Pet extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isAdopted: this.props.pet.isAdopted
    }
  }

  handleClick = () => {
    this.setState({
      isAdopted: true
    })
  }

    render() {
      return (
        <div className="card">
          <div className="content">
            <a className="header">
              { this.props.pet.gender === 'male' ? 
              '♂' :
              '♀'

            } 
              {/*'♀' OR '♂' */}
              {this.props.pet.name}
            </a>
            <div className="meta">
              <span className="date">{this.props.pet.type}</span>
            </div>
            <div className="description">
              <p>Age: {this.props.pet.age}</p>
              <p>Weight: {this.props.pet.weight} lbs</p>
            </div>
          </div>
          <div className="extra content">
            { this.state.isAdopted ?
            <button className="ui disabled button">Already adopted</button> :
            <button onClick={() => this.props.onAdoptPet(this.props.pet.id)} className="ui primary button">Adopt pet</button>
            }
          </div>
        </div>
      )
    }
  }

export default Pet
