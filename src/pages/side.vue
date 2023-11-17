<template>
  <div class="side">
    <div v-for="(driver, index) in drivers" :key="index">
      <div class="column">
        <button class="email" style="margin-bottom:15px;" @click="toggleModal(driver)">
          {{ driver.CarNumber }}
          <admin v-if="showModal && selectedDriver === driver" @close="toggleModal" :driver="driver" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Admin from './modal.vue'



export default {
  name: 'side',
  components: {
    Admin
  },
  data() {
    return {
      showModal: false,
      selectedDriver: null,
      user: null,
      drivers: [],
      carnums: [],
    };
  },
  mounted() {
    this.listenForLocationUpdates();
  },
  methods: {
    toggleModal(driver) {
      this.selectedDriver = driver === this.selectedDriver ? null : driver;
      this.showModal = !this.showModal;
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
.modal {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: (0, 0, 0);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}


.email {
    background: rgb(99, 99, 99); 
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    /* font-family:'hanna'; */
    color: rgb(255, 255, 255); 
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 2vw; 
    font-weight: 600;
    border: 1px;
    width: 100%;
    height: 100px;
    cursor: pointer;
}


</style>


