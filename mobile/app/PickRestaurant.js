import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from './Header';
import { Container, Content, List, ListItem, Thumbnail, Spinner } from 'native-base';
import utils from '../Utils/utils';
import PickMenuItem from './PickMenuItem';
import LogoTile from './LogoTile';
import Promises from 'bluebird';


const gotoNext = (navigator, menu, date, token) => {
  navigator.replace({
    component: PickMenuItem,
    passProps: { menu, date, token },
  });
}

const onRestaurantPick = (props, restaurant) => {
    utils.getRestaurantMenu(restaurant.name, props.date, props.token)

    .then((menu) => {
      console.log('menu')
      gotoNext(props.navigator, menu, props.date, props.token)
    })
}

class PickRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    }
    
    console.log(props, 'from pick restaurant')
  }

  componentWillMount() {
    Promise.all(this.props.restaurants.map(restaurant => utils.getRestaurantLogo(restaurant)))
    .then(logos => {
      let restaurants = logos.map( (logo, index) => { 
        return { logo: logo.value[0].contentUrl, name: this.props.restaurants[index] } 
      });
      this.props.renderSpinner(false);
      this.setState({ restaurants });
    })
  }



  render() {
    if (this.props.getSpinnerState() === false) {
      return (
        <View style={styles.container}>
          <Header title={'Pick.Restaurant'} backBtn={true}/>
          <ScrollView
            contentContainerStyle={styles.conatiner}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical
          >

              {this.state.restaurants.map( (restaurant, i) => (
                  <LogoTile 
                    image={restaurant ? restaurant.logo : null} 
                    key={i} 
                    restaurant={restaurant} 
                    onRestaurantPick={() => onRestaurantPick(this.props, restaurant)} >
                  </LogoTile>  
              ))}
          </ScrollView>
          
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Header title={'Pick.Restaurant'} backBtn={true}/>

          <View style={styles.spinner}>
            <Spinner color='blue'/>
          </View>

        </View>
      )
    }
  }
}

export default PickRestaurant;

/************************ STYLES *************************/

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'stretch',
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 60,
  },
  icon: {
    position: 'absolute',
    top: 100,
    right: 25
  },
  text: {
    paddingTop: 5,
    paddingBottom: 5
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});