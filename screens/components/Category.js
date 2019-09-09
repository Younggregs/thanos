import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'


export default class Category extends React.Component {

    state = {
        isLoading: false,
        categorylist: [],
        media: null,
        count: 1,
        jumbLine: false,
    }

    async componentDidMount() {
        this.setState({ isLoading: true})
      try {
        const res = await fetch('https://www.iwansell.com/api/category/');
        const categorylist = await res.json();
        this.setState({
          categorylist
        });
      } catch (e) {
        console.log(e);
      }
  
      this.setState({ isLoading: false })
    }
  
  
        setMedia(media_name){
          this.state.media = 'https://www.iwansell.com' + media_name
        }

    
        checkModulus(){
            if(this.state.count % 3 == 0){
                this.setState({ jumbLine: true })
            }
            this.setState({ jumbLine: false })
            this.setState({ count: this.state.count + 1})
        }

        


  render() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerText}>Categories</Text>
            </View>

            <View style={styles.categoryContainer}>
            {this.state.categorylist.map(item =>
             <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('CategoryProduct', {category_id: item.id, category_name: item.name})}
                style={styles.iconView}>

             <View style={styles.iconStyle}>
             <View style={styles.imageItem}>
            {this.setMedia(item.icon)}
            
            <Image
                source={{ uri: this.state.media, cache: 'forced-cache',}}
                resizeMethod="resize"
                style={{ resizeMode:'cover', width: 50, height: 50, borderRadius: 20 }}/>
            </View>
                 <Text style={styles.iconText}>{item.name}</Text>
             </View>

            </TouchableOpacity>  

            )}
            </View>
           
        </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    categoryContainer: {
        flex: 1 , 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    iconView: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
    },
    iconStyle: {
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    icon: {
        color: 'orange',
    },
    iconText: {
        fontSize: 11,
        fontWeight: 'bold'
    },
    imageItem: {
        height: 50,
        width: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 10,
    },
})