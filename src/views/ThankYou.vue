<template>
  <v-container class="fullDisplay" fluid>
    <div>
      <p>{{ textShow }}</p>
    </div>
  </v-container>
</template>

<script>
import { saveAs } from "file-saver";

export default {
  name: "ThankYou",
  props: ["difficulty"],
  data() {
    return {
      count: this.$store.state.counter,
      textShow: "",
      easy: this.$store.state.easy,
      medium: this.$store.state.medium,
      hard: this.$store.state.hard,
    };
  },
  mounted() {
    this.textShow =
      this.count === 3
        ? "Thank you, you will be redirected to resting screen and then you can select next task"
        : "Thank you, the remembering period will start again soon!";
    setTimeout(() => {
      this.$router.push({
        name: "Resting",
        params: { difficulty: this.difficulty },
      });
    }, 10000);
  },
  created() {
    if (!this.count === 0) this.saveFile(this.difficulty);
  },
  methods: {
    async saveFile(fileName) {
      try {
        let blob;
        switch (fileName) {
          case "Easy":
            blob = new Blob(
              [
                JSON.stringify({
                  easy: [...this.easy],
                }),
              ],
              {
                type: "application/json",
              }
            );
            this.$store.commit("easySetter", []);
            this.easyDone = false;
            break;
          case "Medium":
            blob = new Blob(
              [
                JSON.stringify({
                  medium: [...this.medium],
                }),
              ],
              {
                type: "application/json",
              }
            );
            this.$store.commit("mediumSetter", []);
            this.mediumDone = false;
            break;
          case "Hard":
            blob = new Blob(
              [
                JSON.stringify({
                  hard: [...this.hard],
                }),
              ],
              {
                type: "application/json",
              }
            );
            this.$store.commit("hardSetter", []);
            this.hardDone = false;
            break;
        }
        await saveAs(
          blob,
          `${
            this.participant
          } - ${fileName} - PWA accel - ${new Date().getTime()}_${
            this.count
          }.json`
        );
      } catch (error) {
        this.textShow = error;
      }
    },
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
  margin: 15px
</style>