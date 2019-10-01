<template>
  <v-container>
    <v-layout>
      <v-flex xs10 md8 offset-md2 offset-xs1 pa-5>
        <div class="login-header display-2 mb-8">
          <span class="login-header__first">My</span>
          <span class="login-header__second">Accound</span>
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

            <span class="login-animated">
              <li>
                <router-link
                  to="/reset_pass"
                  class="login-forgot font-weight-regular font-italic"
                >Forgot your password !</router-link>
              </li>
            </span>

            <v-flex class="login-btn">
              <v-btn
                class="login-btn__signin"
                text
                @click.prevent="submit"
                :disabled="invalid || !validated"
              >
                <span class="login-btn__signin--text">Sign In</span>
              </v-btn>
            </v-flex>
          </v-form>
        </ValidationObserver>

        <span class="login-animated">
          <li>
            <router-link
              class="login-signup font-weight-regular font-italic"
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
        targets: ".login-header__first",
        translateX: [-200, 0],
        duration: 1000,
        delay: 800,
        easing: "linear"
      });
      anime({
        targets: ".login-header__second",
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

.login-header {
  display: flex;
  justify-content: center;
}

.login-btn {
  margin: 20px 0;

  .login-btn__signin {
    width: 100%;
    background-color: $cl-bg-login;

    .login-btn__signin--text {
      color: $cl-text-btn;
    }
  }
}

.login-animated {
  .login-forgot,
  .login-signup {
    color: $cl-text-login;
    text-decoration: none;
  }

  li {
    display: inline-block;
    list-style: outside none;
    padding: 0;

    a {
      padding: 0.3em 0;
      color: $cl-text-login;
      position: relative;
      text-decoration: none;
      display: inline-block;
    }
  }
}

.login-animated a:after {
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

.login-animated a:hover,
.login-animated .current a {
  color: $cl-text-author;
}

.login-animated a:hover:after,
.login-animated .current a:after {
  width: 100%;
}
</style>