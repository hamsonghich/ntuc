<template>
  <div class="notification_layout ml--2 d-flex flex-start flex-column max-width-100">
    <div class="container__log">
      <div class="notification_body flex-row justify-content-center align-items-start p-0">
        <div class="p-0 notification_menu">
        </div>
        <div
          class="notification_list_card px-3 py-2 d-flex flex-column align-items-start align-self-stretch">
          <div class="w-100">
            <div class="accordion">
              <HeaderTitle class="mb--20 font-500" title="My Notifications" />
              <div class="header_description text-16 email-us mb--25 color-gray-scale">{{
                $t('description')
              }}</div>
              <div
                class="notification_list_card px-4 py-3 margin-0 d-flex flex-column align-items-start align-self-stretch pt-3 pl-4">
                <div class="w-100">
                  <b-form>
                    <b-form-group class="notification_form_item d-flex"
                      label-class="notification_label_form mb-0 d-flex align-items-center min-height-38" id="cc"
                      label="To:" label-for="cc">
                      <b-input class="noti-to margin-right-24 align-items-center bg-NTUC-7"
                        v-model="data.emailrecipient" disabled />
                      <span class="d-flex check_pink text-32"> <b-icon-check-circle-fill
                          class="icon_noti_mb f_size" /></span>
                    </b-form-group>
                    <b-form-group class="notification_form_item d-flex editor_form"
                      label-class="notification_label_form mb-0 d-flex align-items-center min-height-38" id="subject"
                      label="Subject:" label-for="subject">
                      <froala class="froala-html-editor" :tag="'textarea'" :config="subjectConfig" v-model="data.name">
                      </froala>
                    </b-form-group>

                    <div class="editor_form" id="input-group-3" label-for="input-3">
                      <froala class="froala-html-editor" :tag="'textarea'" :config="config" v-model="data.message">
                      </froala>
                    </div>
                    <div
                      class="notification_card_footer_buttons align-items-center justify-content-between minus--16 d-flex flex-row">
                      <b-button class="button_cancel mb-1 text-14" @click="handleCancel">{{
                        $t('Back')
                      }}</b-button>
                    </div>
                  </b-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import HeaderTitle from '~/components/headerTitle/index.vue';
