import { AsyncStorage } from "react-native"


export async function _storeAuth (auth_code) {

  try {
    _clearAuth ()
    await AsyncStorage.setItem('auth_code',  auth_code);
    
  } catch (error) {
    console.log(error)
  }


  var campus_buffer = 1


  try {
    const res = await fetch('https://www.iwansell.com/api/get_campus/',{

     credentials: 'same-origin',
     mode: 'cors',
     headers : {
       'Authorization' : 'Token ' + auth_code
     },

    });
    const campus = await res.json();
    var campus_id = '' + campus
    _clearCampus ()
    await AsyncStorage.setItem('campus',  campus_id);
    campus_buffer = campus
    
  } catch (e) {
    console.log(e);
  }




  try {
    const res = await fetch('https://www.iwansell.com/api/campus_code/' + campus_buffer + '/');
    const market = await res.json();
    _clearMarket ()
    await AsyncStorage.setItem('market',  market);
    
  } catch (e) {
    console.log(e);
  }

}




export async function _storeCampus (campus) {

   var campus_id = '' + campus
  _clearCampus ()
    await AsyncStorage.setItem('campus', campus_id );

  
  var market_buffer = ''
  try {
    const res = await fetch('https://www.iwansell.com/api/campus_code/' + campus + '/');
    const market = await res.json();
    market_buffer  = market

    _clearMarket ()
    await AsyncStorage.setItem('market',  market);
    
  } catch (e) {
    console.log(e);
  }
  
  return market_buffer

}




_storeAccountId = async ( account_id ) => {
  try {
    await AsyncStorage.setItem('account_id', JSON.stringify(account_id) );
  } catch (error) {
    // Error saving data
  }
}



export async function _retrieveData ( key ) {
  try {
    
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
      
    }
  } catch (error) {
    //alert("control failed to retrieve")
  }
  return false
}


export async function _clearAuth () {
  try {
    await AsyncStorage.removeItem('auth_code');
    return true
  } catch (error) {
    //alert("control failed to load")
  }

  return false
}



export async function _clearCampus () {
  try {
    await AsyncStorage.removeItem('campus');
    return true
  } catch (error) {
    //alert("control failed to load")
  }

  return false
}



export async function _clearMarket () {
  try {
    await AsyncStorage.removeItem('market');
    return true
  } catch (error) {
    //alert("control failed to load")
  }

  return false
}




