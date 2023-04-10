<template>
  <div class="container-profile d-flex">
    <div class="side-bar-profile">
      <SideBar @_clickItemRole="_clickItemRole" :itemSelected="itemSelected" />
    </div>
    <div class="conten-profile">
      <b-row class="mx-0">
        <b-col cols="12" lg="12">
          <alert-success
            :alert="alert?.textAlert"
            :isShow="alert?.isShow"
            :type="alert?.typeAlert"
            @handleCloseAlert="handleCloseAlert"
          />
        </b-col>
      </b-row>
      <div class="text-24 font-500 font__medium text-black">{{ $t('profile.My_Profile') }}</div>
      <div class="text-gray--700 text-16 font-400 font__regular text-contact mt--8">
        {{ $t('profile.contact') }}
      </div>
      <div v-if="itemSelected == 0">
        <PersonalInfo
          :personInfolabel="personInfolabel"
          :personValue="personValue"
          @_callApiDetail="_callApiDetail"
          @_handleAddDependent="_handleAddDependent"
          @_handleVerify="_handleVerify"
          :promtEmployee="promtEmployee"
        />
        <DependentInfo 
          :dependentValue="dependentValue"
          :dependentLabel="dependentLabel"
          :promtEmployee="promtEmployee"
        />
      </div>
      <div v-if="itemSelected == 1">
        <EmploymentInfo 
          @_callApiDetail="_callApiDetail"
          :employmentValue="employmentValue"
          :personInfolabel="personInfolabel"
          :promtEmployee="promtEmployee"
        />
      </div>
      <div v-if="itemSelected == 2">
        <BankInfo
          :personInfolabel="personInfolabel"
          :bankInfoValue="bankInfoValue"
          @_callApiDetail="_callApiDetail"
          :promtEmployee="promtEmployee"
        />
      </div>
      <div v-if="itemSelected == 3">
        <LoginDateTime :dateTime="dateTime" />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../../components/my-profile/side-bar/index.vue';
