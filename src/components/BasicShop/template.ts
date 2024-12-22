import { 
    AreaChart, Bar, PopIcon, BarChart, CircularChart,
    PieChart, DashboardIcon, DotIcon, FunnelIcon, LineChart,
    ListIcon, RadarChart, WorldIcon, CloudIcon
} from '@/utils/icon/Icons'

// import { BoxPlotOutlined } from '@ant-design/icons'

const imgName = [
    { imgname: 'slide.svg', category: 'picture', show: 'picture' }, // 轮播图
    { imgname: 'picture.svg', category: 'picture', cols: 'half', displayName: 'Picture', show: 'picture' }, // 图片组件
    { imgname: 'garnish1.svg', category: 'picture', cols: 'half', displayName: 'decoration', show: 'decoration' },
    { imgname: 'garnish2.svg', category: 'picture', cols: 'half', displayName: 'decoration', show: 'decoration' },
    { imgname: 'garnish3.svg', category: 'picture', cols: 'half', displayName: 'decoration', show: 'decoration' },
    { imgname: 'garnish4.svg', category: 'picture', cols: 'half', displayName: 'decoration', show: 'decoration' },
    { imgname: 'garnish5.svg', category: 'picture', cols: 'half', displayName: 'decoration', show: 'decoration' },
    { imgname: 'garnish6.svg', category: 'picture', cols: 'half', displayName: 'decoration', show: 'decoration' },
    { imgname: 'garnish7.svg', category: 'picture', cols: 'half', displayName: 'decoration', show: 'decoration' },
    { imgname: 'garnish8.svg', category: 'picture', cols: 'half', displayName: 'decoration', show: 'decoration' },
    { imgname: 'garnish9.svg', category: 'picture', cols: 'half', displayName: 'decoration', show: 'decoration' },
    { imgname: 'garnish10.svg', category: 'picture', cols: 'half', displayName: 'decoration', show: 'decoration' },
    { imgname: 'bigGarnish1.svg', category: 'picture', cols: 'module', displayName: 'decoration', show: 'decoration' },
]

const allTemplate = {
    component: [
        {
            type: 'Area',
            displayName: 'Area',
            icon: AreaChart,
            category: 'component'
        },
        {
            type: 'Bar',
            displayName: 'Bar',
            icon: Bar,
            category: 'component'
        },
        {
            type: 'BubbleMap',
            displayName: 'BubbleMap',
            icon: PopIcon,
            category: 'component'
        },
        {
            type: 'Chart',
            displayName: 'Chart',
            icon: BarChart,
            category: 'component'
        },
        {
            type: 'Circular',
            cols: 'half',
            displayName: 'Circular',
            icon: CircularChart,
            category: 'component'
        },
        {
            type: 'CowEye',
            cols: 'half',
            displayName: 'CowEye',
            icon: PieChart,
            category: 'component'
        },
        {
            type: 'Dashboard',
            cols: 'half',
            displayName: 'Dashboard',
            icon: DashboardIcon,
            category: 'component'
        },
        {
            type: 'Funnel',
            cols: 'half',
            displayName: 'Funnel',
            icon: FunnelIcon,
            category: 'component'
        },
        {
            type: 'Pie',
            cols: 'half',
            displayName: 'Pie',
            icon: PieChart,
            category: 'component'
        },
        {
            type: 'Radar',
            cols: 'half',
            displayName: 'Radar',
            icon: RadarChart,
            category: 'component'
        },
        {
            type: 'DisturbancePointFigure',
            displayName: 'DisturbancePointFigure',
            icon: DotIcon,
            category: 'component'
        },
        // {
        //     type: 'HexagonalMap',
        //     displayName: 'HexagonalMap',
        //     icon: PopIcon,
        //     category: 'component'
        // },
        {
            type: 'Line',
            displayName: 'Line',
            icon: LineChart,
            category: 'component'
        },
        {
            type: 'List',
            displayName: 'List',
            icon: ListIcon,
            category: 'component'
        },
        // {
        //     type: 'Progress',
        //     displayName: 'Progress',
        //     icon: BoxPlotOutlined,
        //     category: 'component'
        // },
        {
            type: 'StatisticalMap',
            displayName: 'StatisticalMap',
            icon: WorldIcon,
            category: 'component'
        },
        // {
        //     type: 'StereoHistogram',
        //     displayName: 'StereoHistogram',
        //     icon: DotIcon,
        //     category: 'component'
        // },
        {
            type: 'WordCloud',
            cols: 'half',
            displayName: 'WordCloud',
            icon: CloudIcon,
            category: 'component'
        },
    ],
    picture: imgName.map((v:any) => {
        if (v.displayName === 'Picture') {
          return { ...v, type: 'Picture' }
        } else if (v.displayName === 'decoration') {
          const isBig = v.imgname.indexOf('big') > -1
          return isBig ? { ...v, type: 'BigDecoration' } : { ...v, type: 'SmallDecoration' }
        } else {
          return { ...v, type: 'Slideshow', cols: 'half', displayName: 'Slideshow' }
        }
      }),
    text: [
        {
            type: 'Carousel',
            cols: 'half',
            displayName: 'Carousel',
            category: 'text'
        },
        {
            type: 'Shape',
            cols: 'half',
            displayName: 'Shape',
            category: 'text'
        },
        {
            type: 'Exhibition',
            cols: 'half',
            displayName: 'Exhibition',
            category: 'text'
        },
        {
            type: 'Text',
            cols: 'half',
            displayName: 'Text',
            category: 'text'
        },
        {
            type: 'Time',
            cols: 'half',
            displayName: 'Time',
            category: 'text'
        }
    ]
}

export default allTemplate