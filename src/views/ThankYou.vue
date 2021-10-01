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
      participant: this.$store.state.participant,
    };
  },
  mounted() {
    this.textShow =
      this.count === 3
        ? "Thank you, you will be redirected to resting screen and then you can select next task"
        : "Thank you, the remembering period will start again soon!";
    this.saveFile(this.difficulty);
    setTimeout(() => {
      this.$router.push({
        name: "Resting",
        params: { difficulty: this.difficulty },
      });
    }, 10000);
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