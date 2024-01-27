<template>
  <div class="map-container">
    <div class="map" id="map" ref="map"></div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
export default {
  mounted() {
    this.initMap();
  },
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
  

  methods: {
    initMap() {
      // Check if the Geolocation API is supported
      if (navigator.geolocation) {
        // Get the current positionㅛ
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.map = new window.google.maps.Map(this.$refs["map"], {
              zoom: 16,
              center: { lat: latitude, lng: longitude },
              mapTypeId: google.maps.MapTypeId.ROADMAP,
            });

            this.taxiIcon = new google.maps.MarkerImage("https://cdn-icons-png.flaticon.com/512/2557/2557954.png", null, null, null, new google.maps.Size(40, 40));
            this.userIcon = new google.maps.MarkerImage("https://cdn-icons-png.flaticon.com/512/1912/1912207.png", null, null, null, new google.maps.Size(30, 30));

            this.addMarker({ lat: latitude, lng: longitude }, this.userIcon, "나의 현재 위치");
            this.addMarker({ lat: 36.32567092441993, lng: 127.338683962429 }, this.taxiIcon, "택시 위치");
          },
          (error) => {
            console.error("Error getting current position:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    },

    addMarker({ lat, lng }, icon, title) {
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        icon: icon,
        title: title,
      });
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

      console.log("Updated Drivers:", updatedDrivers);

      if (this.selectedDriver) {
        const updatedDriver = updatedDrivers.find((driver) => driver.id === this.selectedDriver.id);
        if (updatedDriver) {
          this.selectedDriver = updatedDriver;
          this.addMarker({ lat: updatedDriver.lat, lng: updatedDriver.lng }, this.taxiIcon, "택시 위치");
        }
      }

      this.drivers = updatedDrivers;
    });
},
  },
};
</script>
