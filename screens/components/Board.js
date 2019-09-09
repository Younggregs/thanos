import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Linking } from 'react-native'


export default class Board extends React.Component {

    state = {
        board1: false,
        board2: false,
        board3: false,
        board4: false,
        board5: false,
        board6: false,
    }

    componentDidMount(){
        switch (this.props.code) {
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
            
            {this.state.board1 && (
                <TouchableOpacity 
                    onPress={ ()=>{ Linking.openURL('https://web.facebook.com/Iwansell-group-270682653560747/?ref=br_rs"')}}
                    style={[styles.board, styles.board1]}>
                    <Image
                        source={
                        __DEV__
                        ? require('./images/facebook.jpg')
                        : require('./images/facebook.jpg')
                        }
                        style={{ resizeMode:'cover', width: '100%', height: 100, borderRadius: 20 }}/>
                </TouchableOpacity>
                
            )}

            {this.state.board2 && (
                <TouchableOpacity 
                    onPress={ ()=>{ Linking.openURL('https://twitter.com/IwansellG')}}
                    style={[styles.board, styles.board2]}>
                    <Image
                        source={
                        __DEV__
                        ? require('./images/twitter.png')
                        : require('./images/twitter.png')
                        }
                        style={{ resizeMode:'cover', width: '100%', height: 100, borderRadius: 20 }}/>
                </TouchableOpacity>
                
            )}

            {this.state.board3 && (
                <TouchableOpacity 
                    onPress={ ()=>{ Linking.openURL('https://google.com')}} 
                    style={[styles.board, styles.board3]} >
                    <Image
                        source={
                        __DEV__
                        ? require('./images/google.png')
                        : require('./images/google.png')
                        }
                        style={{ resizeMode:'cover', width: '100%', height: 100, borderRadius: 20 }}/>
                </TouchableOpacity>
                
            )}

            {this.state.board4 && (
                <TouchableOpacity 
                    onPress={ ()=>{ Linking.openURL('https://instagram.com/iwansell_group')}}
                    style={[styles.board, styles.board4]} >
                    <Image
                        source={
                        __DEV__
                        ? require('./images/instagram.png')
                        : require('./images/instagram.png')
                        }
                        style={{ resizeMode:'cover', width: '100%', height: 100, borderRadius: 20 }}/>
                </TouchableOpacity>
                
            )}

            {this.state.board5 && (
                <TouchableOpacity 
                    onPress={ ()=>{ Linking.openURL('https://livescore.com')}}
                    style={[styles.board, styles.board5]} >
                    <Image
                        source={
                        __DEV__
                        ? require('./images/livescore.jpg')
                        : require('./images/livescore.jpg')
                        }
                        style={{ resizeMode:'cover', width: '100%', height: 100, borderRadius: 20 }}/>
                </TouchableOpacity>
                
            )}

            {this.state.board6 && (
                <TouchableOpacity 
                    onPress={ ()=>{ Linking.openURL('https://youtube.com')}}
                    style={[styles.board, styles.board6]} >
                    <Image
                        source={
                        __DEV__
                        ? require('./images/youtube.png')
                        : require('./images/youtube.png')
                        }
                        style={{ resizeMode:'cover', width: '100%', height: 100, borderRadius: 20 }}/>
                </TouchableOpacity>
                
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
        borderRadius: 20
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
        backgroundColor: 'white'
    },
    board10: {
        backgroundColor: 'silver'
    },
})