import Picture from './Picture/template'
import Slideshow from './Slideshow/template'
import SmallDecoration from './SmallDecoration/template'
import BigDecoration from './BigDecoration/template'
import Shape from './Shape/template'

const imgName = [
  { category: 'picture', show: 'picture' }, // 轮播图
  { imgname: 'picture.svg', category: 'picture', cols: 'half', displayName: 'Picture', show: 'picture' }, // 图片组件
  { category: 'picture', cols: 'half', displayName: 'shape', show: 'picture' }, // 形状组件
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
  // { imgname: 'bigPicture3.png', category: 'picture', cols: 'module', displayName: 'decoration', show: 'decoration' },
]

const PictureLibTemplate = imgName.map(v => {
  if (v.displayName === 'Picture') {
    return { ...v, ...Picture }
  } else if (v.displayName === 'shape') {
    return { ...v, ...Shape }
  } else if (v.displayName === 'decoration') {
    const isBig = v.imgname.indexOf('big') > -1
    return isBig ? { ...v, ...BigDecoration } : { ...v, ...SmallDecoration }
  } else {
    return { ...v, ...Slideshow }
  }
})

export default PictureLibTemplate
