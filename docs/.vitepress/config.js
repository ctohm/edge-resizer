module.exports = {
    title: '🔳 Edge Resizer',
    description: 'Cache, transform and optimize image responses from your site',
    base:'/',
    themeConfig: {
      repo:'ctohm/edge-resizer',
      docsDir:'docs',
      algolia: {
        appId: 'TASDH2AD23',

        apiKey: 'a7358cc967a5588c214d16522cfd44fb',
        indexName: 'resizer-pictures'
      },
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
          { text: '🔃 Format Conversion',link:'format'},
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
    }

    