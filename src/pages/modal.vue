<template>
  <div class="backdrop" style="z-index: 9999;">
    <div class="modal" style="width: 1000px; height: 600px; z-index: 1550;"  @click="closeModal()">
      <div class="map" id="map" ref="map" style="width: 100%; height: 100%; z-index: 1549;"></div>
    </div>

  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  props: {
    driver: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      user: null,
      map: null,
      marker: null,
      taxi:null,
      user:null,
      infoWindow: null
    };
  },

  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });

    this.initMap();
    this.listenForLocationUpdates();
  },

  methods: {
    initMap() {
      this.map = new google.maps.Map(this.$refs["map"], {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      this.taxi = new google.maps.MarkerImage("https://cdn-icons-png.flaticon.com/512/2557/2557954.png",null,null,null,new google.maps.Size(40,40));
      this.user = new google.maps.MarkerImage("https://cdn-icons-png.flaticon.com/512/1912/1912207.png",null,null,null,new google.maps.Size(30,30));

      this.marker = new google.maps.Marker({
        map: this.map,
        position: new google.maps.LatLng(this.driver.lat, this.driver.lng),
        icon: this.taxi
      });

      this.marker2 = new google.maps.Marker({
        map: this.map,
        position: new google.maps.LatLng(this.driver.lat, this.driver.lng),
        position: new google.maps.LatLng(36.32567092441993, 127.338683962429),
        icon: this.user
      });

      this.infoWindow = new google.maps.InfoWindow({
        content: `<div class="ui header">${this.driver.email}</div>`,
        disableAutoPan: true
      });

      this.marker.addListener("click", () => {
        this.infoWindow.open(this.map, this.marker);
      });

      this.map.setCenter(new google.maps.LatLng(this.driver.lat, this.driver.lng));
    },

    listenForLocationUpdates() {
      const db = firebase.firestore();
      const locationRef = db.collection("location").doc(this.driver.id);

      locationRef.onSnapshot(doc => {
        if (doc.exists) {
          const locationData = doc.data();
          this.driver.lat = locationData.lat;
          this.driver.lng = locationData.lng;

          // 지도 업데이트
          this.updateMap();
        }
      });
    },

    closeModal() {
      this.$emit("close");
    },

    updateMap() {
      // 기존 마커 업데이트
      this.marker.setPosition(new google.maps.LatLng(this.driver.lat, this.driver.lng));
      this.map.setCenter(new google.maps.LatLng(this.driver.lat, this.driver.lng));
    }
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