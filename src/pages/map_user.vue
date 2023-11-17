<template>
    <div class="map-container">
        <div class="map" id="map" ref="map"></div>
    </div>
</template>
  

<script>
export default {
    mounted() {
        this.initMap();
    },

    methods: {
        initMap() {
            this.map = new window.google.maps.Map(this.$refs["map"], {
                zoom: 16,
                center: { lat: 36.32567092441993, lng: 127.338683962429 },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            this.addMarkers();
        },

        addMarkers() {
            const userMarker = new window.google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        title: "User Marker",
      });


        }
    }
};
</script>
<!--   
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


</style> -->