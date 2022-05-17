<template>
  <v-container
    class="d-flex flex-column align-center justify-center"
    grid-list
  >
    <v-card-text class="d-flex justify-center text-h2 mb-10 font-weight-bold">
      Log in
    </v-card-text>

    <form
      @submit.prevent="loginUser"
      class="d-flex flex-column align-center form-box"
    >
      <v-text-field
        class="form-input"
        v-model="email"
        label="E-mail"
        placeholder="Enter your email..."
        outlined
        dense
        color="green lighten-1"
        :error-messages="emailErrors"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        class="form-input"
        v-model="password"
        type="password"
        label="Password"
        placeholder="Enter your password..."
        outlined
        dense
        color="green lighten-1"
        :error-messages="passwordErrors"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-btn
        depressed
        color="green lighten-1"
        class="form-btn d-flex justify-center align-center"
        type="submit"
      >
        Log in
      </v-btn>
    </form>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },

  data () {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    ...mapActions(['login']),

    loginUser() {
      this.$v.$touch();

      if (!this.$v.$error) {
        let user = {
          email: this.email,
          password: this.password
        };

        this.login(user)
            .then(res => {
              if (res.data.success) {
                this.$router.push('/dashboard');
              }
            })
            .catch(err => {
              console.log(err);
            });
      }
    },
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Must be valid e-mail!');
      !this.$v.email.required && errors.push('E-mail is required!');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push('Your password is short!');
      !this.$v.password.required && errors.push('Password is required!');
      return errors;
    }
  }
}
</script>
