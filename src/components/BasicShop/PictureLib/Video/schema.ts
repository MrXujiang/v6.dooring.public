import {
  TextConfigType,
  UploadConfigType,
  TextDefaultType,
  UploadDefaultType,
} from '@/core/FormComponents/types'

export type VideoEditDataType = Array<UploadConfigType | TextConfigType>

export interface VideoConfigType {
  poster: UploadDefaultType;
  url: TextDefaultType;
}

export interface VideoType {
  editData: VideoEditDataType;
  config: VideoConfigType
}

const Video: VideoType = {
  editData: [
    {
      key: 'poster',
      name: '视频封面',
      type: 'Upload',
    },
    {
      key: 'url',
      name: '视频链接',
      type: 'Text',
    },
  ],
  config: {
    poster: [
      {
        uid: '001',
        name: 'image.png',
        status: 'done',
        url: 'http://49.234.61.19/uploads/1_1740c6fbcd9.png',
      },
    ],
    url: '',
  },
}

export default Video
