import { ResizerRouter } from '../../lib/ResizerRouter.mjs'

import test from "ava";

const urls = [
    //"https://resizer.pictures/_/riff.one/images/banner_lysto.png",
    //"https://resizer.pictures/_/riff.one/images/banner_lysto.png?ch=250",
    //"https://resizer.pictures/_/riff.one/images/designcue-unsplash.jpg",
    //"https://resizer.pictures/_/riff.one/img/designcue-unsplash.jpg?hue=150&amp;w=700",
    //"https://resizer.pictures/_/riff.one/img/dice.png",
    "https://resizer.pictures/_h=210_w=180_contain/riff.one/dice_200.png",
    "https://resizer.pictures/_h=210_w=180_cover/riff.one/dice_200.png",
    "https://resizer.pictures/_h=210_w=180_fill/riff.one/dice_200.png",
    "https://resizer.pictures/_h=210_w=180_inside/riff.one/dice_200.png",
    "https://resizer.pictures/_h=210_w=180_outside/riff.one/dice_200.png",
    "https://resizer.pictures/_h=210_w=180_w=200_h=150/riff.one/dice_200.png",
    "https://resizer.pictures/a=attention_w=230_h=220_cover_we/riff.one/fox.avif?fpx=0.3&amp;fpy=0.6",
    "https://resizer.pictures/a=attention_w=230_h=220_cover_we/riff.one/fox.avif?fpx=0.3&fpy=0.6",
    "https://resizer.pictures/a=entropy_w=230_h=220_cover_we/riff.one/fox.avif?fpx=0.3&amp;fpy=0.6",
    "https://resizer.pictures/a=entropy_w=230_h=220_cover_we/riff.one/fox.avif?fpx=0.3&fpy=0.6",
    "https://resizer.pictures/a=focal_w=230_h=220_cover_we/riff.one/fox.avif?fpx=0.1&amp;fpy=0.4",
    "https://resizer.pictures/a=focal_w=230_h=220_cover_we/riff.one/fox.avif?fpx=0.1&fpy=0.4",
    "https://resizer.pictures/auto/riff.one/images/dice.png",
    "https://resizer.pictures/cbg=ccc_w=470_cx=130_cy=50_cw=180_ch=210_contain/riff.one/designcue-unsplash-430.jpg",
    "https://resizer.pictures/ch=150_w=700/riff.one/img/designcue-unsplash.jpg",
    "https://resizer.pictures/ch=250_cx=20_cw=610_auto_q=0.5/riff.one/images/banner_lysto.png",
    "https://resizer.pictures/ch=250_cx=80_cw=470_auto_q=0.5/riff.one/images/banner_lysto.png",
    "https://resizer.pictures/contain_we_cbg=77cccccc_h=190_w=220_a=bottom-left/riff.one/img/dice_128.png",
    "https://resizer.pictures/contain_we_cbg=77cccccc_h=190_w=220_a=bottom-right/riff.one/img/dice_128.png",
    "https://resizer.pictures/contain_we_cbg=77cccccc_h=190_w=220_a=bottom/riff.one/img/dice_128.png",
    "https://resizer.pictures/contain_we_cbg=77cccccc_h=190_w=220_a=center/riff.one/img/dice_128.png",
    "https://resizer.pictures/contain_we_cbg=77cccccc_h=190_w=220_a=left/riff.one/img/dice_128.png",
    "https://resizer.pictures/contain_we_cbg=77cccccc_h=190_w=220_a=right/riff.one/img/dice_128.png",
    "https://resizer.pictures/contain_we_cbg=77cccccc_h=190_w=220_a=top-left/riff.one/img/dice_128.png",
    "https://resizer.pictures/contain_we_cbg=77cccccc_h=190_w=220_a=top-right/riff.one/img/dice_128.png",
    "https://resizer.pictures/contain_we_cbg=77cccccc_h=190_w=220_a=top/riff.one/img/dice_128.png",
    "https://resizer.pictures/cx=700_cy=500_precrop_w=400_h=300_fill_q=100_webp_flop_hue=260/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/cx=700_cy=500_precrop_w=400_h=300_fill_q=10_webp_flop_hue=260/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/dpr=2_w=200/riff.one/images/designcue-unsplash.jpg",
    "https://resizer.pictures/dpr=2_w=200/riff.one/images/dice.png",
    "https://resizer.pictures/dpr=3_w=200/riff.one/images/designcue-unsplash.jpg",
    "https://resizer.pictures/dpr=4_w=200/riff.one/images/dice.png",
    "https://resizer.pictures/h=150_il_w=150/riff.one/images/designcue-unsplash.jpg",
    "https://resizer.pictures/hue=150_w=700/riff.one/img/designcue-unsplash.jpg",
    "https://resizer.pictures/il_w=150_h=150/riff.one/images/designcue-unsplash.jpg",
    "https://resizer.pictures/output=auto/riff.one/images/dice.png",
    "https://resizer.pictures/output=png/riff.one/images/designcue-unsplash.jpg",
    "https://resizer.pictures/output=webp/riff.one/images/dice.png",
    "https://resizer.pictures/page=1/riff.one/img/multi_res.ico",
    "https://resizer.pictures/page=2/riff.one/img/multi_res.ico",
    "https://resizer.pictures/page=3/riff.one/img/multi_res.ico",
    "https://resizer.pictures/png/riff.one/images/designcue-unsplash.jpg",
    "https://resizer.pictures/precrop_w=300_cx=130_cy=50_cw=180_ch=200_cover/riff.one/designcue-unsplash-430.jpg",
    "https://resizer.pictures/tiff/riff.one/images/designcue-unsplash.jpg",
    "https://resizer.pictures/w=150/riff.one/img/fox.avif",
    "https://resizer.pictures/w=150/riff.one/img/sample1.heic",
    "https://resizer.pictures/w=150_auto/riff.one/img/designcue-unsplash.jpg",
    "https://resizer.pictures/w=150_h=150/riff.one/images/designcue-unsplash.jpg",
    "https://resizer.pictures/w=150_h=150/riff.one/images/dice.png",
    "https://resizer.pictures/w=150_n=1/riff.one/img/sample_3pages.pdf",
    "https://resizer.pictures/w=150_output=auto/riff.one/img/designcue-unsplash.jpg",
    "https://resizer.pictures/w=150_output=gif/riff.one/images/designcue-unsplash.jpg",
    "https://resizer.pictures/w=150_output=jpg/riff.one/images/designcue-unsplash.jpg",
    "https://resizer.pictures/w=150_output=png/riff.one/images/designcue-unsplash.jpg",
    "https://resizer.pictures/w=150_output=webp/riff.one/images/designcue-unsplash.jpg",
    "https://resizer.pictures/w=150_page=2/riff.one/img/multi_res.ico",
    "https://resizer.pictures/w=200_filt=duotone/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=200_filt=duotone/riff.one/designcue-unsplash.jpg?&gt;start=C60&amp;stop=96F",
    "https://resizer.pictures/w=200_filt=duotone/riff.one/designcue-unsplash.jpg?start=06C&amp;stop=0C6",
    "https://resizer.pictures/w=200_filt=greyscale/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=200_filt=negate/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=200_filt=sepia/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=200_h=150/riff.one/images/printable_chart.png",
    "https://resizer.pictures/w=200_h=150_cx=20_cy=20_fit=cover/riff.one/images/printable_chart.png",
    "https://resizer.pictures/w=256_h=192/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=300/riff.one/img/pig.gif",
    "https://resizer.pictures/w=300_cx=130_cy=50_cw=180_ch=210/riff.one/images/printable_chart.png",
    "https://resizer.pictures/w=300_h=150_page=0_n=1_png/riff.one/banners2.tiff",
    "https://resizer.pictures/w=300_h=200/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=300_n=2/riff.one/img/sample_3pages.pdf",
    "https://resizer.pictures/w=300_n=3_page=0/riff.one/img/pig.gif",
    "https://resizer.pictures/w=300_n=6/riff.one/img/pig.gif",
    "https://resizer.pictures/w=300_page=1_n=1_png/riff.one/banners2.tiff",
    "https://resizer.pictures/w=300_page=1_n=2/riff.one/img/sample_3pages.pdf",
    "https://resizer.pictures/w=300_page=2/riff.one/img/pig.gif",
    "https://resizer.pictures/w=300_page=2_n=1/riff.one/img/sample_3pages.pdf",
    "https://resizer.pictures/w=300_page=2_n=1_png/riff.one/banners2.tiff",
    "https://resizer.pictures/w=400_h=300_cx=82_cy=67_ch=137_cw=224_fit=cover/riff.one/images/printable_chart.png",
    "https://resizer.pictures/w=400_l=0/riff.one/dice.png",
    "https://resizer.pictures/w=400_l=6_af/riff.one/dice.png",
    "https://resizer.pictures/w=400_q=100/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=420/riff.one/img/dice.png?mod=0.8,2,114",
    "https://resizer.pictures/w=470_cx=130_cy=50_cw=180_ch=210_cover/riff.one/designcue-unsplash-430.jpg",
    "https://resizer.pictures/w=600_h=450_webp_cw=200_ch=150_cover/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=600_h=450_webp_cw=200_ch=150_cy=150_cover/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=600_h=450_webp_cw=200_ch=150_cy=300_cover/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=600_h=450_webp_cx=200_cw=200_ch=150_cover/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=600_h=450_webp_cx=200_cw=200_ch=150_cy=150_cover/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=600_h=450_webp_cx=200_cw=200_ch=150_cy=300_cover/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=600_h=450_webp_cx=400_cw=200_ch=150_cover/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=600_h=450_webp_cx=400_cw=200_ch=150_cy=150_cover/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/w=600_h=450_webp_cx=400_cw=200_ch=150_cy=300_cover/riff.one/designcue-unsplash.jpg",
    "https://resizer.pictures/we_h=210_w=210_bg=19C/riff.one/dice_200.png",
    "https://resizer.pictures/we_h=210_w=210_blur=2/riff.one/dice_200.png",
    "https://resizer.pictures/we_h=210_w=210_con=7/riff.one/dice_200.png",
    "https://resizer.pictures/we_h=210_w=210_gam=2/riff.one/dice_200.png",
    "https://resizer.pictures/we_h=210_w=210_hue=160/riff.one/dice_200.png",
    "https://resizer.pictures/we_h=210_w=210_mod=1.4/riff.one/dice_200.png",
    "https://resizer.pictures/we_h=210_w=210_sat=0.3/riff.one/dice_200.png",
    "https://resizer.pictures/we_h=210_w=210_sharp=3/riff.one/dice_200.png",
    "https://resizer.pictures/we_h=210_w=210_tint=red/riff.one/dice_200.png",
    "https://resizer.pictures/webp/riff.one/images/dice.png",
    'https://resizer.pictures/auto/deploy.workers.cloudflare.com/favicon.ico'
];

