import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { english } from './locales/en'
import { bahasa } from './locales/id'

const languageResources: Resource = {
  en: {
    translation: english,
  },
  id: {
    translation: bahasa,
  },
}
export const i18nFactory = (resources: Resource = languageResources) => {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'id',
  })
  return i18n
}
i18nFactory()
export default i18n
