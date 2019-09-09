import * as React from 'react';
import { View, Text, Animated, FlatList, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Container } from 'native-base';
import { _retrieveData } from  './components/async_data/Async'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class TopSoldScreen extends React.Component {

  static navigationOptions = {
    title: 'Top Sold Products'
  };

  state = {
    isLoading: false,
    product_list : [],
    rank : 0,
  }



  async componentWillMount(){


    this.setState({ isLoading: true })
    const auth = await _retrieveData('auth_code')


        try {
            const res = await fetch('https://www.iwansell.com/api/top_sold/');
            const product_list = await res.json();
            this.setState({
                product_list
            });
          } catch (e) {
            console.log(e);
          }
    
        this.setState({ isLoading: false })

  }

      emptyResult(){

        var empty_set = false
    
        if(this.state.product_list.length <= 0 ){
          empty_set = true
        }
    
        return empty_set
    
    
      }



      nextRank(){
        this.state.rank = this.state.rank + 1
    
        return this.state.rank
      }




  _renderItem = ({ item }) => (
    <View  style={styles.item}>
      <View style={styles.avatar}>
        <Text style={styles.letter}>{item.frequency}</Text>
      </View>

      <View style={styles.infoView}>
      <View style={styles.details}>
        <Text style={styles.name}>{item.product_name}</Text>
      </View>
      <View style={styles.priceView}>
        <Text style={styles.price}>frequency: {item.frequency}</Text>
      </View>
      </View>
        
      
    </View>
  );
  

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <Container style={styles.container}>
      {this.state.isLoading ? (
        <View style={styles.loadingView}>
        <View style={styles.loading}>
              <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
        </View>
        </View>
        ) : (
        <View>

        {this.emptyResult() ? (
            <Text style={styles.error}>No result found</Text>
        ) : (
      <AnimatedFlatList
        data={this.state.product_list}
        keyExtractor={(item, i) => String(i)}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._ItemSeparator}
        {...this.props}
      />
      )}

      </View>
      )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 8,
    flexDirection: 'row'
  },
  infoView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#e91e63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
  },
  details: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  price: {
    fontSize: 12,
    color: '#01579b',
    fontWeight: 'bold',
  },
  priceView: {
    flex: 1,
    height: 30,
    width: 80,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
  imageItem: {
    height: 100,
        width: 100,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 10,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10,
  },
  loading: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
},
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  }
});
