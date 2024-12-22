import React, { useMemo, memo, FC } from 'react'
import { dynamic } from 'umi'

import Loading from '../components/LoadingCp'

type categoryType = 'component' | 'picture' | 'text';

type DynamicType = {
  isTpl: boolean
  config: any
  type: string
  category: categoryType
  imgname?: string
  id?: string
};

const cateMap = {
  component: 'ComponentLib',
  picture: 'PictureLib',
  text: 'TextLib'
}

const DynamicFunc = (type: string, category: categoryType) => {
  return dynamic({
    async loader() {
      let Component: FC<{ isTpl: boolean, imgname?:string, id?: string }>
      const { default: Graph } = await import(`@/components/BasicShop/${cateMap[category]}/${type}`)
      Component = Graph

      return (props: DynamicType) => {
        const { config, isTpl, id, imgname } = props
        return <Component {...config} isTpl={isTpl} id={id} imgname={imgname} />
      }
    },
    loading: () => (
      <div style={{ padding: 4 }}>
        <Loading style={{ width: 40, height: 40, margin: 'unset' }} />
      </div>
    ),
  })
}

const DynamicEngine: FC<DynamicType> = memo((props) => {
  const { type, config, category, imgname } = props
  const Dynamic = useMemo(() => {
    return DynamicFunc(type, category)
  }, [config, imgname])

  return <Dynamic {...props} />
})

export default DynamicEngine
