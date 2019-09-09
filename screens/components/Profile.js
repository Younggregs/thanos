import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'


export default class Profile extends React.Component {

    state = {
        board1: false,
        board2: false,
        board3: false,
        board4: false,
        board5: false,
        board6: false,
    }

    async componentDidMount(){

        var toggle = Math.floor(Math.random() * 6);
        switch (toggle) {
            case 1:
                this.setState({ board1: true})
                break;

            case 2:
                this.setState({ board2: true})
                break;

            case 3:
                this.setState({ board3: true})
                break;

            case 4:
                this.setState({ board4: true})
                break;

            case 5:
                this.setState({ board5: true})
                break;

            case 6:
                this.setState({ board6: true})
                break;
        
            default:
                this.setState({ board5: true})
                break;
        }
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

            <View>

            {this.state.board1 && (
                <View style={[styles.board, styles.board1]}>
                  <Text style={styles.textStyle}>My name is {this.props.firstname} {this.props.lastname}</Text>
                </View>
                
            )}

            {this.state.board2 && (
                <View style={[styles.board, styles.board2]}>
                    <Text style={styles.textStyle}>My name is {this.props.firstname} {this.props.lastname}</Text>
                </View>
                
            )}

            {this.state.board3 && (
                <View style={[styles.board, styles.board3]} >
                    <Text style={styles.textStyle}>My name is {this.props.firstname} {this.props.lastname}</Text>
                </View>
                
            )}

            {this.state.board4 && (
                <View style={[styles.board, styles.board4]} >
                    <Text style={styles.textStyle}>My name is {this.props.firstname} {this.props.lastname}</Text>
                </View>
                
            )}

            {this.state.board5 && (
                <View style={[styles.board, styles.board5]} >
                    <Text style={styles.textStyle}>My name is {this.props.firstname} {this.props.lastname}</Text>
                </View>
                
            )}

            {this.state.board6 && (
                <View style={[styles.board, styles.board6]} >
                    <Text style={styles.textStyle}>My name is {this.props.firstname} {this.props.lastname}</Text>
                </View>
                
            )}

            </View>

        )}


            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('EditProfile')}
                style={styles.optionStyle}>
                <Text style={styles.option}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('ManageListing')}
                style={styles.optionStyle}>
                <Text style={styles.option}>Manage Listing</Text>
            </TouchableOpacity>
           
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
        width: 400,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding : 10
    },
    board1: {
        backgroundColor: '#01579b'
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
        backgroundColor: '#01579b'
    },
    board6: {
        backgroundColor: 'black'
    },
    textStyle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    optionStyle: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    option: {
        color: '#01579b',
        fontSize: 15
    },
})