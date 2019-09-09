import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import LottieView from 'lottie-react-native';
import { _storeCampus } from './components/async_data/Async'


export default class ProductSearch extends React.Component {

    state = {
        toggle: 1,
        board1: true,
        board2: false,
        board3: false,
        board4: false,
        board5: false,
        board6: false,
        search_result: [],
    }


    async componentDidMount() {

        var formData = new FormData()
        formData.append('eshop-name', this.props.search_phrase)
    
        this.setState({ isLoading: true })
        const campus = await _retrieveData('campus')
    
    
        try {
          const res = await fetch('https://www.iwansell.com/api/eshop_list/' + campus + '/',{
    
          body : formData,
          method: 'POST'
    
          });
          const search_result = await res.json();
          this.setState({
            search_result
          });
        } catch (e) {
          console.log(e);
        }
    
        this.setState({ isLoading: false })
      }




      emptyResult(){

        var empty_set = false
    
        if(this.state.search_result.length <= 0 ){
          empty_set = true
        }
    
        return empty_set
    
    
      }
    
    

      toggleMethod(){
        var toggle = Math.floor(Math.random() * 6);

        switch (toggle) {
            case 1:
                this.state.board1 = true
                this.state.board2 = false
                this.state.board3 = false
                this.state.board4 = false
                this.state.board5 = false
                this.state.board6 = false
                
                break;

            case 2:
                this.state.board2 = true
                this.state.board1 = false
                this.state.board3 = false
                this.state.board4 = false
                this.state.board5 = false
                this.state.board6 = false

                break;

            case 3:
                this.state.board3 = true
                this.state.board1 = false
                this.state.board2 = false
                this.state.board4 = false
                this.state.board5 = false
                this.state.board6 = false
                
                break;

            case 4:
                this.state.board4 = true
                this.state.board1 = false
                this.state.board2 = false
                this.state.board3 = false
                this.state.board5 = false
                this.state.board6 = false
                
                break;

            case 5:
                this.state.board5 = true
                this.state.board1 = false
                this.state.board2 = false
                this.state.board3 = false
                this.state.board4 = false
                this.state.board6 = false
                
                break;

            case 6:
                this.state.board6 = true
                this.state.board1 = false
                this.state.board2 = false
                this.state.board3 = false
                this.state.board4 = false
                this.state.board5 = false
                
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

            {this.state.search_result.map(item => (
            <View>
                {this.toggleMethod()}
            {this.state.board1 && (
                <View style={[styles.board, styles.board1]}>
                        <Text style={styles.eshopTitle}>{item.name}</Text>
                        <Text style={styles.eshopCategory}></Text>
                        <Text style={styles.eshopDescription}>{item.about}</Text>
                </View>
                
            )}
                
            {this.state.board2 && (
               <View style={[styles.board, styles.board2]}>
                        <Text style={styles.eshopTitle}>{item.name}</Text>
                        <Text style={styles.eshopCategory}></Text>
                        <Text style={styles.eshopDescription}>{item.about}</Text>
                </View>
                
            )}

            {this.state.board3 && (
                <View style={[styles.board, styles.board3]}>
                        <Text style={styles.eshopTitle}>{item.name}</Text>
                        <Text style={styles.eshopCategory}></Text>
                        <Text style={styles.eshopDescription}>{item.about}</Text>
                </View>
                
            )}

            {this.state.board4 && (
                <View style={[styles.board, styles.board4]}>
                        <Text style={styles.eshopTitle}>{item.name}</Text>
                        <Text style={styles.eshopCategory}></Text>
                        <Text style={styles.eshopDescription}>{item.about}</Text>
                </View>
                
            )}

            {this.state.board5 && (
                <View style={[styles.board, styles.board5]}>
                        <Text style={styles.eshopTitle}>{item.name}</Text>
                        <Text style={styles.eshopCategory}></Text>
                        <Text style={styles.eshopDescription}>{item.about}</Text>
                </View>
                
            )}

            {this.state.board6 && (
                <View style={[styles.board, styles.board6]}>
                        <Text style={styles.eshopTitle}>{item.name}</Text>
                        <Text style={styles.eshopCategory}></Text>
                        <Text style={styles.eshopDescription}>{item.about}</Text>
                </View>
                
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
        width: '100%',
        borderRadius: 20,
        padding: 15,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    board1: {
        backgroundColor: 'darkslate#01579b'
    },
    board2: {
        backgroundColor: 'orange'
    },
    board3: {
        backgroundColor: 'green'
    },
    board4: {
        backgroundColor: 'magenta'
    },
    board5: {
        backgroundColor: 'black'
    },
    board6: {
        backgroundColor: 'red'
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