<template>
  <div class="signup-container">
    <h2>회원가입</h2>
    <form @submit.prevent="signup" class="signup-form">
      <div class="form-group">
        <label for="email" class="label-text">이메일:</label>
        <input type="email" id="email" v-model="email" required class="input-email">
      </div>
      <div class="form-group">
        <label for="password" class="label-text">비밀번호:</label>
        <input type="password" id="password" v-model="password" required class="input-password">
      </div>
      <div class="form-group">
        <label for="address" class="label-text">집 주소:</label>
        <input type="text" id="address" v-model="address" class="input-text">
      </div>
      <div class="form-group">
        <label for="age" class="label-text">나이:</label>
        <input type="number" id="age" v-model.number="age" min="20" max="150" class="input-number">
      </div>
      <div class="form-group">
        <label for="carNumber" class="label-text">자동차 번호:</label>
        <input type="text" id="carNumber" v-model="carNumber" class="input-text">
      </div>
      <div class="form-group">
        <label for="carType" class="label-text">차종:</label>
        <input type="text" id="carType" v-model="carType" class="input-text">
      </div>
      <div class="form-group">
        <label for="name" class="label-text">이름:</label>
        <input type="text" id="name" v-model="name" class="input-text">
      </div>
      <button type="submit" class="signup-button">
        <span class="button-icon">가입</span>
      </button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
  data() {
    return {
      email: '',
      password: '',
      address: '',
      age: 20, // 나이 기본값을 20으로 설정
      carNumber: '',
      carType: '',
      name: '',
    };
  },
  methods: {
    async signup() {
      try {
        // Firebase Authentication을 사용하여 이메일과 비밀번호로 회원가입
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
        const user = userCredential.user;

        // Firebase Firestore를 사용하여 추가 정보를 해당 사용자의 문서에 저장
        const db = firebase.firestore();
        await db.collection('users').doc(user.uid).set({
          address: this.address,
          age: this.age,
          carNumber: this.carNumber,
          carType: this.carType,
          name: this.name,
        });

        alert('회원가입이 완료되었습니다.');
        this.email = '';
        this.password = '';
        this.address = '';
        this.age = 20;
        this.carNumber = '';
        this.carType = '';
        this.name = '';
      } catch (error) {
        console.error('회원가입 오류:', error);
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  },
};
</script>

<style scoped>
.signup-container {
  text-align: center;
  margin-top: 20px;
}

.signup-form {
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
.input-password,
.input-text,
.input-number {
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
.input-password::placeholder,
.input-text::placeholder,
.input-number::placeholder {
  color: #999;
}

.signup-button {
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

.signup-button:hover {
  background-color: #ffe100;
}
</style>
