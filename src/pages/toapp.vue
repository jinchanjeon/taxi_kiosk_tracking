<template>
   <div class="box">
    <h1 @click="goToAdminMode"> 관리자 모드</h1>
  <div class="mobile-container">
    <h3 style="margin-top: 20px;">승객 전용 어플</h3>
    <div class="map">
      <map_user  />
      </div>
    <div>
      <v-btn class="check" @click="getCurrentPosition()">위치 좌표 확인</v-btn>
      <div>{{ isPositionReady ? 'yes' : 'no' }}</div>
    </div>
    <div class="call-group">
      <button class="mobile" @click="makeCall">호출</button>
    </div>
    
  </div>
  </div>
</template>

<!-- 
호출 눌렀을 때 기사 매칭 알림 띄우고
지도에 기사 위치 정보 띄우고
밑에 기사 차량정보 띄우기 -->


<script>
import map_user from './map_user.vue';
import firebase from "firebase";
import router from '../router';
import VueGeolocation from 'vue-geolocation-api';

export default {
  data() {
    return {
      positionObj: {},
      isPositionReady: false,
      user: null,
      drivers: [],
      carnums: [],
    };
  },
  async mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
    this.listenForLocationUpdates();
  },
 


  components: {
    map_user,
   
  },
  methods: {
    

    goToAdminMode(){
      this.$router.push('/');
    },
    makeCall() {
      const db = firebase.firestore();
      const locationRef = db.collection("location");


      locationRef
        .where("status", "==", "")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({ status: "requested" })
              .then(() => {
                console.log("기존 문서의 status 필드를 requested로 업데이트했습니다.");
              })
              .catch(error => {
                console.error("문서 업데이트 에러: ", error);
              });
          });
        })
        .catch(error => {
          console.error("문서 조회 에러: ", error);
        });
    },
    // getCurrentPosition를 Vue 메소드로 정의
    getCurrentPosition() {
      if (!VueGeolocation.isSupported) {
        this.setAlert('위치 정보를 찾을 수 없습니다.1');
      } else {
        // VueGeolocation의 getCurrentPosition 메소드 사용
        VueGeolocation.getCurrentPosition()
          .then((val) => {
            this.getPositionValue(val);
          })
          .catch(() => {
            this.geolocationError();
          });
      }
    },
    getPositionValue(val) {
      this.positionObj.latitude = val.coords.latitude;
      this.positionObj.longitude = val.coords.longitude;
      this.isPositionReady = true;
      this.setAlert('주소 확인 완료');
    },
    geolocationError() {
      this.setAlert('위치 정보를 찾을 수 없습니다.2');
    },
    setAlert(text) {
      alert(text);
    },

    async listenForLocationUpdates() {
      const querySnapshot = await firebase
        .firestore()
        .collection("location")
        .where("active", "==", true)
        .onSnapshot((querySnapshot) => {
          const updatedDrivers = querySnapshot.docs.map((doc) => {
            const driver = doc.data();
            driver.id = doc.id;
            return driver;
          });

          // 변경된 좌표를 찾아서 selectedDriver 업데이트
          if (this.selectedDriver) {
            const updatedDriver = updatedDrivers.find((driver) => driver.id === this.selectedDriver.id);
            if (updatedDriver) {
              this.selectedDriver = updatedDriver;
            }
          }

          this.drivers = updatedDrivers;
        });
        },
  },
};
</script>
  
<style>
.mobile-container {
  /* background-color: #0b8300; */
  overflow: hidden;
  position: fixed;
  text-align: center;
  width: 100%;
  height: 100%;

}
.map {
  /* background-color: #b30000; */
  margin-left: auto;
  margin-right: auto;
  width: 99%;
  height: 400px;
  border: 1px solid;
}

.call-group {
  width: 100%;
  position: fixed;
  margin-top: 65px;

}

.check{
  background-color: rgb(252,211,69);
  border:none;
  margin-top:10px;
  height:30px;
}

.mobile {
  width: 95%;
  height: 60px;
  font-weight: 400;
  font-size: 25px;
  background:none;
  border-radius: 25px;
  color: rgb(0, 0, 0);
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

}

.mobile:hover {

    background-color: rgb(252,211,69);
    box-shadow: 0 0.5em 0.5em -0.4em rgb(84, 84, 84);
    transform: translateY(-5px);
    cursor: pointer;
}


.drive-group {
  margin-top: 40px;
}

.start-btn1 {
  width: 98%;
  height: 45px;
}

.start-btn2 {
  margin-top: 10px;
  height: 45px;
  width: 98%;
}

h1 {
  text-align: center;
  cursor:pointer;
}
</style>