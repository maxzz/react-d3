import{R as e,s as t,t as a,l as n,a as r,r as l,b as s,c as o,d as i,e as c}from"./vendor.566e1164.js";function u(){const l=e.useRef(null);return e.useEffect((()=>{const e=t(l.current),s=a().nodeSize([12,70]),o=n().x((e=>e.y)).y((e=>e.x));!function(t,{label:a=(e=>e.data.id),highlight:n=(e=>!1),marginLeft:r=40}={}){t=s(t);let l=1/0,i=-l;t.each((e=>{e.x>i&&(i=e.x),e.x<l&&(l=e.x)})),e.attr("viewBox",[0,0,300,i-l+24]).style("overflow","visible");const c=e.append("g").attr("font-family","sans-serif").attr("font-size",10).attr("transform",`translate(${r},${12-l})`);c.append("g").attr("fill","none").attr("stroke","green").attr("stroke-opacity",.4).attr("stroke-width",1.2).selectAll("path").data(t.links()).join("path").attr("stroke",(e=>n(e.source)&&n(e.target)?"red":null)).attr("stroke-opacity",(e=>n(e.source)&&n(e.target)?1:null)).attr("d",o);const u=c.append("g").attr("stroke-linejoin","round").attr("stroke-width",3).selectAll("g").data(t.descendants()).join("g").attr("transform",(e=>`translate(${e.y},${e.x})`));u.append("circle").attr("fill",(e=>n(e)?"red":e.children?"#5a5":"none")).attr("stroke",(e=>n(e)?"red":e.children?"#585":"#5a5")).attr("stroke-width",(e=>e.children?1.5:1)).attr("r",4),u.append("text").attr("fill",(e=>n(e)?"red":"green")).attr("dy","0.32em").attr("x",(e=>e.children?-6:6)).attr("text-anchor",(e=>e.children?"end":"start")).text(a).clone(!0).lower().attr("stroke-width",1.7).attr("stroke","#4aff8780"),e.node()}(r()([{id:"Chaos"},{id:"Gaia",parentId:"Chaos"},{id:"Eros",parentId:"Chaos"},{id:"Erebus",parentId:"Chaos"},{id:"Tartarus",parentId:"Chaos"},{id:"Mountains",parentId:"Gaia"},{id:"Pontus",parentId:"Gaia"},{id:"Uranus",parentId:"Gaia"}]))}),[]),e.createElement("div",{className:"w-[450px] h-48"},e.createElement("svg",{className:"w-full h-full",ref:l}))}const d=function(){const e=document.createElement("a");return document.body.appendChild(e),e.style.display="none",e.id="noise-gen-image",function(t,a){let n=window.URL.createObjectURL(t);e.href=n,e.download=a,e.click(),window.URL.revokeObjectURL(n)}}();function m(e){let t=/^(\s+)/.exec(e);return+(t?t[1].length:0)}function h(e){return`${-e/2} ${-e/2} ${e} ${e}`}function p({path:e,outerPoints:t,size:a}){return function(e){let t=e.split(/\r?\n/g);if(t.length<2)return e;let a=m(t[t.length-1]);return t.forEach(((e,n)=>{m(e)>=a&&(t[n]=e.slice(a))})),t.join("\n")}(`<svg viewBox="${h(a)}" width="256px" height="256px" stroke="#8c00ff" strokeWidth="2" fill="#9494e4" xmlns="http://www.w3.org/2000/svg">\n        <path\n            d="${e}"\n        />${t.length?`\n        <g stroke="#7c82ff80" strokeWidth=".5" fill="none">\n${t.map((([e,t])=>`            <circle r="5" cx="${e}" cy="${t}" />`)).join("\n")}\n        </g>`:""}\n    </svg>\n    `)}const f=e.forwardRef((function({shape:t,randomize:a,showOuter:n},r){const{nRays:c,iRadius:u,oRadius:m,smooth:f}=t,{inner:g,outer:v,update:x}=a,E=e.useMemo((()=>function(e,t){const{nRays:a,iRadius:n,oRadius:r,smooth:c}=e,{inner:u,outer:d}=t,m=2*Math.PI/(2*a),h=[];for(let s=0;s<2*a;s++)u&&d?h.push([s*m,l(r,n)()]):d?h.push([s*m,s%2==0?l(n,r)():n]):h.push([s*m,s%2==0?r:n]);const p=h.filter(((e,t)=>t%2==0)).map((([e,t])=>[t*Math.sin(e),t*-Math.cos(e)]));let f=s();return f=c?f.curve(o):f.curve(i),[f(h)||"",p]}(t,a)),[c,u,m,f,g,v,x]);return e.useImperativeHandle(r,(()=>({save:()=>{!function(e,t){let a=new Blob([e],{type:"text/plain"});d(a,t)}(p({path:E[0],outerPoints:n?E[1]:[],size:200}),"red3.svg")}}))),e.createElement("svg",{className:"",stroke:"white",strokeWidth:"2",fill:"currentColor",viewBox:`${h(200)}`},e.createElement("path",{className:"",d:E[0]}),n&&e.createElement("g",{stroke:"white",strokeWidth:".5",fill:"none"},E[1].map((([t,a],n)=>e.createElement("circle",{cx:t,cy:a,r:5,key:n})))))}));function g({value:t,onChange:a,label:n,min:r=0,max:l=100,step:s=1}){return e.createElement("div",{className:"flex items-center text-sm text-gray-800"},e.createElement("div",{className:"w-24"},n),e.createElement("div",{className:"flex items-center"},e.createElement("input",{className:"ui-slider",type:"range",value:t,onChange:e=>a(+e.target.value),min:r,max:l,step:s})),e.createElement("div",{className:"min-w-[2rem] text-right"},t))}function v({className:t,label:a,enabled:n=!0,value:r,onChange:l}){return e.createElement("label",{className:`flex items-center text-sm ${n?"":"opacity-50"} ${t}`},e.createElement("input",{className:"mr-1",type:"checkbox",checked:r,onChange:e=>l(e.target.checked)}),a)}function x(){return e.createElement("svg",{className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},e.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1,d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"}))}function E(){return e.createElement("svg",{className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},e.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1,d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"}))}function b(){const[t,a]=e.useState(21),[n,r]=e.useState(89),[l,s]=e.useState(7),[o,i]=e.useState(!0),c={nRays:t,iRadius:n,oRadius:l,smooth:o},[u,d]=e.useState(!0),[m,h]=e.useState(!0),[p,b]=e.useState(0),w={inner:u,outer:m,update:p},[k,y]=e.useState(!1);const N=e.useRef(null);return e.createElement("div",{className:"p-2 flex select-none"},e.createElement("div",{className:"w-44 h-44 text-blue-800 bg-blue-400 border-8 border-blue-200",style:{boxShadow:"#0000001f 0px 0px 3px 1px"}},e.createElement(f,{shape:c,randomize:w,showOuter:k,ref:N})),e.createElement("div",{className:"mx-2 p-2 flex flex-col justify-between"},e.createElement("div",{className:""},e.createElement(g,{label:"# Rays",value:t,onChange:e=>a(e)}),e.createElement(g,{label:"Inner radius",value:n,min:-100,onChange:e=>r(e)}),e.createElement(g,{label:"Outer radius",value:l,onChange:e=>s(e)})),e.createElement("div",{className:"relative"},e.createElement(v,{className:"",label:"Smooth lines",value:o,onChange:i}),e.createElement(v,{className:"",label:"Randomize outer and inner radius",value:u,onChange:function(e){d(e),e&&h(e)}}),e.createElement(v,{className:"",label:"Randomize outer radius",value:m,onChange:function(e){d(!1),h(e)}}),e.createElement(v,{className:"",label:"Show outer points",value:k,onChange:y}),e.createElement("div",{className:"absolute text-sm bottom-0 right-0 space-x-1"},e.createElement("button",{className:"rounded border border-gray-500 p-1 text-green-900 bg-green-100",onClick:()=>{var e;return null==(e=null==N?void 0:N.current)?void 0:e.save()},title:"Save"},e.createElement(E,null)),e.createElement("button",{className:"rounded border border-gray-500 p-1 text-green-900 bg-green-100",onClick:()=>b((e=>e+1)),title:"Update"},e.createElement(x,null))))))}function w(){return e.createElement("div",{className:"h-screen bg-green-50 bg-gradient-to-tl from-green-500 to-cyan-500"},e.createElement(b,null),e.createElement(u,null))}c.render(e.createElement(e.StrictMode,null,e.createElement(w,null)),document.getElementById("root"));
