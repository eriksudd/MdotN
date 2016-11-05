import React from 'react';
import { StyleSheet, View, ScrollView, Text} from 'react-native';
import MealTile from './MealTile';
import Header from './Header';
import ActionButton from './ActionButton'
import IP from '../Utils/IP';
import InfoDisplay from './InfoDisplay';
import { Spinner } from 'native-base'

const localUserUrl = IP.localUserUrl;
const localMealUrl = IP.localMealUrl;

class MealList extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.postMeal = this.postMeal.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    console.log('props from MealList', props)
  }

  componentWillMount() {
    this.getData();
  }

  getData(cb) {
    fetch(localUserUrl + this.props.getUserId(), {
      method: 'GET',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then((res) => {
      if (res) {
        res.json();
      }
    })
    .then((data) => {
      this.props.updateMealList(testData.mealsObjs);
    }).done(() => {
      if (cb) { cb(); }
    });
  }

  postMeal(recipeId, mealId) {
    fetch(localMealUrl + mealId, {
      method: 'DELETE',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(() => {
      this.getData(() => this.props.navigator.pop());
    });
  }

  gotoNext(recipe, mealId) {
    this.props.navigator.push({
      component: InfoDisplay,
      passProps: {
        recipe,
        mealId,
        postMeal: this.postMeal,
        text: 'Remove',
      },
    });
  }

  render() {
    if (this.props.getSpinnerState() === false) {
      return (
        <View style={styles.container}>
          <Header title={'Meal.Next'}/>
          <ScrollView
            contentContainerStyle={styles.conatiner}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical
          >
            {this.props.getMealList().map((meal, i) => (
              <MealTile
                recipe={meal.recipe}
                showInfo={() => this.gotoNext(meal.recipe)}
                key={i}
                mealId={meal._id} // eslint-disable-line no-underscore-dangle
              />
            ))}
          </ScrollView>

          <ActionButton navigator={this.props.navigator} />

      </View>
      );
    } else {
      return (
        <View style={styles.spinner}>
            <Text>Getting restaurant info...</Text>
            <Spinner color='blue'/>
        </View>
      )
    } 
  }
};

export default MealList

/************************ STYLES *************************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white'
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});


const testData = {"_id":"58191b5dc71d8befa65db1aa","salt":"$2a$10$2gvTBRlmzzOGtTnmX3gRJO","username":"carlos","password":"$2a$10$2gvTBRlmzzOGtTnmX3gRJOniWOxvVduOX3rNnzUnH81hxnuA8q0H6","__v":0,"shoppingList":[],"mealsObjs":[{"recipe":{"__v":0,"q":"Steak","totalDaily":{"ENERC_KCAL":{"label":"Energy","unit":"%","sub":[],"_id":"58191b83c71d8befa65db2a6"},"FASAT":{"label":"Saturated","unit":"%","sub":[],"_id":"58191b83c71d8befa65db2a5"},"CHOCDF":{"label":"Carbs","unit":"%","sub":[],"_id":"58191b83c71d8befa65db2a4"},"FIBTG":{"label":"Fiber","unit":"%","sub":[],"_id":"58191b83c71d8befa65db2a3"},"PROCNT":{"label":"Protein","unit":"%","sub":[],"_id":"58191b83c71d8befa65db2a2"},"FE":{"label":"Iron","unit":"%","sub":[],"_id":"58191b83c71d8befa65db2a1"},"ZN":{"label":"Zinc","unit":"%","sub":[],"_id":"58191b83c71d8befa65db2a0"},"P":{"label":"Phosphorus","unit":"%","sub":[],"_id":"58191b83c71d8befa65db29f"},"VITA_RAE":{"label":"Vitamin A","unit":"%","sub":[],"_id":"58191b83c71d8befa65db29e"},"VITC":{"label":"Vitamin C","unit":"%","sub":[],"_id":"58191b83c71d8befa65db29d"},"THIA":{"label":"Thiamin (B1)","unit":"%","sub":[],"_id":"58191b83c71d8befa65db29c"},"RIBF":{"label":"Riboflavin (B2)","unit":"%","sub":[],"_id":"58191b83c71d8befa65db29b"},"NIA":{"label":"Niacin (B3)","unit":"%","sub":[],"_id":"58191b83c71d8befa65db29a"},"VITB6A":{"label":"Vitamin B6","unit":"%","sub":[],"_id":"58191b83c71d8befa65db299"},"FOL":{"label":"Folic Acid (B9)","unit":"%","sub":[],"_id":"58191b83c71d8befa65db298"},"TOCPHA":{"label":"Vitamin E","unit":"%","sub":[],"_id":"58191b83c71d8befa65db297"},"VITK1":{"label":"Vitamin K","unit":"%","sub":[],"_id":"58191b83c71d8befa65db296"},"_id":"58191b83c71d8befa65db295"},"totalNutrients":{"ENERC_KCAL":{"label":"Energy","unit":"kcal","sub":[],"_id":"58191b83c71d8befa65db2b8"},"FASAT":{"label":"Saturated","unit":"g","sub":[],"_id":"58191b83c71d8befa65db2b7"},"CHOCDF":{"label":"Carbs","unit":"g","sub":[],"_id":"58191b83c71d8befa65db2b6"},"FIBTG":{"label":"Fiber","unit":"g","sub":[],"_id":"58191b83c71d8befa65db2b5"},"PROCNT":{"label":"Protein","unit":"g","sub":[],"_id":"58191b83c71d8befa65db2b4"},"FE":{"label":"Iron","unit":"mg","sub":[],"_id":"58191b83c71d8befa65db2b3"},"ZN":{"label":"Zinc","unit":"mg","sub":[],"_id":"58191b83c71d8befa65db2b2"},"P":{"label":"Phosphorus","unit":"mg","sub":[],"_id":"58191b83c71d8befa65db2b1"},"VITA_RAE":{"label":"Vitamin A","unit":"µg_RAE","sub":[],"_id":"58191b83c71d8befa65db2b0"},"VITC":{"label":"Vitamin C","unit":"mg","sub":[],"_id":"58191b83c71d8befa65db2af"},"THIA":{"label":"Thiamin (B1)","unit":"mg","sub":[],"_id":"58191b83c71d8befa65db2ae"},"RIBF":{"label":"Riboflavin (B2)","unit":"mg","sub":[],"_id":"58191b83c71d8befa65db2ad"},"NIA":{"label":"Niacin (B3)","unit":"mg","sub":[],"_id":"58191b83c71d8befa65db2ac"},"VITB6A":{"label":"Vitamin B6","unit":"mg","sub":[],"_id":"58191b83c71d8befa65db2ab"},"FOL":{"label":"Folic Acid (B9)","unit":"µg","sub":[],"_id":"58191b83c71d8befa65db2aa"},"TOCPHA":{"label":"Vitamin E","unit":"mg","sub":[],"_id":"58191b83c71d8befa65db2a9"},"VITK1":{"label":"Vitamin K","unit":"µg","sub":[],"_id":"58191b83c71d8befa65db2a8"},"_id":"58191b83c71d8befa65db2a7"},"totalWeight":730.175,"calories":1631.9139999999998,"yield":2,"shareAs":"http://www.edamam.com/recipe/triple-pepper-t-bone-steaks-2a172e701bd9e88de5575cbe72b16c86/steak","url":"http://www.bonappetit.com/recipes/1999/07/triple_pepper_t_bone_steaks","sourceIcon":"http://www.bonappetit.com/favicon.ico","source":"Bon Appetit","image":"https://www.edamam.com/web-img/978/9786dfa24b198b2acc41ed7fcb5dd8e9.jpg","label":"Triple-Pepper T-Bone Steaks","uri":"http://www.edamam.com/ontologies/edamam.owl#recipe_2a172e701bd9e88de5575cbe72b16c86","_id":"58191b83c71d8befa65db277","digest":[{"label":"Fat","tag":"FAT","schemaOrgTag":"fatContent","total":114.68479749999997,"hasRDI":true,"daily":176.43814999999995,"unit":"g","_id":"58191b83c71d8befa65db290","sub":[{"label":"Saturated","tag":"FASAT","schemaOrgTag":"saturatedFatContent","total":45.658649999999994,"hasRDI":true,"daily":228.29325,"unit":"g","_id":"58191b83c71d8befa65db294","sub":[]},{"label":"Trans","tag":"FATRN","schemaOrgTag":"transFatContent","total":6.19164,"hasRDI":false,"daily":0,"unit":"g","_id":"58191b83c71d8befa65db293","sub":[]},{"label":"Monounsaturated","tag":"FAMS","schemaOrgTag":null,"total":50.86013249999999,"hasRDI":false,"daily":0,"unit":"g","_id":"58191b83c71d8befa65db292","sub":[]},{"label":"Polyunsaturated","tag":"FAPU","schemaOrgTag":null,"total":4.2905475,"hasRDI":false,"daily":0,"unit":"g","_id":"58191b83c71d8befa65db291","sub":[]}]},{"label":"Carbs","tag":"CHOCDF","schemaOrgTag":"carbohydrateContent","total":12.5808925,"hasRDI":true,"daily":4.193630833333334,"unit":"g","_id":"58191b83c71d8befa65db28c","sub":[{"label":"Carbs (net)","tag":"CHOCDF.net","schemaOrgTag":null,"total":10.5053425,"hasRDI":false,"daily":0,"unit":"g","_id":"58191b83c71d8befa65db28f","sub":[]},{"label":"Fiber","tag":"FIBTG","schemaOrgTag":"fiberContent","total":2.07555,"hasRDI":true,"daily":8.3022,"unit":"g","_id":"58191b83c71d8befa65db28e","sub":[]},{"label":"Sugars","tag":"SUGAR","schemaOrgTag":"sugarContent","total":4.218845,"hasRDI":false,"daily":0,"unit":"g","_id":"58191b83c71d8befa65db28d","sub":[]}]},{"label":"Protein","tag":"PROCNT","schemaOrgTag":"proteinContent","total":129.71248749999998,"hasRDI":true,"daily":259.42497499999996,"unit":"g","_id":"58191b83c71d8befa65db28b","sub":[]},{"label":"Cholesterol","tag":"CHOLE","schemaOrgTag":"cholesterolContent","total":421.84799999999996,"hasRDI":true,"daily":140.61599999999999,"unit":"mg","_id":"58191b83c71d8befa65db28a","sub":[]},{"label":"Sodium","tag":"NA","schemaOrgTag":"sodiumContent","total":1061.6685,"hasRDI":true,"daily":44.2361875,"unit":"mg","_id":"58191b83c71d8befa65db289","sub":[]},{"label":"Calcium","tag":"CA","schemaOrgTag":null,"total":79.0955,"hasRDI":true,"daily":7.90955,"unit":"mg","_id":"58191b83c71d8befa65db288","sub":[]},{"label":"Magnesium","tag":"MG","schemaOrgTag":null,"total":155.30649999999997,"hasRDI":true,"daily":38.82662499999999,"unit":"mg","_id":"58191b83c71d8befa65db287","sub":[]},{"label":"Potassium","tag":"K","schemaOrgTag":null,"total":2300.5379999999996,"hasRDI":true,"daily":65.72965714285714,"unit":"mg","_id":"58191b83c71d8befa65db286","sub":[]},{"label":"Iron","tag":"FE","schemaOrgTag":null,"total":15.851395,"hasRDI":true,"daily":88.06330555555556,"unit":"mg","_id":"58191b83c71d8befa65db285","sub":[]},{"label":"Zinc","tag":"ZN","schemaOrgTag":null,"total":22.301255,"hasRDI":true,"daily":148.67503333333335,"unit":"mg","_id":"58191b83c71d8befa65db284","sub":[]},{"label":"Phosphorus","tag":"P","schemaOrgTag":null,"total":1201.04325,"hasRDI":true,"daily":171.57760714285715,"unit":"mg","_id":"58191b83c71d8befa65db283","sub":[]},{"label":"Vitamin A","tag":"VITA_RAE","schemaOrgTag":null,"total":20.55675,"hasRDI":true,"daily":2.2840833333333337,"unit":"µg","_id":"58191b83c71d8befa65db282","sub":[]},{"label":"Vitamin C","tag":"VITC","schemaOrgTag":null,"total":8.825500000000002,"hasRDI":true,"daily":14.70916666666667,"unit":"mg","_id":"58191b83c71d8befa65db281","sub":[]},{"label":"Thiamin (B1)","tag":"THIA","schemaOrgTag":null,"total":0.69876,"hasRDI":true,"daily":46.584,"unit":"mg","_id":"58191b83c71d8befa65db280","sub":[]},{"label":"Riboflavin (B2)","tag":"RIBF","schemaOrgTag":null,"total":1.2031075,"hasRDI":true,"daily":70.7710294117647,"unit":"mg","_id":"58191b83c71d8befa65db27f","sub":[]},{"label":"Niacin (B3)","tag":"NIA","schemaOrgTag":null,"total":25.073614999999997,"hasRDI":true,"daily":125.36807499999998,"unit":"mg","_id":"58191b83c71d8befa65db27e","sub":[]},{"label":"Vitamin B6","tag":"VITB6A","schemaOrgTag":null,"total":2.6557774999999997,"hasRDI":true,"daily":132.788875,"unit":"mg","_id":"58191b83c71d8befa65db27d","sub":[]},{"label":"Folic Acid (B9)","tag":"FOL","schemaOrgTag":null,"total":46.669,"hasRDI":true,"daily":11.66725,"unit":"µg","_id":"58191b83c71d8befa65db27c","sub":[]},{"label":"Vitamin B12","tag":"VITB12","schemaOrgTag":null,"total":18.77904,"hasRDI":true,"daily":312.984,"unit":"µg","_id":"58191b83c71d8befa65db27b","sub":[]},{"label":"Vitamin D","tag":"VITD","schemaOrgTag":null,"total":0.6804,"hasRDI":true,"daily":0.17010000000000003,"unit":"µg","_id":"58191b83c71d8befa65db27a","sub":[]},{"label":"Vitamin E","tag":"TOCPHA","schemaOrgTag":null,"total":2.4330775,"hasRDI":true,"daily":12.1653875,"unit":"mg","_id":"58191b83c71d8befa65db279","sub":[]},{"label":"Vitamin K","tag":"VITK1","schemaOrgTag":null,"total":17.649725,"hasRDI":true,"daily":22.06215625,"unit":"µg","_id":"58191b83c71d8befa65db278","sub":[]}],"ingredients":[{"text":"2 1/2 tablespoons bottled steak sauce","quantity":2.5,"measure":"tbsp","food":"steak sauce","weight":42.5,"_id":"58191b83c71d8befa65db2be"},{"text":"1 1/2 tablespoons chopped fresh thyme","quantity":1.5,"measure":"tbsp","food":"fresh thyme","weight":3.6,"_id":"58191b83c71d8befa65db2bd"},{"text":"1 teaspoon drained green peppercorns in brine, chopped","quantity":1,"measure":"tsp","food":"peppercorns","weight":2.3,"_id":"58191b83c71d8befa65db2bc"},{"text":"1/2 teaspoon cracked black pepper","quantity":0.5,"measure":"tsp","food":"black pepper","weight":1.15,"_id":"58191b83c71d8befa65db2bb"},{"text":"1/8 teaspoon cayenne pepper","quantity":0.125,"measure":"tsp","food":"cayenne pepper","weight":0.225,"_id":"58191b83c71d8befa65db2ba"},{"text":"2 t-bone steaks (each about 12 ounces)","quantity":24,"measure":"oz","food":"t bone steak","weight":680.4,"_id":"58191b83c71d8befa65db2b9"}],"ingredientLines":["2 1/2 tablespoons bottled steak sauce","1 1/2 tablespoons chopped fresh thyme","1 teaspoon drained green peppercorns in brine, chopped","1/2 teaspoon cracked black pepper","1/8 teaspoon cayenne pepper","2 t-bone steaks (each about 12 ounces)"],"cautions":[],"healthLabels":["Dairy-Free","Gluten-Free","Egg-Free","Peanut-Free","Tree-Nut-Free","Soy-Free","Fish-Free","Shellfish-Free"],"dietLabels":["Low-Carb"]},"_id":"58191cf3c71d8befa65db5ce","updatedAt":"2016-11-01T22:53:39.609Z","createdAt":"2016-11-01T22:53:39.609Z","userId":"58191b5dc71d8befa65db1aa","recipeId":"58191b83c71d8befa65db277","haveIngredient":false,"__v":0},{"recipe":{"__v":0,"q":"Spaghetti","totalDaily":{"ENERC_KCAL":{"label":"Energy","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7b4"},"FASAT":{"label":"Saturated","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7b3"},"CHOCDF":{"label":"Carbs","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7b2"},"FIBTG":{"label":"Fiber","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7b1"},"PROCNT":{"label":"Protein","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7b0"},"FE":{"label":"Iron","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7af"},"ZN":{"label":"Zinc","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7ae"},"P":{"label":"Phosphorus","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7ad"},"VITA_RAE":{"label":"Vitamin A","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7ac"},"VITC":{"label":"Vitamin C","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7ab"},"THIA":{"label":"Thiamin (B1)","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7aa"},"RIBF":{"label":"Riboflavin (B2)","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7a9"},"NIA":{"label":"Niacin (B3)","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7a8"},"VITB6A":{"label":"Vitamin B6","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7a7"},"FOL":{"label":"Folic Acid (B9)","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7a6"},"TOCPHA":{"label":"Vitamin E","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7a5"},"VITK1":{"label":"Vitamin K","unit":"%","sub":[],"_id":"58191de5c71d8befa65db7a4"},"_id":"58191de5c71d8befa65db7a3"},"totalNutrients":{"ENERC_KCAL":{"label":"Energy","unit":"kcal","sub":[],"_id":"58191de5c71d8befa65db7c6"},"FASAT":{"label":"Saturated","unit":"g","sub":[],"_id":"58191de5c71d8befa65db7c5"},"CHOCDF":{"label":"Carbs","unit":"g","sub":[],"_id":"58191de5c71d8befa65db7c4"},"FIBTG":{"label":"Fiber","unit":"g","sub":[],"_id":"58191de5c71d8befa65db7c3"},"PROCNT":{"label":"Protein","unit":"g","sub":[],"_id":"58191de5c71d8befa65db7c2"},"FE":{"label":"Iron","unit":"mg","sub":[],"_id":"58191de5c71d8befa65db7c1"},"ZN":{"label":"Zinc","unit":"mg","sub":[],"_id":"58191de5c71d8befa65db7c0"},"P":{"label":"Phosphorus","unit":"mg","sub":[],"_id":"58191de5c71d8befa65db7bf"},"VITA_RAE":{"label":"Vitamin A","unit":"µg_RAE","sub":[],"_id":"58191de5c71d8befa65db7be"},"VITC":{"label":"Vitamin C","unit":"mg","sub":[],"_id":"58191de5c71d8befa65db7bd"},"THIA":{"label":"Thiamin (B1)","unit":"mg","sub":[],"_id":"58191de5c71d8befa65db7bc"},"RIBF":{"label":"Riboflavin (B2)","unit":"mg","sub":[],"_id":"58191de5c71d8befa65db7bb"},"NIA":{"label":"Niacin (B3)","unit":"mg","sub":[],"_id":"58191de5c71d8befa65db7ba"},"VITB6A":{"label":"Vitamin B6","unit":"mg","sub":[],"_id":"58191de5c71d8befa65db7b9"},"FOL":{"label":"Folic Acid (B9)","unit":"µg","sub":[],"_id":"58191de5c71d8befa65db7b8"},"TOCPHA":{"label":"Vitamin E","unit":"mg","sub":[],"_id":"58191de5c71d8befa65db7b7"},"VITK1":{"label":"Vitamin K","unit":"µg","sub":[],"_id":"58191de5c71d8befa65db7b6"},"_id":"58191de5c71d8befa65db7b5"},"totalWeight":861.8338929649826,"calories":1838.7685599999998,"yield":4,"shareAs":"http://www.edamam.com/recipe/spaghetti-with-raw-tomatoes-recipe-5fe35e7fa9b2ff81e2c47911305c7915/spaghetti","url":"http://leitesculinaria.com/46305/recipes-spaghetti-raw-tomato-sauce.html","sourceIcon":"http://leitesculinari.wpengine.netdna-cdn.com/wp-content/themes/leitesv3/images/favicon.ico","source":"Leite's Culinaria","image":"https://www.edamam.com/web-img/405/4058ab3e82bf43cd82ac0f8ec868c0d0.jpg","label":"Spaghetti with Raw Tomatoes Recipe","uri":"http://www.edamam.com/ontologies/edamam.owl#recipe_5fe35e7fa9b2ff81e2c47911305c7915","_id":"58191de5c71d8befa65db785","digest":[{"label":"Fat","tag":"FAT","schemaOrgTag":"fatContent","total":60.204004,"hasRDI":true,"daily":92.62154461538461,"unit":"g","_id":"58191de5c71d8befa65db79e","sub":[{"label":"Saturated","tag":"FASAT","schemaOrgTag":"saturatedFatContent","total":8.5097584,"hasRDI":true,"daily":42.548792000000006,"unit":"g","_id":"58191de5c71d8befa65db7a2","sub":[]},{"label":"Trans","tag":"FATRN","schemaOrgTag":"transFatContent","total":0,"hasRDI":false,"daily":0,"unit":"g","_id":"58191de5c71d8befa65db7a1","sub":[]},{"label":"Monounsaturated","tag":"FAMS","schemaOrgTag":null,"total":40.1393176,"hasRDI":false,"daily":0,"unit":"g","_id":"58191de5c71d8befa65db7a0","sub":[]},{"label":"Polyunsaturated","tag":"FAPU","schemaOrgTag":null,"total":8.0118936,"hasRDI":false,"daily":0,"unit":"g","_id":"58191de5c71d8befa65db79f","sub":[]}]},{"label":"Carbs","tag":"CHOCDF","schemaOrgTag":"carbohydrateContent","total":275.7066688,"hasRDI":true,"daily":91.90222293333332,"unit":"g","_id":"58191de5c71d8befa65db79a","sub":[{"label":"Carbs (net)","tag":"CHOCDF.net","schemaOrgTag":null,"total":258.41216479999997,"hasRDI":false,"daily":0,"unit":"g","_id":"58191de5c71d8befa65db79d","sub":[]},{"label":"Fiber","tag":"FIBTG","schemaOrgTag":"fiberContent","total":17.294504,"hasRDI":true,"daily":69.178016,"unit":"g","_id":"58191de5c71d8befa65db79c","sub":[]},{"label":"Sugars","tag":"SUGAR","schemaOrgTag":"sugarContent","total":21.1070096,"hasRDI":false,"daily":0,"unit":"g","_id":"58191de5c71d8befa65db79b","sub":[]}]},{"label":"Protein","tag":"PROCNT","schemaOrgTag":"proteinContent","total":49.204489599999995,"hasRDI":true,"daily":98.40897919999999,"unit":"g","_id":"58191de5c71d8befa65db799","sub":[]},{"label":"Cholesterol","tag":"CHOLE","schemaOrgTag":"cholesterolContent","total":0,"hasRDI":false,"daily":0,"unit":"mg","_id":"58191de5c71d8befa65db798","sub":[]},{"label":"Sodium","tag":"NA","schemaOrgTag":"sodiumContent","total":62.228475368,"hasRDI":true,"daily":2.5928531403333333,"unit":"mg","_id":"58191de5c71d8befa65db797","sub":[]},{"label":"Calcium","tag":"CA","schemaOrgTag":null,"total":150.35125431159582,"hasRDI":true,"daily":15.035125431159582,"unit":"mg","_id":"58191de5c71d8befa65db796","sub":[]},{"label":"Magnesium","tag":"MG","schemaOrgTag":null,"total":240.03153892964983,"hasRDI":true,"daily":60.00788473241246,"unit":"mg","_id":"58191de5c71d8befa65db795","sub":[]},{"label":"Potassium","tag":"K","schemaOrgTag":null,"total":1912.8823914371985,"hasRDI":true,"daily":54.65378261249138,"unit":"mg","_id":"58191de5c71d8befa65db794","sub":[]},{"label":"Iron","tag":"FE","schemaOrgTag":null,"total":6.501636646784443,"hasRDI":true,"daily":36.120203593246906,"unit":"mg","_id":"58191de5c71d8befa65db793","sub":[]},{"label":"Zinc","tag":"ZN","schemaOrgTag":null,"total":5.713768292964982,"hasRDI":true,"daily":38.09178861976655,"unit":"mg","_id":"58191de5c71d8befa65db792","sub":[]},{"label":"Phosphorus","tag":"P","schemaOrgTag":null,"total":768.56008,"hasRDI":true,"daily":109.79429714285715,"unit":"mg","_id":"58191de5c71d8befa65db791","sub":[]},{"label":"Vitamin A","tag":"VITA_RAE","schemaOrgTag":null,"total":204.51863999999998,"hasRDI":true,"daily":22.724293333333332,"unit":"µg","_id":"58191de5c71d8befa65db790","sub":[]},{"label":"Vitamin C","tag":"VITC","schemaOrgTag":null,"total":64.914104,"hasRDI":true,"daily":108.19017333333333,"unit":"mg","_id":"58191de5c71d8befa65db78f","sub":[]},{"label":"Thiamin (B1)","tag":"THIA","schemaOrgTag":null,"total":0.4587576,"hasRDI":true,"daily":30.58384,"unit":"mg","_id":"58191de5c71d8befa65db78e","sub":[]},{"label":"Riboflavin (B2)","tag":"RIBF","schemaOrgTag":null,"total":0.26497919999999997,"hasRDI":true,"daily":15.587011764705881,"unit":"mg","_id":"58191de5c71d8befa65db78d","sub":[]},{"label":"Niacin (B3)","tag":"NIA","schemaOrgTag":null,"total":8.5807928,"hasRDI":true,"daily":42.903963999999995,"unit":"mg","_id":"58191de5c71d8befa65db78c","sub":[]},{"label":"Vitamin B6","tag":"VITB6A","schemaOrgTag":null,"total":0.9291536,"hasRDI":true,"daily":46.45768,"unit":"mg","_id":"58191de5c71d8befa65db78b","sub":[]},{"label":"Folic Acid (B9)","tag":"FOL","schemaOrgTag":null,"total":133.3648,"hasRDI":true,"daily":33.3412,"unit":"µg","_id":"58191de5c71d8befa65db78a","sub":[]},{"label":"Vitamin B12","tag":"VITB12","schemaOrgTag":null,"total":0,"hasRDI":false,"daily":0,"unit":"µg","_id":"58191de5c71d8befa65db789","sub":[]},{"label":"Vitamin D","tag":"VITD","schemaOrgTag":null,"total":0,"hasRDI":false,"daily":0,"unit":"µg","_id":"58191de5c71d8befa65db788","sub":[]},{"label":"Vitamin E","tag":"TOCPHA","schemaOrgTag":null,"total":10.6486168,"hasRDI":true,"daily":53.243083999999996,"unit":"mg","_id":"58191de5c71d8befa65db787","sub":[]},{"label":"Vitamin K","tag":"VITK1","schemaOrgTag":null,"total":94.43496800000001,"hasRDI":true,"daily":118.04371,"unit":"µg","_id":"58191de5c71d8befa65db786","sub":[]}],"ingredients":[{"text":"1 pound 2 ounces ripe vine tomatoes , peeled, seeded, and chopped","quantity":1,"measure":"lb","food":"tomatoes","weight":453.592,"_id":"58191de5c71d8befa65db7cd"},{"text":"1/4 cup olive oil","quantity":0.25,"measure":"cup","food":"olive oil","weight":54,"_id":"58191de5c71d8befa65db7cc"},{"text":"10 leaves fresh basil, chopped","quantity":10,"measure":"leaf","food":"fresh basil","weight":5,"_id":"58191de5c71d8befa65db7cb"},{"text":"2 cloves garlic, peeled","quantity":2,"measure":"clove","food":"garlic","weight":6,"_id":"58191de5c71d8befa65db7ca"},{"text":"12 ounces spaghetti","quantity":12,"measure":"oz","food":"spaghetti","weight":340.2,"_id":"58191de5c71d8befa65db7c9"},{"text":"Salt and pepper","quantity":0,"measure":"medium","food":"salt","weight":0.04189296498271325,"_id":"58191de5c71d8befa65db7c8"},{"text":"Salt and pepper","quantity":0,"measure":"medium","food":"pepper","weight":3,"_id":"58191de5c71d8befa65db7c7"}],"ingredientLines":["1 pound 2 ounces ripe vine tomatoes , peeled, seeded, and chopped","1/4 cup olive oil","10 leaves fresh basil, chopped","2 cloves garlic, peeled","12 ounces spaghetti","Salt and pepper"],"cautions":[],"healthLabels":["Vegan","Vegetarian","Dairy-Free","Egg-Free","Peanut-Free","Tree-Nut-Free","Soy-Free","Fish-Free","Shellfish-Free"],"dietLabels":["Balanced","Low-Sodium"]},"_id":"58191deac71d8befa65dba61","updatedAt":"2016-11-01T22:57:46.155Z","createdAt":"2016-11-01T22:57:46.155Z","userId":"58191b5dc71d8befa65db1aa","recipeId":"58191de5c71d8befa65db785","haveIngredient":false,"__v":0}],"pastMealsObjs":[],"pastMealIds":[],"mealIds":["58191cf3c71d8befa65db5ce","58191deac71d8befa65dba61"]}
