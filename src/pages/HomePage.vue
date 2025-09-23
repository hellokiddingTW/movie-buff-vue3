<template>
  <div>
    <h1>檢查是否在中心點 A 500 公尺範圍內</h1>
    <button @click="checkLocation">檢查我的位置</button>
    <p>{{ resultMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 中心點 A 的經緯度（例如台北 101）
const centerPoint = {
  latitude: 25.0330,
  longitude: 121.5654
};

// 用於儲存結果訊息
const resultMessage = ref('請點擊按鈕以檢查位置');

// Haversine 公式計算兩點間距離（單位：公里）
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 地球半徑（公里）
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

// 檢查使用者位置
function checkLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // 計算與中心點 A 的距離
        const distance = calculateDistance(
          centerPoint.latitude,
          centerPoint.longitude,
          userLat,
          userLon
        );

        // 檢查是否在 500 公尺範圍內
        if (distance <= 0.5) {
          resultMessage.value = 'OK - 您在中心點 A 500 公尺範圍內！';
          alert('OK - 您在中心點 A 500 公尺範圍內！');
        } else {
          resultMessage.value = `您不在範圍內，距離中心點 ${Math.round(distance * 1000)} 公尺`;
          alert(`您不在範圍內，距離中心點 ${Math.round(distance * 1000)} 公尺`);
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            resultMessage.value = '錯誤：使用者拒絕了位置請求';
            alert('錯誤：使用者拒絕了位置請求');
            break;
          case error.POSITION_UNAVAILABLE:
            resultMessage.value = '錯誤：無法取得位置資訊';
            alert('錯誤：無法取得位置資訊');
            break;
          case error.TIMEOUT:
            resultMessage.value = '錯誤：位置請求超時';
            alert('錯誤：位置請求超時');
            break;
          default:
            resultMessage.value = '錯誤：未知錯誤';
            alert('錯誤：未知錯誤');
            break;
        }
      }
    );
  } else {
    resultMessage.value = '錯誤：您的瀏覽器不支援 Geolocation API';
    alert('錯誤：您的瀏覽器不支援 Geolocation API');
  }
}
</script>

<style scoped>
/* 可選：添加基本樣式 */
div {
  text-align: center;
  padding: 20px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
p {
  margin-top: 20px;
  font-size: 18px;
}
</style>