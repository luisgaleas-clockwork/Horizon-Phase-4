import React from 'react';
import Cover from '../Components/Products/Cover';
import PHeader from '../Components/Products/Product_header'
import Filter from '../Components/Products/FilterButtons'

class Product extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      album: [],
      genre: "none"
    }

    this.musicGenre = (e) => {
      console.log('VALUE CHANGED', e.target.value)
      this.setState({ genre: e.target.value }, () => {
        console.log('HEY, IM INSIDE THE CALLBACK AFTER SETSTATE', this.state.genre)
      })
    }
    this.none = () => {
      fetch("/api/product")
        .then((response) => {
          console.log('response - ', response);
          return response.json();
        }
        ).then((jsonData) => {
          return jsonData.data;
        }
        ).then((jsonStr) => {
          this.setState({ album: jsonStr });
          console.log(this.state)
        }).catch((e) => console.log('error - ', e));
    }

    this.high = () => {
      fetch("/api/productfilter?maxp")
        .then((response) => {
          console.log('response - ', response);
          return response.json();
        }
        ).then((jsonData) => {
          return jsonData.data;
        }
        ).then((jsonStr) => {
          this.setState({ album: jsonStr });
          console.log(this.state)
        }).catch((e) => console.log('error - ', e));
    }
    this.low = () => {
      fetch("/api/productfilter?minp")
        .then((response) => {
          console.log('response - ', response);
          return response.json();
        }
        ).then((jsonData) => {
          return jsonData;
        }
        ).then((jsonStr) => {
          this.setState({ album: jsonStr });
          console.log(this.state)
        }).catch((e) => console.log('error - ', e));
    }
  }

  componentDidMount() {
    fetch("/product")
      .then((response) => {
        console.log('response - ', response);
        return response.json();
      }
      ).then((jsonData) => {
        return jsonData;
      }
      ).then((jsonStr) => {
        this.setState({ album: jsonStr });
        console.log(this.state)
      }).catch((e) => console.log('error - ', e));
  }

  render() {
    return (
      <div className="App">
        <PHeader />
        <Filter
          none={this.none}
          high={this.high}
          low={this.low}
          genre={this.musicGenre}
        />
        <div className="cover__container">
          {this.state.album.map((info) => {
            return <Cover 
            info={info} 
            state={this.state} 
            click={this.click} />
          })}
        </div>
      </div>
    );
  }
}

export default Product