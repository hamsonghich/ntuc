<template>
  <div class="bg-NTUC-7">
    <b-modal
      id="modalPopover"
      size="md"
      ref="mymodal"
      body-class="p-0"
      v-model="showFirst"
      dialog-class="dialog-first-time"
      :hide-footer="true"
      :hide-header="true"
      :no-close-on-backdrop="true"
    >
      <FirstPage :showFirst="showFirst" />
    </b-modal>
    <div class="container pb--40 pt--30">
      <div class="text-23 text-NTUC-3 line-height-14 font__medium">
        {{ $t('dashboard.title_dashboard_1') }}
      </div>
      <div class="d-flex justify-content-between mt--30">
        <div class="d-flex align-items-center cursor_pointer" @click="addDependent">
          <b-icon
            icon="plus-circle-fill"
            font-scale="1.25"
            class="text-NTUC-3 mr-2 text-20"
          />
          <div class="text-20 text-black">{{ $t('firstTime.dependent') }}</div>
        </div>
        <div class="text-16">
          <!-- <button
            class="btn__click__changes bg-NTUC-6 line-height-15 border-0 rounded-lg text-white mr--10"
            @click="modalShow = true"
          >
            {{ $t('dashboard.changes_required') }}
          </button> -->
          <button
            class="btn__click__details bg-NTUC-3 line-height-15 border-0 rounded-lg text-white"
            @click="handleSubmit"
          >
            {{ $t('dashboard.my_details_are_correct') }}
          </button>
        </div>
      </div>
      <PersonalInfo :personalInfo="personalInfo" />
      <EmploymentInfo :employeeInfo="employeeInfo" />
      <BankInfo
        :bankInfo="bankInfo"
        v-if="bankInfo.bank || bankInfo.bankbranch || bankInfo.bankaccountno"
      />
      <DependentInfo
        v-for="(dependent, index) in dependentInfo"
        :key="index"
        :index="index"
        :dependent="dependent"
        :submitKey="submitKey"
        @removeDependent="removeDependent"
        @handleListStatusDependent="handleListStatusDependent"
        @handleListErrorFieldId="handleListErrorFieldId"
        :listLabelDependent="listLabelDependent"
        :listDisabledDependent="listDisabledDependent"
        v-if="dependent.action != '458'"
      />
      <GoToLogin :modalShow="modalShow" @handleModalShow="handleModalShow" />
    </div>
  </div>
</template>

