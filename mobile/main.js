import Exponent, { Font } from 'exponent';
import React from 'react';
import { Navigator, AsyncStorage } from 'react-native';

import NavBar from './app/NavBar';
import Login from './app/Login';
import MealList from './app/MealList';
import Photo from './app/Photo';
import ActionButton from './app/ActionButton';
import Lobster from './assets/fonts/Lobster-Regular.ttf';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      token: null,
      mealList: [],
      searchRecipes: [],
      fontLoaded: false,
      spinner: false
    };
    this.getMealList = this.getMealList.bind(this);
    this.getToken = this.getToken.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.getSearchRecipes = this.getSearchRecipes.bind(this);
    this.getSpinnerState = this.getSpinnerState.bind(this);

    this.updateMealList = this.updateMealList.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.updateUserId = this.updateUserId.bind(this);
    this.updateSearchRecipes = this.updateSearchRecipes.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
  }

  getMealList() { return this.state.mealList; }
  getToken() { return this.state.token; }
  getUserId() { return this.state.userId; }
  getSearchRecipes() { return this.state.searchRecipes; }
  getSpinnerState() { return this.state.spinner; }

  async componentDidMount() {
    await Font.loadAsync({
      Lobster: Lobster,
    });

    this.setState({ fontLoaded: true });
  }

  updateMealList(mealList) { this.setState({ mealList }); }
  updateToken(token) { this.setState({ token }); }
  updateUserId(userId) { this.setState({ userId }); }
  updateSearchRecipes(searchRecipes) { this.setState({ searchRecipes }); }

  renderScene(route, navigator) {
    return (
      <route.component
        {...route.passProps}
        navigator={navigator}
        getMealList={this.getMealList}
        getToken={this.getToken}
        getUserId={this.getUserId}
        getSearchRecipes={this.getSearchRecipes}
        updateMealList={this.updateMealList}
        updateToken={this.updateToken}
        updateUserId={this.updateUserId}
        updateSearchRecipes={this.updateSearchRecipes}
        renderSpinner={this.renderSpinner}
        getSpinnerState={this.getSpinnerState}
      />
    );
  }

  renderSpinner(flag) {
    this.setState({spinner: flag});
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        // initialRoute={{ name: 'MealList', component: MealList }}
        initialRoute={{ name: 'Login', component: Login }}
        renderScene={this.renderScene}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        navigationBar={<NavBar navigator={this.navigator} getToken={this.getToken} renderSpinner={this.renderSpinner}/>}
      />
    );
  }
}

Exponent.registerRootComponent(App);

