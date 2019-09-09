import * as React from 'react'
import { Text } from 'react-native'
import {_clearAuth} from './components/async_data/Async'


export default class LogoutScreen extends React.Component{

    async componentWillMount(){
        const auth = await _clearAuth()
    
        if(auth){
          this.props.navigation.navigate('WelcomeStack')
        }else{
            this.props.navigation.navigate('HomeStack')
        }
       
      }

    render(){
        return(
            <Text>Logging out...</Text>
        )
    }
}