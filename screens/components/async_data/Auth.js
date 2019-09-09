import AsyncStorage from 'react-native'
import { LOGIN } from './Api';
import { _storeAuth } from './Async'



export async function login(username, password) {


  var formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)


  try {
    const res = await fetch(LOGIN, {

     body :formData,
     method: 'POST',
     credentials: 'same-origin',
     mode: 'cors',

    });
    const auth_code = await res.json();
 
    if(auth_code.token != null){
      _storeAuth(auth_code.token)
    }
    

  } catch (e) {
    console.log(e);
  }

}


export function setCampusId(campus_id) {
  localStorage.setItem('campus_id', campus_id)
}

export function setMarket(market) {
  localStorage.setItem('market', market)
}

export function setAccountId(account_id) {
  localStorage.setItem('account_id', account_id)
}
