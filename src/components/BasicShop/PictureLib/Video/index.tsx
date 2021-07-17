import React, { memo } from 'react'
import { Player, BigPlayButton } from 'video-react'

import logo from '@/assets/video.png'
import { VideoConfigType } from './schema'

import './index.css'

const VideoPlayer = memo((props: VideoConfigType & { isTpl: boolean }) => {
  const { poster, url, isTpl } = props
  return (
    <>
      {isTpl
        ? (
          <div>
            <img src={logo} alt="video"></img>
          </div>
        )
        : (
          <div>
            <Player
              playsInline
              poster={poster[0].url}
              src={url || 'https://gossv.vcg.com/cmsUploadVideo/creative/1移轴/7月移轴.mp4'}
            >
              <BigPlayButton position="center" />
            </Player>
          </div>
        )}
    </>
  )
})

export default VideoPlayer
