import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import { Icon, Container } from 'native-base'
import LottieView from 'lottie-react-native'
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog'
import { _retrieveData } from './components/async_data/Async'
import { Video } from 'expo-av';
import fileType from './components/FileType'
import FormatDate from './components/Format Date'
import SharePopup from './components/Share'
import Reply from './components/Reply'
import About from './components/About'
import SendReply from './components/SendReply'


export default class ThreadScreen extends React.Component {

    static navigationOptions = {
        header: null
      };

      state={
        account_id: null,
        isLoggedIn: true,
        isLoading: false,
        isLoading2: false,
        campus_id: 1,
        threadl: [],
        commentlist: [],
        market: "Your",
        media: 'https://www.iwansell.com/api/media/anon.png',
        logo: 'https://www.iwansell.com/api/media/anon.png',
        media2: 'https://www.iwansell.com/api/media/anon.png',
        logo2: 'https://www.iwansell.com/api/media/anon.png',
        isLoading2: false,
        following: false,
        votes: false,
        votesent: false,
        toggle: null,
        channel: null,
        visible: false,
        visible_2: false,
        msg: null,
        comment: null,
        comment_count: 0, 
        auth: false,
        is_video: false
      }

      isFile(filename){
        this.state.is_video = fileType(filename)
      }

      getChannel(){
          return this.state.channel
      }

      async componentWillMount() {

        this.setState({ isLoading: true })
        const auth = await _retrieveData('auth_code')

        const { navigation } = this.props;
        const thread_id = navigation.getParam('thread_id', 3)
        const thread = navigation.getParam('thread', 'thread')
        const title = navigation.getParam('title', 'title')
        const firstname = navigation.getParam('firstname', 'firstname')
        const lastname = navigation.getParam('lastname', 'lastname')
        const media2 = navigation.getParam('media', 'media')
        const logo2 = navigation.getParam('logo', 'logo')
        const following = navigation.getParam('following', 3)
        const date = navigation.getParam('date', 3)
        const votes = navigation.getParam('votes', 3)
        const comment_count = navigation.getParam('comment_count', 3)
        const channel = navigation.getParam('channel', 'Iwansell Tv')
        this.setState({
          channel,
          thread,
          title,
          firstname, 
          lastname,
          media2,
          logo2,
          following,
          date,
          votes,
          comment_count
        })

        this.setMedia2(media2, logo2)
        
          try {
            const res = await fetch('https://www.iwansell.com/api/comment/' + thread_id);
            const commentlist = await res.json();
            this.setState({
              commentlist
            });
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


        
        const auth_n = await _retrieveData('auth_code')
      
        if(auth_n.toString().length >= 10){
            this.setState({ auth: true})
        }else{
            this.setState({ auth: false})
        }
         
      
    
    
    
        this.setState({ isLoading: false })
    
      }


    
      setMedia(media_name, logo, following, votes){
        this.state.media = 'https://www.iwansell.com/api/media/' + media_name
        this.state.logo = 'https://www.iwansell.com/api/media/' + logo
        this.state.following = following
        this.state.votes = votes
      }

      setMedia2(media, logo){
        this.state.media2 = 'https://www.iwansell.com/api/media/' + media
        this.state.logo2 = 'https://www.iwansell.com/api/media/' + logo
      }

      setDp(dp){
        this.state.dp = 'https://www.iwansell.com/api/media/' + dp
      }
    
    
      emptyResult(){
    
        var empty_set = true
    
        if(this.state.commentlist){
          empty_set = false
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

      updatePost(post){
        this.setState({ post })
      }

      getThread(thread){
        return '...'
      }



      async sendComment(){
    
                this.setState({ isLoading2: true})
      
                var formData = new FormData()
                formData.append('comment', this.state.post)
        
                try {
                  const res = await fetch('https://www.iwansell.com/api/comment/' + this.state.thread.thread_id + '/', {
        
                   body : formData,
                   method: 'POST',
        
                  })
                  const message = await res.json();
                    this.setState({
                      message, rd: true 
                    });
                    alert('sent!')
        
                } catch (e) {
                  console.log(e);
                  alert('failed, retry please')
                }

                this.updateCommentList()
        
                this.setState({ isLoading2: false, visible: false})   

}

async updateCommentList(){
  
  try {
    const res = await fetch('https://www.iwansell.com/api/comment/' + thread_id);
    const commentlist = await res.json();
    this.setState({
      commentlist
    });
  } catch (e) {
    console.log(e);
  }
}

    


  render() {

   

    return (
        <Container>
        <View style={styles.headerStyle}>
          <TouchableOpacity
            style={{ color: 'white', flex: 3, marginLeft: 10 }}
            onPress={() => this.props.navigation.goBack(null)}>
          <Icon 
            name="arrow-back"
            style={{ color: 'white' }}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>{this.getChannel()}</Text>
        </View>
        <ScrollView>
        <View style={styles.threadStyle}>
                
                 <View style={styles.head}>
                    <View style={{ flex: 3 }}>
                        <Image
                            source={{ uri: this.state.logo2, cache: 'forced-cache', }}
                            resizeMethod="resize"
                        style={styles.dp}/>
                        <Text style={{ fontWeight: 'bold', fontSize: 15}}>{this.state.channel}</Text>
                        </View>
                    <View style={{ flex: 6}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15}}> {this.state.firstname}#{this.state.lastname}</Text>
                        <FormatDate date={this.state.date}/>
                    </View>
                    <TouchableOpacity style={styles.follow}>
                        <Text style={styles.followText}>Follow</Text>
                    </TouchableOpacity>
                </View>
            <View>
                <Text style={styles.title}>{this.state.title}</Text>
                <Text style={styles.post}>{this.state.thread}</Text>
                <View style={{ height: 300, width: '100%'}}>
                {this.isFile(this.state.media2)}
                  {this.state.is_video ? (
                    <Video
                    source={{ uri: this.state.media2, cache: 'forced-cache' }}
                    useNativeControls
                    volume={1.0}
                    resizeMode="cover"
                    isLooping={false}
                    style={styles.media}
                  />
                  ) : (
                <Image
                      source={{ uri: this.state.media2, cache: 'forced-cache', }}
                      resizeMethod="resize"
                      style={styles.media}/>
                  )
                }
                </View>
            </View>
            <View style={styles.footer}>
                
                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <Icon name='arrow-round-up' style={styles.iconStyle}/>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>{this.state.votes}</Text>
                </View>
                <View style={{ flex: 2}}>
                    <Icon name='arrow-round-down' style={styles.iconStyle}/>
                </View>
                <View style={{ flex: 2, flexDirection: 'row'}}>
                    <Icon name='chatbubbles'
                      style={styles.iconStyle}
                      onPress={() => {
                      this.setState({ visible: true });
                    }}/>
                    <Dialog
                      visible={this.state.visible}
                      onTouchOutside={() => {
                      this.setState({ visible: false });
                      }}
                      dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                      })}
                    >
                    <DialogContent>
                      {this.state.auth ? (
                        <View>
                          <Text>{this.getThread(this.state.thread)}</Text>
                          <View style={{ flexDirection: 'row'}}>
                  <View style={styles.amountContainerD}>
                  <TextInput 
                    placeholder="msg box"
                    placeholderTextColor='rgba(60,90,153, 0.5)'
                    returnKeyType="go"
                    multiline={true}
                    style={styles.inputStyle}
                    onChangeText={(post) => this.updatePost(post)}/>
                    </View>
                    {this.state.isLoading2 ? (
                      <View style={styles.loadingView}>
                      <View style={styles.loading}>
                        <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
                        </View>
                        </View>
                    ) : (
                      <View style={styles.sendIcon}>
                      <Icon 
                      name='send' 
                      color='white' 
                      style={{color: 'white'}} 
                      onPress={() => this.sendComment()}/>
                    </View>
                    )}

                    

                        </View>

                        </View>
                      ): (
                       <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('Login')}>
                            <Text>Login to Comment, Click me to Login</Text>
                          </TouchableOpacity>
                      )}
                          
