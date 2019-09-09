import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native';
import { _retrieveData } from './async_data/Async'


export default class EShopTop extends React.Component {

    constructor({Props}){
        super()
        this.state = {
          Props,
          board1: true,
          campus_id: 1,
          board2: false,
          board3: false,
          board4: false,
          board5: false,
          board6: false,
          board7: false,
          board8: false,
          board9: false,
          board10: false,
          eshop_list: [],
          refreshing: false
        }
      }


      async componentDidMount() {
        this.setState({ isLoading: true})
        const campus = await _retrieveData('campus')

         try {
           const res = await fetch('https://www.iwansell.com/api/eshop_list/' +  campus + '/');
           const eshop_list = await res.json();
           this.setState({
             eshop_list
           });
         } catch (e) {
           console.log(e);
         }
 
         this.setState({ isLoading: false })
   }
 

   emptyResult(){

        var empty_set = false
    
        if(this.state.eshop_list.length <= 0 ){
          empty_set = true
        }
    
        return empty_set
    
    
      }
    

      toggleMethod(){
        var toggle = Math.floor(Math.random() * 10);

        switch (toggle) {
            case 1:
                this.state.board1 = true
                this.state.board2 = false
                this.state.board3 = false
                this.state.board4 = false
                this.state.board5 = false
                this.state.board6 = false
                this.state.board7 = false
                this.state.board8 = false
                this.state.board9 = false
                this.state.board10 = false
                
                break;

            case 2:
                this.state.board2 = true
                this.state.board1 = false
                this.state.board3 = false
                this.state.board4 = false
                this.state.board5 = false
                this.state.board6 = false
                this.state.board7 = false
                this.state.board8 = false
                this.state.board9 = false
                this.state.board10 = false

                break;

            case 3:
                this.state.board3 = true
                this.state.board1 = false
                this.state.board2 = false
                this.state.board4 = false
                this.state.board5 = false
                this.state.board6 = false
                this.state.board7 = false
                this.state.board8 = false
                this.state.board9 = false
                this.state.board10 = false
                
                break;

            case 4:
                this.state.board4 = true
                this.state.board1 = false
                this.state.board2 = false
                this.state.board3 = false
                this.state.board5 = false
                this.state.board6 = false
                this.state.board7 = false
                this.state.board8 = false
                this.state.board9 = false
                this.state.board10 = false
                
                break;

            case 5:
                this.state.board5 = true
                this.state.board1 = false
                this.state.board2 = false
                this.state.board3 = false
                this.state.board4 = false
                this.state.board6 = false
                this.state.board7 = false
                this.state.board8 = false
                this.state.board9 = false
                this.state.board10 = false
                
                break;

            case 6:
                this.state.board6 = true
                this.state.board1 = false
                this.state.board2 = false
                this.state.board3 = false
                this.state.board4 = false
                this.state.board5 = false
                this.state.board7 = false
                this.state.board8 = false
                this.state.board9 = false
                this.state.board10 = false
                
                break;
            
            case 7:
                this.state.board7 = true
                this.state.board1 = false
                this.state.board2 = false
                this.state.board3 = false
                this.state.board4 = false
                this.state.board5 = false
                this.state.board6 = false
                this.state.board8 = false
                this.state.board9 = false
                this.state.board10 = false
                
                break;

            case 8:
                this.state.board8 = true
                this.state.board1 = false
                this.state.board2 = false
                this.state.board3 = false
                this.state.board4 = false
                this.state.board5 = false
                this.state.board6 = false
                this.state.board7 = false
                this.state.board9 = false
                this.state.board10 = false
                
                break;

            
            case 9:
                this.state.board9 = true
                this.state.board1 = false
                this.state.board2 = false
                this.state.board3 = false
                this.state.board4 = false
                this.state.board5 = false
                this.state.board6 = false
                this.state.board7 = false
                this.state.board8 = false
                this.state.board10 = false
                
                break;

            
            case 10:
                this.state.board10 = true
                this.state.board1 = false
                this.state.board2 = false
                this.state.board3 = false
                this.state.board4 = false
                this.state.board5 = false
                this.state.board6 = false
                this.state.board7 = false
                this.state.board8 = false
                this.state.board9 = false
                
                break;

                
        
            default:
                
                break;
        }
    }




