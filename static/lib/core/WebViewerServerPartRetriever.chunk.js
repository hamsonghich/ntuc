/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[15],{407:function(Aa,ua,y){function oa(){return!1}function ja(r,z,fa){if(!(z in h))return!0;z=h[z];for(var la=0;la<z.length;la++){var aa=r;var ba=z[la];var ia=fa;if(ba.name in aa){var ea="",ma=!1;aa=aa[ba.name];switch(ba.type){case "s":ea="String";ma=Object(ha.isString)(aa);break;case "a":ea="Array";ma=Object(ha.isArray)(aa);break;case "n":ea="Number";ma=Object(ha.isNumber)(aa)&&Object(ha.isFinite)(aa);break;case "o":ea="Object",
ma=Object(ha.isObject)(aa)&&!Object(ha.isArray)(aa)}ma||ia.reject('Expected response field "'+ba.name+'" to have type '+ea);ba=ma}else ia.reject('Response missing field "'+ba.name+'"'),ba=!1;if(!ba)return!1}return!0}y.r(ua);var ka=y(1),ha=y(0);y.n(ha);var da=y(2);Aa=y(48);var ca=y(32),w=y(425),x=y(89),n=y(323),e=y(38),a=y(148),b=function(){function r(){this.request=this.result=null;this.state=0;var z=this;z.promise=new Promise(function(fa,la){z.resolve=function(){if(0===z.state||4===z.state)z.state=
1,z.result=arguments[0],fa.apply(null,arguments)};z.reject=function(){if(0===z.state||4===z.state)z.state=2,la.apply(null,arguments)}})}r.prototype.fr=function(){return 1===(this.state&1)};r.prototype.O8=function(){return 2===(this.state&2)};r.prototype.Th=function(){return!this.O8()&&!this.fr()};r.prototype.q8=function(){return 4===(this.state&4)};r.prototype.lI=function(){this.state|=4};return r}(),f=function(){function r(){this.Sq={};this.vb=[]}r.prototype.pop=function(){var z=this.vb.pop();this.Sq[z.key]=
void 0;return z};r.prototype.push=function(z,fa){fa={key:z,data:fa};this.vb.push(fa);this.Sq[z]=fa.data};r.prototype.contains=function(z){return!!this.Sq[z]};r.prototype.get=function(z){return this.Sq[z]};r.prototype.set=function(z,fa){var la=this;this.Sq[z]=fa;this.vb.forEach(function(aa,ba){aa.key===z&&(la.vb[ba]=aa)})};r.prototype.remove=function(z){var fa=this;this.Sq[z]=void 0;this.vb.forEach(function(la,aa){la.key===z&&fa.vb.splice(aa,1)})};r.prototype.length=function(){return this.vb.length};
return r}(),h={pages:[{name:"pages",type:"a"}],pdf:[{name:"url",type:"s"}],docmod:[{name:"url",type:"s"},{name:"rID",type:"s"}],health:[],tiles:[{name:"z",type:"n"},{name:"rID",type:"n"},{name:"tiles",type:"a"},{name:"size",type:"n"}],cAnnots:[{name:"annots",type:"a"}],annots:[{name:"url",type:"s"},{name:"name",type:"s"}],image:[{name:"url",type:"s"},{name:"name",type:"s"},{name:"p",type:"n"}],text:[{name:"url",type:"s"},{name:"name",type:"s"},{name:"p",type:"n"}],ApString2Xod:[{name:"url",type:"s"},
{name:"rID",type:"s"}]};y=function(){function r(z,fa,la){var aa=this;this.KI=this.AN=!1;this.tg=this.lC=this.ks=this.UG=this.cE=this.cl=null;this.Nk=new b;this.Kn=new b;this.Jy=!1;this.Se=this.Wd=this.Xd=this.Le=null;this.kf=[];this.nz=[];this.cache={};this.timeStamp=0;this.og=[];this.bi=[];this.WE=null;this.mN=!1;this.zT=this.id=null;this.FG=this.KP=oa;this.fh=0;this.WF=!1;this.hR=1;this.Yh={};this.Np=0;this.Gr=new f;fa.endsWith("/")||(fa+="/");la=la||{};this.AN=la.disableWebsockets||!1;this.KI=
la.singleServerMode||!1;null!=la.customQueryParameters&&Object(e.b)("wvsQueryParameters",la.customQueryParameters);fa.endsWith("blackbox/")||(fa+="blackbox/");this.cl=la.uploadData||null;this.ks=la.uriData||null;this.cE=la.cacheKey||null;this.UG=la.officeOptions||null;this.pe=fa;this.DE=z;this.Im(!0);this.bq=(new w.a(fa,null,this.Sg())).N4(!this.AN,function(ba){aa.g$(ba)},function(){return null},function(){aa.Jy=!1},function(){aa.gca()})}r.prototype.O1=function(){var z=this;return new Promise(function(fa,
la){var aa=new XMLHttpRequest;aa.open("GET",z.pe+"ck");aa.withCredentials=z.Sg();aa.onreadystatechange=function(){aa.readyState===XMLHttpRequest.DONE&&(200===aa.status?fa():la())};aa.send()})};r.prototype.uda=function(z){this.KP=z||oa;this.FG=oa};r.prototype.K0=function(){this.eT();return this.bq.Sn(!0)};r.prototype.eT=function(){Object(ka.b)(this,void 0,void 0,function(){return Object(ka.d)(this,function(z){switch(z.label){case 0:return this.Kn=new b,this.Nk=new b,this.Jy=!1,this.id=null,this.mN=
!1,[4,this.O1()];case 1:return z.ea(),[2]}})})};r.prototype.gca=function(){this.KP();this.eT();this.Le&&(this.Le.Th()?this.zg(this.Le.request):this.Le.fr()&&this.FG(this.Le.result.url,"pdf")&&(this.Le=null,this.dT()));this.Se&&this.Se.Th()&&this.zg(this.Se.request);this.Xd&&this.Xd.Th()?this.zg(this.Xd.request):this.Wd&&this.Wd.Th()&&this.yP();var z;for(z=0;z<this.og.length;z++)this.og[z]&&(this.og[z].Th()?this.zg(this.og[z].request):this.og[z].fr()&&this.FG(this.og[z].result.url,"image")&&(this.og[z]=
null,this.sB(Object(ha.uniqueId)(),z)));for(z=0;z<this.bi.length;z++)this.bi[z]&&this.bi[z].Th()&&!this.bi[z].q8()&&this.zg(this.bi[z].request);for(z=0;z<this.kf.length;z++)this.kf[z]&&this.kf[z].Th()&&this.zg(this.kf[z].request)};r.prototype.Z7=function(){return this.Jy?Promise.resolve():(this.Jy=!0,this.timeStamp=Date.now(),this.bq.dA())};r.prototype.ufa=function(){var z=this,fa,la,aa,ba,ia;return new Promise(function(ea,ma){if(z.cl)fa=new FormData,fa.append("file",z.cl.fileHandle,z.cl.fileHandle.name),
la=z.cl.loadCallback,ba="upload",aa=z.cl.extension;else if(z.ks)fa={uri:z.ks.uri,dma:z.ks.shareId},fa=Object.keys(fa).map(function(qa){return qa+"="+(fa[qa]?encodeURIComponent(fa[qa]):"")}).join("&"),ia="application/x-www-form-urlencoded; charset=UTF-8",la=z.ks.loadCallback,ba="url",aa=z.ks.extension;else{ea();return}var na=new XMLHttpRequest,sa=Object(ca.h)(z.pe,"AuxUpload");sa=Object(a.a)(sa,{type:ba,ext:aa});na.open("POST",sa);na.withCredentials=z.Sg();ia&&na.setRequestHeader("Content-Type",ia);
na.addEventListener("load",function(){if(na.readyState===na.DONE&&200===na.status){var qa=JSON.parse(na.response);z.DE=qa.uri;la(qa);ea(qa)}});na.addEventListener("error",function(){ma(na.statusText+" "+JSON.stringify(na))});z.cl&&null!=z.cl.onProgress&&(na.upload.onprogress=function(qa){z.cl.onProgress(qa)});na.send(fa)})};r.prototype.Xba=function(z){this.password=z||null;this.Nk.fr()||(this.Nk=new b,this.zg({t:"pages"}));return this.Nk.promise};r.prototype.Ev=function(z){this.WE=z||null;this.Nk.fr()||
this.zg({t:"pages"});return this.Nk.promise};r.prototype.Ft=function(z){z=Object.assign(z,{uri:encodeURIComponent(this.DE)});this.WE&&(z.ext=this.WE);this.tg&&(z.c=this.tg);this.password&&(z.pswd=this.password);this.cE&&(z.cacheKey=this.cE);this.UG&&(z.officeOptions=this.UG);return z};r.prototype.Fca=function(){0<this.Gr.length()&&10>=this.Np&&this.Gca(this.Gr.pop().data)};r.prototype.l0=function(z){0<this.Gr.length()&&this.Gr.contains(z)&&this.Gr.remove(z)};r.prototype.zg=function(z){z=this.Ft(z);
this.bq.send(z)};r.prototype.uT=function(z,fa){10<this.Np?this.Gr.push(z,fa):(this.Np++,z=this.Ft(fa),this.bq.send(z))};r.prototype.Gca=function(z){this.Np++;z=this.Ft(z);this.bq.send(z)};r.prototype.ck=function(z){return z};r.prototype.JP=function(z){this.KI&&z?Object(da.j)("Server failed health check. Single server mode ignoring check."):!this.oia&&z&&3>=this.fh?(this.WF=!0,this.bq.Sn()):3<this.fh&&(this.KI=!0)};r.prototype.g$=function(z){var fa=this,la=z.data,aa=z.err,ba=z.t;switch(ba){case "upload":aa?
this.vfa.reject(aa):this.vfa.resolve("Success");break;case "pages":aa?this.Nk.reject(aa):ja(la,ba,this.Nk)&&this.Nk.resolve(la);break;case "config":if(aa)this.Kn.reject(aa);else if(ja(la,ba,this.Kn)){this.JP(la.unhealthy);la.id&&(this.id=la.id);if(la.auth){var ia=Object(e.a)("wvsQueryParameters");ia.auth=la.auth;Object(e.b)("wvsQueryParameters",ia)}la.serverVersion&&(this.lC=la.serverVersion,Object(da.h)("[WebViewer Server] server version: "+this.lC));la.serverID?(this.fh=la.serverID===this.zT&&this.WF?
this.fh+1:0,this.zT=la.serverID):this.fh=0;this.WF=!1;this.Kn.resolve(la)}break;case "health":aa?this.Kn.reject(aa):ja(la,ba,this.Kn)&&this.JP(la.unhealthy);break;case "pdf":la.url=Object(a.a)(this.pe+"../"+encodeURI(la.url));aa?this.Le.reject(aa):ja(la,ba,this.Le)&&this.Le.resolve(la);break;case "ApString2Xod":la.url=Object(a.a)(this.pe+"../data/"+encodeURI(la.url));aa?this.Yh[la.rID].reject(aa):ja(la,ba,this.Yh[la.rID])&&this.Yh[la.rID].resolve(la);break;case "docmod":la.url=Object(a.a)(this.pe+
"../"+encodeURI(la.url));aa?this.Yh[la.rID].reject(aa):ja(la,ba,this.Le)&&this.Yh[la.rID].resolve(la);break;case "xod":if(aa)this.Xd&&this.Xd.Th()&&this.Xd.reject(aa),this.Wd&&this.Wd.Th()&&this.Wd.reject(aa);else if(la.notFound)la.noCreate||this.Xd&&this.Xd.Th()&&this.Xd.resolve(la),this.Wd&&this.Wd.Th()&&this.Wd.resolve(la);else{la.url&&(la.url=Object(a.a)(this.pe+"../"+encodeURI(la.url)));if(!this.Wd||this.Wd.fr())this.Wd=new b,this.Wd.request={t:"xod",noCreate:!0};this.Xd||(this.Xd=new b,this.Xd.request=
{t:"xod"});this.Wd.resolve(la);this.Xd.resolve(la)}break;case "cAnnots":ia=this.Se;if(aa)ia.reject(aa);else if(ja(la,ba,ia)){ia.lI();var ea=[],ma=la.annots;la=function(ta){var Ba=ma[ta].s,Ea=ma[ta].e,Pa=na.pe+"../"+encodeURI(ma[ta].xfdf),Na="true"===ma[ta].hasAppearance?Object(a.a)(Pa+".xodapp"):null,Fa=Object(ha.range)(Ba,Ea+1);ea[ta]={range:Fa,promise:new Promise(function(Ka,Wa){var Ra=new XMLHttpRequest;Ra.open("GET",Object(a.a)(Pa));Ra.responseType="text";Ra.withCredentials=fa.Sg();Ra.addEventListener("load",
function(){Ra.readyState===Ra.DONE&&200===Ra.status&&Ka({jp:Ra.response,Vj:Na,range:Fa})});Ra.addEventListener("error",function(){Wa(Ra.statusText+" "+JSON.stringify(Ra))});Ra.send()})}};var na=this;for(aa=0;aa<ma.length;aa++)la(aa);ia.resolve(ea)}break;case "annots":if(aa)this.Se.reject(aa);else if(ja(la,ba,this.Se)){this.Se.lI();var sa=new XMLHttpRequest;ia=this.pe+"../"+encodeURI(la.url);var qa=la.hasAppearance?Object(a.a)(ia+".xodapp"):null;sa.open("GET",Object(a.a)(ia));sa.responseType="text";
sa.withCredentials=this.Sg();sa.addEventListener("load",function(){sa.readyState===sa.DONE&&200===sa.status&&fa.Se.resolve({jp:sa.response,Vj:qa})});sa.addEventListener("error",function(){fa.Se.reject(sa.statusText+" "+JSON.stringify(sa))});sa.send()}break;case "image":this.Np--;var ra=this.og[la.p];aa?ra.promise.reject(aa):ja(la,ba,ra)&&(ra.result=la,ra.result.url=Object(a.a)(this.pe+"../"+encodeURI(ra.result.url)),ra.resolve(ra.result));break;case "tiles":this.Np--;ra=la.rID;ia=this.kf[ra];this.kf[ra]=
null;this.nz.push(ra);if(aa)ia.reject(aa);else if(ja(la,ba,ia)){for(aa=0;aa<la.tiles.length;aa++)la.tiles[aa]=Object(a.a)(this.pe+"../"+encodeURI(la.tiles[aa]));ia.resolve(la)}break;case "text":ra=this.bi[la.p];if(aa)ra.reject(aa);else if(ja(la,ba,ra)){ra.lI();var va=new XMLHttpRequest;la=Object(a.a)(this.pe+"../"+encodeURI(la.url));va.open("GET",la);va.withCredentials=this.Sg();va.addEventListener("load",function(){va.readyState===va.DONE&&200===va.status&&(ra.result=JSON.parse(va.response),ra.resolve(ra.result))});
va.addEventListener("error",function(ta){ra.reject(va.statusText+" "+JSON.stringify(ta))});va.send()}break;case "progress":"loading"===la.t&&this.trigger(x.a.Events.DOCUMENT_LOADING_PROGRESS,[la.bytes,la.total])}this.Fca();!ba&&z.echo&&z&&"apstring2xod"===z.echo.t&&(z=z.echo.reqID)&&(2<=parseInt(this.lC,10)?this.Yh[z].reject("Message unhandled by server"):this.Yh[z].reject())};r.prototype.v5=function(){return Object(ka.b)(this,void 0,void 0,function(){return Object(ka.d)(this,function(z){switch(z.label){case 0:return[4,
this.Z7()];case 1:return z.ea(),[2,this.Kn.promise]}})})};r.prototype.b5=function(z){for(var fa=this,la=new XMLHttpRequest,aa=Object(a.a)(this.pe+"aul",{id:this.id}),ba=new FormData,ia={},ea=0;ea<z.body.length;ea++){var ma=z.body[ea];ia[ma.id]=ma.RD.w+";"+ma.RD.h;ba.append(ma.id,ma.RD.dataString)}z={t:"apstring2xod",reqID:this.hR++,parts:ia};var na=this.Ft(z);ba.append("msg",JSON.stringify(na));this.Yh[na.reqID]=new b;la.open("POST",aa);la.withCredentials=this.Sg;aa=new Promise(function(sa,qa){la.onreadystatechange=
function(){4===la.readyState&&(200===la.status?sa():qa("An error occurred while sending down appearance strings to the server"))}});la.send(ba);return aa.then(function(){return fa.Yh[na.reqID].promise})};r.prototype.M0=function(){var z=this.lC.split("-")[0].split("."),fa=["1","5","9"];if(3!==z.length)throw Error("Invalid WVS version length.");if(3!==fa.length)throw Error("Invalid version length.");for(var la=0;la<z.length;++la){if(fa.length===la||z[la]>fa[la])return-1;if(z[la]!==fa[la])return 1}return 0};
r.prototype.Hn=function(){return 0>=this.M0()};r.prototype.dF=function(){this.Se||(this.Se=new b,this.Hn()?this.Se.request={t:"cAnnots"}:this.Se.request={t:"annots"},this.zg(this.Se.request));return this.Se.promise};r.prototype.sB=function(z,fa){this.og[fa]||(this.og[fa]=new b,this.og[fa].request={t:"image",p:fa},this.uT(z,this.og[fa].request));return this.og[fa].promise};r.prototype.Yba=function(z){this.bi[z]||(this.bi[z]=new b,this.bi[z].request={t:"text",p:z},this.zg(this.bi[z].request));return this.bi[z].promise};
r.prototype.Zba=function(z,fa,la,aa,ba){var ia=this.kf.length;this.nz.length&&(ia=this.nz.pop());this.kf[ia]=new b;this.kf[ia].request={t:"tiles",p:fa,z:la,r:aa,size:ba,rID:ia};this.uT(z,this.kf[ia].request);return this.kf[ia].promise};r.prototype.dT=function(){this.Le||(this.Le=new b,this.Le.request={t:"pdf"},this.mN?this.Le.resolve({url:this.DE}):this.zg(this.Le.request));return this.Le.promise};r.prototype.$O=function(z){var fa=this,la=new XMLHttpRequest,aa=Object(a.a)(this.pe+"aul",{id:this.id}),
ba=new FormData,ia={};z.annots&&(ia.annots="xfdf");z.watermark&&(ia.watermark="png");z.redactions&&(ia.redactions="redact");ia={t:"docmod",reqID:this.hR++,parts:ia};z.print&&(ia.print=!0);var ea=this.Ft(ia);ba.append("msg",JSON.stringify(ea));return Promise.all([z.annots,z.watermark,z.redactions].map(function(ma){return Promise.resolve(ma)})).then(function(ma){var na=ma[0],sa=ma[1];ma=ma[2];na&&ba.append("annots",na);sa&&ba.append("watermark",sa);ma&&ba.append("redactions",ma);fa.Yh[ea.reqID]=new b;
la.open("POST",aa);la.withCredentials=fa.Sg;na=new Promise(function(qa,ra){la.onreadystatechange=function(){4===la.readyState&&(200===la.status?qa():ra("An error occurred while sending down annotation data to the server"))}});la.send(ba);return na.then(function(){return fa.Yh[ea.reqID].promise})})};r.prototype.yP=function(){this.Wd||(this.Wd=new b,this.Wd.request={t:"xod",noCreate:!0},this.zg(this.Wd.request));return this.Wd.promise};r.prototype.$ba=function(){this.Xd||(this.Xd=new b,this.Xd.request=
{t:"xod"},this.zg(this.Xd.request));return this.Xd.promise};r.prototype.Em=function(){return!0};r.prototype.request=function(){};r.prototype.zS=function(){};r.prototype.abort=function(){for(var z=0;z<this.kf.length;z++)this.kf[z]&&(this.kf[z].resolve(null),this.kf[z]=null,this.nz.push(z));this.close()};r.prototype.DB=function(z){this.tg=this.tg||{};this.tg.headers=z};r.prototype.Im=function(z){this.tg=this.tg||{};this.tg.internal=this.tg.internal||{};this.tg.internal.withCredentials=z};r.prototype.Sg=
function(){return this.tg&&this.tg.internal?this.tg.internal.withCredentials:null};r.prototype.getFileData=function(){return Promise.reject()};return r}();Object(Aa.a)(y);Object(n.a)(y);Object(n.b)(y);ua["default"]=y},425:function(Aa,ua,y){var oa=y(1),ja=y(2),ka=y(32),ha=y(38),da=y(148),ca=y(66),w=function(){function n(e,a,b,f,h,r){void 0===b&&(b=null);void 0===f&&(f=null);void 0===h&&(h=null);void 0===r&&(r=null);this.RQ=!1;this.fh=0;this.zM=this.Mfa(e);this.url=a?this.zM+"/"+a:this.zM+"/ws";this.zE=
b;this.ev=f;this.Dt=h;this.VH=r}n.prototype.Mfa=function(e){var a=e.indexOf("://"),b="ws://";0>a?a=0:(5===a&&(b="wss://"),a+=3);var f=e.lastIndexOf("/");0>f&&(f=e.length);return b+e.slice(a,f)};n.prototype.send=function(e){this.Tm.readyState===WebSocket.CLOSED||this.RQ||this.Tm.send(JSON.stringify(e))};n.prototype.dA=function(){return Object(oa.b)(this,void 0,void 0,function(){var e,a=this;return Object(oa.d)(this,function(){e=Object(ha.a)("wvsQueryParameters");e.bcid=Object(ka.i)(8);Object(ha.b)("wvsQueryParameters",
e);return[2,new Promise(function(b,f){var h=Object(da.a)(a.url);a.Tm=new WebSocket(h);a.Tm.onopen=function(){a.ev&&a.ev();b()};a.Tm.onerror=function(r){a.RQ=!0;f(r)};a.Tm.onclose=function(r){var z=r.code;return Object(oa.b)(a,void 0,void 0,function(){var fa=this;return Object(oa.d)(this,function(la){switch(la.label){case 0:return this.Dt&&this.Dt(),3E3===z?[3,3]:8>this.fh++?[4,new Promise(function(aa){return setTimeout(function(){return Object(oa.b)(fa,void 0,void 0,function(){return Object(oa.d)(this,
function(ba){switch(ba.label){case 0:return this.VH(),[4,this.dA()];case 1:return ba.ea(),aa(),[2]}})})},3E3)})]:[3,2];case 1:return la.ea(),[3,3];case 2:f(ca.a),la.label=3;case 3:return[2]}})})};a.Tm.onmessage=function(r){r&&r.data&&(r=JSON.parse(r.data),r.hb?a.send({hb:!0}):r.end?close():a.zE(r))}})]})})};n.prototype.Sn=function(e){void 0===e&&(e=!1);this.fh=0;e?this.Tm.close(3E3):this.Tm.close();return Promise.resolve()};return n}(),x=function(){function n(e,a,b,f,h,r,z){void 0===f&&(f=null);void 0===
h&&(h=null);void 0===r&&(r=null);void 0===z&&(z=null);this.fh=this.rB=this.id=0;this.vu=!1;this.request=null;e=this.Baa(e);this.url=a?e+"/"+a+"pf":e+"/pf";this.fC=b;this.zE=f;this.ev=h;this.Dt=r;this.VH=z}n.prototype.Baa=function(e){var a=e.lastIndexOf("/");0>a&&(a=e.length);return e.slice(0,a)};n.prototype.B1=function(e){e=e.split("\n");for(e[e.length-1]&&e.pop();0<e.length&&3>e[e.length-1].length;)"]"===e.pop()&&(this.id=0);0<e.length&&3>e[0].length&&e.shift();for(var a=0;a<e.length;++a)e[a].endsWith(",")&&
(e[a]=e[a].substr(0,e[a].length-1));return e};n.prototype.mT=function(){return Object(oa.b)(this,void 0,void 0,function(){var e=this;return Object(oa.d)(this,function(a){switch(a.label){case 0:return 8>this.fh++?[4,new Promise(function(b){return setTimeout(function(){e.VH();e.dA();b()},3E3)})]:[3,2];case 1:a.ea(),a.label=2;case 2:return[2]}})})};n.prototype.Daa=function(e){Object(oa.b)(this,void 0,void 0,function(){var a,b;return Object(oa.d)(this,function(f){switch(f.label){case 0:a=null,b=0,f.label=
1;case 1:if(!(b<e.length))return[3,6];a=JSON.parse(e[b]);if(!a)return[3,5];if(!a.end)return[3,2];close();return[3,5];case 2:if(!a.id||Number(a.id)===this.id)return[3,4];Object(ja.j)("Reconnecting, new server detected");this.Sn();return[4,this.mT()];case 3:return f.ea(),[3,5];case 4:a.hb&&Number(a.id)===this.id?this.send({hb:!0}):this.vu||this.zE(a),f.label=5;case 5:return++b,[3,1];case 6:return[2]}})})};n.prototype.d$=function(e){Object(oa.b)(this,void 0,void 0,function(){var a,b,f;return Object(oa.d)(this,
function(h){switch(h.label){case 0:if(!(3<=e.readyState))return[3,2];try{a=e.responseText.length}catch(r){return Object(ja.h)("caught exception"),[2]}if(0<a)try{b=this.B1(e.responseText),0===this.id&&0<b.length&&(f=JSON.parse(b.shift()),this.id=f.id,this.fh=0),this.Daa(b)}catch(r){}return this.vu?[3,2]:[4,this.hO()];case 1:h.ea(),h.label=2;case 2:return[2]}})})};n.prototype.hO=function(){return Object(oa.b)(this,void 0,void 0,function(){var e=this;return Object(oa.d)(this,function(){return[2,new Promise(function(a,
b){function f(){return Object(oa.b)(e,void 0,void 0,function(){return Object(oa.d)(this,function(r){switch(r.label){case 0:b(),this.Sn(),r.label=1;case 1:return this.vu&&8>this.fh?[4,this.mT()]:[3,3];case 2:return r.ea(),[3,1];case 3:return[2]}})})}e.request=new XMLHttpRequest;e.request.withCredentials=e.fC;var h=Object(da.a)(e.url,0!==e.id?{id:String(e.id),uc:String(e.rB)}:{uc:String(e.rB)});e.rB++;e.request.open("GET",h,!0);e.request.setRequestHeader("Cache-Control","no-cache");e.request.setRequestHeader("X-Requested-With",
"XMLHttpRequest");e.request.onreadystatechange=function(){e.d$(e.request)};e.request.addEventListener("error",f);e.request.addEventListener("timeout",f);e.request.addEventListener("load",function(){e.ev&&e.ev();a()});e.request.send()})]})})};n.prototype.dA=function(){var e=Object(ha.a)("wvsQueryParameters");e.bcid=Object(ka.i)(8);Object(ha.b)("wvsQueryParameters",e);this.rB=this.id=0;this.vu=!1;return this.hO()};n.prototype.send=function(e){var a=this,b=new XMLHttpRequest;b.withCredentials=this.fC;
var f=Object(da.a)(this.url,{id:String(this.id)}),h=new FormData;h.append("data",JSON.stringify(e));b.addEventListener("error",function(){a.Sn()});b.open("POST",f);b.setRequestHeader("X-Requested-With","XMLHttpRequest");b.send(h)};n.prototype.Sn=function(){this.id=0;this.vu=!0;this.Dt&&this.Dt();this.request.abort();return Promise.resolve()};return n}();Aa=function(){function n(e,a,b){this.ZM=e;this.target=a;this.fC=b}n.prototype.N4=function(e,a,b,f,h){void 0===e&&(e=!0);void 0===a&&(a=null);void 0===
b&&(b=null);void 0===f&&(f=null);void 0===h&&(h=null);return e?new w(this.ZM,this.target,a,b,f,h):new x(this.ZM,this.target,this.fC,a,b,f,h)};return n}();ua.a=Aa}}]);}).call(this || window)
