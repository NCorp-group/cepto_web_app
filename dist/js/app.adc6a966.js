(function(t){function e(e){for(var i,r,o=e[0],c=e[1],l=e[2],p=0,d=[];p<o.length;p++)r=o[p],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&d.push(a[r][0]),a[r]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);u&&u(e);while(d.length)d.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],i=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(i=!1)}i&&(s.splice(e--,1),t=r(r.s=n[0]))}return t}var i={},a={app:0},s=[];function r(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},1687:function(t,e,n){},"416c":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23");function a(t,e){var n=Object(i["v"])("router-view");return Object(i["o"])(),Object(i["e"])(n,null,{default:Object(i["C"])((function(t){var e=t.Component,n=t.route;return[Object(i["f"])(i["b"],{name:n.meta.transition||"fade"},{default:Object(i["C"])((function(){return[(Object(i["o"])(),Object(i["e"])(Object(i["w"])(e)))]})),_:2},1032,["name"])]})),_:1})}n("e651");const s={};s.render=a;var r=s,o=n("6c02"),c=Object(i["F"])("data-v-48b01fbe");Object(i["r"])("data-v-48b01fbe");var l={class:"center-content full-screen"};Object(i["p"])();var u=c((function(t,e,n,a,s,r){var o=Object(i["v"])("LoginBox");return Object(i["o"])(),Object(i["e"])("div",l,[Object(i["f"])(o)])})),p=n("b16f"),d=n.n(p),f=Object(i["F"])("data-v-7f8a0aca");Object(i["r"])("data-v-7f8a0aca");var b={id:"login-box"},_=Object(i["f"])("img",{src:d.a,alt:"CEPTO"},null,-1),v={spellcheck:"false",action:""};Object(i["p"])();var m=f((function(t,e,n,a,s,r){return Object(i["o"])(),Object(i["e"])("div",b,[_,Object(i["f"])("form",v,[Object(i["D"])(Object(i["f"])("input",{onKeyup:e[1]||(e[1]=Object(i["E"])((function(){return r.on_login&&r.on_login.apply(r,arguments)}),["enter"])),type:"text",name:"username","onUpdate:modelValue":e[2]||(e[2]=function(t){return s.input.username=t}),placeholder:"Username"},null,544),[[i["A"],s.input.username]]),Object(i["D"])(Object(i["f"])("input",{onKeyup:e[3]||(e[3]=Object(i["E"])((function(){return r.on_login&&r.on_login.apply(r,arguments)}),["enter"])),type:"password",name:"password","onUpdate:modelValue":e[4]||(e[4]=function(t){return s.input.password=t}),placeholder:"Password"},null,544),[[i["A"],s.input.password]]),Object(i["f"])("p",{id:"feedback",style:{color:s.feedback.color}},Object(i["y"])(s.feedback.text),5),Object(i["f"])("button",{class:"btn full-width",type:"button",onClick:e[5]||(e[5]=function(){return r.on_login&&r.on_login.apply(r,arguments)})},"Sign In")])])})),h=(n("159b"),{name:"LoginBox",data:function(){return{input:{username:"",password:""},feedback:{color:"transparent",text:"No input"}}},methods:{on_login:function(){(""==this.input.username||null==this.input.username)&&""==this.input.password||null==this.input.password?(this.feedback.color="red",this.feedback.text="No credentials were given",console.log(this.feedback.text)):this.check_credentials()?(this.$user.username=this.input.username,this.$user.password=this.input.password,this.$router.push({path:"/logs"}),this.feedback.color="transparent",this.feedback.text="Credentials authenticated",console.log(this.feedback.text),this.clear_credentials()):(this.feedback.color="red",this.feedback.text="Wrong credentials",console.log(this.feedback.text))},check_credentials:function(){var t=this,e=!1;return this.$accounts.forEach((function(n){t.input.username===n.username&&t.input.password===n.password&&(e=!0)})),e},clear_credentials:function(){this.input.username="",this.input.password=""}}});n("fcf4");h.render=m,h.__scopeId="data-v-7f8a0aca";var O=h,j={name:"LoginScreen",components:{LoginBox:O}};j.render=u,j.__scopeId="data-v-48b01fbe";var g=j,y=Object(i["F"])("data-v-7142d143");Object(i["r"])("data-v-7142d143");var w={class:"full-screen flex-row-start"};Object(i["p"])();var T=y((function(t,e,n,a,s,r){var o=Object(i["v"])("SidePanel"),c=Object(i["v"])("LogTable");return Object(i["o"])(),Object(i["e"])("div",w,[Object(i["f"])(o),Object(i["f"])(c)])})),k=Object(i["F"])("data-v-7024a0e4");Object(i["r"])("data-v-7024a0e4");var x={id:"logs-wrapper",class:"center-content"},D={id:"logs"},S=Object(i["f"])("div",{id:"logs-header"},[Object(i["f"])("h1",null,"Patient Name"),Object(i["f"])("h4",null,"Event Logs")],-1),P={id:"visit-list"},L={id:"visit-header"},M=Object(i["f"])("li",{class:"spacer"},null,-1),$=Object(i["f"])("li",{class:"spacer"},null,-1),C=Object(i["f"])("li",{class:"spacer"},null,-1),E=Object(i["f"])("li",{class:"spacer"},null,-1),I={id:"event-list"},F=Object(i["f"])("thead",null,[Object(i["f"])("tr",null,[Object(i["f"])("th",{scope:"col"},"EventID"),Object(i["f"])("th",{scope:"col"},"Description"),Object(i["f"])("th",{scope:"col"},"Date"),Object(i["f"])("th",{scope:"col"},"Timestamp"),Object(i["f"])("th",{scope:"col"},"Minutes since last event")])],-1),N={scope:"row"};Object(i["p"])();var K=k((function(t,e,n,a,s,r){return Object(i["o"])(),Object(i["e"])("div",x,[Object(i["f"])("div",D,[S,Object(i["f"])("ul",P,[(Object(i["o"])(!0),Object(i["e"])(i["a"],null,Object(i["u"])(t.visits,(function(e,n){return Object(i["o"])(),Object(i["e"])("li",{key:n},[Object(i["f"])("ul",L,[Object(i["f"])("li",{id:"indicator",class:[e.state,{in_progress:e.in_progress}]},null,2),M,Object(i["f"])("li",null,Object(i["y"])(e.timestamp.toLocaleDateString("da-DK")),1),$,Object(i["f"])("li",null,Object(i["y"])(e.desc),1),C,Object(i["f"])("li",null,Object(i["y"])(e.duration),1),E,Object(i["f"])("li",null,Object(i["y"])(e.events.length)+" events logged",1)]),Object(i["f"])("table",I,[F,Object(i["f"])("tbody",null,[(Object(i["o"])(!0),Object(i["e"])(i["a"],null,Object(i["u"])(t.visits[n].events,(function(e,a){return Object(i["o"])(),Object(i["e"])("tr",{key:a},[Object(i["f"])("th",N,Object(i["y"])(t.visits[n].events.length-a++),1),Object(i["f"])("td",null,Object(i["y"])(e.desc),1),Object(i["f"])("td",null,Object(i["y"])(e.timestamp.toLocaleDateString("da-DK")),1),Object(i["f"])("td",null,Object(i["y"])(e.timestamp.toLocaleTimeString("da-DK")),1),Object(i["f"])("td",null,Object(i["y"])(e.time_since_last),1)])})),128))])])])})),128))])])])})),U=n("d4ec"),A=(n("ac1f"),n("1276"),n("fb6a"),n("a15b"),n("d81d"),n("d3b7"),n("6062"),n("3ca3"),n("ddb0"),n("4de4"),n("bc3a")),B=n.n(A),J=function t(e,n,i,a,s,r,o){Object(U["a"])(this,t),this.state=e,this.id=n,this.timestamp=i,this.desc=a,this.duration=s,this.events=r,this.in_progress=o},V=function t(e,n,i,a,s){Object(U["a"])(this,t),this.visit_id=e,this.type=n,this.desc=i,this.timestamp=a,this.time_since_last=s},G=function(t,e){for(var n=e.length,i=n,a=new Array(i),s=0;s<i;s++)a[s]=t(e[s-1],e[s]);return a};function H(t){for(var e=t.toLowerCase().split("_"),n=0;n<e.length;n++)e[n]=e[n][0].toUpperCase()+e[n].slice(1);return e.join(" ")}var R={name:"LogTable",data:function(){return{visits:[],api_data:null,data:{events:[{event_type:"left_bed",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-12T15:45:10.000000",visit_id:1},{event_type:"arrived_at_bathroom",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-12T15:45:36.000000",visit_id:1},{event_type:"left_bathroom",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-12T15:48:26.000000",visit_id:1},{event_type:"arrived_at_bed",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-12T15:49:01.000000",visit_id:1},{event_type:"left_bed",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-16T08:51:03.000000",visit_id:2},{event_type:"arrived_at_bed",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-16T08:56:58.000000",visit_id:2},{event_type:"left_bed",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-16T23:52:54.000000",visit_id:3},{event_type:"arrived_at_bathroom",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-16T23:53:13.000000",visit_id:3},{event_type:"left_bathroom",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-17T00:04:45.000000",visit_id:3},{event_type:"arrived_at_bed",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-17T00:05:56.000000",visit_id:3},{event_type:"left_bed",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-18T09:21:43.000000",visit_id:4},{event_type:"left_bed",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-18T09:23:43.000000",visit_id:5},{event_type:"left_bed",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-18T09:34:43.000000",visit_id:6},{event_type:"left_bed",patient_full_name:"test_patient",patient_id:1,timestamp:"2021-05-18T10:21:43.000000",visit_id:7}],success:!0}}},methods:{on_log:function(){console.log(this.api_data)},print_data:function(){console.log(this.visits)},on_refresh:function(){this.fetch_logs()},clear_logs:function(){this.visits=[]},fetch_logs:function(){var t=this;this.$http.command="fetch-events",B.a.get("http://"+this.$http.ip+":"+this.$http.port+"/"+this.$http.command+"/"+this.$user.username+","+this.$user.password).then((function(e){console.log("FETCHING"),console.log(e),t.api_data=e.data.events,t.process_api_data()})).catch((function(t){return console.log(t)}))},create_event:function(t){var e=new Date(t.timestamp),n=new Date(t.timestamp),i=new V(t.visit_id,t.event_type,e,n.getMinutes());return i},create_visit:function(t){var e=t[0].timestamp.getTime()-t[t.length-1].timestamp.getTime(),n=Math.floor(e/1e3/60),i=Math.floor(e/1e3-60*n),a="",s="",r=!1;t.length<4?(a="incomplete",s="Returned to bed"):4==t.length&&(a="complete",s="Successful visit"),"arrived_at_bed"!==t[0].type&&(r=!0,s="In progress",e=(new Date).getTime()-t[t.length-1].timestamp.getTime(),n=Math.floor(e/1e3/60),i=Math.floor(e/1e3-60*n));var o=n+" min "+i+" sec";n>=30&&(a="failed",s="Failed bathroom visit");var c=new J(a,t[0].visit_id,t[0].timestamp,s,o,t,r);return c},process_data:function(){var t=this;if(this.visits=[],null!=this.data.events){var e=this.data.events.map((function(t){return t.visit_id})),n=new Set(e);n.forEach((function(e){var n=t.data.events.filter((function(t){return t.visit_id===e})),i=G((function(t,n){var i=new Date(n.timestamp),a="";if(null==t)a="-";else{var s=new Date(t.timestamp),r=i.getTime()-s.getTime(),o=Math.floor(r/1e3/60),c=Math.floor(r/1e3-60*o);a+=o+" min "+c+" sec"}return new V(e,n.event_type,H(n.event_type),i,a)}),n).reverse();t.visits.unshift(t.create_visit(i))}))}else console.log("No data to show yet.")},process_api_data:function(){var t=this;if(this.visits=[],null!=this.api_data){var e=this.api_data.map((function(t){return t.visit_id})),n=new Set(e);n.forEach((function(e){var n=t.api_data.filter((function(t){return t.visit_id===e})),i=G((function(t,n){var i=new Date(n.timestamp),a="";if(null==t)a="-";else{var s=new Date(t.timestamp),r=i.getTime()-s.getTime(),o=Math.floor(r/1e3/60),c=Math.floor(r/1e3-60*o);a+=o+" min "+c+" sec"}return new V(e,n.event_type,H(n.event_type),i,a)}),n).reverse();t.visits.unshift(t.create_visit(i))}))}else console.log("No data to show yet.")}},mounted:function(){var t=this;setInterval((function(){t.fetch_logs()}),5e3)}};n("d45f");R.render=K,R.__scopeId="data-v-7024a0e4";var W=R,q={id:"sidepanel"},z=Object(i["f"])("div",{id:"user-list"},[Object(i["f"])("h2",null,"Patients"),Object(i["f"])("h4",null,"User List")],-1),Q={id:"options-panel"},X=Object(i["f"])("button",{class:"btn full-width"},"Sign Out",-1);function Y(t,e,n,a,s,r){var o=Object(i["v"])("router-link");return Object(i["o"])(),Object(i["e"])("div",q,[z,Object(i["f"])("div",Q,[Object(i["f"])(o,{to:"/login"},{default:Object(i["C"])((function(){return[X]})),_:1})])])}var Z={};n("b7ec");Z.render=Y;var tt=Z,et={name:"LoginScreen",components:{LogTable:W,SidePanel:tt}};et.render=T,et.__scopeId="data-v-7142d143";var nt=et,it=[{path:"/",redirect:{name:"login"}},{path:"/login",name:"login",component:g,meta:{transition:"slide-fade-right"}},{path:"/logs",name:"logs",component:nt,meta:{transition:"slide-fade-left"}}],at=Object(o["a"])({history:Object(o["b"])("/"),routes:it}),st=at,rt=Object(i["d"])(r);rt.config.globalProperties.$user={username:"",password:""},rt.config.globalProperties.$accounts=[{username:"caregiver",password:"caregiver"},{username:"test",password:"test"}],rt.config.globalProperties.$http={ip:"10.9.2.73",port:"5000",command:"fecth-events"},rt.use(st).mount("#app")},"6ce6":function(t,e,n){},"770f":function(t,e,n){},b16f:function(t,e,n){t.exports=n.p+"img/logo_85_white.59ae1120.png"},b7ec:function(t,e,n){"use strict";n("1687")},d45f:function(t,e,n){"use strict";n("770f")},e651:function(t,e,n){"use strict";n("416c")},fcf4:function(t,e,n){"use strict";n("6ce6")}});
//# sourceMappingURL=app.adc6a966.js.map