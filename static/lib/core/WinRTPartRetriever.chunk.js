/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[16],{406:function(Aa,ua,y){y.r(ua);var oa=y(1),ja=y(221);Aa=y(396);var ka=y(89);y=y(323);var ha={},da=function(ca){function w(x,n){var e=ca.call(this,x,n)||this;e.url=x;e.range=n;e.status=ja.a.NOT_STARTED;return e}Object(oa.c)(w,ca);w.prototype.start=function(x){var n=this;"undefined"===typeof ha[this.range.start]&&(ha[this.range.start]={QI:function(e){var a=atob(e),b,f=a.length;e=new Uint8Array(f);for(b=0;b<f;++b)e[b]=a.charCodeAt(b);
a=e.length;b="";for(var h=0;h<a;)f=e.subarray(h,h+1024),h+=1024,b+=String.fromCharCode.apply(null,f);n.QI(b,x)},Ria:function(){n.status=ja.a.ERROR;x({code:n.status})}},window.external.notify(this.url),this.status=ja.a.STARTED);n.Jz()};return w}(Aa.ByteRangeRequest);Aa=function(ca){function w(x,n,e,a){x=ca.call(this,x,e,a)||this;x.yv=da;return x}Object(oa.c)(w,ca);w.prototype.Gt=function(x,n){return x+"?"+n.start+"&"+(n.stop?n.stop:"")};return w}(ka.a);Object(y.a)(Aa);Object(y.b)(Aa);ua["default"]=
Aa}}]);}).call(this || window)
