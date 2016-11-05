import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Block } from 'native-base';
import Button from './Button';
import PhotoButton from './PhotoButton';
import MealList from './MealList';
import AddMeal from './AddMeal';
import Photo from './Photo';
import utils from '../Utils/utils';
import PickRestaurant from './PickRestaurant';
import PhotoList from './PhotoList'


const moveTo = (navigator, component, ...props) => {
  navigator.replace({ component, props });
};

const gotoNext = (navigator, restaurants, date, token) => {
  navigator.replace({
    component: PickRestaurant,
    passProps: { restaurants, date, token }
  });
}




class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {spinner: false}
    console.log(props, 'props in navbar')
  }

  handlePhotoBtnClick(props, token) {
    const self = this;

    utils.getLocationAsync().then(loc => {
      utils.takePhotoAsync().then(photo => {
        if (!photo.cancelled) {
           props.renderSpinner(true)
           console.log(self.state.spinner);
           const date = Date.now();
           utils.postPhotoAndLocation(photo.uri, token, date, loc); 
           utils.getRestaurants(loc.coords.latitude, loc.coords.longitude, token).then( restaurants => {
              gotoNext(props.navigator, restaurants, date, token);
           })
        }
      })
    })
  } 


  render() {
    if (this.props.navigator.getCurrentRoutes().length > 1) {
      return (
        <View style={styles.margin}>
          <View style={styles.container}>
            <Button style={styles.side} icon="ios-list-box" onclick={() => moveTo(this.props.navigator, MealList)} />
            <PhotoButton icon="md-camera" onclick={() => this.handlePhotoBtnClick(this.props, this.props.getToken())}/>
            <Button style={styles.side} icon="ios-images" onclick={() => moveTo(this.props.navigator, PhotoList, this.props.getToken())} />
          </View>
        </View>      
      )    
    } else if (this.state.spinner) {
      return <View style={{flex: 1}}><Spinner color='blue'/></View>;
    } else {
      return null;
    }
  }
};

export default NavBar;

/************************ STYLES *************************/

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: 110,
    backgroundColor: 'white',
    borderColor: 'gray',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  margin: {
    marginTop: 5
  }
});
