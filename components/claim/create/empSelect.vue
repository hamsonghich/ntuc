<template>
  <div class="d-flex justify-content-between h-100">
    <div class="wrapper__content__quick__log">
      <div class="wrapper__content">
        <div class="title__quick__log">{{ 'Ok sure,' }}</div>
        <div class="question__quick__log">
          {{ 'Please indicate the Employee  you will be claiming for?' }}
        </div>
        <div class="wrapper_checkbox_log__supp wrapper_checkbox_quick_log">
          <b-col class="pr-0 p--md-0 claimCreate_step-7--item" sm="6" md="6" lg="6" xl="6">
            <b-form-group id="input-group-1" label-for="input-1">
              <Autocomplete
                :value="emp"
                :displayAttribute="'text'"
                :valueAttribute="'id'"
                :optionDropdowns="listEMP"
                :placeholder="'Please select Employee'"
                :filter="true"
                :isHeight50="true"
                @changeValue="value => (this.emp = value)"
              />
            </b-form-group>
          </b-col>
          <b-col
            class="pr-0 p--md-0 claimCreate_step-7--item"
            sm="6"
            md="6"
            lg="6"
            xl="6"
            v-if="isDependentShow"
          >
            <b-form-group id="input-group-1" label-for="input-1">
              <Autocomplete
                :value="employeedpdt"
                :displayAttribute="'text'"
                :valueAttribute="'id'"
                :optionDropdowns="listDPT"
                :placeholder="'Please select Claimaint'"
                :filter="true"
                :isHeight50="true"
                @changeValue="value => (this.employeedpdt = value)"
              />
            </b-form-group>
          </b-col>
        </div>
      </div>
      <div class="quick-log-btn">
        <button type="button" @click="_nextStep" class="btn btn__claim button__log _btn_next_claim">
          Next
        </button>
      </div>
    </div>
    <quoteClaim />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { postAxios } from '../../../services/callApi';
  import quoteClaim from '../quoteClaim.vue';

  export default {
    components: {
      quoteClaim
    },
    data: () => ({
      emp: '',
      isDependentShow: false,
      employeedpdt: '',
      listEMP: [],
      listDPT: []
    }),
    methods: {
      ...mapActions('alert', ['_changeAlertConfig']),
      ...mapActions('claim', [
        'setCreateClaimStep',
        'setCreateStepClaimInfor',
        'setEntitiesClaim',
        'setEntityActiveClaim',
        '_setStepList'
      ]),
      async getListEmp() {
        try {
          const data = await postAxios({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.Employee.GetProxyList',
            a1: {
              mode: '1'
            }
          });
          if (data.data.data[0].dt === 'exception') {
            this._changeAlertConfig({
              isShow: true,
              typeAlert: 'warning',
              textAlert: 'No Employees'
            });
            return this.setCreateClaimStep(2);
          }
          const listEmp = JSON.parse(data.data.data[0].value);
          if (listEmp.data.employee_list.length === 0) {
            return this._changeAlertConfig({
              isShow: true,
              typeAlert: 'warning',
              textAlert: 'No Employees'
            });
          }
          this.listEMP = listEmp.data.employee_list;

        } catch (error) {}
      },
      async getListDependent(val) {
        try {
          const emp = localStorage.getItem('empid');
          const data = await postAxios({
            invoke: 'System.execute',
            argc: '2',
            a0: 'API.ClaimApplied.GetEmployeeDpdt',
            a1: {
              mode: '1',
              employee: val === emp ? null : val
            }
          });

          if (data.data.data[0].dt === 'exception') {
            this._changeAlertConfig({
              isShow: true,
              typeAlert: 'warning',
              textAlert: 'No Dependents'
            });
          }
          const dataJson = JSON.parse(data.data.data[0].value);
          this.listDPT = dataJson.data.dependant_list;

          if (listEmp.data.employee_list.length === 0) {
            this._changeAlertConfig({
              isShow: true,
              typeAlert: 'warning',
              textAlert: 'No Dependents'
            });
          } else {
            this._changeAlertConfig({
              isShow: false,
              typeAlert: 'warning',
              textAlert: 'No Dependents'
            });
          }

        } catch (error) {
          this._changeAlertConfig({
            isShow: true,
            typeAlert: 'warning',
            textAlert: 'No Dependents'
          })
        }
      },
      _nextStep() {
        if (this.emp && !this.isDependentShow) {
          this.isDependentShow = true;
          return
        }
        if (this.isDependentShow && this.employeedpdt) {
          this.setCreateStepClaimInfor({
            ...this.createClaimStepInfor,
            claimantName: this.employeedpdt,
            employee: this.emp
          });
          this.setCreateClaimStep(4);
        }
      },
    },
    watch: {
      emp(val) {
        if (!val) return;
        this.getListDependent(val);
      }
    },
    computed: {
      ...mapGetters('claim', ['createStep', 'createClaimStepInfor'])
    },
    async fetch() {
      await this.getListEmp();
    }
  };
</script>

<style scoped>
  @import '@/assets/css/inputCustom/inputCustom.css';
  @import '@/assets/css/claim/create/firstClaim.css';
  @import '@/assets/css/quick-log/stepContent.css';

  .checkbox-claim >>> .custom-checkbox {
    padding: 0;
  }

  .checkbox-claim >>> .custom-control-label {
    font-family: Ubuntu-Light, Tahoma, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 150%;
    color: var(--NTUC-8);
  }
  .check_box_claim {
    margin-left: 6px;
  }
</style>
