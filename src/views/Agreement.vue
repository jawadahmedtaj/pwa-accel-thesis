<template>
  <v-row justify="center" align="center">
    <v-container class="mx-5 my-5">
      <v-row>
        <label>Participant Code: </label
        ><input
          type="text"
          class="grey white--text inputExpansion"
          v-model="Name"
        />
      </v-row>
      <v-row>
        <v-col class="px-0">
          <h3 class="text-center">INFORMED CONSENT</h3>
          <p>
            According to the policies of the Deutschen Forschungsgemeinschaft
            (DFG), participants need to agree that they participate voluntarily
            in empirical studies. Therefore, we would like to ask you to
            carefully read the informed consent and indicate your approval by
            ticking the box below.
          </p>
          <p>
            <span class="font-weight-bold">Research topc: </span>Recent research
            has shown that the level of cognitive load can be indexed by
            physiological parameters. In the current study, we aim to explore
            new ways to determine mental workload during mobile phone usage.
            Therefore, we apply selected measures (such as pupil diameter and
            muscle tremor) to differentiate levels of cognitive processing
            during a simple monitoring task.
          </p>
          <p>
            <span class="font-weight-bold">Procedure: </span>Participants will
            be asked to carry out a series of monitoring tasks on their phone.
            Task difficulty will be varied, featuring different numbers of items
            that have to be remembered and recognized. Behavioral data
            (processing times, accuracy rates) will be collected while in
            parallel, video streams from the front camera will be recorded to
            determine pupil diameter. Furthermore, gyroscopic measures are
            applied to investigate tremor movements of the hand as another
            indicator for the level of cognitive processing.
          </p>
          <p>
            <span class="font-weight-bold">Expense allowance: </span>
            Participation takes about 30 minutes, a payment is not envisaged.
            However, a 20€ voucher will be provided to the individual that
            provides the best performance. Participants from this year’s
            usability lecture can collect bonus points through participation.
          </p>
          <p>
            <span class="font-weight-bold">Confidentiality: </span>
            Data are stored anonymized without any conclusions to be drawn to
            your person. Processed data might be published in scientific
            journals and/or conferences.
          </p>
          <p>
            <span class="font-weight-bold">Risks: </span>
            Participation does not involve any dangers that go beyond the risk
            of everyday life.
          </p>
          <p>
            <span class="font-weight-bold">Voluntariness: </span>
            Participation in the study is voluntary and can be ended at every
            time without giving reasons or being penalized.
          </p>
          <p>
            <span class="font-weight-bold">Questions? </span>
            If you have any questions, do not hesitate to contact the
            experimenter.
          </p>
        </v-col>
      </v-row>
      <v-row class="mb-2">
        <span>
          <input type="checkbox" class="mt-1" v-model="checkBoxBool" />
          <label class="ml-1">
            I hereby confirm that I’m over the age of 18 and that I read and
            understood the above sentences
          </label>
        </span>
      </v-row>
      <v-row justify="center" align="center">
        <v-btn
          color="success"
          @click="clickHandler"
          :disabled="Name && !checkBoxBool"
          >Agree</v-btn
        >
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      Name: "",
      buttonBool: false,
      checkBoxBool: false,
    };
  },
  methods: {
    clickHandler(e) {
      e.preventDefault();
      this.$store.commit("setParticipant", this.Name);
      this.$router.push("/DifficultySelection");
    },
  },
};
</script>

<style lang="sass" scoped>
.inputExpansion
  width: 100%
</style>
