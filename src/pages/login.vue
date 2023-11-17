<template>
    <div class="login-container">
      <h2>로그인</h2>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="loginEmail" class="label-text">이메일:</label>
          <input type="email" id="loginEmail" v-model="email" required class="input-email">
        </div>
        <div class="form-group">
          <label for="loginPassword" class="label-text">비밀번호:</label>
          <input type="password" id="loginPassword" v-model="password" required class="input-password">
        </div>
        <button type="submit" class="login-button">
          <span class="button-icon">로그인</span>
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import firebase from 'firebase/app';
  import 'firebase/auth';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          // Firebase Authentication을 사용하여 이메일과 비밀번호로 로그인
          await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
          alert('로그인 성공');
          this.$router.push('/mobile');
          // 로그인 성공 후 리다이렉트 또는 다른 동작 수행
        } catch (error) {
          console.error('로그인 오류:', error);
          alert('이메일 또는 비밀번호를 확인해주시길 바랍니다.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    text-align: center;
    margin-top: 20px;
  }
  
  .login-form {
    max-width: 300px;
    margin: 0 auto;
  }
  
  .form-group {
    margin: 10px 0;
  }
  
  .label-text {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .input-email,
  .input-password {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 25px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background-color: #f3f3f3;
    outline: none;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  
  .input-email::placeholder,
  .input-password::placeholder {
    color: #999;
  }
  
  .login-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffeb00;
    color: #333;
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    font-weight: bold;
    margin-top: 15px;
  }
  
  .button-icon {
    display: inline-block;
  }
  
  .login-button:hover {
    background-color: #ffe100;
  }
  </style>
  