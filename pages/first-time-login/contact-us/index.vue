<template>
  <div>
    <div class="d-flex">
      <img class="img-contact-us" src="@/assets/images/contactImg.png" alt="contact-us" />
      <div class="contact">
        <div class="text-32 text-black font-500 font__medium email-us">
          {{ $t('contact_us.email_us') }}
        </div>
        <b-form>
          <b-form-group
            id="example-input-group-1"
            label="Your Name"
            label-for="example-input-1"
            class="input-group-form"
          >
            <b-form-input
              v-model="yourName"
              id="example-input-1"
              class="input-name-contact"
              aria-describedby="input-1-live-feedback"
            />
          </b-form-group>
          <div class="text-16 text-black mt-5 font-400" v-if="modalShowHome">
            {{ $t('contact_us.text_notice') }}
          </div>
          <b-form-group
            id="example-input-group-1"
            label="Your Email Address"
            label-for="example-input-1"
            class="input-group-form mt-5"
          >
            <b-form-input
              v-model="email"
              id="example-input-1"
              class="input-mail-contact"
              aria-describedby="input-1-live-feedback"
            />
          </b-form-group>
        </b-form>
        <div class="mt-5">
          <div class="text-16 text-black mb-3 font-400">
            {{ $t('contact_us.how_can_i_help') }}
          </div>
          <div>
            <b-form-radio-group
              v-model="selected"
              :options="options"
              class="mb-3"
              value-field="item"
              text-field="name"
            />
          </div>
        </div>
        <div class="mt-4 pt-2">
          <b-form-textarea
            v-model="contentContact"
            id="textarea-rows"
            placeholder="Tell Us ..."
            rows="8"
            class="input-mail-contact"
          />
        </div>
        <div class="d-flex mt-4 pt-2">
          <b-button
            v-if="sendUs"
            class="bg-NTUC-6 mr-4 pr-2 btn-contact border-0"
            @click="handleSendContactUs"
          >{{ $t('contact_us.send') }}
          </b-button>
          <b-button
            class="bg-NTUC-6 btn-contact border-0"
            @click="backToHome"
          >{{$t('contact_us.back_home')}}
          </b-button>
        </div>
        <GoToHome
          :modalShowHome="modalShowHome"
          @handleModalShow="handleModalShowHome"
          v-if="modalShowHome"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { postAxios } from '@/services/callApi';
import GoToHome from '@/components/first-time-login/contact-us/goToHome.vue';
export default {
  layout: 'first-time-login',
  components: { GoToHome },
  data() {
    return {
      options: [
        {
          item: '',
          name: ''
        }
      ],
      selected: '',
      yourName: '',
      email: '',
      contentContact: '',
      modalShowHome: false,
      sendUs: true
    };
  },
  computed: {
    ...mapGetters('contactUs', ['dataContactUs', 'dataPayload', 'dataShow'])
  },
  created() {
    this.contactUs();
  },
  methods: {
    ...mapActions('contactUs', ['getDataContactUs']),
    async contactUs() {
      try {
        await this.getDataContactUs({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.ContactUs',
          a1: {
            empid: localStorage.getItem('empid')
          }
        });
        this.options = this.dataPayload.map((i, idx) => {
          return {
            item: i.id,
            name: i.name
          };
        });
        this.options.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        })
        this.email = this.dataShow[0].emailaddress;
        this.yourName = this.dataShow[0].name;
      } catch (error) {}
    },
    async handleSendContactUs() {
      try {
        await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'EmployeeInbox.Apply',
          a1: {
            param: {
              sender: this.email,
              subject: this.selected,
              subjectName: this.yourName,
              message: this.contentContact
            }
          }
        });
        this.modalShowHome = true;
        this.sendUs = false;
      } catch (error) {}
    },
    handleModalShowHome(value) {
      this.modalShowHome = value;
    },
    backToHome() {
      const consentagreementflag = localStorage.getItem('consentagreementflag') == 'true' ? true : false;
      const isPasswordChanged = localStorage.getItem('isPasswordChanged') == 'true' ? true : false;
      const isfirstEnrollFlag = localStorage.getItem('isfirstEnrollFlag') == 'true' ? true : false;

      if(consentagreementflag && isPasswordChanged && isfirstEnrollFlag){
        this.$router.push({ name: 'first-time-login-dashboard' });
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style>
@import '@/assets/css/first-time-login/contact-us/index.css';
</style>