  render() {
    return (
        <View style={styles.container}>


            {this.state.isLoading ? (
            <View style={styles.loading}>
                <LottieView source={require('../animation/Plane.json')} autoPlay loop/>
            </View>
            ) : (
            <View>

            {this.emptyResult() ? (

                <Text style={styles.error}>No result found</Text>

            ) : (

            <ScrollView>
            {this.state.eshop_list.map(item => (
            <View>
            {this.toggleMethod()}
            {this.state.board1 && (
                 <TouchableOpacity 
                 onPress={() => this.props.navigation.navigate('EShopDisplay', {eshop_id: item.id})} style={[styles.board, styles.board1]}>
                        <Text style={styles.eshopTitle}>{item.name}</Text>
                        <Text style={styles.eshopCategory}></Text>
                        <Text style={styles.eshopDescription}>{item.about}</Text>
                </TouchableOpacity>
                
            )}
                
            {this.state.board2 && (
               <TouchableOpacity 
               onPress={() => this.props.navigation.navigate('EShopDisplay', {eshop_id: item.id})} style={[styles.board, styles.board2]}>
                        <Text style={styles.eshopTitle}>{item.name}</Text>
                        <Text style={styles.eshopCategory}></Text>
                        <Text style={styles.eshopDescription}>{item.about}</Text>
                </TouchableOpacity>
                
            )}

            {this.state.board3 && (
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('EShopDisplay', {eshop_id: item.id})} style={[styles.board, styles.board3]}>
                        <Text style={styles.eshopTitle}>{item.name}</Text>
                        <Text style={styles.eshopCategory}></Text>
                        <Text style={styles.eshopDescription}>{item.about}</Text>
                </TouchableOpacity>
                
            )}

            {this.state.board4 && (
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('EShopDisplay', {eshop_id: item.id})} style={[styles.board, styles.board4]}>
                        <Text style={styles.eshopTitle}>{item.name}</Text>
                        <Text style={styles.eshopCategory}></Text>
                        <Text style={styles.eshopDescription}>{item.about}</Text>
                </TouchableOpacity>
                
            )}

            {this.state.board5 && (
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('EShopDisplay', {eshop_id: item.id})} style={[styles.board, styles.board5]}>
                        <Text style={styles.eshopTitle}>{item.name}</Text>
                        <Text style={styles.eshopCategory}></Text>
                        <Text style={styles.eshopDescription}>{item.about}</Text>
                </TouchableOpacity>
                
            )}

            {this.state.board6 && (
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('EShopDisplay', {eshop_id: item.id})} style={[styles.board, styles.board6]}>
                        <Text style={styles.eshopTitleB}>{item.name}</Text>
                        <Text style={styles.eshopCategoryB}></Text>
                        <Text style={styles.eshopDescriptionB}>{item.about}</Text>
                </TouchableOpacity>
                
            )}


            {this.state.board7 && (
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('EShopDisplay', {eshop_id: item.id})} style={[styles.board, styles.board7]}>
                        <Text style={styles.eshopTitleB}>{item.name}</Text>
                        <Text style={styles.eshopCategoryB}></Text>
                        <Text style={styles.eshopDescriptionB}>{item.about}</Text>
                </TouchableOpacity>
                
            )}


            {this.state.board8 && (
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('EShopDisplay', {eshop_id: item.id})} style={[styles.board, styles.board8]}>
                        <Text style={styles.eshopTitleB}>{item.name}</Text>
                        <Text style={styles.eshopCategoryB}></Text>
                        <Text style={styles.eshopDescriptionB}>{item.about}</Text>
                </TouchableOpacity>
                
            )}


            {this.state.board9 && (
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('EShopDisplay', {eshop_id: item.id})} style={[styles.board, styles.board9]}>
                        <Text style={styles.eshopTitleB}>{item.name}</Text>
                        <Text style={styles.eshopCategoryB}></Text>
                        <Text style={styles.eshopDescriptionB}>{item.about}</Text>
                </TouchableOpacity>
                
            )}


            {this.state.board10 && (
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('EShopDisplay', {eshop_id: item.id})} style={[styles.board, styles.board10]}>
                        <Text style={styles.eshopTitle}>{item.name}</Text>
                        <Text style={styles.eshopCategory}></Text>
                        <Text style={styles.eshopDescription}>{item.about}</Text>
                </TouchableOpacity>
                
            )}

            </View>
            ))}

            </ScrollView>

            )}
            </View>
            )}

            

           
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
    board: {
        height: 100,
        width: 300,
        borderRadius: 20,
        padding: 15,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    board1: {
        backgroundColor: '#01579b'
    },
    board2: {
        backgroundColor: 'red'
    },
    board3: {
        backgroundColor: 'green'
    },
    board4: {
        backgroundColor: 'purple'
    },
    board5: {
        backgroundColor: 'black'
    },
    board6: {
        backgroundColor: 'orange'
    },
    board7: {
        backgroundColor: 'yellow'
    },
    board8: {
        backgroundColor: 'gold'
    },
    board9: {
        backgroundColor: 'cyan'
    },
    board10: {
        backgroundColor: 'gray'
    },
    eshopTitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    eshopCategory: {
        fontSize: 15,
        color: 'whitesmoke',
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    eshopDescription: {
        fontSize: 15,
        color: 'white',
        fontStyle: 'italic'
    },
    eshopTitleB: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    eshopCategoryB: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    eshopDescriptionB: {
        fontSize: 15,
        color: 'black',
        fontStyle: 'italic'
    },
    loading: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10,
      },
})