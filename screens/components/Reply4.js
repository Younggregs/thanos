import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Icon, Container } from 'native-base'
import LottieView from 'lottie-react-native'
import FormatDate from './Format Date'


export default class Reply4 extends React.Component {


    state={
        replylist: [],
        isLoading: false,
        dp: 'https://www.iwansell.com/api/media/anon.png',
        votes: 0, 
        media: null
       }
     
       async componentWillMount() {
     
         this.setState({ isLoading: true })
         try {
             const res = await fetch('https://www.iwansell.com/api/reply_4/' + this.props.reply_id);
             const replylist = await res.json();
             this.setState({
               replylist
             });
           } catch (e) {
             console.log(e);
           }
         this.setState({ isLoading: false })
     
     
       }
     
       setMedia(dp, votes){
         this.state.dp = 'https://www.iwansell.com/api/media/' + dp
         this.state.votes = votes
       }
     
     
       emptyResult(){
     
         var empty_set = false
     
         if(this.state.replylist.length <= 0 ){
           empty_set = true
         }
         return empty_set
       }
     
     
       async vote(toggle, reply_id){
     
         this.setState({ isLoading3: true, votesent: true, toggle })
         const auth = localStorage.getItem('auth_code')
     
         try {
           const res = await fetch('https://www.iwansell.com/api/vote_reply_4/' + toggle + '/' + reply_id, {
            credentials: 'same-origin',
            mode: 'cors',
            headers : {
              'Authorization' : 'Token ' + auth
            }
           })
           const votes = await res.json();
           await this.setState({
               votes
           });
         } catch (e) {
           console.log(e);
         }
         this.setState({ isLoading3: false })
       }
     
     
     
     
     
       voteState(){
           if(this.state.toggle == 1){
             var votes = this.state.votes + 1
           }else{
             var votes = this.state.votes - 1
           }
           return votes  
       }

  render() {
    return (    
        <View>
            {this.state.isLoading ? (
            <View style={styles.loadingView}>
            <View style={styles.loading}>
                  <LottieView source={require('../animation/Plane.json')} autoPlay loop/>
            </View>
            </View>
            ) : (
                <View>
                    {this.state.replylist.map(item => (

                <View style={styles.reply}>
            {this.setMedia(item.dp, item.votes)}
                <View style={styles.head}>
                    <View style={{ flex: 3 }}>
                        <Image
                             source={{ uri: this.state.dp, cache: 'forced-cache', }}
                             resizeMethod="resize"
                        style={styles.dp}/>
                    </View>
                    <View style={{ flex: 9}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15}}>posted by {item.firstname}#{item.lastname}</Text>
                        <FormatDate date={item.date}/>
                    </View>
                </View>

                <Text style={styles.post}>{item.reply}</Text>
            
            <View style={styles.footer}>
            <View style={{ flex: 6 }}></View>
                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <Icon name='arrow-round-up'/>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>{item.votes}</Text>
                </View>
                <View style={{ flex: 2}}>
                    <Icon name='arrow-round-down'/>
                </View>

            </View>

            
            </View>

                   
            ))}

                </View>
            )}
            
            
            
        </View>
    )
  }
}


const styles = StyleSheet.create({
    head:{
        flexDirection: 'row',
        padding: 5
    }, 
    time:{
        color: '#01579b',
        fontStyle: 'italic',
        fontSize: 15,
    },
    dp: {
        resizeMode: 'contain',
        height: 50,
        width: 50,
        borderRadius: 5
    },
    footer: {
        flexDirection: 'row',
        padding: 5
    },
    reply: {
        borderLeftColor: '#E1E8ED',
        borderLeftWidth: 2,
        borderStyle: 'solid',
        marginLeft: 10,
        paddingLeft: 10
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
})