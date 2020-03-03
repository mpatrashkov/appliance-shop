<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Вход</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="email"
                    label="Имейл"
                    name="login"
                    prepend-icon="email"
                    type="text"
                  />
                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Парола"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="login">Вход</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  data: () => ({
    email: null,
    password: null
  }),
  methods: {
    login() {
      this.$auth.login({
        data: {
          email: this.email,
          password: this.password
        }
      })

      // await this.$axios.$post('auth/login', {
      //   email: this.email,
      //   password: this.password
      // }).error(
      //   (response) => {
      //     console.log(response)
      //   },
      //   (error) => {
      //     console.log(error)
      //   }
      // )
    }
  }
}
</script>
