<template>
  <v-container class="fullDisplay" fluid>
    <div id="app">
      <div>{{ textShow }}</div>
      <v-btn
        class="buttonAdjuster"
        color="primary"
        :disabled="easyDone"
        @click="
          $router.push({
            name: 'Resting',
            params: { difficulty: 'Easy' },
          })
        "
        >Easy</v-btn
      >
      <v-btn
        class="buttonAdjuster"
        color="primary"
        @click="
          $router.push({
            name: 'Resting',
            params: { difficulty: 'Medium' },
          })
        "
        :disabled="mediumDone"
        >Medium</v-btn
      >
      <v-btn
        color="primary"
        @click="
          $router.push({
            name: 'Resting',
            params: { difficulty: 'Hard' },
          })
        "
        :disabled="hardDone"
        >Hard</v-btn
      >
    </div>
    <div>
      <v-btn
        class="resultAdjuster"
        color="warning"
        @click.prevent="saveFile"
        :disabled="buttonDisabler"
        >Save results</v-btn
      >
    </div>
  </v-container>
</template>

<script>
import { saveAs } from "file-saver";
// @ is an alias to /src

export default {
  name: "DifficultySelection",
  data() {
    return {
      easyDone: this.$store.state.easyDone,
      mediumDone: this.$store.state.mediumDone,
      hardDone: this.$store.state.hardDone,
      easy: this.$store.state.easy,
      medium: this.$store.state.medium,
      hard: this.$store.state.hard,
      buttonDisabler: false,
      participant: this.$store.state.participant,
      textShow: "",
    };
  },
  components: {},
  methods: {
    async saveFile() {
      // try {
      //   this.buttonDisabler = true;
      //   this.textShow = "Seems to be working";
      //   const jsonFile = new File(["hello world"], "hello.txt", {
      //     type: "text/plain",
      //   });

      //   const [handle] = await window.showSaveFilePicker();
      //   const writable = await handle.createWritable();

      //   await writable.write(jsonFile);
      //   await writable.close();
      // } catch (err) {
      //   this.textShow = err;
      //   console.log(err);
      // } finally {
      //   this.buttonDisabler = false;
      // }
      this.buttonDisabler = true;
      try {
        let blob = new Blob(
          [
            JSON.stringify({
              easy: [...this.easy],
              medium: [...this.medium],
              hard: [...this.hard],
            }),
          ],
          {
            type: "application/json",
          }
        );
        await saveAs(
          blob,
          `${this.participant} - PWA accel - ${new Date().getTime()}.json`
        );
      } catch (error) {
        this.textShow = error;
        console.log(error);
      } finally {
        this.buttonDisabler = false;
      }
    },
  },
  mounted() {
    if (!(this.easyDone && this.mediumDone && this.hardDone)) {
      this.buttonDisabler = true;
    }
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
  margin-right: 40px

.resultAdjuster
  width: 100%
  margin-top: 50px
</style>