import {
  featureToggles,
  FeatureTogglesPair,
} from './featureToggles/featureToggles'
import { Environment } from '../models/models'

type EnvironmentConfig = {
  name: string
  displayDebugErrors: boolean
  amplitude: {
    apiKey: string
  }
  firebaseConfigs: {
    apiKey: string | undefined
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  }
  bankLinkingUrl: string
  apiBaseUrl: string
  featureToggles: FeatureTogglesPair
  isShowMobileConsole?: boolean
}

const FirebaseAPIKey = process.env.REACT_APP_FIREBASE_API_KEY

const environments = {
  localhost: {
    name: 'Localhost',
    displayDebugErrors: true,
    amplitude: {
      apiKey: '4e67ca5fd44e8a8e7e7773bc3ababa00',
    },
    firebaseConfigs: {
      apiKey: 'AIzaSyBi0MBSiB88xCvbti1T8plNTreX-bzZfAw',
      authDomain: 'torq-308606.firebaseapp.com',
      projectId: 'torq-308606',
      storageBucket: 'torq-308606.appspot.com',
      messagingSenderId: '349467238591',
      appId: '1:349467238591:web:757b788dc92fbb83e5a60a',
    },
    bankLinkingUrl: 'https://cdn.onebrick.io/sandbox-widget/',
    apiBaseUrl:
      process.env.REACT_APP_SERVER_BASE_URL || 'https://api.torqio.com',
    featureToggles: featureToggles[Environment.Localhost],
    isShowMobileConsole: true,
  },
  development: {
    name: 'Development',
    displayDebugErrors: true,
    amplitude: {
      apiKey: '4e67ca5fd44e8a8e7e7773bc3ababa00',
    },
    firebaseConfigs: {
      apiKey: 'AIzaSyBi0MBSiB88xCvbti1T8plNTreX-bzZfAw',
      authDomain: 'torq-308606.firebaseapp.com',
      projectId: 'torq-308606',
      storageBucket: 'torq-308606.appspot.com',
      messagingSenderId: '349467238591',
      appId: '1:349467238591:web:757b788dc92fbb83e5a60a',
    },
    bankLinkingUrl: 'https://cdn.onebrick.io/sandbox-widget/',
    apiBaseUrl: 'https://api.torqio.com',
    featureToggles: featureToggles[Environment.Development],
    isShowMobileConsole: false,
  },

  staging: {
    name: 'Staging',
    displayDebugErrors: true,
    amplitude: {
      apiKey: '4e58240672792efc470e5d1322804d20',
    },
    firebaseConfigs: {
      apiKey: FirebaseAPIKey,
      authDomain: 'torq-staging-310201.firebaseapp.com',
      projectId: 'torq-staging-310201',
      storageBucket: 'torq-staging-310201.appspot.com',
      messagingSenderId: '828696580488',
      appId: '1:828696580488:web:b587e5f2bc0dc81529aa3d',
    },
    bankLinkingUrl: 'https://cdn.onebrick.io/sandbox-widget/',
    apiBaseUrl: 'https://api.staging.torq.id',
    featureToggles: featureToggles[Environment.Staging],
  },

  production: {
    name: 'Production',
    displayDebugErrors: false,
    amplitude: {
      apiKey: '86bd0da4661aa24a7d2c9f658197b49a',
    },
    firebaseConfigs: {
      apiKey: FirebaseAPIKey,
      authDomain: 'torq-prod.firebaseapp.com',
      projectId: 'torq-prod',
      storageBucket: 'torq-prod.appspot.com',
      messagingSenderId: '978280076410',
      appId: '1:978280076410:web:a15e9c98f7f28d5492d7c3',
    },
    bankLinkingUrl: 'https://cdn.onebrick.io/widget/',
    apiBaseUrl: 'https://api.torq.id',
    featureToggles: featureToggles[Environment.Production],
  } as EnvironmentConfig,
}

type EnvironmentKey = keyof typeof environments

function getCurrentEnvironment(): EnvironmentConfig {
  const key: EnvironmentKey =
    (process.env.REACT_APP_ENVIRONMENT as EnvironmentKey) || 'localhost'

  return environments[key]
}

export default getCurrentEnvironment()
