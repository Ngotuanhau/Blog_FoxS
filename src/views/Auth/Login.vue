<template>
  <v-container>
    <v-layout>
      <v-flex xs10 md8 offset-md2 offset-xs1 pa-5>
        <div class="c-text-header display-2 mb-8">
          <span class="first">My</span>
          <span class="second">Accound</span>
        </div>
        <ValidationObserver ref="observer">
          <v-form slot-scope="{ invalid, validated }">
            <VTextFieldWithValidation rules="required|email" v-model="email" label="E-mail" />
            <VTextFieldWithValidation
              rules="required|min:6"
              v-model="password"
              label="Password"
              :append-icon="show ? '$vuetify.icons.eye' : '$vuetify.icons.eye_off'"
              @click:append="show = !show"
              :type="show ? 'text' : 'password'"
            />

            <span class="animated">
              <li>
                <router-link
                  to="/reset_pass"
                  class="c-forgot font-weight-regular font-italic"
                >Forgot your password !</router-link>
              </li>
            </span>

            <v-flex class="c-btn">
              <v-btn
                class="c-btn-login"
                text
                @click.prevent="submit"
                :disabled="invalid || !validated"
              >
                <span class="c-btn-login-text">Sign In</span>
              </v-btn>
            </v-flex>
          </v-form>
        </ValidationObserver>

        <span class="animated">
          <li>
            <router-link
              class="c-create font-weight-regular font-italic"
              to="/sign_up"
            >Create An Acount!</router-link>
          </li>
        </span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import VTextFieldWithValidation from "../../components/input/VTextFieldWithValidation";
import anime from "animejs";

export default {
  components: {
    ValidationObserver,
    VTextFieldWithValidation
  },

  data() {
    return {
      email: "",
      password: "",
      show: false
    };
  },

  mounted() {
    this.animate();
  },

  methods: {
    animate() {
      anime({
        targets: ".first",
        translateX: [-200, 0],
        duration: 1000,
        delay: 800,
        easing: "linear"
      });
      anime({
        targets: ".second",
        translateY: [-200, 0],
        duration: 500,
        delay: 800,
        easing: "linear"
      });
    },

    submit() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("login", user)
        .then(() => this.$router.push("/"))
        .catch(error =>
          this.$store.commit(
            "showSnackbar",
            {
              message: error.response.data.message,
              timeout: 4000,
              multiline: false,
              type: "error"
            },
            { module: "Snackbar" }
          )
        );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

.c-text-header {
  display: flex;
  justify-content: center;
}

.c-btn {
  margin: 20px 0;

  .c-btn-login {
    width: 100%;
    background-color: $cl-bg-login;

    .c-btn-login-text {
      color: $cl-text-btn;
    }
  }
}

.c-forgot,
.c-create {
  color: $cl-text-login;
  text-decoration: none;
}

.animated li {
  display: inline-block;
  list-style: outside none none;
  padding: 0;
}

.animated a {
  padding: 0.3em 0;
  color: $cl-text-login;
  position: relative;
  text-decoration: none;
  display: inline-block;
}

.animated a:after {
  height: 2px;
  position: absolute;
  content: "";
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
  background-color: $cl-text-author;
  width: 0;
  bottom: 0;
  left: 0;
}

.animated a:hover,
.animated .current a {
  color: $cl-text-author;
}

.animated a:hover:after,
.animated .current a:after {
  width: 100%;
}
</style>