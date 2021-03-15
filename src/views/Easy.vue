<template>
  <v-container class="fullDisplay" fluid>
    <div class="my-3">
      <h4>Select the appropriate option</h4>
    </div>
    <div>
      <v-btn class="buttonAdjuster" color="grey" 
        >1</v-btn
      >
      <v-btn class="buttonAdjuster" color="grey" 
        >2</v-btn
      >
      <v-btn class="buttonAdjuster" color="grey" 
        >3</v-btn
      >
      <v-btn color="grey" >4</v-btn>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Easy",
  data() {
    return {
      sensor: "",
      count: 0,
      countEnabled: true,
    };
  },
  components: {},
  beforeCreate() {
    window.addEventListener("devicemotion", (event) => {
      console.log(event);
      this.sensor += `x: ${
        Math.round((event.acceleration.x + Number.EPSILON) * 100) / 100
      } m/s2, y: ${
        Math.round((event.acceleration.y + Number.EPSILON) * 100) / 100
      } m/s2, z: ${
        Math.round((event.acceleration.z + Number.EPSILON) * 100) / 100
      } m/s2`;

      console.log("Timestamp: ", new Date().getTime());

      if (this.countEnabled) this.count += 1;

      setTimeout(() => {
        this.countEnabled = false;
      }, 1000);
    });
  },
};
</script>

<style lang="sass" scoped>
.fullDisplay
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

.buttonAdjuster
  margin-right: 15px
</style>