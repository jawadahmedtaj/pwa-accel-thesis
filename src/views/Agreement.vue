<template>
  <v-row justify="center" align="center">
    <v-container>
        <v-row>
            <input type="text" class="red white--text">
        </v-row>
      <v-row>
        <v-col>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            quos quod eligendi consequuntur molestiae excepturi aspernatur omnis
            incidunt nisi nam tempore sequi vero culpa ex, ipsum dignissimos
            iure quasi. Veniam, culpa! Consequuntur mollitia ipsam hic explicabo
            sit doloribus quam nulla dolores aliquam maxime temporibus at ex
            fugit placeat, officiis perspiciatis quas consequatur laudantium!
            Quidem magnam voluptatum sunt repellendus repellat amet, sint
            corporis porro unde vel voluptatem eos nostrum atque saepe facilis
            quis consectetur tempore distinctio beatae dolorum magni eius,
            laboriosam doloremque! Ullam minus dolorem labore maiores
            recusandae, vitae, earum facilis dicta reprehenderit, beatae totam
            dolores accusamus enim! Et earum quidem qui facere aliquam corrupti
            praesentium rerum ducimus delectus ratione odio molestiae quas
            deleniti nihil laborum rem, blanditiis sed ex alias libero tenetur
            aut! Eligendi vero in, porro atque nisi rerum quia amet vitae
            impedit perspiciatis sunt quam aspernatur a molestias dolor
            explicabo cum corporis eos dolores, fuga cumque! Reprehenderit
            eligendi rem dignissimos totam aut quis illum, perspiciatis
            perferendis molestiae praesentium, distinctio veniam iure ad saepe
            blanditiis ducimus, officia corporis fuga! Architecto sunt
            aspernatur deleniti eum nulla vero facilis provident voluptates
            unde, amet rerum magnam totam reiciendis iusto, tenetur in sit
            consectetur expedita ex quod ipsum maxime ratione. Repellat
            praesentium repellendus, soluta illum nam aliquid porro nemo, non
            voluptates velit quisquam hic dolore perspiciatis doloribus! Aut ex
            quaerat omnis? Corrupti velit quasi similique facere illum, vitae
            assumenda quae magni cum repellendus excepturi voluptatibus iusto
            incidunt libero, nesciunt temporibus laudantium perferendis. Ad
            excepturi tempora accusantium ullam omnis neque ea odio nesciunt id
            provident molestiae vitae consectetur soluta reprehenderit illum
            laborum unde, exercitationem recusandae praesentium distinctio
            quisquam quo. Dolore sapiente vitae rem voluptatibus earum?
            Molestiae quidem ad qui eum distinctio necessitatibus ullam atque
            maxime. Explicabo dolor vero beatae veniam hic esse odit cumque
            accusamus nemo, obcaecati iste optio fugiat. Explicabo facilis
            incidunt quas.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <input type="checkbox" name="" id="" />
        <span>I agree to the terms and conditions provided</span>
      </v-row>
      <v-row>
        <v-btn color="success" to="/sensorData">Agree</v-btn>
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
  components: {},
  beforeCreate() {},
};
</script>

<style lang="sass" scoped>
</style>