module.exports = {
    title: '🔳 Edge Resizer',
    description: 'Cache, transform and optimize image responses from your site',
    base:'/',
    themeConfig: {
      repo:'ctohm/edge-resizer',
      docsDir:'docs',
      sidebar: {
         
        '/': getGuideSidebar()
      },
      nav: [ {
        text:'Images.weserv.nl',link:'https://images.weserv.nl/'        },
        {  text:'Cloudflare Workers',link:'https://developers.cloudflare.com/workers/'      }
      ]
    }
  }

  function getGuideSidebar() {
    return   [
          { text: '🍬 About', link: 'about' },
          { text: '🔌 Routing Strategy', link: 'routing' },
          
          { text: '🔳 Resize, Crop, Align',link:'resizing_and_cropping'},
          { text: '🔃 Format Conversion',link:'conversion'},
          { text: '♻️ Effects & Filters', link: 'transformations' },
          { text: '💊 Feature Detection',link:'feature_detection'},
          { text: '🚀 Caching', link: 'caching' },
          { text: '📡 Deploying', link: 'deploy',children:[
          { text: '🔗 Hotlink at will', link: 'hotlinking' },
          { text: '📙 Use it as a library', link: 'library' }
          ]},
          { text: '⛳ Use Cases', link: 'use_cases' },
          { text: '💥 Troubleshooting', link: 'troubleshooting' }
        ]
     /* },
      {
        text: 'Advanced',
        children: [
          { text: 'Frontmatter', link: '/guide/frontmatter' },
          { text: 'Theming', link: '/guide/theming' },
          { text: 'API Reference', link: '/guide/api' },
          {
            text: 'Differences from Vuepress',
            link: '/guide/differences-from-vuepress'
          }
        ]
      }
    ]*/
  }