import AsyncStorage from "@react-native-async-storage/async-storage";

// Authenticate user by passing data to cookie and localstorage during signin
export const authenticate = async (res) => {
  // console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
  try {
    const jsonValue = JSON.stringify(res.data.user);
    await AsyncStorage.setItem("UserData", jsonValue);
  } catch (e) {
    // saving error
  }
  // setCookie('jwt', response.data.token);
  // setLocalStorage('user', response.data.useremail);
  // next();
};

export const saveCartData = (response, next) => {
  // console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);

  setLocalStorage("cart", "sachin");
  next();
};

// const check = () =>{
//        const cookieChecked = getCookie('jwt');
//        console.log("mycookies",cookieChecked);
// }
// check();

// Access user info from localstorage
export const isAuth = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("UserData");
    console.log(">>>>>>>..", JSON.parse(jsonValue));
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

console.log(isAuth);

export const signout = async () => {
  await AsyncStorage.removeItem("UserData");

  // next();
};

// export const updateUser = (response, next) => {
//     console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
//     if (typeof window !== 'undefined') {
//         let auth = JSON.parse(localStorage.getItem('user'));
//         auth = response.data;
//         localStorage.setItem('user', JSON.stringify(auth));

//     }
//     next();
// };
