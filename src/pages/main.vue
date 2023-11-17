<template>
  <div id="main" class="ex-layout">
    <router-view />
    <div class="top">
      <p class="stx" @click="admin">
        <span class="letter">S</span>
        <span class="letter">T</span>
        <span class="letter">X</span>
      </p>
    </div>
    <div class="main">
      <div class="lnb">
        <side />
      </div>
      <div class="content">
        <button class="call" @click="makeCall">호출</button>
      </div>
    </div>
  </div>
</template>
<script>
import side from '../pages/side.vue';
import firebase from "firebase";
import router from '../router';

export default {
  name: "App",
  components: { side },
  data() {
    return {
      user: null,
    }
  },

  async mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },

  methods: {
    admin(){
      this.$router.push('/admin');
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
  },

  

};
components: { router }
</script>


<style>
@font-face {
  font-family: 'jua';
  src: url('../../public/fonts/ttf/BMJUA_ttf.ttf')
}

@font-face {
  font-family: 'dohyeon';
  src: url('../../public/fonts/ttf/BMDOHYEON_ttf.ttf')
}

@font-face {
  font-family: 'hanna';
  src: url('../../public/fonts/otf/BMHANNA_11yrs_otf.otf')
}

body {
  /* background: rgb(245, 245, 245); */
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* font-family: 'hanna'; */
  /* background-color: rgb(249,248,237); */
}

.top {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  /* background-color: rgb(249,248,237); */
}

.stx {
  /* background-color: red; */
  font-size: 60px;
  color:rgb(253, 198, 2);
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
  cursor:pointer;
}

.letter {
  margin-right: 10px;
}
.main {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
}

.lnb {
  width: 20%;
}

.content {
  width: 100%;
  margin-top:100px;
  /* background-color: aquamarine; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* 중앙 정렬을 위한 추가 */
}

.call {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  width: 50vw; /* 화면 가로폭의 50%로 크기 조절 */
   max-width: 550px; /*최대 크기 지정 */
  height: 25vh; /* 화면 높이의 25%로 크기 조절 */
  border-radius: 25px;
  font-size: 2vw; /* 화면 가로폭에 따라 크기 조절 */
  font-weight: bold;
  color: #282828;
  background-color: rgb(253, 198, 2);
  border: none;
  cursor: pointer;

  /* animation: bounce 2.5s infinite; */
}

/* 
@keyframes slide {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}


@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
} */



</style>