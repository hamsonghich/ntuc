/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[1],{417:function(Aa,ua,y){function oa(w){return new Promise(function(x){return Object(da.b)(void 0,void 0,void 0,function(){var n,e,a,b,f,h,r,z;return Object(da.d)(this,function(fa){switch(fa.label){case 0:return[4,ha(w)];case 1:return n=fa.ea(),1<n?[4,ja(w)]:[3,3];case 2:e=fa.ea();a=e.split(",")[1];b=window.atob(a);f=b.length;h=new Uint8Array(f);for(r=0;r<f;r++)h[r]=b.charCodeAt(r);x(h);return[3,4];case 3:z=new FileReader,z.readAsArrayBuffer(w),
z.onloadend=function(){x(z.result)},fa.label=4;case 4:return[2]}})})})}function ja(w,x){return new Promise(function(n){var e=new Image,a=new FileReader;a.readAsDataURL(w);e.onload=function(){return Object(da.b)(this,void 0,void 0,function(){var b,f,h,r,z,fa;return Object(da.d)(this,function(la){switch(la.label){case 0:return b=e.width,f=e.height,h=document.createElement("canvas"),r=h.getContext("2d"),[4,ka()];case 1:return z=la.ea(),h.width=b,h.height=f,[4,ha(w)];case 2:fa=la.ea();if(!z)switch(4<
fa&&9>fa&&(h.width=f,h.height=b),fa){case 2:r&&r.transform(-1,0,0,1,b,0);break;case 3:r&&r.transform(-1,0,0,-1,b,f);break;case 4:r&&r.transform(1,0,0,-1,0,f);break;case 5:r&&r.transform(0,1,1,0,0,0);break;case 6:r&&r.transform(0,1,-1,0,f,0);break;case 7:r&&r.transform(0,-1,-1,0,f,b);break;case 8:r&&r.transform(0,-1,1,0,0,b)}1<fa?(r.drawImage(e,0,0),n(h.toDataURL(x&&x.mimeType?x.mimeType:ca.JPEG,x&&x.R7?x.R7:.9))):n(a.result);return[2]}})})};a.onloadend=function(){e.src=a.result}})}function ka(){return new Promise(function(w,
x){var n=new Image;n.onload=function(){w(1===n.naturalWidth)};n.onerror=x;n.src="data:image/jpeg;base64,/9j/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAYAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABIAAAAAQAAAEgAAAAB/9sAQwAEAwMEAwMEBAMEBQQEBQYKBwYGBgYNCQoICg8NEBAPDQ8OERMYFBESFxIODxUcFRcZGRsbGxAUHR8dGh8YGhsa/9sAQwEEBQUGBQYMBwcMGhEPERoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoa/8IAEQgAAQACAwERAAIRAQMRAf/EABQAAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF/P//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//aAAwDAQACAAMAAAAQH//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Qf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Qf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//Z"})}
function ha(w){return new Promise(function(x){var n=new FileReader;n.onload=function(){var e=new DataView(n.result);65496!==e.getUint16(0,!1)&&x(-2);for(var a=e.byteLength,b=2;b<a;){var f=e.getUint16(b,!1);b+=2;if(65505===f){1165519206!==e.getUint32(b+=2,!1)&&x(-1);f=18761===e.getUint16(b+=6,!1);b+=e.getUint32(b+4,f);var h=e.getUint16(b,f);b+=2;for(var r=0;r<h;r++)274===e.getUint16(b+12*r,f)&&x(e.getUint16(b+12*r+8,f))}else if(65280!==(f&65280))break;else b+=e.getUint16(b,!1)}x(-1)};n.readAsArrayBuffer(w.slice(0,
65536))})}y.d(ua,"a",function(){return oa});var da=y(1),ca;(function(w){w.JPEG="image/jpeg";w.PNG="image/png"})(ca||(ca={}))}}]);}).call(this || window)
