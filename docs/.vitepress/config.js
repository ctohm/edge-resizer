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
          { text: '🍬 About', link: '/about.html' },
          { text: '🔌 Routing Strategy', link: 'routing.html' },
          { text: '📡 Usage modes',children:[
          { text: '🔗 Hotlink at will', link: 'hotlinking.html' },
          { text: '🌎 Deploy your own', link: 'deploy.html' },
          { text: '📙 Use it as a library', link: 'library.html' }
          ]},
          { text: '♻️ Transformations', link: 'transformations.html' },
          { text: '🔃 Conversion',link:'conversion.html'},
          { text: '🚀 Caching', link: 'caching.html' },
          { text: '⛳ Use Cases', link: 'use_cases.html' },
          { text: '💥 Troubleshooting', link: 'troubleshooting.html' }
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