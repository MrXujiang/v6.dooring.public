import Text from './Text/template'
import Carousel from './Carousel/template'
import Exhibition from './Exhibition/template'
import Time from './Time/template'

const textLibTemplate = [
  Text,
  Carousel,
  Time,
  Exhibition,
]
const TextLibTemplate = textLibTemplate.map(v => ({ ...v, category: 'text' }))

export default TextLibTemplate
