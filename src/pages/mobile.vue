<template>
    <div class="mobile-container">
        <h3 style="margin-top: 20px;">기사님 전용 어플</h3>
        <div class="map">
            <map />
        </div>
        <div class="call-group">
            <button class="mobile-btn1">운행 시작</button>
            <button class="mobile-btn2">운행 종료</button>
        </div>

    </div>
</template>
  
<script>
import Map from './Map.vue';

export default {
    components: {
        Map
    }
}
</script>
  
<style>
.mobile-container {
    overflow: hidden;
    position: fixed;
    text-align: center;
    width: 100%;
    height: 100%;

}

.map {

    margin-left: auto;
    margin-right: auto;
    width: 99%;
    height: 400px;
    border: 1px solid;
}

.call-group {
    width: 100%;
    position: fixed;
    margin-top: 65px;

}

.mobile-btn1 {
    margin-left: auto;
    margin-right: auto;
    width: 95%;
    height: 60px;
    font-weight: 400;
    font-size: 25px;
    background-color: rgba(39, 218, 39, 0.966);
    color: #fff;
    border: 1px solid #0b8300;
    border-radius: 8px;

}

.mobile-btn1:active {
    background-color: rgb(32, 182, 32);

}

.mobile-btn2 {
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    width: 95%;
    height: 60px;
    font-weight: 400;
    font-size: 25px;
    background-color: rgb(238, 84, 84);
    border: 1px solid #b30000;
    color: #fff;
    border-radius: 8px;
}

.mobile-btn2:active {
    background-color: rgb(252, 27, 27);
}

.drive-group {
    margin-top: 40px;
}

.start-btn1 {
    width: 98%;
    height: 45px;
}

.start-btn2 {
    margin-top: 10px;
    height: 45px;
    width: 98%;
}</style>