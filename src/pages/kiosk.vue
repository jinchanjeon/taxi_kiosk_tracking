<template>
  <div class="box">
    <h1 @click="goToAdminMode"> 관리자 모드</h1>

    <div v-if="dataLoaded" class="list-container">
      <router-link :to="{ path: '/add' }">
        <button class="add-button">추가</button>
      </router-link>
      <ul>
        <button class="click" @click="move(index)" v-for="(location, index) in locations" :key="index">
          주소명: {{ location.name }}, 위도: {{ location.lat }}, 경도: {{ location.lng }}
        </button>
      </ul>
    </div>
  </div>
</template>
  

  
<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import Vue from 'vue'

export default {
  data() {
    return {
      name: '',
      lat: '',
      lng: '',
      locations: [],
      dataLoaded: false,
    };

  },

  methods: {
    goToAdminMode() {
      this.$router.push('/');
    },
    saveData() {
      const db = firebase.firestore();
      db.collection('locations').add({
        name: this.name,
        lat: parseFloat(this.lat),
        lng: parseFloat(this.lng),
      })
        .then(() => {
          console.log('데이터 저장 완료');
          this.name = '';
          this.lat = '';
          this.lng = '';
        })
        .catch(error => {
          console.error('데이터 저장 에러:', error);
        });
    },

    loadData() {
      const db = firebase.firestore();
      db.collection('locations')
        .orderBy("createdAt", "desc")  // 'customDocumentId'를 기준으로 오름차순 정렬
        .onSnapshot(snapshot => {
          this.locations = [];
          snapshot.forEach(doc => {
            this.locations.push(doc.data());
          });
          this.dataLoaded = true;
        }, error => {
          console.error('데이터 감시 에러:', error);
        });
    },

    move(index) {
      this.$router.push('/');
      const location = this.locations[index];
      // 이벤트 버스를 사용하여 데이터를 전달
      const EventBus = new Vue();
      EventBus.$emit('location-selected', {
        name: location.name,
        lat: location.lat,
        lng: location.lng
      });

      console.log('send: ', {
        name: location.name,
        lat: location.lat,
        lng: location.lng
      })
    },

  },
  mounted() {
    this.loadData();
  },
};
</script>
  
<style>
.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;

}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: right;
}

.add-button {
  margin-top: 10px;
  width: 100px;
  height: 50px;
  font-size: 1.3em;
  border-radius: 25px;
  background: none;
  color: rgb(0, 0, 0);
  border: none;
  padding: 1em 2em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  font-weight: bold;
  width: fit-content;
  display: inline-block;
}

.add-button:hover {
  border-color: none;
  background-color: rgb(252, 211, 69);
  box-shadow: 0 0.5em 0.5em -0.4em rgb(84, 84, 84);
  transform: translateY(-5px);
  cursor: pointer;
}

input {
  width: 180px;
  height: 40px;
  font-size: 18px;
  margin: 5px;
}

.coordinate-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.admin {
  /* background-color: rgb(120, 59, 59);  */
  width: 100%;
  /* Full width */
  height: 150px;
  display: flex;
  /* Use flexbox for centering */
  justify-content: center;
  /* Center horizontally */
  /* padding-left: 50px;
  padding-right: 50px; */
}

.submit:hover {
  /* background-color:#ffeb00; ;
    transition: 0.5s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */

  border-color: none;
  background-color: rgb(252, 211, 69);
  box-shadow: 0 0.5em 0.5em -0.4em rgb(84, 84, 84);
  transform: translateY(-5px);
  cursor: pointer;
}

.submit {
  width: 100px;
  height: 50px;
  font-size: 1.3em;
  border-radius: 25px;
  background: none;
  color: rgb(0, 0, 0);
  border: none;
  padding: 1em 2em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  font-weight: bold;
  margin-right: 70px;
  width: fit-content;
  display: inline-block;
}

.click {
  margin: 10px;
  width: 100px;
  height: 50px;
  font-size: 1.3em;
  border-radius: 25px;
  background: none;
  color: rgb(0, 0, 0);
  border: none;
  padding: 1em 2em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  font-weight: bold;
  margin-right: 70px;
  width: fit-content;
  display: inline-block;
}

.click:hover {
  /* background-color:#ffeb00; ;
    transition: 0.5s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */

  border-color: none;
  background-color: rgb(252, 211, 69);
  box-shadow: 0 0.5em 0.5em -0.4em rgb(84, 84, 84);
  transform: translateY(-5px);
  cursor: pointer;
}



h1 {
  text-align: center;
  cursor: pointer;
}</style>