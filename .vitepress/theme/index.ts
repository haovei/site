import { h } from 'vue';
import Theme from 'vitepress/theme';
import './styles/vars.css';
import AsideSponsors from './components/AsideAds.vue';
import GiscusComment from './components/GiscusComment.vue';

export default {
    ...Theme,
    Layout() {
        return h(Theme.Layout, null, {
            // 'aside-ads-before': () => h(AsideSponsors),
            'doc-after': () => h(GiscusComment),
        });
    },
};
