webpackJsonp([1],{"678E":function(t,e){},C75n:function(t,e){},Jzc4:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("router-view"),this._v(" "),e("h1")],1)},staticRenderFns:[]};var n=a("VU/8")({},i,!1,function(t){a("bndV")},null,null).exports,o=a("/ocq"),r={mounted(){this.initMap();new s.default}},l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"map-container"},[e("div",{ref:"map",staticClass:"map",attrs:{id:"map"}})])},staticRenderFns:[]};var c=a("VU/8")(r,l,!1,function(t){a("SfA5")},"data-v-08a72f9e",null).exports,d={components:{Map:c}},u={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mobile-container"},[e("h3",{staticStyle:{"margin-top":"20px"}},[this._v("기사님 전용 어플")]),this._v(" "),e("div",{staticClass:"map"},[e("map")]),this._v(" "),e("div",{staticClass:"call-group"},[e("button",{staticClass:"mobile-btn1"},[this._v("운행 시작")]),this._v(" "),e("button",{staticClass:"mobile-btn2"},[this._v("운행 종료")])])])}]};var m=a("VU/8")(d,u,!1,function(t){a("nN6U")},null,null).exports,p=a("yviF"),v=a.n(p),h=(a("881v"),{data:()=>({name:"",lat:"",lng:"",locations:[],dataLoaded:!1}),methods:{goToAdminMode(){this.$router.push("/")},saveData(){v.a.firestore().collection("locations").add({name:this.name,lat:parseFloat(this.lat),lng:parseFloat(this.lng)}).then(()=>{console.log("데이터 저장 완료"),this.name="",this.lat="",this.lng=""}).catch(t=>{console.error("데이터 저장 에러:",t)})},loadData(){v.a.firestore().collection("locations").onSnapshot(t=>{this.locations=[],t.forEach(t=>{this.locations.push(t.data())}),this.dataLoaded=!0},t=>{console.error("데이터 감시 에러:",t)})},move(t){this.$router.push("/");const e=this.locations[t];(new s.default).$emit("location-selected",{name:e.name,lat:e.lat,lng:e.lng}),console.log("send: ",{name:e.name,lat:e.lat,lng:e.lng})}},mounted(){this.loadData()}}),g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("h1",{on:{click:t.goToAdminMode}},[t._v(" 관리자 모드")]),t._v(" "),t.dataLoaded?a("div",{staticClass:"list-container"},[a("router-link",{attrs:{to:{path:"/add"}}},[a("button",{staticClass:"add-button"},[t._v("추가")])]),t._v(" "),a("ul",t._l(t.locations,function(e,s){return a("button",{key:s,staticClass:"click",on:{click:function(e){return t.move(s)}}},[t._v("\n            주소명: "+t._s(e.name)+", 위도: "+t._s(e.lat)+", 경도: "+t._s(e.lng)+"\n          ")])}),0)],1):t._e()])},staticRenderFns:[]};var f=a("VU/8")(h,g,!1,function(t){a("yFSe")},null,null).exports,_=a("kxiW"),b=a.n(_),C=(a("dih4"),{props:{driver:{type:Object,required:!0}},data:()=>({user:null,map:null,marker:null,taxi:null,user:null,infoWindow:null}),mounted(){v.a.auth().onAuthStateChanged(t=>{this.user=t}),this.initMap(),this.listenForLocationUpdates()},methods:{initMap(){this.map=new google.maps.Map(this.$refs.map,{zoom:16,mapTypeId:google.maps.MapTypeId.ROADMAP}),this.taxi=new google.maps.MarkerImage("https://cdn-icons-png.flaticon.com/512/2557/2557954.png",null,null,null,new google.maps.Size(40,40)),this.user=new google.maps.MarkerImage("https://cdn-icons-png.flaticon.com/512/1912/1912207.png",null,null,null,new google.maps.Size(30,30)),this.marker=new google.maps.Marker({map:this.map,position:new google.maps.LatLng(this.driver.lat,this.driver.lng),icon:this.taxi}),this.marker2=new google.maps.Marker({map:this.map,position:new google.maps.LatLng(this.driver.lat,this.driver.lng),position:new google.maps.LatLng(36.32567092441993,127.338683962429),icon:this.user}),this.infoWindow=new google.maps.InfoWindow({content:`<div class="ui header">${this.driver.email}</div>`,disableAutoPan:!0}),this.marker.addListener("click",()=>{this.infoWindow.open(this.map,this.marker)}),this.map.setCenter(new google.maps.LatLng(this.driver.lat,this.driver.lng))},listenForLocationUpdates(){v.a.firestore().collection("location").doc(this.driver.id).onSnapshot(t=>{if(t.exists){const e=t.data();this.driver.lat=e.lat,this.driver.lng=e.lng,this.updateMap()}})},closeModal(){this.$emit("close")},updateMap(){this.marker.setPosition(new google.maps.LatLng(this.driver.lat,this.driver.lng)),this.map.setCenter(new google.maps.LatLng(this.driver.lat,this.driver.lng))}}}),w={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"backdrop",staticStyle:{"z-index":"9999"}},[a("div",{staticClass:"modal",staticStyle:{width:"1000px",height:"600px","z-index":"1550"},on:{click:function(e){return t.closeModal()}}},[a("div",{ref:"map",staticClass:"map",staticStyle:{width:"100%",height:"100%","z-index":"1549"},attrs:{id:"map"}})])])},staticRenderFns:[]};var x={name:"side",components:{Admin:a("VU/8")(C,w,!1,function(t){a("mJGJ")},"data-v-592b51cb",null).exports},data:()=>({showModal:!1,selectedDriver:null,user:null,drivers:[],carnums:[]}),mounted(){this.listenForLocationUpdates()},methods:{toggleModal(t){this.selectedDriver=t===this.selectedDriver?null:t,this.showModal=!this.showModal},async listenForLocationUpdates(){await b.a.firestore().collection("location").where("active","==",!0).onSnapshot(t=>{const e=t.docs.map(t=>{const e=t.data();return e.id=t.id,e});if(this.selectedDriver){const t=e.find(t=>t.id===this.selectedDriver.id);t&&(this.selectedDriver=t)}this.drivers=e})}}},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"side"},t._l(t.drivers,function(e,s){return a("div",{key:s},[a("div",{staticClass:"column"},[a("button",{staticClass:"email",staticStyle:{"margin-bottom":"15px"},on:{click:function(a){return t.toggleModal(e)}}},[t._v("\n        "+t._s(e.CarNumber)+"\n        "),t.showModal&&t.selectedDriver===e?a("admin",{attrs:{driver:e},on:{close:t.toggleModal}}):t._e()],1)])])}),0)},staticRenderFns:[]};var k={name:"App",components:{side:a("VU/8")(x,y,!1,function(t){a("Rhxe")},null,null).exports},data:()=>({user:null}),async mounted(){b.a.auth().onAuthStateChanged(t=>{this.user=t})},methods:{admin(){this.$router.push("/admin")},makeCall(){b.a.firestore().collection("location").where("status","==","").get().then(t=>{t.forEach(t=>{t.ref.update({status:"requested"}).then(()=>{console.log("기존 문서의 status 필드를 requested로 업데이트했습니다.")}).catch(t=>{console.error("문서 업데이트 에러: ",t)})})}).catch(t=>{console.error("문서 조회 에러: ",t)})}}},M={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ex-layout",attrs:{id:"main"}},[a("router-view"),t._v(" "),a("div",{staticClass:"top"},[a("p",{staticClass:"stx",on:{click:t.admin}},[a("span",{staticClass:"letter"},[t._v("S")]),t._v(" "),a("span",{staticClass:"letter"},[t._v("T")]),t._v(" "),a("span",{staticClass:"letter"},[t._v("X")])])]),t._v(" "),a("div",{staticClass:"main"},[a("div",{staticClass:"lnb"},[a("side")],1),t._v(" "),a("div",{staticClass:"content"},[a("button",{staticClass:"call",on:{click:t.makeCall}},[t._v("호출")])])])],1)},staticRenderFns:[]};var $=a("VU/8")(k,M,!1,function(t){a("Jzc4")},null,null).exports,A={mounted(){this.initMap()},methods:{initMap(){this.map=new window.google.maps.Map(this.$refs.map,{zoom:16,center:{lat:36.32567092441993,lng:127.338683962429},mapTypeId:google.maps.MapTypeId.ROADMAP}),this.addMarkers()},addMarkers(){new window.google.maps.Marker({position:{lat:lat,lng:lng},map:this.map,title:"User Marker"})}}},T={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"map-container"},[e("div",{ref:"map",staticClass:"map",attrs:{id:"map"}})])},staticRenderFns:[]},P=a("VU/8")(A,T,!1,null,null,null).exports,E={data:()=>({email:"",password:"",address:"",age:20,carNumber:"",carType:"",name:""}),methods:{async signup(){try{const t=(await v.a.auth().createUserWithEmailAndPassword(this.email,this.password)).user,e=v.a.firestore();await e.collection("users").doc(t.uid).set({address:this.address,age:this.age,carNumber:this.carNumber,carType:this.carType,name:this.name}),alert("회원가입이 완료되었습니다."),this.email="",this.password="",this.address="",this.age=20,this.carNumber="",this.carType="",this.name=""}catch(t){console.error("회원가입 오류:",t),alert("회원가입 중 오류가 발생했습니다.")}}}},N={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"signup-container"},[a("h2",[t._v("회원가입")]),t._v(" "),a("form",{staticClass:"signup-form",on:{submit:function(e){return e.preventDefault(),t.signup.apply(null,arguments)}}},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"label-text",attrs:{for:"email"}},[t._v("이메일:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"input-email",attrs:{type:"email",id:"email",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"label-text",attrs:{for:"password"}},[t._v("비밀번호:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input-password",attrs:{type:"password",id:"password",required:""},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"label-text",attrs:{for:"address"}},[t._v("집 주소:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"address"}],staticClass:"input-text",attrs:{type:"text",id:"address"},domProps:{value:t.address},on:{input:function(e){e.target.composing||(t.address=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"label-text",attrs:{for:"age"}},[t._v("나이:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model.number",value:t.age,expression:"age",modifiers:{number:!0}}],staticClass:"input-number",attrs:{type:"number",id:"age",min:"20",max:"150"},domProps:{value:t.age},on:{input:function(e){e.target.composing||(t.age=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"label-text",attrs:{for:"carNumber"}},[t._v("자동차 번호:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.carNumber,expression:"carNumber"}],staticClass:"input-text",attrs:{type:"text",id:"carNumber"},domProps:{value:t.carNumber},on:{input:function(e){e.target.composing||(t.carNumber=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"label-text",attrs:{for:"carType"}},[t._v("차종:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.carType,expression:"carType"}],staticClass:"input-text",attrs:{type:"text",id:"carType"},domProps:{value:t.carType},on:{input:function(e){e.target.composing||(t.carType=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"label-text",attrs:{for:"name"}},[t._v("이름:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"input-text",attrs:{type:"text",id:"name"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),t._v(" "),t._m(0)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"signup-button",attrs:{type:"submit"}},[e("span",{staticClass:"button-icon"},[this._v("가입")])])}]};var F=a("VU/8")(E,N,!1,function(t){a("m+lT")},"data-v-a79949b8",null).exports,L={data:()=>({email:"",password:""}),methods:{async login(){try{await v.a.auth().signInWithEmailAndPassword(this.email,this.password),alert("로그인 성공"),this.$router.push("/mobile")}catch(t){console.error("로그인 오류:",t),alert("이메일 또는 비밀번호를 확인해주시길 바랍니다.")}}}},S={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login-container"},[a("h2",[t._v("로그인")]),t._v(" "),a("form",{staticClass:"login-form",on:{submit:function(e){return e.preventDefault(),t.login.apply(null,arguments)}}},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"label-text",attrs:{for:"loginEmail"}},[t._v("이메일:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"input-email",attrs:{type:"email",id:"loginEmail",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{staticClass:"label-text",attrs:{for:"loginPassword"}},[t._v("비밀번호:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input-password",attrs:{type:"password",id:"loginPassword",required:""},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),t._m(0)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"login-button",attrs:{type:"submit"}},[e("span",{staticClass:"button-icon"},[this._v("로그인")])])}]};var U=a("VU/8")(L,S,!1,function(t){a("iP6g")},"data-v-9f4f5d48",null).exports,D={data:()=>({lat:"",lng:""}),methods:{goToMobileApp(){console.log("앱으로 접속"),this.$router.push("/toapp")},goToKiosk(){console.log("키오스크로 접속"),this.$router.push("/kiosk")},goToAdminMode(){this.$router.push("/")}}},R={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("h1",{on:{click:t.goToAdminMode}},[t._v(" 관리자 모드")]),t._v(" "),a("div",{staticClass:"admin"},[a("div",{staticClass:"button-container"},[a("button",{staticClass:"mobile",on:{click:t.goToMobileApp}},[t._v("어플")]),t._v(" "),a("button",{staticClass:"kiosk",on:{click:t.goToKiosk}},[t._v("키오스크")])])])])},staticRenderFns:[]};var V=a("VU/8")(D,R,!1,function(t){a("bOzr")},null,null).exports,z=a("GnZk"),I={data:()=>({positionObj:{},isPositionReady:!1,user:null}),async mounted(){b.a.auth().onAuthStateChanged(t=>{this.user=t})},components:{map_user:P},methods:{goToAdminMode(){this.$router.push("/")},makeCall(){b.a.firestore().collection("location").where("status","==","").get().then(t=>{t.forEach(t=>{t.ref.update({status:"requested"}).then(()=>{console.log("기존 문서의 status 필드를 requested로 업데이트했습니다.")}).catch(t=>{console.error("문서 업데이트 에러: ",t)})})}).catch(t=>{console.error("문서 조회 에러: ",t)})},getCurrentPosition(){z.a.isSupported?z.a.getCurrentPosition().then(t=>{this.getPositionValue(t)}).catch(()=>{this.geolocationError()}):this.setAlert("위치 정보를 찾을 수 없습니다.1")},getPositionValue(t){this.positionObj.latitude=t.coords.latitude,this.positionObj.longitude=t.coords.longitude,this.isPositionReady=!0,this.setAlert("주소 확인 완료")},geolocationError(){this.setAlert("위치 정보를 찾을 수 없습니다.2")},setAlert(t){alert(t)}}},q={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("h1",{on:{click:t.goToAdminMode}},[t._v(" 관리자 모드")]),t._v(" "),a("div",{staticClass:"mobile-container"},[a("h3",{staticStyle:{"margin-top":"20px"}},[t._v("승객 전용 어플")]),t._v(" "),a("div",{staticClass:"map"},[a("map_user")],1),t._v(" "),a("div",[a("v-btn",{staticClass:"check",on:{click:function(e){return t.getCurrentPosition()}}},[t._v("위치 좌표 확인")]),t._v(" "),a("div",[t._v(t._s(t.isPositionReady?"yes":"no"))])],1),t._v(" "),a("div",{staticClass:"call-group"},[a("button",{staticClass:"mobile",on:{click:t.makeCall}},[t._v("호출")])])])])},staticRenderFns:[]};var W=a("VU/8")(I,q,!1,function(t){a("C75n")},null,null).exports,J={data:()=>({name:"",latitude:"",longitude:"",locations:[],dataLoaded:!1}),methods:{goToAdminMode(){this.$router.push("/")},saveData(){const t=v.a.firestore(),e=v.a.firestore.FieldValue.serverTimestamp();t.collection("locations").add({name:this.name,lat:parseFloat(this.lat),lng:parseFloat(this.lng),createdAt:e}).then(()=>{console.log("데이터 저장 완료"),this.name="",this.lat="",this.lng="",this.$router.push("/kiosk")}).catch(t=>{console.error("데이터 저장 에러:",t)})},loadData(){v.a.firestore().collection("locations").orderBy("createdAt","desc").get().then(t=>{this.locations=t.docs.map(t=>t.data()),this.dataLoaded=!0}).catch(t=>{console.error("데이터 불러오기 에러:",t)})}},mounted(){this.loadData()}},O={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("h1",{on:{click:t.goToAdminMode}},[t._v(" 관리자 모드")]),t._v(" "),a("div",{staticClass:"admin"},[a("div",{staticClass:"coordinate-input"},[a("h3",[t._v("키오스크 좌표 입력:")]),t._v(" "),a("div",{staticClass:"input-container"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{placeholder:"주소명"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.lat,expression:"lat"}],attrs:{placeholder:"위도"},domProps:{value:t.lat},on:{input:function(e){e.target.composing||(t.lat=e.target.value)}}}),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.lng,expression:"lng"}],attrs:{placeholder:"경도"},domProps:{value:t.lng},on:{input:function(e){e.target.composing||(t.lng=e.target.value)}}}),t._v(" "),a("button",{staticClass:"submit",on:{click:t.saveData}},[t._v("확인")])])])])])},staticRenderFns:[]};var j=a("VU/8")(J,O,!1,function(t){a("678E")},null,null).exports;s.default.use(o.a);var B=new o.a({mode:"history",routes:[{path:"/",component:$},{path:"/add",component:j},{path:"/kiosk",component:f},{path:"/mobile",component:m},{path:"/toapp",component:W},{path:"/map",name:"map",component:c},{path:"/map_user",name:"map_user",component:P},{path:"/mobile/register",component:F},{path:"/mobile/login",component:U},{path:"/admin",component:V}]}),G=a("TX8X"),K=a.n(G),X=a("3EgV"),H=a.n(X),Q=a("LvQi");s.default.use(Q.a);var Z=new Q.a.Store({state:{name:null,lat:null,lng:null},mutations:{savename(t,e){t.name=e},savelat(t,e){t.lat=e},savelng(t,e){t.lng=e}}});a("424j"),a("hZls");s.default.use(z.a),s.default.use(H.a),s.default.use(K.a),s.default.use(Q.a),s.default.config.productionTip=!1;v.a.initializeApp({apiKey:"AIzaSyBJ6_djq8S_DWQaJtBtWwefaqp05LKgDWg",authDomain:"taxi-6c99c.firebaseapp.com",databaseURL:"https://taxi-6c99c-default-rtdb.firebaseio.com",projectId:"taxi-6c99c",storageBucket:"taxi-6c99c.appspot.com",messagingSenderId:"990303890516",appId:"1:990303890516:web:d107aeb27e3be47d74d1c1",measurementId:"G-1MHMXS5V68"});v.a.firestore();new s.default({store:Z,router:B,vuetify:H.a,render:t=>t(n)}).$mount("#app")},Rhxe:function(t,e){},SfA5:function(t,e){},bOzr:function(t,e){},bndV:function(t,e){},iP6g:function(t,e){},"m+lT":function(t,e){},mJGJ:function(t,e){},nN6U:function(t,e){},yFSe:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.378dd277e928b4e60cc2.js.map