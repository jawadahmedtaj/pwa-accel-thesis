<template>
  <v-container class="fullDisplay" fluid>
    <div>{{ textShow }}</div>
    <v-container>
      <v-row justify="center" align="center">
        <v-spacer></v-spacer>
        <v-col>
          <v-btn
            class="pa-1 ma-1"
            color="primary"
            :disabled="easyDone"
            @click="
              $router.push({
                name: 'Resting',
                params: { difficulty: 'Easy' },
              })
            "
          >
            Easy
          </v-btn></v-col
        >
        <v-col>
          <v-btn
            class="pa-1 ma-1"
            color="primary"
            @click="
              $router.push({
                name: 'Resting',
                params: { difficulty: 'Medium' },
              })
            "
            :disabled="mediumDone"
          >
            Medium
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            color="primary"
            @click="
              $router.push({
                name: 'Resting',
                params: { difficulty: 'Hard' },
              })
            "
            :disabled="hardDone"
          >
            Hard
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
    <!-- <v-container fluid>
      <v-row justify="center" align="center">
        <v-spacer></v-spacer>
        <v-col>
          <v-btn
            class="pa-1 ma-1"
            color="warning"
            @click.prevent="saveFile('easy')"
            :disabled="!easyDone"
          >
            <v-icon>mdi-content-save</v-icon> Easy
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            class="pa-1 ma-1"
            color="warning"
            @click.prevent="saveFile('medium')"
            :disabled="!mediumDone"
          >
            <v-icon>mdi-content-save</v-icon> Medium
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            class="pa-1 ma-1"
            color="warning"
            @click.prevent="saveFile('hard')"
            :disabled="!hardDone"
          >
            <v-icon>mdi-content-save</v-icon> Hard
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container> -->
  </v-container>
</template>

<script>
// import { saveAs } from "file-saver";

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
      participant: this.$store.state.participant,
      textShow: "",
    };
  },
  components: {},
  methods: {
    // async saveFile(fileName) {
    //   try {
    //     let blob;
    //     switch (fileName) {
    //       case "easy":
    //         blob = new Blob(
    //           [
    //             JSON.stringify({
    //               easy: [...this.easy],
    //             }),
    //           ],
    //           {
    //             type: "application/json",
    //           }
    //         );
    //         this.$store.commit("easySetter", []);
    //         this.easyDone = false;
    //         break;
    //       case "medium":
    //         blob = new Blob(
    //           [
    //             JSON.stringify({
    //               medium: [...this.medium],
    //             }),
    //           ],
    //           {
    //             type: "application/json",
    //           }
    //         );
    //         this.$store.commit("mediumSetter", []);
    //         this.mediumDone = false;
    //         break;
    //       case "hard":
    //         blob = new Blob(
    //           [
    //             JSON.stringify({
    //               hard: [...this.hard],
    //             }),
    //           ],
    //           {
    //             type: "application/json",
    //           }
    //         );
    //         this.$store.commit("hardSetter", []);
    //         this.hardDone = false;
    //         break;
    //     }
    //     await saveAs(
    //       blob,
    //       `${
    //         this.participant
    //       } - ${fileName} - PWA accel - ${new Date().getTime()}.json`
    //     );
    //   } catch (error) {
    //     this.textShow = error;
    //   }
    // },
    async startCamera() {
      await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
        },
      });
    },
  },
  mounted() {
    this.startCamera();
  },
};
</script>

<style lang="sass" scoped>
.fullDisplay
  height: 100vh
  display: flex
  justify-content: center
  flex-direction: column

.resultAdjuster
  margin-top: 50px
</style>