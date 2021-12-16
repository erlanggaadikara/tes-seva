import {
  filterNonLetterOrSpaceCharacters,
  capitalizeWords,
  isAmountValid,
  replaceSuffixWith,
  isZipCodeValid,
  isEmailValid,
  prefixWithZero,
  convertSlashesInStringToVerticalLines,
} from './stringUtils'

describe('string utils tests', () => {
  test('should filter out non letter or space character', () => {
    expect(
      filterNonLetterOrSpaceCharacters(
        'test123&`~#$% ha*()_+ha@@@ success!?":;,.',
      ),
    ).toEqual('test haha success')
  })
  test('should uppercase for single word', () => {
    expect(capitalizeWords('ACEH BARAT')).toEqual('Aceh Barat')
    expect(capitalizeWords('AGAM')).toEqual('Agam')
    expect(capitalizeWords('ABCD-EFG')).toEqual('Abcd-Efg')
    expect(capitalizeWords('NANA ABCD-EFG')).toEqual('Nana Abcd-Efg')
    expect(capitalizeWords('NANA HE-ABCD/EFG')).toEqual('Nana He-Abcd/Efg')
  })
  test('should return true if amount is valid', () => {
    expect(isAmountValid('ACEH BARAT')).toBeFalsy()
    expect(isAmountValid('001234567')).toBeFalsy()
    expect(isAmountValid('0012')).toBeFalsy()
    expect(isAmountValid('12')).toBeFalsy()
    expect(isAmountValid('123.456.789')).toBeFalsy()
    expect(isAmountValid('123456789')).toBeTruthy()
  })
  test('should replace suffix with new provided suffix', () => {
    expect(replaceSuffixWith('https://path/dummy_file.png', '.webp')).toEqual(
      'https://path/dummy_file.webp',
    )
    expect(replaceSuffixWith('https://path/dummy_._file.png', 'webp')).toEqual(
      'https://path/dummy_._file.webp',
    )
    expect(replaceSuffixWith('dummy_file.png', '.jpg')).toEqual(
      'dummy_file.jpg',
    )
  })
  test('should return true if zipCode is valid', () => {
    expect(isZipCodeValid('ACEH BARAT')).toBeFalsy()
    expect(isZipCodeValid('123ab')).toBeFalsy()
    expect(isZipCodeValid('00121')).toBeFalsy()
    expect(isZipCodeValid('1.2.3')).toBeFalsy()
    expect(isZipCodeValid('123456')).toBeFalsy()
    expect(isZipCodeValid('12345')).toBeTruthy()
  })
  test('should return true if email is valid', () => {
    expect(isEmailValid('ACEH BARAT')).toBeFalsy()
    expect(isEmailValid('00/121@qq.')).toBeFalsy()
    expect(isEmailValid('1.2.3@qq')).toBeFalsy()
    expect(isEmailValid('123456.com')).toBeFalsy()
    expect(isEmailValid('zxcasd_qw21@qq.com.cn')).toBeTruthy()
  })
  test('should add the leading 0 when the string does not meet 2 bits', () => {
    expect(prefixWithZero('A')).toEqual('0A')
    expect(prefixWithZero('AB')).toEqual('AB')
    expect(prefixWithZero(9)).toEqual('09')
    expect(prefixWithZero(19)).toEqual('19')
  })

  test('should convert all / to |', () => {
    expect(convertSlashesInStringToVerticalLines('2.4 A/T DSL Lux')).toEqual(
      '2.4 A|T DSL Lux',
    )
    expect(convertSlashesInStringToVerticalLines('2.4 A/T DSL / Lux')).toEqual(
      '2.4 A|T DSL | Lux',
    )
  })
})
