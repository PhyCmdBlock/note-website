import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'

const vitePressOptions = {
  title: "PhyCmdBlock的做题笔记",
  description: "我的做题思考",
  lang: "zh-Hans-CN",
  lastUpdated: true,
  markdown: {
    math: true,
  },
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '简介', link: '/hello' }
    ],


    socialLinks: [
      { icon: 'github', link: 'https://github.com/PhyCmdBlock/note-website' },
      { 
        icon: {
          svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <image href="/img/blog.jpg" 
                         width="24" height="24" 
                         preserveAspectRatio="xMidYMid slice"/>
                </svg>`
        },
        link: 'https://alsbb.top'
      }
    ],

    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索",
                buttonAriaLabel: "搜索",
              },
              modal: {
                displayDetails: "显示详细列表",
                resetButtonTitle: "重置搜索",
                backButtonTitle: "关闭搜索",
                noResultsText: "没有结果",
                footer: {
                  selectText: "选择",
                  navigateText: "导航",
                  closeText: "关闭",
                },
              },
            },
          },
        }
      },
    },

    outline: {
      label: "页面导航",
    },
    lastUpdated: {
      text: "最后更新于",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    darkModeSwitchLabel: "外观",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "项目目录",
    notFound: {
      quote: "网站中找不到这个页面。",
      linkText: "返回首页",
      linkLabel: "返回首页",
    },
  }
}

export default defineConfig(withSidebar(vitePressOptions));
