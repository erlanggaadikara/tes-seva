import { Location } from 'history'

export const resetStateParam = <T>(location: Location<T>, key: string) => {
  if (!location.state) {
    return
  }
  location.state = { ...location.state, [key]: undefined }
}
