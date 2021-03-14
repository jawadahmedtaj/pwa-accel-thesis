<template>
  <div class="home">
    <h1>{{ count }}</h1>
    <h1>{{ sensor }}</h1>
    <v-btn color="primary">Test</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
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
      } m/s2 `;

      if (this.countEnabled) this.count += 1;

      setTimeout(() => {
        this.countEnabled = false;
      }, 1000);
    });
  },
};
</script>
