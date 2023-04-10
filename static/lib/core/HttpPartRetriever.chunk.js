/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[0],{396:function(Aa,ua,y){y.r(ua);y.d(ua,"ByteRangeRequest",function(){return r});var oa=y(1),ja=y(0);y.n(ja);var ka=y(2),ha=y(137);Aa=y(89);var da=y(222),ca=y(67),w=y(62),x=y(221),n=y(148);y=y(323);var e=[],a=[],b=window,f=function(){return function(){this.Rk=1}}(),h;(function(fa){fa[fa.UNSENT=0]="UNSENT";fa[fa.DONE=4]="DONE"})(h||(h={}));var r=function(){function fa(la,aa,ba,ia){var ea=this;this.url=la;this.range=aa;this.De=ba;
this.withCredentials=ia;this.YX=h;this.request=new XMLHttpRequest;this.request.open("GET",this.url,!0);b.Uint8Array&&(this.request.responseType="arraybuffer");ia&&(this.request.withCredentials=ia);z.DISABLE_RANGE_HEADER||(Object(ja.isUndefined)(aa.stop)?this.request.setRequestHeader("Range","bytes="+aa.start):this.request.setRequestHeader("Range",["bytes=",aa.start,"-",aa.stop-1].join("")));ba&&Object.keys(ba).forEach(function(ma){ea.request.setRequestHeader(ma,ba[ma])});this.request.overrideMimeType?
this.request.overrideMimeType("text/plain; charset=x-user-defined"):this.request.setRequestHeader("Accept-Charset","x-user-defined");this.status=x.a.NOT_STARTED}fa.prototype.start=function(la){var aa=this,ba=this.request;ba.onreadystatechange=function(){if(aa.aborted)return aa.status=x.a.ABORTED,la({code:x.a.ABORTED});if(this.readyState===aa.YX.DONE){aa.Jz();var ia=0===window.document.URL.indexOf("file:///");200===ba.status||206===ba.status||ia&&0===ba.status?(ia=b.hP(this),aa.QI(ia,la)):(aa.status=
x.a.ERROR,la({code:aa.status,status:aa.status}))}};this.request.send(null);this.status=x.a.STARTED};fa.prototype.QI=function(la,aa){this.status=x.a.SUCCESS;if(aa)return aa(!1,la)};fa.prototype.abort=function(){this.Jz();this.aborted=!0;this.request.abort()};fa.prototype.Jz=function(){var la=Object(n.c)(this.url,this.range,a);-1!==la&&a.splice(la,1);if(0<e.length){la=e.shift();var aa=new fa(la.url,la.range,this.De,this.withCredentials);la.request=aa;a.push(la);aa.start(Object(n.d)(la))}};fa.prototype.extend=
function(la){var aa=Object.assign({},this,la.prototype);aa.constructor=la;return aa};return fa}(),z=function(fa){function la(aa,ba,ia,ea,ma){ia=fa.call(this,aa,ia,ea)||this;ia.ji={};ia.sy=ba;ia.url=aa;ia.DISABLE_RANGE_HEADER=!1;ia.yv=r;ia.HJ=3;ia.De=ma||{};return ia}Object(oa.c)(la,fa);la.prototype.Gt=function(aa,ba,ia){var ea=-1===aa.indexOf("?")?"?":"&";switch(ia){case !1:case w.a.NEVER_CACHE:aa=aa+ea+"_="+Object(ja.uniqueId)();break;case !0:case w.a.CACHE:aa=aa+ea+"_="+ba.start+","+(Object(ja.isUndefined)(ba.stop)?
"":ba.stop)}return aa};la.prototype.hN=function(aa,ba,ia,ea){void 0===ia&&(ia={});return new this.yv(aa,ba,ia,ea)};la.prototype.Y3=function(aa,ba,ia,ea,ma){for(var na=0;na<e.length;na++)if(Object(ja.isEqual)(e[na].range,ba)&&Object(ja.isEqual)(e[na].url,aa))return e[na].bg.push(ea),e[na].JA++,null;for(na=0;na<a.length;na++)if(Object(ja.isEqual)(a[na].range,ba)&&Object(ja.isEqual)(a[na].url,aa))return a[na].bg.push(ea),a[na].JA++,null;ia={url:aa,range:ba,sy:ia,bg:[ea],JA:1};if(0===e.length&&a.length<
this.HJ)return a.push(ia),ia.request=this.hN(aa,ba,ma,this.withCredentials),ia;e.push(ia);return null};la.prototype.wm=function(aa,ba,ia){var ea=this.Gt(aa,ba,this.sy);(aa=this.Y3(ea,ba,this.sy,ia,this.De))&&aa.request.start(Object(n.d)(aa));return function(){var ma=Object(n.c)(ea,ba,a);if(-1!==ma){var na=--a[ma].JA;0===na&&a[ma].request&&a[ma].request.abort()}else ma=Object(n.c)(ea,ba,e),-1!==ma&&(na=--e[ma].JA,0===na&&e.splice(ma,1))}};la.prototype.OO=function(){return{start:-ha.a}};la.prototype.y7=
function(){var aa=-(ha.a+ha.e);return{start:aa-ha.d,end:aa}};la.prototype.lr=function(aa){var ba=this;this.zy=!0;var ia=ha.a;this.wm(this.url,this.OO(),function(ea,ma,na){function sa(){var qa=ba.Oc.KO();ba.wm(ba.url,qa,function(ra,va){if(ra)return Object(ka.j)("Error loading central directory: "+ra),aa(ra);va=Object(ca.a)(va);if(va.length!==qa.stop-qa.start)return aa("Invalid XOD file: Zip central directory data is wrong size! Should be "+(qa.stop-qa.start)+" but is "+va.length);ba.Oc.qS(va);ba.jE=
!0;ba.zy=!1;return aa(!1)})}if(ea)return Object(ka.j)("Error loading end header: "+ea),aa(ea,ma,na);ma=Object(ca.a)(ma);if(ma.length!==ia)return aa("Invalid XOD file: Zip end header data is wrong size!");try{ba.Oc=new da.a(ma)}catch(qa){return aa(qa)}ba.Oc.b9?ba.wm(ba.url,ba.y7(),function(qa,ra){if(qa)return Object(ka.j)("Error loading zip64 header: "+qa),aa(qa);ra=Object(ca.a)(ra);ba.Oc.t9(ra);sa()}):sa()})};la.prototype.fP=function(aa){aa(Object.keys(this.Oc.Vl))};la.prototype.DH=function(aa,ba){var ia=
this;if(this.Oc.aN(aa)){var ea=this.Oc.fu(aa);if(ea in this.ji){var ma=this.ug[aa];ma.Yp=this.ji[ea];ma.Yp.Rk++;ma.cancel=ma.Yp.cancel}else{var na=this.Oc.O5(aa),sa=this.wm(this.url,na,function(ra,va){ra?(Object(ka.j)('Error loading part "'+aa+'": '+ra),ia.wm(ia.url,na,function(ta,Ba){if(ta)return ba(ta,aa);ia.uS(Ba,na,ea,aa,ba)})):ia.uS(va,na,ea,aa,ba)}),qa=this.ug[aa];qa&&(qa.EU=!0,qa.cancel=function(){qa.Yp.Rk--;0===qa.Yp.Rk&&(sa(),delete ia.ji[ea])},this.ji[ea]=new f(ea),qa.Yp=this.ji[ea],qa.Yp.cancel=
qa.cancel)}}else delete this.ug[aa],ba(Error('File not found: "'+aa+'"'),aa)};la.prototype.uS=function(aa,ba,ia,ea,ma){if(aa.length!==ba.stop-ba.start)ma(Error("Part data is wrong size!"),ea);else{do{if(!this.ji[ia])return;ea=this.ji[ia].Rk;for(var na=ba.Qo.length,sa=0;sa<na;++sa){var qa=ba.Qo[sa];ma(!1,qa.No,aa["string"===typeof aa?"substring":"subarray"](qa.start,qa.stop),this.Oc.dQ(qa.No));qa.No in this.ug&&delete this.ug[qa.No]}}while(ea!==this.ji[ia].Rk);delete this.ji[ia]}};la.DISABLE_RANGE_HEADER=
!1;la.HJ=3;return la}(Aa.a);(function(fa){function la(aa,ba,ia){var ea=fa.call(this)||this,ma;for(ma in aa)ea[ma]=aa[ma];ea.Tka=aa;ea.startOffset=ba;ea.endOffset=ia;ea.hN=function(na,sa,qa,ra){Object(ja.isUndefined)(sa.stop)?(sa.start+=ea.endOffset,sa.stop=ea.endOffset):(sa.start+=ea.startOffset,sa.stop+=ea.startOffset);na=ea.Gt(ea.url,sa,ea.sy);return new aa.yv(na,sa,qa,ra)};return ea}Object(oa.c)(la,fa);return la})(z);Object(y.a)(z);Object(y.b)(z);ua["default"]=z}}]);}).call(this || window)