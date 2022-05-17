<template>
  <v-container
    class="d-flex flex-column align-center justify-center"
  >
    <v-card-text
      class="d-flex justify-center text-h2 mb-10 font-weight-bold"
    >
      Register
    </v-card-text>

    <v-form
      @submit.prevent="registerUser"
      class="d-flex flex-column align-center form-box"
    >
      <v-text-field
        class="form-input"
        v-model="name"
        label="Name"
        placeholder="Enter your name..."
        outlined
        dense
        color="green lighten-1"
        :error-messages="nameErrors"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        class="form-input"
        v-model="username"
        label="Username"
        placeholder="Enter your username..."
        outlined
        dense
        color="green lighten-1"
        :error-messages="usernameErrors"
        @input="$v.username.$touch()"
        @blur="$v.username.$touch()"
      ></v-text-field>
      <v-text-field
        class="form-input"
        v-model="phone"
        label="Phone"
        placeholder="Enter your phone number..."
        outlined
        dense
        color="green lighten-1"
        :error-messages="phoneErrors"
        @input="$v.phone.$touch()"
        @blur="$v.phone.$touch()"
      ></v-text-field>
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
        Register
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { email, minLength, maxLength, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mapActions } from 'vuex';

export default {
  mixins: [validationMixin],

  validations: {
    name: { required },
    username: { required, minLength: minLength(10) },
    phone: { required, minLength: minLength(13), maxLength: maxLength(13) },
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },

  data () {
    return {
      name: '',
      username: '',
      phone: '',
      email: '',
      password: ''
    }
  },

  methods: {
    ...mapActions(['register']),

    registerUser() {
      this.$v.$touch();

      if (!this.$v.$error) {
        let user = {
          name: this.name,
          username: this.username,
          phone: this.phone,
          email: this.email,
          password: this.password,
        };

        this.register(user)
          .then(res => {
            if (res.data.success) {
              this.$router.push('/login');
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push('Name is required!');
      return errors;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.minLength && errors.push('Your username is short!');
      !this.$v.username.required && errors.push('Username is required!');
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.minLength && errors.push('Your phone number is short!');
      !this.$v.phone.maxLength && errors.push('Your phone number is so long!');
      !this.$v.phone.required && errors.push('Phone number is required!');
      return errors;
    },
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

<style lang="scss">
.form-btn {
  color: #fff !important;
}
</style>
