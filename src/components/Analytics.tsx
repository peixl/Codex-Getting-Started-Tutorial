import Script from 'next/script';

const GA_ID = 'G-LZHQKD4CN0';
const GA_PROXY = 'https://ga-proxy.ifq.ai';
const GA_DIRECT = 'https://www.googletagmanager.com';
const COOKIE_DOMAIN = 'ifq.ai';

export function Analytics() {
  return (
    <Script id="ga-smart-loader" strategy="afterInteractive">
      {`(function(){
  var GA_ID='${GA_ID}';
  var PROXY='${GA_PROXY}';
  var DIRECT='${GA_DIRECT}';
  var COOKIE_DOMAIN='${COOKIE_DOMAIN}';
  var TIMEOUT=3000;
  var host=location.hostname;

  if(host==='localhost'||host==='127.0.0.1'||host==='0.0.0.0')return;

  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  window.gtag=gtag;
  gtag('js',new Date());

  function loadScript(src,onOk,onFail){
    var s=document.createElement('script');
    s.async=true;
    s.src=src;
    if(onOk)s.onload=onOk;
    if(onFail)s.onerror=onFail;
    document.head.appendChild(s);
    return s;
  }

  function configGA(transportUrl){
    var cfg={
      first_party_collection:true,
      cookie_domain:COOKIE_DOMAIN,
      page_title:document.title,
      page_location:location.href
    };
    if(transportUrl)cfg.transport_url=transportUrl;
    gtag('config',GA_ID,cfg);
  }

  var fallbackTimer=setTimeout(function(){
    loadScript(DIRECT+'/gtag/js?id='+GA_ID,function(){configGA();});
  },TIMEOUT);

  loadScript(PROXY+'/gtag/js?id='+GA_ID,function(){
    clearTimeout(fallbackTimer);
    configGA(PROXY);
  },function(){
    clearTimeout(fallbackTimer);
    loadScript(DIRECT+'/gtag/js?id='+GA_ID,function(){configGA();});
  });
})();`}
    </Script>
  );
}