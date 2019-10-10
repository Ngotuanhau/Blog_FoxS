<template>
  <v-container>
    <v-layout>
      <v-flex xs10 md8 offset-md2 offset-xs1 pa-5>
        <div class="c-text-header display-2 mb-8">
          <span class="first">Register Accound</span>
        </div>
        <!-- Form validate -->
        <ValidationObserver ref="observer">
          <v-form slot-scope="{ invalid, validated }">
            <VTextFieldWithValidation rules="required" v-model="username" label="User name" />
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
                <span class="c-btn-login-text">Sign up</span>
              </v-btn>
            </v-flex>
          </v-form>
        </ValidationObserver>
        <!-- Form validate -->
        <span class="animated">
          <li>
            <router-link class="c-create font-weight-regular font-italic" to="/login">Go back Login</router-link>
          </li>
        </span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import VTextFieldWithValidation from "../../components/input/VTextFieldWithValidation";

export default {
  components: {
    ValidationObserver,
    VTextFieldWithValidation
  },

  props: ["message"],

  data() {
    return {
      username: "",
      email: "",
      password: "",
      show: false
    };
  },

  methods: {
    submit() {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      axios
        .post("/auth/local/register", user)
        .then(response => {
          console.log(response);
          this.$store.commit(
            "showSnackbar",
            {
              message: "Login Successful!",
              timeout: 3000,
              multiline: false,
              type: "success"
            },
            { module: "Snackbar" }
          );
          this.$router.push("/login");
        })
        .catch(error => {
          let errors = error.response.data.message
            .reduce((items, val) => {
              items.push(val.messages);
              return items;
            }, [])
            .flat();
          this.$store.commit(
            "showSnackbar",
            {
              message: errors[0].message,
              timeout: 3000,
              multiline: false,
              type: "error"
            },
            { module: "Snackbar" }
          );
          return;
        });
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
.c-login {
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
