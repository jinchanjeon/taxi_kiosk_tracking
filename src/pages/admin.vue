<template>
  <div class="box">
    <h1 @click="goToAdminMode"> 관리자 모드</h1>
    <div class="admin">
      <div class="button-container">
        <button class="mobile" @click="goToMobileApp">어플</button>
        <button class="kiosk" @click="goToKiosk">키오스크</button>
      </div>
    </div>

   
  </div>
</template>


<script>
export default {
  data() {
    return {
      lat: '',
      lng: '',
    };
  },
  methods: {

    
    goToMobileApp() {
      console.log('앱으로 접속');
      this.$router.push('/toapp');
    },
    goToKiosk() {
      console.log('키오스크로 접속');
      this.$router.push('/kiosk');
    },
    goToAdminMode(){
      this.$router.push('/');
    }
  },
};
</script>

<style>

input{
width:180px;
height:40px;
font-size:18px;
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
  width: 100%; /* Full width */
  height: 150px;
  display: flex; /* Use flexbox for centering */
  justify-content: center; /* Center horizontally */
  /* padding-left: 50px;
  padding-right: 50px; */
}

.button-container {
  display: flex;
  align-items: center; /* Center vertically */
}

.mobile {
  width: 150px;
  height: 80px;
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
.submit:hover {
    /* background-color:#ffeb00; ;
    transition: 0.5s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */

    border-color: none;
    background-color: rgb(252,211,69);
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
.mobile:hover {
    /* background-color:#ffeb00; ;
    transition: 0.5s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */

    border-color: none;
    background-color: rgb(252,211,69);
    box-shadow: 0 0.1em 0.1em -0.1em rgb(84, 84, 84);
    transform: translateY(-5px);
    cursor: pointer;
}

.kiosk {
  width: 150px;
  height: 80px;
  border-radius: 25px;
  background: none;
  color: rgb(0, 0, 0);
  border: none;
  padding: 1em 2em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 1.3rem;
  transition: all 0.5s;
  font-weight: bold;
}
.kiosk:hover {
    /* background-color:#ffeb00; ;
    transition: 0.5s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */

    border-color: none;
    background-color: rgb(252,211,69);
    box-shadow: 0 0.5em 0.5em -0.4em rgb(84, 84, 84);
    transform: translateY(-5px);
    cursor: pointer;
}

h1 {
  text-align: center;
  cursor:pointer;
}
</style>