for (let href of urls) {

    test('matches pattern basic transform on url ' + href, (t) => {

        const match = ResizerRouter.transformationsGroupRegex.exec(href)
        t.truthy(match && match.groups.transformations, 'transformations must be detected by the router for ' + href);
        t.truthy(match && match.groups.originhost, 'originhost must be detected by the router for ' + href);
        t.truthy(match && match.groups.pathname, 'pathname must be detected by the router for ' + href);


    });
    if (href.includes('/riff.one/')) {
        let [before_domain, after_domain] = href.split('riff.one')
        let comma_separated = [before_domain.replace(/_/g, ',').replace('/,', '/'), after_domain].join('riff.one')
        test('matches pattern url separated by commas on ' + comma_separated, (t) => {

            const match = ResizerRouter.transformationsGroupRegex.exec(comma_separated)
            t.truthy(match && match.groups.transformations, 'transformations must be detected by the router for ' + comma_separated);
            t.truthy(match && match.groups.originhost, 'originhost must be detected by the router for ' + comma_separated);
            t.truthy(match && match.groups.pathname, 'pathname must be detected by the router for ' + comma_separated);


        });

        let href_no_domain = href.replace('riff.one/', 'subfolder/')
        test('matches pattern url with no domain on ' + href_no_domain, (t) => {

            const match = ResizerRouter.transformationsGroupNoDomainRegex.exec(href_no_domain)
            t.truthy(match && match.groups.transformations, 'transformations must be detected by the router for ' + href_no_domain);
            t.truthy(match && match.groups.dummyhost, 'dummyhost must be detected by the router for ' + href_no_domain);
            t.truthy(match && match.groups.pathname, 'pathname must be detected by the router for ' + href_no_domain);


        });

    }
}