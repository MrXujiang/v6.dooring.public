import Chart from './Chart/template'
import Bar from './Bar/template'
import Line from './Line/template'
import Circular from './Circular/template'
import Pie from './Pie/template'
import Area from './Area/template'
import Radar from './Radar/template'
import Funnel from './Funnel/template'
import Dashboard from './Dashboard/template'
import CowEye from './CowEye/template'
import WordCloud from './WordCloud/template'
import List from './List/template'
// import StereoHistogram from './StereoHistogram/template'
import BubbleMap from './BubbleMap/template'
import DisturbancePointFigure from './DisturbancePointFigure/template'
import StatisticalMap from './StatisticalMap/template'
// import HexagonalMap from './HexagonalMap/template'

const componentLibTemplate = [
  Chart,
  Bar,
  Line,
  Area,
  Circular,
  Pie,
  Radar,
  Funnel,
  Dashboard,
  CowEye,
  WordCloud,
  List,
  // StereoHistogram,
  BubbleMap,
  DisturbancePointFigure,
  StatisticalMap,
  // HexagonalMap,
]

const ComponentLibTemplate = componentLibTemplate.map(v => ({ ...v, category: 'component' }))

export default ComponentLibTemplate
