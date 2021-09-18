<template>
  <v-container class="fullDisplay" fluid>
    <div class="canvasRemover">
      <video ref="video" autoplay muted playsinline width="1px" height="1px" />
    </div>
    <div>
      <h5>{{ textShow }}</h5>
    </div>
    <div>
      <v-btn class="buttonAdjuster" :color="color" depressed>
        <v-icon>{{ displayPattern[0] }}</v-icon>
      </v-btn>
      <v-btn class="buttonAdjuster" :color="color" depressed>
        <v-icon> {{ displayPattern[1] }}</v-icon>
      </v-btn>
    </div>
    <div>
      <v-btn class="buttonAdjuster" :color="color" depressed>
        <v-icon> {{ displayPattern[2] }}</v-icon>
      </v-btn>
      <v-btn class="buttonAdjuster" :color="color" depressed>
        <v-icon>
          {{ displayPattern[3] }}
        </v-icon>
      </v-btn>
    </div>
    <div>
      <v-btn
        class="pa-2 ma-12"
        color="primary"
        @click.prevent="optionClicked(true)"
        :disabled="selected"
        >Yes</v-btn
      >
      <v-btn
        class="pa-2 ma-12"
        color="error"
        @click.prevent="optionClicked(false)"
        :disabled="selected"
        >No</v-btn
      >
    </div>
  </v-container>
</template>

<script>
import loadImage from "blueimp-load-image";

export default {
  name: "Easy",
  data() {
    return {
      sensor: "",
      count: 0,
      countEnabled: true,
      numbers: this.$store.state.numbers,
      characters: this.$store.state.characters,
      color: "grey lighten-2",
      number: undefined,
      character: undefined,
      selected: false,
      trialCount: 0,
      isStopped: true,
      textShow: "",
      holder: [],
      baseline: true,
      easyPattern: this.$store.state.easyPattern,
      displayPattern: [],
      patternRandomizer: [true, false],
      stream: undefined,
      photo: undefined,
      ready: false,
    };
  },
  beforeCreate() {
    window.addEventListener("devicemotion", (event) => {
      this.sensor = `${
        Math.round((event.acceleration.x + Number.EPSILON) * 100) / 100
      }, ${Math.round((event.acceleration.y + Number.EPSILON) * 100) / 100}, ${
        Math.round((event.acceleration.z + Number.EPSILON) * 100) / 100
      }`;
      this.holder.push({
        sensorValue: this.sensor,
        time: new Date().getTime(),
        baseline: this.baseline,
        answered: false,
        pattern: this.easyPattern,
        imageData: this.streamWatcher(),
      });
      // this.$store.commit("easySetter", [
      //   {
      //     sensorValue: this.sensor,
      //     time: new Date().getTime(),
      //     baseline: this.baseline,
      //     answered: false,
      //     pattern: this.easyPattern,
      //     imageData: this.streamWatcher(),
      //   },
      // ]);
    });
  },
  mounted() {
    this.startCamera();
    this.questionChanger();
    setInterval(this.questionChanger, 3000);
    // setInterval(this.streamWatcher, 10);
  },
  methods: {
    async startCamera() {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
        },
      });

      this.$refs.video.srcObject = this.stream;

      this.$refs.video.onloadedmetadata = () => {
        this.ready = true;
      };

      this.$refs.video.onended = () => {
        this.ready = false;
        this.stream = null;
      };
    },
    streamWatcher() {
      let video = this.$refs.video;

      let videoCanvas = document.createElement("canvas");
      videoCanvas.height = video.videoHeight;
      videoCanvas.width = video.videoWidth;
      let videoContext = videoCanvas.getContext("2d");

      videoContext.drawImage(video, 0, 0);

      this.photo = loadImage.scale(videoCanvas, {
        maxHeight: 1080,
        maxWidth: 1080,
        cover: true,
        crop: true,
        canvas: true,
      });
      // console.log(this.photo.toDataURL("image/jpeg"));
      return this.photo.toDataURL("image/jpeg") || "";
    },
    questionChanger() {
      this.color = "grey lighten-3";
      if (this.isStopped) {
        if (this.trialCount % 2 === 0) {
          this.selected = true;
          this.number = undefined;
          this.character = undefined;
          this.displayPattern = new Array(4).fill("");
          this.baseline = true;
          this.textShow = `Baseline`;
        } else {
          this.baseline = false;
          this.selected = false;
          this.number =
            this.numbers[Math.floor(Math.random() * this.numbers.length)];
          this.character =
            this.characters[Math.floor(Math.random() * this.characters.length)];
          this.displayPattern = new Array(4).fill("");
          this.shuffle(this.patternRandomizer);
          this.patternRandomizer[0]
            ? (this.displayPattern[0] = this.easyPattern[0])
            : (this.displayPattern[0] = this.number);
          this.patternRandomizer[1]
            ? (this.displayPattern[1] = this.easyPattern[1])
            : (this.displayPattern[1] = this.character);
          this.shuffle(this.displayPattern);
          this.textShow = `Is this the correct pattern?`;
        }
        if (this.trialCount > 18) {
          this.isStopped = false;
          this.$router.push({
            name: "Resting",
            params: { difficulty: "Easy" },
          });
        }
        this.trialCount++;
      }
    },
    optionClicked(type) {
      this.selected = true;
      const correct =
        this.easyPattern[0] == this.number &&
        this.easyPattern[1] == this.character;
      if (correct) {
        if (type) this.color = "green lighten-3";
        else this.color = "red lighten-3";
      } else {
        if (type) this.color = "red lighten-3";
        else this.color = "green lighten-3";
      }
      this.holder.push({
        sensorValue: this.sensor,
        time: new Date().getTime(),
        correct: correct,
        baseline: this.baseline,
        answered: true,
        answer: type ? "Yes" : "No",
        pattern: this.easyPattern,
        imageData: this.streamWatcher(),
      });
      // this.$store.commit("easySetter", [
      //   {
      //     sensorValue: this.sensor,
      //     time: new Date().getTime(),
      //     correct: correct,
      //     baseline: this.baseline,
      //     answered: true,
      //     answer: type ? "Yes" : "No",
      //     pattern: this.easyPattern,
      //     imageData: this.streamWatcher(),
      //   },
      // ]);
    },
    //? The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
  },
  beforeDestroy() {
    clearInterval(this.questionChanger);
    // clearInterval(this.streamWatcher);
    this.$store.commit("easySetter", this.holder);
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
  margin: 25px

.canvasRemover
  height: 1px
  width: 1px
</style>