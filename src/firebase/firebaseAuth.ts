import firebase from 'firebase/app'
import 'firebase/auth'
import getCurrentEnvironment from 'helpers/environments'

firebase.initializeApp(getCurrentEnvironment.firebaseConfigs)
firebase.auth().useDeviceLanguage()
export const auth = firebase.auth()

export const getRecaptchaToken = async (
  currentLanguage: string,
  buttonId: string,
) => {
  auth.languageCode = currentLanguage
  return await new firebase.auth.RecaptchaVerifier(buttonId, {
    size: 'invisible',
  }).verify()
}
