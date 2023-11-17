<template>
  <div class="box">
    <h1 @click="goToAdminMode"> 관리자 모드</h1>
    <div class="admin">
      <div class="coordinate-input">
        <h3>키오스크 좌표 입력:</h3>
        <div class="input-container">
          <input placeholder="주소명" v-model="name" />
          <input placeholder="위도" v-model="lat" />
          <input placeholder="경도" v-model="lng" />
          <button class="submit" @click="saveData">확인</button>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  data() {
    return {
      name: '',
      latitude: '',
      longitude: '',
      locations: [],
      dataLoaded: false,
    };
  },
  methods: {
    goToAdminMode() {
      this.$router.push('/');
    },
    saveData() {
      // ... 이전 코드 ...

      const db = firebase.firestore();
      const timestamp = firebase.firestore.FieldValue.serverTimestamp(); // 현재 서버 시간을 가져옴

      // 직접 정의한 문서 ID
      const customDocumentId = new Date().toISOString(); // 사용자가 원하는 고유한 ID로 변경

      // collection.doc()을 사용하여 참조 생성
      const docRef = db.collection('locations').doc(customDocumentId);

      // 생성한 참조에 데이터 추가
      docRef.set({
        name: this.name,
        lat: parseFloat(this.lat),
        lng: parseFloat(this.lng),
        createdAt: timestamp,
      })
        .then(() => {
          console.log('데이터 저장 완료');
          this.name = '';
          this.lat = '';
          this.lng = '';
          this.$router.push('/kiosk');
        })
        .catch(error => {
          console.error('데이터 저장 에러:', error);
        });
    },
    //   loadData() {
    //     const db = firebase.firestore();
    //     db.collection('locations')
    //     .orderBy('createdAt', 'desc')
    //     .onSnapshot(snapshot => {
    //     this.locations = [];
    //     snapshot.forEach(doc => {
    //       this.locations.push(doc.data());
    //     });
    //     this.dataLoaded = true;
    //   }, error => {
    //     console.error('데이터 감시 에러:', error);
    //   });
    //   },
    loadData() {
      const db = firebase.firestore();
      db.collection("locations")
        .orderBy("customDocumentId", "desc")
        .get()
        .then(querySnapshot => {
          this.locations = querySnapshot.docs.map(doc => doc.data());
          this.dataLoaded = true;
        })
        .catch(error => {
          console.error('데이터 불러오기 에러:', error);
        });
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
  margin-top: 150px;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: right;
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
}
</style>