import { postAxios } from '~/services/callApi';
import NotificationProfileDetailMenu from '~/components/notifications/profileDetailMenu/index.vue';
export default {
  name: 'NotificationTemplatesEmailEdit',
  components: {
    HeaderTitle,
    NotificationProfileDetailMenu
  },
  data() {
    return {
      data: {
        createon: '',
        emailrecipient: '',
        emailsender: '',
        id: '',
        isRead: "false",
        message: '',
        name: '',
        onTime: ''
      },
      alertEdit: {
        status: false,
        message: ''
      },
      config: {
        events: {
          initialized: function () {
            this.edit.off();
            this.toolbar.disable();
          }
        },
        toolbarButtons: {
          moreText: {
            buttons: [
              'bold',
              'italic',
              'underline',
              'strikeThrough',
              'subscript',
              'superscript',
              'fontFamily',
              'fontSize',
              'textColor',
              'backgroundColor',
              'inlineClass',
              'inlineStyle',
              'clearFormatting'
            ]
          },
          moreParagraph: {
            buttons: [
              'alignLeft',
              'alignCenter',
              'alignRight',
              'alignJustify',
              'formatOLSimple',
              'formatOL',
              'formatUL',
              'paragraphFormat',
              'paragraphStyle',
              'lineHeight',
              'outdent',
              'indent',
              'quote'
            ],
            buttonsVisible: 4
          },
          moreRich: {
            buttons: ['insertLink', 'insertImage', 'insertTable', 'insertHR'],
            buttonsVisible: 4
          },
          moreMisc: {
            buttons: [
              'undo',
              'redo',
              'fullscreen',
              'print',
              'getPDF',
              'spellChecker',
              'selectAll',
              'html',
              'codeBeautifier',
              'help'
            ],
            align: 'right',
            buttonsVisible: 2
          }
        },
        codeBeautifierOptions: {
          end_with_newline: true,
          indent_inner_html: true,
          extra_liners:
            "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
          brace_style: 'expand',
          indent_char: '\t',
          indent_size: 1,
          wrap_line_length: 0
        },
        key: 'wFE7nE5F4F4B2C7C5C5fLUQZf1ASFb1EFRNh1Hb1BCCQDUHnA8B6E5A4B1C3E3A1C9A5==',
        editorClass: 'config',
        placeholderText: '',
        attribution: false,
        charCounterCount: false
      },
      subjectConfig: {
        events: {
          initialized: function () {
            this.edit.off();
            this.toolbar.hide();
          }
        },
        key: 'wFE7nE5F4F4B2C7C5C5fLUQZf1ASFb1EFRNh1Hb1BCCQDUHnA8B6E5A4B1C3E3A1C9A5==',
        placeholderText: '',
        attribution: false,
        charCounterCount: false,
        editorClass: 'subject-config',
      },
      content:
        'Dear FlexDemoEmp,<br><br>Thank you for submitting your Flex enrolment for 01 Jan 2022 To 31 Dec 2022.<br><br>Below is your selections and current coverage. If you have any covers pending Medical Underwriting (MU) please assist to fill in the HD form online. <br><br><table border="1" width="100%"><thead style=""font-weight":"bold;""><tr><td>Benefit Type</td><td>Plan Selected</td><td>Coverage</td><td>Present Cover</td><td>Flex$ Utilised</td><td>Cover Pending MU</td><td>Flex$ Pending</td></tr></thead><tbody><tr><td>Group Catastrophic Medical</td><td>Option 2 - Limit $100,000</td><td>Employee</td><td style=""text-align":"right;"">Employee</td><td style=""text-align":"right;"">325.00</td><td style=""text-align":"right;"">-</td><td style=""text-align":"right;"">0.00</td></tr><tr><td>Group Clinical General Practitioner Insurance</td><td>Default - Outpatient GP</td><td>Employee</td><td style=""text-align":"right;"">Employee</td><td style=""text-align":"right;"">150.00</td><td style=""text-align":"right;"">-</td><td style=""text-align":"right;"">0.00</td></tr><tr><td>Group Clinical Specialist Insurance</td><td>Default - Outpatient Specialists</td><td>Employee</td><td style=""text-align":"right;"">Employee</td><td style=""text-align":"right;"">150.00</td><td style=""text-align":"right;"">-</td><td style=""text-align":"right;"">0.00</td></tr><tr><td>Group Term Life</td><td>Option 1 - 36x Basic Mthly Salary</td><td>Employee</td><td style=""text-align":"right;"">208,800.00</td><td style=""text-align":"right;"">0.00</td><td style=""text-align":"right;"">104,400.00</td><td style=""text-align":"right;"">678.60</td></tr><tr><td>Dental/??</td><td>Option 2 - Annual Limit $0</td><td>Employee,Employee</td><td style=""text-align":"right;"">0.00</td><td style=""text-align":"right;"">-100.00</td><td style=""text-align":"right;"">-</td><td style=""text-align":"right;"">-</td></tr></tbody></table><br><br><table border="1" width="100%"><thead style=""font-weight":"bold;""><tr><td>Benefit Type</td><td>Plan Selected</td><td>Flex$ Utilised</td></tr></thead><tbody><tr><td>Annual Leave</td><td>Option 2 - Buy 2 Days</td><td style=""text-align":"right;"">803.10</td></tr><tr><td>Car Park Lot</td><td>Default: 1 Car Park Space</td><td style=""text-align":"right;"">1200.00</td></tr></tbody></table><br><br>If you have any queries, please feel free to contact us.<br><br>Best regards<br>Benefit Solutions Pte Ltd<br>Helpline: +65 1234 5678<br>Email:'
    };
  },
  computed: {
    ...mapGetters('notification', ['currentTemplate']),
    templateEdit() {
      return { ...this.currentTemplate };
    }
  },
  async fetch() {
    await this.cardForm()
  },
  methods: {
    ...mapActions('notification', ['handleSetCurrentTemplate', 'handleUpdateStatusNotification']),
    readNotification(notification) {
      this.handleSetCurrentTemplate(notification)
      this.handleUpdateStatusNotification(notification.id)
    },
    handleMessageNoti(message) {
      const x = message.split('<br', 3).join('<br').length;
      const y = message.split('<br', 4).join('<br').length;
      const splitStr = message.slice(x, y);
      if (splitStr.length > 100) return message.slice(0, x)
      else return message.slice(0, y)
    },
    handleCancel() {
      this.$router.replace({ path: '/notifications' });
    },
    async cardForm() {
      try {
        const response = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.EmployeeInbox',
          a1: {
            id: this.$route.params.id,
          }
        });
        const listNotifications = JSON.parse(response.data.data[0].value);
        const currentNotification = listNotifications.find(e => e.id === this.$route.params.id);
        if (currentNotification) this.data = currentNotification;
      } catch (e) { }
    },
  }
};
</script>

<style scoped>
@import '@/assets/css/notifications/index.css';

.notification_form_item>>>div:first-of-type {
  display: flex;
  width: 100%;
  max-height: 38px;
}

.notification_form_item>>>div {
  width: 100%;
  max-height: 38px;
}

.form-control:disabled {
  -webkit-text-fill-color: #212529 !important;
}
</style>
