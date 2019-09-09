import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default class Media extends React.Component {

  state = {
    imagesList: [],
    media: null,
    isLoading: false
  }

  async componentWillMount() {

    this.setState({ isLoading: true })
    try {
        const res = await fetch('https://www.iwansell.com/api/product_images/' + this.props.product_id);
        const imagesList = await res.json();
        this.setState({
          imagesList
        });
      } catch (e) {
        console.log(e);
      }

    this.setState({ isLoading: false })

  }

  setMedia(media_name){
    this.state.media = 'https://www.iwansell.com' + media_name
  }



  render() {
    return (
      <View style={styles.container}>
       {this.state.isLoading ? (
          <View style={styles.loadingView}>
          <View style={styles.loading}>
                <LottieView source={require('../animation/Plane.json')} autoPlay loop/>
          </View>
          </View>
       ) : (
        <ScrollView horizontal={true}>
        {this.state.imagesList.map(item => 
           <View style={styles.imageItem}>
             {this.setMedia(item.image)}
              <Image
                  source={{ uri: this.state.media, cache: 'forced-cache', }}
                  resizeMethod="resize"
                  style={{ resizeMode:'cover', width: 220, height: 200, borderRadius: 20 }}/>
              </View>
        )}
        </ScrollView>
       )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageItem: {
    height: 200,
    width: 220,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
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