import PersonalInfo from '../../components/my-profile/personal-info/index.vue';
import BankInfo from '../../components/my-profile/bank-info/index.vue';
import LoginDateTime from '../../components/my-profile/date-time/index.vue';
import EmploymentInfo from '../../components/my-profile/employment-info/index.vue';
import DependentInfo from '../../components/my-profile/dependent-info/index.vue';
import { mapGetters, mapActions } from 'vuex';
import { postAxios } from '~/services/callApi';
import { handleListCallApi } from '~/utils/functions/handleListCallApi';
import AlertSuccess from '~/components/alertSuccess/index.vue';
import { EXCEPTION } from '~/utils/constants/statusResponse';
export default {
  layout: 'first-time-login',
  components: {
    SideBar,
    PersonalInfo,
    BankInfo,
    LoginDateTime,
    EmploymentInfo,
    DependentInfo,
    AlertSuccess
  },
  data() {
    return {
      itemSelected: 0,
      personInfolabel: {},
      personValue: {},
      bankInfoValue: {},
      dateTime: [],
      dependentValue: [],
      dependentLabel: {},
      employmentValue: {},
      verificationPrompt: [],
      promtEmployee: ''
    };
  },
  computed: {
    ...mapGetters('employee', ['employeeList', 'personalDetails']),
    ...mapGetters('firstTimeLogin', ['alert']),
  },
  created() {
    this._getListTime()
    this._callApiDetail()
    this.handleGetVerificationPrompt({
      invoke: 'System.execute',
      argc: '2',
      a0: 'Employee.VerificationPrompt'
    }),
    this.handlePersonalDetails({
      invoke: 'System.execute',
      argc: '2',
      a0: 'PersonalDetails.getEmpVerificationInfo',
      a1: {
        empId: localStorage.getItem('empid')
      }
    })
  },
  methods: {
    ...mapActions('employee', ['handleSetPermission', 'handlePersonalDetails', 'handleSetIsShow']),
    ...mapActions('firstTimeLogin', ['handleChangeAlert']),
    _clickItemRole(num) {
      this.itemSelected = num;
    },
    _handleAddDependent () {
      this.dependentValue.push({
        id: '',
        name: '',
        nric: '',
        dob: null,
        gender: '',
        maritalstatus: '',
        relationship: '',
        mobilephone: '',
        changetype: '456',
        action: '456'
      })
      window.scrollTo(0, 500);
    },
    async _callApiDetail() {
      await this.handleSetPermission({
        invoke: 'System.execute',
        argc: '2',
        a0: 'PersonalDetails.getEmpPersonalDetails',
        a1: { empId: localStorage.getItem('empid'), mode: 1 }
      });
      this.personInfolabel = JSON.parse(this.employeeList[4].value);
      this.personValue = JSON.parse(this.employeeList[0].value);
      this.bankInfoValue = JSON.parse(this.employeeList[2].value);
      this.personValue.dob = this.personValue.dob
        ? this.$dayjs(this.personValue.dob).format('DD-MM-YYYY')
        : null;
      this.dependentValue = JSON.parse(this.employeeList[3].value).map((item, index) => {
        return {
          ...item,
          changetype: '457',
          action : '457',
          dob: item.dob ? this.$dayjs(item.dob).format('DD-MM-YYYY') : null
        }
      }); 

      this.dependentValue.dob = this.dependentValue.dob
        ? this.$dayjs(this.dependentValue.dob).format('DD-MM-YYYY')
        : null;
      this.dependentLabel = JSON.parse(this.employeeList[5].value);  
      this.employmentValue = JSON.parse(this.employeeList[1].value)
      this.employmentValue.datejoined = this.employmentValue.datejoined
        ? this.$dayjs(this.employmentValue.datejoined).format('DD-MM-YYYY')
        : null;
      this.employmentValue.effectivedate = this.employmentValue.effectivedate
        ? this.$dayjs(this.employmentValue.effectivedate).format('DD-MM-YYYY')
        : null;
    },
    handleCloseAlert() {
      this.handleSetIsShow(false);
      this.handleChangeAlert({
        isShow: false,
        typeAlert: 'success',
        textAlert: ''
      });
    },
    async _getListTime() {
      try {
        const data = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.WebActivity.GetListing',
          a1: {}
        });
        if (data.data) {
          this.dateTime = JSON.parse(data.data.data[0].value);
          this.dateTime.forEach(item => {
            item.time = `${item.time.slice(0, 10).split('-').join('/')}, ${item.time.slice(
              10,
              15
            )} ${item.time.slice(15)}`;
          });
        }
      } catch (e) {
        this.dateTime = [];
      }
    },
    async handleGetVerificationPrompt(param) {
      const res = await postAxios(param)
      if (res.data.data[0].dt === 'rs') {
        let data = handleListCallApi(
          [...res.data.data[0].colNames],
          [...res.data.data[0].rows],
        )
        this.verificationPrompt = data
        this.promtEmployee = data[0]?.prompt
      } 
      if(res.data.data[0].dt === 'default') {
        let checkPromtEmployee = res.data.data[0].value === 'false' ? '0' : '1'
        this.promtEmployee = checkPromtEmployee
      }
    },
    _getKeyData(data, key, ValueDefault = null) {
      return data.length ? data[data.length - 1][key] : ValueDefault;
    },
    _formatDate(dob) {
      return dob ? this.$dayjs(dob).format('YYYY-MM-DD') : null;
    },
    checkApiCompleted(res) {
      return (
        res.data.data[0].value.includes('Approved / Completed') || res.data.data[0].dt !== EXCEPTION
      );
    },
    _handleVerify() {
      this._handleVerifyEmployeeDetail()
    },
    async _handleVerifyEmployeeDetail () {
      try {
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'EmployeeVerification.save',
          a1: {
            data: {
              ...this.bankInfoValue,
              ...this.personValue,
              dob: this.personValue.dob ? this.personValue.dob.split('-').reverse().join('-') : null,
              verificationperiod: this._getKeyData(this.verificationPrompt, 'id'),
              loginfrom: 'web',
              id: this._getKeyData(this.personalDetails, 'id'),
              updatectr: this._getKeyData(this.personalDetails, 'updatectr', 0),
              dependents: [
                ...this.dependentValue.map(el => {
                  return {
                    ...el,
                    dob: el.dob ? el.dob.split('-').reverse().join('-') : null
                  };
                })
              ]
            }
          }
        });
        if (this.checkApiCompleted(res)) {
          this.handleGetVerificationPrompt({
            invoke: 'System.execute',
            argc: '2',
            a0: 'Employee.VerificationPrompt'
          }),
          this._callApiDetail()
          this.handleChangeAlert({
            isShow: true,
            typeAlert: 'success',
            textAlert: 'Thank you for verifying your information.'
          });
          this._handleCloseAlet()
        } else {
          this.handleChangeAlert({
            isShow: true,
            typeAlert: 'error',
            textAlert: res.data.data[0].value
          });
          this._handleCloseAlet()
        }
      } catch (e) {
        this.handleChangeAlert({
          isShow: true,
          typeAlert: 'error',
          textAlert: 'Unable to update employee'
        });
        this._handleCloseAlet()
      }
      window.scrollTo(0, 0)
    },
    _handleCloseAlet () {
      setTimeout(() => {
        this.handleChangeAlert({
          isShow: false,
          typeAlert: 'success',
          textAlert: ''
        });
      }, 3000);
    },
  }
};
</script>

<style scoped>
@import '@/assets/css/my-profile/index.css';
</style>
