import componentSchema from './ComponentLib/schema'
import pictureSchema from './PictureLib/schema'
import textSchema from './TextLib/schema'

const schema = {
  ...componentSchema,
  ...pictureSchema,
  ...textSchema,
}

export default schema
