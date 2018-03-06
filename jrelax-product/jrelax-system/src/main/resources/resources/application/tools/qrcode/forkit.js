/*!
 * forkit.js 0.2
 * http://lab.hakim.se/forkit-js
 * MIT licensed
 *
 * Created by Hakim El Hattab, http://hakim.se
 */
(function(){if(navigator.userAgent.indexOf("MSIE")>0){return}var f=0,A=1,C=2,c=30,d=120,z=40,k=0.36;VENDORS=["Webkit","Moz","O","ms"];var y={ribbon:null,ribbonString:null,ribbonTag:null,curtain:null,closeButton:null},i=f,x="",n="",m=1.04;gravity=1.5,closedX=d*0.4,closedY=-c*0.5,openedX=d*0.4,openedY=c,velocity=0,rotation=45,curtainTargetY=0,curtainCurrentY=0,dragging=false,dragTime=0,dragY=0,anchorA=new D(closedX,closedY),anchorB=new D(closedX,closedY),mouse=new D();function b(){y.ribbon=document.querySelector(".forkit");y.curtain=document.querySelector(".forkit-curtain");y.closeButton=document.querySelector(".forkit-curtain .close-button");if(y.ribbon){x=y.ribbon.getAttribute("data-text")||"";n=y.ribbon.getAttribute("data-text-detached")||x;y.ribbon.innerHTML='<span class="string"></span><span class="tag">'+x+"</span>";y.ribbonString=y.ribbon.querySelector(".string");y.ribbonTag=y.ribbon.querySelector(".tag");y.ribbon.addEventListener("click",p,false);document.addEventListener("mousemove",u,false);document.addEventListener("mousedown",o,false);document.addEventListener("mouseup",g,false);document.addEventListener("touchstart",e,false);document.addEventListener("touchmove",h,false);document.addEventListener("touchend",a,false);window.addEventListener("resize",B,false);if(y.closeButton){y.closeButton.addEventListener("click",l,false)}j()}}function o(G){if(y.curtain&&i===A){G.preventDefault();dragY=G.clientY;dragTime=Date.now();dragging=true}}function u(G){mouse.x=G.clientX;mouse.y=G.clientY}function g(G){if(i!==C){i=f;dragging=false}}function e(G){if(y.curtain&&i===A){G.preventDefault();var H=G.touches[0];dragY=H.clientY;dragTime=Date.now();dragging=true}}function h(G){var H=G.touches[0];mouse.x=H.pageX;mouse.y=H.pageY}function a(G){if(i!==C){i=f;dragging=false}}function p(G){if(y.curtain){G.preventDefault();if(i===C){v()}else{if(Date.now()-dragTime<300){t()}}}}function l(G){G.preventDefault();v()}function B(){if(i===C){curtainTargetY=window.innerHeight;curtainCurrentY=curtainTargetY}}function t(){dragging=false;i=C}function v(){dragging=false;i=f;y.ribbonTag.innerHTML=x}function E(){i=A;y.ribbonTag.innerHTML=n}function j(){q();F();requestAnimFrame(j)}function q(){var M=r(mouse.x,mouse.y,window.innerWidth,0);if(i===C){curtainTargetY=Math.min(curtainTargetY+(window.innerHeight-curtainTargetY)*0.2,window.innerHeight)}else{if(M<d*1.5){E()}else{if(!dragging&&i===A&&M>d*2){v()}}if(dragging){curtainTargetY=Math.max(mouse.y-dragY,0);if(curtainTargetY>window.innerHeight*k){t()}}else{curtainTargetY*=0.8}}curtainCurrentY+=(curtainTargetY-curtainCurrentY)*0.3;if(dragging||i===A){velocity/=m;velocity+=gravity;var J=y.ribbon.offsetLeft;var G=Math.max(((mouse.x-J)-closedX)*0.2,-z);anchorB.x+=((closedX+G)-anchorB.x)*0.1;anchorB.y+=velocity;var K=r(anchorA.x,anchorA.y,anchorB.x,anchorB.y);if(K>z){velocity-=Math.abs(K)/(z*1.25)}var H=Math.max(mouse.y-anchorB.y,0),I=mouse.x-(J+anchorB.x);var L=Math.min(130,Math.max(50,Math.atan2(H,I)*180/Math.PI));rotation+=(L-rotation)*0.1}else{if(i===C){anchorB.x+=(openedX-anchorB.x)*0.2;anchorB.y+=(openedY-anchorB.y)*0.2;rotation+=(90-rotation)*0.02}else{anchorB.x+=(anchorA.x-anchorB.x)*0.2;anchorB.y+=(anchorA.y-anchorB.y)*0.2;rotation+=(45-rotation)*0.2}}}function F(){if(y.curtain){y.curtain.style.top=-100+Math.min((curtainCurrentY/window.innerHeight)*100,100)+"%"}y.ribbon.style[w("transform")]=s(0,curtainCurrentY,0);y.ribbonTag.style[w("transform")]=s(anchorB.x,anchorB.y,rotation);var G=anchorB.y-anchorA.y,H=anchorB.x-anchorA.x;var I=Math.atan2(G,H)*180/Math.PI;y.ribbonString.style.width=anchorB.y+"px";y.ribbonString.style[w("transform")]=s(anchorA.x,0,I)}function w(K,J){var H=K.slice(0,1).toUpperCase()+K.slice(1);for(var I=0,G=VENDORS.length;I<G;I++){var L=VENDORS[I];if(typeof(J||document.body).style[L+H]!=="undefined"){return L+H}}return K}function s(G,I,H){return"translate("+G+"px,"+I+"px) rotate("+H+"deg)"}function r(J,L,I,K){var H=J-I;var G=L-K;return Math.sqrt(H*H+G*G)}function D(G,H){this.x=G||0;this.y=H||0}D.prototype.distanceTo=function(G,J){var I=G-this.x;var H=J-this.y;return Math.sqrt(I*I+H*H)};D.prototype.clone=function(){return new D(this.x,this.y)};D.prototype.interpolate=function(G,I,H){this.x+=(G-this.x)*H;this.y+=(I-this.y)*H};window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(G){window.setTimeout(G,1000/60)}})();b()})();