<template>
  <div class="map-container">
    <div class="map" id="map" ref="map"></div>
  </div>
</template>
  
<script>
import Vue from 'vue'
export default {
  mounted() {
    this.initMap();
    const EventBus = new Vue();
    // 이벤트를 수신하고 처리
    EventBus.$on('location-selected', location=> {
     
      // 선택된 위치를 가지고 마커 추가 등의 작업 수행
      this.addMarkers(location.lat, location.lng);
      

    })
      .catch((err) => {
        alert('에러 발생: ' + err); //에러 발생
      });
    ;

  },



  methods: {
    async loadFirebaseData() {
      const db = firebase.firestore();
      const snapshot = await db.collection('locations').get();
      return snapshot.docs.map(doc => doc.data());
    },
    async initMap() {
      // 좌표 정보가 있을 경우에만 마커 추가
      const { lat, lng } = this.coordinates;
      if (lat && lng) {
        this.addMarkers(lat, lng);
       
      }


      const locations = await this.loadFirebaseData();

      this.map = new window.google.maps.Map(this.$refs["map"], {
        zoom: 16,
        center: { lat, lng },
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      locations.forEach(location => {
        this.addMarkers(location.lat, location.lng);
      });

    },

    addMarkers(lat, lng) {
      const taxiIcon = new window.google.maps.MarkerImage(
        "https://cdn-icons-png.flaticon.com/512/2557/2557954.png",
        null,
        null,
        null,
        new google.maps.Size(40, 40)
      );

      const userIcon = new window.google.maps.MarkerImage(
        "https://cdn-icons-png.flaticon.com/512/1912/1912207.png",
        null,
        null,
        null,
        new google.maps.Size(30, 30)
      );
      const userMarker = new window.google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        icon: userIcon,
        title: "User Marker",
      });


      driverMarker.addListener("click", () => {
        // 마커 클릭 시 동작
      });
      userMarker.addListener("click", () => {
        // 마커 클릭 시 동작
      });


    },
    

  }
};
</script>
  
<style scoped>
.map {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 1550;
}

#map {
  width: 100%;
  height: 700px;
  border: 1px #a8a8a8 solid;
  z-index: 1549;
}

.modal {
  position: relative;
  width: 300px;
  padding: 20px;
  margin: 100px auto;
  background: white;
  border-radius: 10px;
  z-index: 1550;
}

.backdrop {
  top: 0;
  left: 0px;
  position: fixed;
  background: rgb(92, 92, 92);
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
  z-index: 2000;
}
</style>