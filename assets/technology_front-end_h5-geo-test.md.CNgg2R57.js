import{_ as l,c as i,o as e,a4 as a}from"./chunks/framework.66Xi2WY6.js";const u=JSON.parse('{"title":"H5 定位权限测试","description":"H5 定位权限测试. 在不同设备上的表现差异","frontmatter":{"description":"H5 定位权限测试. 在不同设备上的表现差异"},"headers":[{"level":2,"title":"1、测试机器","slug":"_1、测试机器","link":"#_1、测试机器","children":[]},{"level":2,"title":"2、APP 测试结果","slug":"_2、app-测试结果","link":"#_2、app-测试结果","children":[{"level":3,"title":"2.1 APP 权限开启","slug":"_2-1-app-权限开启","link":"#_2-1-app-权限开启","children":[]},{"level":3,"title":"2.2 APP 权限关闭","slug":"_2-2-app-权限关闭","link":"#_2-2-app-权限关闭","children":[]}]},{"level":2,"title":"3、结论","slug":"_3、结论","link":"#_3、结论","children":[]}],"relativePath":"technology/front-end/h5-geo-test.md","filePath":"technology/front-end/h5-geo-test.md","lastUpdated":1718683961000}'),t={name:"technology/front-end/h5-geo-test.md"},o=a('<h1 id="h5-定位权限测试" tabindex="-1">H5 定位权限测试 <a class="header-anchor" href="#h5-定位权限测试" aria-label="Permalink to &quot;H5 定位权限测试&quot;">​</a></h1><p>常用的 H5 应用，主要方式是通过 webview 嵌入 app 中，因此有两种定位权限：APP 定位权限、H5 定位权限</p><h2 id="_1、测试机器" tabindex="-1">1、测试机器 <a class="header-anchor" href="#_1、测试机器" aria-label="Permalink to &quot;1、测试机器&quot;">​</a></h2><ul><li>Android：小米 10 pro、Android 12、MIUI 13.0.4</li><li>iOS：iPhone 7 Plus、iOS 15.6.1</li><li>测试页面：<a href="https://w.quteam.com/test/geo/" target="_blank" rel="nofollow noopener noreferrer">https://w.quteam.com/test/geo/</a></li></ul><h2 id="_2、app-测试结果" tabindex="-1">2、APP 测试结果 <a class="header-anchor" href="#_2、app-测试结果" aria-label="Permalink to &quot;2、APP 测试结果&quot;">​</a></h2><h3 id="_2-1-app-权限开启" tabindex="-1">2.1 APP 权限开启 <a class="header-anchor" href="#_2-1-app-权限开启" aria-label="Permalink to &quot;2.1 APP 权限开启&quot;">​</a></h3><ol><li>Android <ul><li>默认/定位询问：定位不可用。易快报 APP 点击商城订购，有触发定位询问</li><li>允许：正常获取定位</li><li>模糊定位：正常</li></ul></li><li>iOS：H5 定位提示“是否允许获取定位” <ul><li>允许 <ul><li>正常获取定位</li><li>模糊定位：正常</li></ul></li><li>拒绝 <ul><li>提示：用户拒绝定位</li><li>拒绝被缓存</li></ul></li></ul></li></ol><div class="warning custom-block"><p class="custom-block-title">iOS 缓存定位操作</p><ul><li>连续拒绝 2-3 次，系统会缓存选项，不再提示“是否允许获取定位”，直接拒绝。</li><li>清除缓存方法：设置 =&gt; 通用 =&gt; 传输或还原 iPhone =&gt; 还原 =&gt; 还原位置与隐私 =&gt; 输入密码 =&gt; 确定还原</li></ul></div><h3 id="_2-2-app-权限关闭" tabindex="-1">2.2 APP 权限关闭 <a class="header-anchor" href="#_2-2-app-权限关闭" aria-label="Permalink to &quot;2.2 APP 权限关闭&quot;">​</a></h3><ul><li>Android：定位不可用</li><li>iOS：定位不可用</li></ul><p><strong>注：</strong></p><ul><li>定位不可用：POSITION_UNAVAILABLE</li><li>用户拒绝定位：PERMISSION_DENIED</li></ul><h2 id="_3、结论" tabindex="-1">3、结论 <a class="header-anchor" href="#_3、结论" aria-label="Permalink to &quot;3、结论&quot;">​</a></h2><ol><li>安卓 <ol><li>安卓 H5 定位跟随 APP 定位权限，同开同关</li><li>APP 安装时默认时询问定位模式，H5 定位无法换起 APP 定位询问</li></ol></li><li>iOS <ol><li>APP 定位权限高于 H5 定位。APP 定位开启权限时，还会有 H5 定位权限。</li><li>H5 发起定位，会唤起 APP 定位询问，允许后，再弹 H5 定位询问</li><li>H5 定位权限设置会缓存，选择“允许”/“拒绝”后，不在询问，需要重设位置才可开启。</li></ol></li></ol>',14),r=[o];function n(s,h,d,_,p,P){return e(),i("div",null,r)}const A=l(t,[["render",n]]);export{u as __pageData,A as default};