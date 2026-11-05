/* No optional scripts, maps or attribution storage before explicit consent. */
(function () {
  'use strict';
  var key = 'street_consent_v1', choice = null;
  try { var saved=JSON.parse(localStorage.getItem(key)); if(saved && Date.now()-saved.at<15552000000) choice=saved.accepted===true; } catch(e) {}
  function load(src){var el=document.createElement('script');el.async=true;el.src=src;document.head.appendChild(el);}
  function start(){
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};
    gtag('consent','default',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});
    gtag('js',new Date());
    gtag('config','G-HJLEYG99P3',{page_location:location.origin+location.pathname,page_referrer:document.referrer.split('?')[0]});
    gtag('config','AW-18356197486');
    load('https://www.googletagmanager.com/gtag/js?id=G-HJLEYG99P3');
    var f=window.fbq=function(){f.callMethod?f.callMethod.apply(f,arguments):f.queue.push(arguments);};f.queue=[];f.loaded=true;f.version='2.0';
    fbq('set','autoConfig',false,'1688040235780349');fbq('consent','grant');fbq('init','1688040235780349');fbq('track','PageView');
    load('https://connect.facebook.net/en_US/fbevents.js');
    document.querySelectorAll('[data-consent-src]').forEach(function(el){el.src=el.dataset.consentSrc;});
    document.getElementById('map-notice').hidden=true;
  }
  window.streetConsent={allowed:function(){return choice===true;},choose:function(accepted){
    if(!accepted){
      if(window.fbq)fbq('consent','revoke');
      if(window.gtag)gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      try{sessionStorage.removeItem('sb_utms');}catch(e){}
      document.cookie.split(';').forEach(function(c){var n=c.split('=')[0].trim();if(!/^(_ga|_gid|_gat|_gcl|_fbp|_fbc)/.test(n))return;
        var domains=[null,location.hostname,'.'+location.hostname];var parts=location.hostname.split('.');if(parts.length>2)domains.push('.'+parts.slice(-2).join('.'));
        domains.forEach(function(d){document.cookie=n+'=; Max-Age=0; Path=/'+(d?'; Domain='+d:'');});
      });
    }
    try{localStorage.setItem(key,JSON.stringify({accepted:accepted,at:Date.now()}));}catch(e){}
    choice=accepted;location.reload();
  }};
  document.getElementById('privacy-banner').hidden=choice!==null;
  if(choice===true)start();
})();
