import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'native-base'
import { Video } from 'expo-av';
import LottieView from 'lottie-react-native';
import { _retrieveData } from './async_data/Async'
import FormatDate from './Format Date'
import SharePopup from './Share'
import fileType from './FileType'


export default class ChannelT extends React.Component {

    state={
        account_id: null,
        isLoggedIn: true,
        isLoading: false,
        campus_id: 1,
        threadlist: [],
        media: null,
        logo: null,
        isLoading2: false,
        following: false,
        votes: false,
        votesent: false,
        toggle: null,
        is_video: false
      }

      isFile(filename){
        this.state.is_video = fileType(filename)
      }
        

    
      async componentWillMount() {
    
        this.setState({ isLoading: true })
        const auth = await _retrieveData('auth_code')
    
        try {
            const res = await fetch('https://www.iwansell.com/api/channel/1');
            const threadlist = await res.json();
            this.setState({
              threadlist
            });
          } catch (e) {
            console.log(e);
          }
    
        try {
          const res = await fetch('https://www.iwansell.com/api/isloggedin/', {
    
           credentials: 'same-origin',
           mode: 'cors',
           headers : {
             'Authorization' : 'Token ' + auth
           }
    
          })
          .then(response => {
            if (response.status === 200) {
    
            } else {
              this.setState({ isLoggedIn: false})
            }
          })
        } catch (e) {
          console.log(e);
        }
    
    
        try {
          const res = await fetch('https://www.iwansell.com/api/get_account/',{
    
           credentials: 'same-origin',
           mode: 'cors',
           headers : {
             'Authorization' : 'Token ' + auth
           },
    
          });
          const account_id = await res.json();
          this.setState({
            account_id
          });
        } catch (e) {
          console.log(e);
        }
    
    
        try {
          const res = await fetch('https://www.iwansell.com/api/get_campus/',{
    
           credentials: 'same-origin',
           mode: 'cors',
           headers : {
             'Authorization' : 'Token ' + auth
           },
    
          });
          const campus_id = await res.json();
          this.setState({
            campus_id
          });
        } catch (e) {
          console.log(e);
        }
    
        this.setState({ isLoading: false })
    
      }




    
      setMedia(media_name, logo, following, votes){
        this.state.media = 'https://www.iwansell.com/api/media/' + media_name
        this.state.logo = 'https://www.iwansell.com/api/media/' + logo
        this.state.following = following
        this.state.votes = votes
      }
    
    
      emptyResult(){
    
        var empty_set = false
    
        if(this.state.threadlist.length <= 0 ){
          empty_set = true
        }
        return empty_set
      }
    
    
      async follow(channel_id){
        this.setState({ isLoading2: true })
        const auth = localStorage.getItem('auth_code')
    
        try {
          const res = await fetch('https://www.iwansell.com/api/follow/' + channel_id, {
           credentials: 'same-origin',
           mode: 'cors',
           headers : {
             'Authorization' : 'Token ' + auth
           }
          })
          const following = await res.json();
          this.setState({
            following
          });
        } catch (e) {
          console.log(e);
        }
        this.setState({ isLoading2: false })
      }
    
    
    
      async vote(toggle, thread_id){
    
        this.setState({ isLoading3: true, votesent: true, toggle })
        const auth = localStorage.getItem('auth_code')
    
        try {
          const res = await fetch('https://www.iwansell.com/api/vote/' + toggle + '/' + thread_id, {
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




      setThread(thread){
        return thread.substr(0, 150)
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
                {this.emptyResult() ? (
                <Text style={styles.error}>No result found</Text>
                ) : (

                    <View>
                        {this.state.threadlist.map(item => 

                        <View style={styles.threadStyle}>
                            {this.setMedia(item.media, item.logo, item.following, item.votes)}
                 <View style={styles.head}>
                    <View style={{ flex: 3 }}>
                        <Image
                            source={{ uri: this.state.logo, cache: 'forced-cache', }}
                            resizeMethod="resize"
                        style={styles.dp}/>
                        <Text style={styles.nameStyle}>{item.channel}</Text>
                    </View>
                    <View style={{ flex: 6}}>
                        <Text style={styles.nameStyle}>{item.firstname}#{item.lastname}</Text>
                        <FormatDate date={item.date}/>
                    </View>
                    <TouchableOpacity style={styles.follow}>
                        <Text style={styles.followText}>Follow</Text>
                    </TouchableOpacity>
                </View>
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Thread', 
                { thread_id: item.thread_id, 
                  title: item.title,
                  thread: item.thread,
                  firstname: item.firstname,
                  lastname: item.lastname,
                  media: item.media,
                  logo: item.logo,
                  following: item.following,
                  date : item.date,
                  channel: item.channel,
                  votes: item.votes, 
                  comment_count: item.comment_count,
                })}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.post}>{this.setThread(item.thread)}... continue to conversation</Text>
                </TouchableOpacity>
                
                <View style={{ height: 300, width: '100%'}}>
                  {this.isFile(item.media)}
                  {this.state.is_video ? (
                    <Video
                    source={{ uri: this.state.media, cache: 'forced-cache' }}
                    rate={1.0}
                    volume={1.0}
                    isMuted
                    resizeMode="cover"
                    shouldPlay={false}
                    isLooping={false}
                    style={styles.media}
                  />
                  ) : (
                    <Image
                        source={{ uri: this.state.media, cache: 'forced-cache' }}
                        resizeMethod="resize"
                        style={styles.media}/>
                  )}
                </View>
            
            <View style={styles.footer}>
                <View style={{ flex: 2, flexDirection: 'row'}}>
                    <Icon name='arrow-round-up'/>
                </View>
                <View style={{ flex: 2}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>{item.votes}</Text>
                </View>
                <View style={{ flex: 2}}>
                    <Icon name='arrow-round-down'/>
                </View>
                <View style={{ flex: 2, flexDirection: 'row'}}>
                    <Icon name='chatbubbles'/>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>{item.comment_count}</Text>
                </View>
                <View style={{ flex: 2}}>
                    <SharePopup title={item.title} thread={item.thread}/>
                </View>
            </View>
            </View>
                        
                        )}
                    </View>  
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
    threadStyle:{
        width: '100%',
        borderBottomColor: '#E1E8ED',
        borderBottomWidth: 3,
        borderStyle: 'solid',
        paddingBottom: 10
    },
    head:{
        flexDirection: 'row',
        padding: 5
    }, 
    follow:{
        flex: 2,
        backgroundColor: '#01579b',
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
    },
    followText:{
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
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
    media: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    body: {

    },
    footer: {
        flexDirection: 'row',
        padding: 5
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
    },
    nameStyle: {
      fontWeight: 'bold',
      fontSize: 15
    }
})