<script>
import BankInfo from '@/components/first-time-login/employee-verification/bankInfo.vue';
import DependentInfo from '@/components/first-time-login/employee-verification/dependentInfo.vue';
import EmploymentInfo from '@/components/first-time-login/employee-verification/employmentInfo.vue';
import PersonalInfo from '@/components/first-time-login/employee-verification/personalInfo.vue';
import FirstPage from '@/components/first-time-login/first-page.vue';
import GoToLogin from '@/components/first-time-login/employee-verification/modal/goToLogin.vue';
import GoToBenefit from '@/components/first-time-login/employee-verification/modal/goToBenefit.vue';
import { EXCEPTION } from '~/utils/constants/statusResponse';
import { mapGetters, mapActions } from 'vuex';
import { postAxios } from '@/services/callApi';
import { handleListCallApi } from '@/utils/functions/handleListCallApi';
import { _handleFormatTime } from '@/utils/functions/formatTime';
export default {
  layout: 'first-time-login',
  components: {
    PersonalInfo,
    EmploymentInfo,
    BankInfo,
    FirstPage,
    GoToLogin,
    GoToBenefit,
    DependentInfo
  },
  data() {
    return {
      modalShow: false,
      personalInfo: {},
      employeeInfo: {},
      bankInfo: {},
      dependentInfo: [],
      modalShowBenefit: false,
      verificationPrompt: [],
      empPersonalDetails: {},
      personalDetails: [],
      listStatusDependent: [],
      listErrorFieldId: [],
      listLabelDependent: {},
      listDisabledDependent: [],
      submitKey: 0
    };
  },
  computed: {
    ...mapGetters('firstTimeLogin', ['showFirst'])
  },
  watch: {
    listStatusDependent: {
      handler: function (val, oldVal) {
        if(this.dependentInfo.length == val.length) {
          if(!val.includes(false)) {
            this.employeeVerificationSave();
          } else {
            this._scrollToField();
          }
          this.listStatusDependent = [];
          this.listErrorFieldId = [];
        }
      },
      deep: true
    }
  },
  created() {
    this.getListSelect(1);
    this.getListSelect(2);
    this.getListSelect(3);
    this.getListSelect(6);
    this.getListSelect(7);
    this.getListSelect(8);
    this.getListSelect(9);
    this.getListSelect(10);
    this.getListSelect(11);
    this.getListSelect(12);
    this.getAutocomplete(2);
    this.getAutocomplete(4);
    this.getAutocomplete(5);
    this._getEmployeeVerification();
    this.handleVerificationPrompt();
    this.handlePersonalDetails();
  },
  methods: {
    ...mapActions('autocomplete', [
      'handleListCurrency',
      'handleListCategory',
      'handleListInsuredEntity'
    ]),
    ...mapActions('list-options', [
      'handleListGender',
      'handleListMaritalStatus',
      'handleListNationality',
      'handleListBank',
      'handleListBankBranch',
      'handleListEmploymentType',
      'handleListLocal',
      'handleListRelationship',
      'handleListSalarySetting',
      'handleListCountryCode'
    ]),
    async _scrollToField(){
      const arrayId = this.listErrorFieldId.flat();
      let idScroll = arrayId.find(e => document.getElementById(e));
      arrayId.map(e => {
        if(!document.getElementById(e)) return;
        if(document.getElementById(e).offsetTop < document.getElementById(idScroll).offsetTop){
          idScroll = e;
        }
      });
      const errorField = document.getElementById(idScroll);
      var top = errorField.getBoundingClientRect().top;
      window.scrollTo({top: top - 60 < 0 ? 0 : top - 60, behavior: 'smooth'});
    },
    addDependent() {
      this.dependentInfo = [
        ...this.dependentInfo,
        {
          relationship: '',
          dob: '',
          maritalstatus: '',
          nric: '',
          gender: '',
          name: '',
          countrycode: '',
          mobilephone: '',
          changetype: '456',
          action: '456',
          viewMode: false
        }
      ];
    },
    handleListStatusDependent(val) {
      this.listStatusDependent.push(val);
    },
    handleListErrorFieldId(val) {
      this.listErrorFieldId.push(val);
    },
    removeDependent(index) {
      if (this.dependentInfo[index].id) {
        this.dependentInfo[index].action = '458';
        this.dependentInfo[index].changetype = '458';
      } else {
        this.dependentInfo.splice(index, 1);
      }
    },
    _getKeyData(data, key, ValueDefault = null) {
      return data.length ? data[data.length - 1][key] : ValueDefault;
    },
    _formatObjSendAPI(value) {
      let Obj = {};
      let arr = Object.values(value);
      arr.find(el => {
        if (
          el.key == 'dob' ||
          el.key == 'datetermnt' ||
          el.key == 'datejoined' ||
          el.key == 'datetermnt' ||
          el.key == 'effectivedate'
        ) {
          Obj[el.key] = el.value
            ? this.$dayjs(_handleFormatTime(el.value, '-')).format('YYYY-MM-DD')
            : null;
        } else {
          Obj[el.key] = el.value;
        }
      });
      return Obj;
    },
    async handleSubmit() {
      this.submitKey += 1;
    },
    async employeeVerificationSave() {
      this.modalShowBenefit = true;
      await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'EmployeeVerification.save',
        a1: {
          data: {
            ...this._formatObjSendAPI(this.bankInfo),
            ...this._formatObjSendAPI(this.personalInfo),
            ...this._formatObjSendAPI(this.employeeInfo),
            verificationperiod: this._getKeyData(this.verificationPrompt, 'id'),
            loginfrom: 'web',
            id: this._getKeyData(this.personalDetails, 'id', ''),
            updatectr: this._getKeyData(this.personalDetails, 'updatectr', ''),
            dependents: this.dependentInfo.map(el => {
              return {
                ...el,
                dob: el.dob
                  ? this.$dayjs(_handleFormatTime(el.dob, '-')).format('YYYY-MM-DD')
                  : null
              };
            })
          }
        }
      });
      this.$router.push({ name: 'first-time-login-benefit-take-step' });
    },
    handleModalShowBenefit(value) {
      this.modalShowBenefit = value;
    },
    handleModalShow(value) {
      this.modalShow = value;
    },
    async getAutocomplete(index) {
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.Autocomplete.Select',
        a1: {
          module: index
        }
      });
      if (res.data.data[0].dt !== EXCEPTION) {
        let resData = handleListCallApi([...res.data.data[0].colNames], [...res.data.data[0].rows]);
        let data = resData.map(el => {
          return { id: el.id, text: el.name };
        });
        switch (index) {
          case 2: {
            this.handleListInsuredEntity(data);
            break;
          }
          case 4: {
            this.handleListCategory(data);
            break;
          }
          case 5: {
            this.handleListCurrency(data);
            break;
          }
        }
      }
    },
    async getListSelect(index) {
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.List.Select',
        a1: {
          ListGroup: index
        }
      });
      if (res.data.data[0].dt !== EXCEPTION) {
        let resData = handleListCallApi([...res.data.data[0].colNames], [...res.data.data[0].rows]);
        let data = resData.map(el => {
          return { id: el.id, text: el.name };
        });
        switch (index) {
          case 1: {
            this.handleListGender(data);
            break;
          }
          case 2: {
            this.handleListMaritalStatus(data);
            break;
          }
          case 3: {
            this.handleListNationality(data);
            break;
          }
          case 6: {
            this.handleListBank(data);
            break;
          }
          case 7: {
            this.handleListBankBranch(data);
            break;
          }
          case 8: {
            this.handleListRelationship(data);
            break;
          }
          case 9: {
            this.handleListEmploymentType(data);
            break;
          }
          case 10: {
            this.handleListLocal(data);
            break;
          }
          case 11: {
            this.handleListSalarySetting(data);
            break;
          }
          case 12: {
            this.handleListCountryCode(data);
            break;
          }
        }
      }
    },
    _getPersonalInfo(listValue, listLabel, listDisabled) {
      let personalInfo = {};
      let listFieldPersonal = [
        { key: 'name', label: true },
        { key: 'nric', label: true },
        { key: 'dob', label: true },
        { key: 'gender', label: false },
        { key: 'maritalstatus', label: false },
        { key: 'marriagedate', label: true },
        { key: 'countrycode', label: false },
        { key: 'mobilephone', label: true },
        { key: 'countrycodehomephone', label: false },
        { key: 'homephone', label: true },
        { key: 'emailaddress', label: true },
        { key: 'homeaddress', label: true }
      ];
      for (let item of listFieldPersonal) {
        if (listValue[item.key] !== undefined) {
          personalInfo[item.key] = {
            value:
              item.key == 'dob' || item.key == 'marriagedate'
                ? this.$dayjs(listValue[item.key]).format('DD-MM-YYYY')
                : listValue[item.key],
            label: item.label ? listLabel[item.key] : listLabel[`${item.key}_name_ind_field`],
            key: item.key,
            disabled: item.label
              ? listDisabled[item.key]
              : listDisabled[`${item.key}_name_ind_field`]
          };
        }
      }
      this.personalInfo = personalInfo;
    },
    _getEmployeeInfo(listValue, listLabel, listDisabled) {
      let employeeInfo = {};
      let listFieldEmployee = [
        { key: 'staffid', label: true },
        { key: 'datejoined', label: true },
        { key: 'employeecategory', label: false },
        { key: 'employmenttype', label: false },
        { key: 'vendorcode', label: true },
        { key: 'designation', label: true },
        { key: 'effectivedate', label: true },
        { key: 'datetermnt', label: true },
        { key: 'country', label: false },
        { key: 'localforeginworker', label: false },
        { key: 'salarysetting', label: false },
        { key: 'currency', label: false },
        { key: 'salary', label: true },
        { key: 'division', label: false },
        { key: 'department', label: false },
        { key: 'insuredentity', label: false }
      ];
      for (let item of listFieldEmployee) {
        if (listValue[item.key] !== undefined) {
          if (item.key == 'insuredentity') {
            employeeInfo[item.key] = {
              value: listValue[item.key],
              key: item.key,
              label: listLabel.policyinsured_name_ind_field,
              disabled: listDisabled.policyinsured_name_ind_field
            };
          } else {
            employeeInfo[item.key] = {
              value:
                item.key == 'datejoined' || item.key == 'datetermnt' || item.key == 'effectivedate'
                  ? this.$dayjs(listValue[item.key]).format('DD-MM-YYYY')
                  : listValue[item.key],
              label: item.label ? listLabel[item.key] : listLabel[`${item.key}_name_ind_field`],
              key: item.key,
              disabled: item.label
                ? listDisabled[item.key]
                : listDisabled[`${item.key}_name_ind_field`]
            };
          }
        }
      }
      this.employeeInfo = employeeInfo;
    },
    _getBankInfo(listValue, listLabel, listDisabled) {
      let bankInfo = {};
      let listFieldBank = [
        { key: 'bank', label: false },
        { key: 'bankbranch', label: false },
        { key: 'bankaccountno', label: true }
      ];
      for (let item of listFieldBank) {
        if (listValue[item.key] !== undefined) {
          bankInfo[item.key] = {
            value: item.key ? listValue[item.key] : listValue[`${item.key}_name_ind_field`],
            label: item.label ? listLabel[item.key] : listLabel[`${item.key}_name_ind_field`],
            key: item.key,
            disabled: item.label
              ? listDisabled[item.key]
              : listDisabled[`${item.key}_name_ind_field`]
          };
        }
      }
      this.bankInfo = bankInfo;
    },
    _getDependentInfo(listValue) {
      let dependentInfo = [];
      let listFieldDependent = [
        { key: 'id', label: true },
        { key: 'countrycode', label: false },
        { key: 'dob', label: true },
        { key: 'gender', label: false },
        { key: 'relationship', label: false },
        { key: 'name', label: true },
        { key: 'nric', label: true },
        { key: 'mobilephone', label: true },
        { key: 'maritalstatus', label: false },
        { key: 'removereason', label: false },
        { key: 'changetype', label: false },
        { key: 'designation', label: true },
        { key: 'nationality', label: false }
      ];
      listValue.find(el => {
        let dependent = {
          changetype: '457',
          action: '457'
        };
        for (let item of listFieldDependent) {
          if (el[item.key] !== undefined) {
            dependent[item.key] =
              item.key == 'dob' ? this.$dayjs(el[item.key]).format('DD-MM-YYYY') : el[item.key];
          }
        }
        dependentInfo.push(dependent);
      });
      this.dependentInfo = dependentInfo;
    },
    async handleVerificationPrompt() {
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'Employee.VerificationPrompt'
      });
      if (res.data.data[0].dt !== EXCEPTION) {
        this.verificationPrompt = handleListCallApi(
          [...res.data.data[0].colNames],
          [...res.data.data[0].rows]
        );
      }
    },
    async handlePersonalDetails() {
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'PersonalDetails.getEmpVerificationInfo',
        a1: {
          empId: localStorage.getItem('empid')
        }
      });
      this.personalDetails = handleListCallApi(
        [...res.data.data[0].colNames],
        [...res.data.data[0].rows]
      );
    },
    async _getEmployeeVerification() {
      const res = await postAxios({
        invoke: 'System.execute',
        argc: '2',
        a0: 'PersonalDetails.getEmpPersonalDetails',
        a1: {
          empId: localStorage.getItem('empid'),
          mode: 1
        }
      });
      // get value personal
      let listValuePersonal = JSON.parse(res.data.data[0].value);
      let listLabelEmployee = JSON.parse(res.data.data[4].value);
      let listDisabledEmployee = JSON.parse(res.data.data[6].value);
      this.listLabelDependent = JSON.parse(res.data.data[5].value);
      this.listDisabledDependent = JSON.parse(res.data.data[7].value);

      await this._getPersonalInfo(listValuePersonal, listLabelEmployee, listDisabledEmployee);
      // get value employee
      let listValueEmployee = JSON.parse(res.data.data[1].value);
      await this._getEmployeeInfo(listValueEmployee, listLabelEmployee, listDisabledEmployee);
      // get value bank
      let listValueBank = JSON.parse(res.data.data[2].value);
      await this._getBankInfo(listValueBank, listLabelEmployee, listDisabledEmployee);
      // get value dependent
      let listValueDependent = JSON.parse(res.data.data[3].value);
      await this._getDependentInfo(listValueDependent, this.listLabelDependent);
    }
  }
};
</script>

<style scoped>
.p--25 {
  padding-right: 25px;
  padding-left: 25px;
}

.container {
  padding-bottom: 70px;
}

.btn__click__changes {
  padding: 7px 9px;
}

.btn__click__details {
  padding: 7px 13px;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12), 0px 3px 4px rgba(0, 0, 0, 0.14),
    0px 3px 3px -2px rgba(0, 0, 0, 0.2);
}

</style>
<style>
.dialog-first-time {
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 1012px !important;
  min-width: none;
}
</style>
