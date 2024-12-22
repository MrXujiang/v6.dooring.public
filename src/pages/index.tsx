// @ts-nocheck
import './index.css';
import logo from '@/assets/logo.png';
import door from '@/assets/door.gif';
import code from '@/assets/qtqd_code.png';

export default function Home() {
  return (
      <main className="landingPage">
          <div className="wepLogo">
            <img src={logo} alt="V6.Dooring可视化大屏编辑器" />
          </div>

          <button className="priviteBtn quick">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <a className="text" href="/editor" target='_blank'>立即编辑</a>
          </button>

          <button className="priviteBtn quick2">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <a className="text" href="https://dooring.vip" target='_blank'>搭建系列</a>
          </button>

          <button className="priviteBtn quick-right">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <a className="text" href="https://github.com/MrXujiang/v6.dooring.public" target='_blank'>Github</a>
          </button>

          <div className="slogan">
            <div className="typewriter">
                <div className="slide"><i></i></div>
                <div className="paper"></div>
                <div className="keyboard"></div>
            </div>
            <div>V6.Dooring, 一款开箱即用的可视化大屏搭建解决方案</div>
          </div>

          <div className="demo">
            <img src={door} alt="V6.Dooring可视化大屏编辑器" />
          </div>


          <div className="module-title">
            更多优质搭建类产品
          </div>

          <div className="module-content review">
            <div className="card2">
              <div className="content">
                <p className="heading">H5-Dooring页面搭建平台
                </p><p className="para">
                  轻松帮助企业快速搭建H5页面，无需开发，无需设计，无需运营，只需拖拉拽，即可生成H5页面。
                </p>
                <button className="btn"><a href="https://dooring.vip" target='_blank'>立即体验</a></button>
              </div>
            </div>
            <div className="card2">
              <div className="content">
                <p className="heading">Dooring智图
                </p><p className="para">
                  企业级多租户图片设计协同管理平台, 支持图片海报设计, 图片分类管理, 模版管理, 图片标注 图片审核, 组织权限管理, 图片分享等功能.
                </p>
                <button className="btn"><a href="https://magic.dooring.vip" target='_blank'>立即体验</a></button>
              </div>
            </div>
            <div className="card2">
              <div className="content">
                <p className="heading">橙子轻文档
                </p><p className="para">
                  基于flowmix/docx文档引擎的轻文档平台, 支持文档的创建, 文档的编辑, 文档的分享, 文档的下载, 文档的预览, 文档的搜索, 文档的收藏, 文档的评论等功能.
                </p>
                <button className="btn"><a href="http://orange.turntip.cn" target='_blank'>立即体验</a></button>
              </div>
            </div>
            <div className="card2">
              <div className="content">
                <p className="heading">橙子试卷
                </p><p className="para">
                  试卷表单搭建平台, 支持表单设计, 表单导入, 表单导出, 表单预览, 表单分享, 表单统计等功能.
                </p>
                <button className="btn"><a href="https:/form.dooring.vip" target='_blank'>立即体验</a></button>
              </div>
            </div>
          </div>

          <div className="module-title">
            可视化低代码技术分享 & 技术实践 & 技术交流群
          </div>
          <div style={{textAlign: 'center'}}>
            <img src={code} alt="可视化搭建技术分享" style={{width: 192, marginBottom: 60}} />
          </div>
      </main>
  );
}