                    </DialogContent>
                  </Dialog>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>{this.state.comment_count}</Text>
                </View>
                <View style={{ flex: 2}}>
                    <SharePopup title={this.state.title} thread={this.state.thread}/>
                </View>
                <View style={{ flex: 6 }}></View>
            </View>
            </View>

        {this.state.isLoading ? (
            <View style={styles.loadingView}>
            <View style={styles.loading}>
                  <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
            </View>
            </View>
        ) : (
            <View>
                {this.emptyResult() ? (
                <Text style={styles.error}>Sorry wrong turn</Text>
                ) : (

                    <View>
                       
            {this.state.commentlist.map(item => (
                <View>
                    {this.setDp(item.dp)}
                <View style={styles.comment}>
                <View>
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

                <Text style={styles.post}>{item.comment}</Text>
                <View style={styles.footer}>
                <View style={{ flex: 6}}></View>
                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <Icon name='arrow-round-up' style={styles.iconStyle}/>
                </View>
                <View style={{ flex: 1}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>{item.votes}</Text>
                </View>
                <View style={{ flex: 2}}>
                    <Icon name='arrow-round-down' style={styles.iconStyle}/>
                </View>
                <View style={{ flex: 2}}>
                    <SendReply count={item.comment_count} comment={item.comment} comment_id={item.comment_id}/>
                </View>
                
                <View style={{ flex: 2}}>
                    <SharePopup thread={item.comment}/>
                </View>
                
            </View>
                

            </View>
            </View>
            <Reply comment={item.comment} comment_id={item.comment_id}/>
      
            </View>
            ))}
            

            
                        
                       
            </View>  
                )}
            </View>
        )}

        <About/>
        </ScrollView>
        </Container>
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
    headerStyle: {
        backgroundColor: '#01579b',
        height: 80,
        paddingTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        padding: 10,
        flex: 9
    },
    comment: {
        width: '100%',
        marginBottom: 20,
    },
    reply: {
        borderLeftColor: '#E1E8ED',
        borderLeftWidth: 4,
        borderStyle: 'solid',
        marginLeft: 10
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
    amountContainerD: {
      backgroundColor: 'white',
      margin: 5,
      padding: 5,
      width: 250,
      borderBottomColor: '#01579b',
      borderBottomWidth: 2,
      borderStyle: 'solid',
    },
    sendIcon: {
      backgroundColor: '#01579b',
      height: 50,
      width: 50,
      borderRadius: 25,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconStyle: {
      color: 'gray',
      fontSize: 20

    },
    nameStyle: {
      fontWeight: 'bold',
      fontSize: 15
    }
})