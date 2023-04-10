<template>
  <div class="f-container w-100">
    <div class="f-wrapper m-auto d-flex flex-column justify-content-start align-items-start">
      <div class="box_submit d-flex align-items-center" v-if="checkNextStep">
        <div class="content text-white text-center" v-html="$t('benefit.HDF_Alert')"></div>
        <div class="close" @click="handleCloseAlert">
          <img src="@/assets/images/close.png" alt="icon" />
        </div>
      </div>
      <div class="f-title d-flex align-items-center text-NTUC-1 text-23 font__medium">
        {{ $t('benefit.health_declaration_form') }}
      </div>
      <HeaderStep :currentStep="step" />
      <HDFStep1
        v-if="step == 1"
        :data="data"
        :flexperid="flexperid"
        :employeeName="employeeName"
        :spouseName="spouseName"
        :listFamilyName="listFamilyName"
        :isCheckEmployee="isCheckEmployee"
        :isCheckSpouse="isCheckSpouse"
        :isCheckChild1="isCheckChild1"
        :isCheckChild2="isCheckChild2"
        :isCheckChild3="isCheckChild3"
        @handleChangeData="handleChangeData"
        @handleChangeSpouse="handleChangeSpouse"
        @handleChangeChild1="handleChangeChild1"
        @handleChangeChild2="handleChangeChild2"
        @handleChangeChild3="handleChangeChild3"
      />
      <HDFStep2 v-if="step == 2" />
      <HDFStep3 v-if="step == 3" @handleConfirm="handleConfirm" />
      <div
        class="d-flex w-100"
        :class="step > 1 ? 'justify-content-between' : 'justify-content-end'"
      >
        <div v-if="step > 1">
          <b-button class="btn__back mt--5 font__regular text-16" @click="prevStep">{{
            $t('btn.back')
          }}</b-button>
        </div>
        <div>
          <b-button
            class="btn-step-skip bg-white rounded text-NTUC-6 mt--5 mr-3"
            v-if="step == 1"
            @click="handleSkip"
            >{{ $t('btn.Save_for_latter') }}</b-button
          >
        </div>
        <div>
          <b-button
            v-if="step != 3"
            class="btn__next text-16 font__regular mt--5 btn__orange"
            @click="nextStep"
            >{{ $t('btn.next') }}</b-button
          >
          <b-button
            v-if="step == 3"
            class="btn__next text-16 font__regular mt--5 btn__orange"
            :disabled="!isCheckConfirm"
            @click="submitStep"
            >{{ $t('benefit.HDFormStep2.submit') }}</b-button
          >
        </div>
      </div>
    </div>
    <b-modal
      v-model="isCheckValidate"
      content-class="border-0"
      title-class="text-white"
      header-class="bg-NTUC-3"
      title="Information"
      size="lg"
      centered
    >
      <div class="text-20 text-gray--800 justify-content-left mt--20 validate-error">
        <div v-if="checkAll" v-html="$t('benefit.validateAll')"></div>
        <div v-if="checkOptions && checkInput" v-html="$t('benefit.validate')"></div>
        <div v-else-if="checkOptions && !checkInput" v-html="$t('benefit.validateOptions')"></div>
        <div
          v-else-if="!checkOptions && checkInput"
          v-html="$t('benefit.validateInputField')"
        ></div>
        <div v-if="checkTextField" v-html="$t('benefit.validateTextField')"></div>
        <br />
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            class="float-right btn__ok bg-NTUC-3 border-0"
            @click="handleResetCheckValidate"
          >
            {{ $t('btn.ok') }}
          </b-button>
        </div>
      </template>
    </b-modal>
    <InformationDialog idDialog="informationDialog" :checkNextStep="checkNextStep" />
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { postAxios } from '~/services/callApi';
import HeaderStep from '~/components/first-time-login/benefit/healthDeclaration/headerStep.vue';
import InformationDialog from '~/components/first-time-login/benefit/healthDeclaration/informationDialog.vue';
import HDFStep1 from '~/components/first-time-login/benefit/healthDeclaration/HDFStep1.vue';
import HDFStep2 from '~/components/first-time-login/benefit/healthDeclaration/HDFStep2.vue';
import HDFStep3 from '~/components/first-time-login/benefit/healthDeclaration/HDFStep3.vue';
export default {
  components: {
    HeaderStep,
    HDFStep1,
    HDFStep2,
    HDFStep3,
    InformationDialog
  },
  data() {
    return {
      checkNextStep: false,
      checkSaveHDF: '',
      checkAll: false,
      modalShow: false,
      value: true,
      step: 1,
      isCheckValidate: false,
      progress: 20,
      flexperid: {
        insurer: []
      },
      stepInprogress: [0],
      data: {},
      listEmpPersonal: {},
      employeeName: '',
      listFamilyName: [],
      spouseName: '',
      isCheckEmployee: true,
      isCheckSpouse: false,
      isCheckChild1: false,
      isCheckChild2: false,
      isCheckChild3: false,
      isCheckConfirm: false,
      checkTextField: false,
      checkOptions: false,
      checkInput: false,
      checkAllEmp: false,
      checkAllSpouse: false,
      checkAllChild1: false,
      checkAllChild2: false,
      checkAllChild3: false
    };
  },
  async created() {
    this.$emit('created');
  },
  computed: {},
  methods: {
    ...mapActions('login', ['fetchGetRelatedLoginInfo']),
    handleCloseAlert() {
      this.checkNextStep = false;
    },
    async getEmpPersonal() {
      try {
        const empPersonal = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.EmployeeDpdt.Get'
        });
        this.employeeName = localStorage.getItem('empName');
        if (empPersonal.data.data) {
          let listDependant = JSON.parse(empPersonal.data.data[0].value).data.dependants;
          listDependant.forEach(el => {
            if (el.relationship === 'Spouse') {
              this.spouseName = el.name;
            } else if (el.relationship === 'Children') {
              this.listFamilyName.push(el);
            }
          });
          if (this.spouseName) {
            this.isCheckSpouse = true;
          }
          this.handleTickCheckBox();
        }
      } catch (e) {}
    },
    handleTickCheckBox() {
      switch (this.listFamilyName.length) {
        case 1:
          this.isCheckChild1 = true;
          break;
        case 2:
          this.isCheckChild1 = true;
          this.isCheckChild2 = true;
          break;
        case 3:
          this.isCheckChild1 = true;
          this.isCheckChild2 = true;
          this.isCheckChild3 = true;
          break;
      }
    },
    async getBenefit() {
      try {
        const text = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'Flex.WebSummaryHeader',
          a1: {
            employee: localStorage.getItem('empid'),
            flex: true
          }
        });
        this.flexperid = JSON.parse(text.data.data[0].value);
      } catch (e) {
        console.log(e);
      }
    },
    handleResetCheckValidate() {
      this.isCheckValidate = false;
    },

    async getData() {
      try {
        let dataTem = {};

        const text = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Flex.LoadHDForm',
          a1: {
            employee: localStorage.getItem('empid'),
            flexperiod: this.flexperid.flexperiod,
            insurer: this.flexperid.insurer
          }
        });

        if (text.data.data[0].dt == 'exception') {
          this.checkNextStep = true;
          return;
        } else {
          this.checkNextStep = false;
        }

        if (JSON.parse(JSON.parse(text.data.data[0].value).data.data)[0]) {
          for (let item of JSON.parse(JSON.parse(text.data.data[0].value).data.data)[0][
            this.flexperid.insurer[0]
          ]) {
            dataTem[`${Object.keys(item)[0]}`] = Object.values(item)[0];
          }
        }
        this.data = dataTem;
      } catch (e) {}
    },
    checkNull(valueStep) {
      if (valueStep === null) return 'null';
      return `"${valueStep}"`;
    },
    handleSave() {
      let params = `{"info":[{"NTUC":{"${this.flexperid.insurer[0]}":[`;
      for (let [i, item] of Object.values(this.data).entries()) {
        params =
          params + this.checkNull(item) + `${i + 1 == Object.values(this.data).length ? '' : ','}`;
      }
      params =
        params +
        `]},"insurerid": "${this.flexperid.insurer[0]}" }],"employeeid": "${localStorage.getItem(
          'empid'
        )}","flexperiod": "${this.flexperid.flexperiod}" }`;
      this.getSaveData(params);
    },
    handleSkip() {
      this.handleSave();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.$bvModal.show('informationDialog');
    },
    nextStep() {
      this.handleValidateForm();
    },
    handleValidateForm() {
      const checkEmployeeArr = [];
      const checkSpouseArr = [];
      const checkChild1Arr = [];
      const checkChild2Arr = [];
      const checkChild3Arr = [];
      const dataArr = [];
      // convert object data to an array
      Object.keys(this.data).forEach((item, i) => {
        const getKeys = Object.keys(this.data)[i];
        const getValues = Object.values(this.data)[i];
        const newObj = { [getKeys]: getValues };
        dataArr.push(newObj);
      });
      // filter data to 5 column
      dataArr.forEach(el => {
        let checkObjValue = Object.keys(el)[0].split('').reverse()[0];
        if (checkObjValue == 1 || checkObjValue == 2) {
          checkEmployeeArr.push(el);
        } else if (checkObjValue == 3 || checkObjValue == 4) {
          checkSpouseArr.push(el);
        } else if (checkObjValue == 5 || checkObjValue == 6) {
          checkChild1Arr.push(el);
        } else if (checkObjValue == 7 || checkObjValue == 8) {
          checkChild2Arr.push(el);
        } else {
          checkChild3Arr.push(el);
        }
      });
      this.handleCheckNullData(
        checkEmployeeArr,
        checkSpouseArr,
        checkChild1Arr,
        checkChild2Arr,
        checkChild3Arr
      );
    },
    handleCheckNullData(empArr, spouseArr, child1Arr, child2Arr, child3Arr) {
      let isEmployeeOptions = empArr.some(el => {
        return Object.values(el)[0] != null;
      });
      // check if all question all answered
      // emp
      let empAllArr = [];
      let isEmpArr = [];
      // return a array that contain all data fields of Employee column
      empArr.forEach(el => {
        if (
          Object.keys(el)[0].split('-').reverse()[0] >= 71 &&
          Object.keys(el)[0].split('-').reverse()[0] <= 222 &&
          Object.keys(el)[0].split('-').reverse()[0] != 191 &&
          Object.keys(el)[0].split('-').reverse()[0] != 192 &&
          Object.keys(el)[0].split('-').reverse()[0] != 201 &&
          Object.keys(el)[0].split('-').reverse()[0] != 202
        ) {
          empAllArr.push(el);
        }
      });
      let emp = [];
      empAllArr.forEach(el => {
        if (Object.values(el)[0] != null) {
          emp.push(el);
        }
        if (Object.keys(el)[0].split('').reverse()[0] == 1) {
          isEmpArr.push(el);
        }
      });

      if (empAllArr.length / emp.length == 2) {
        this.checkAllEmp = true;
      } else {
        this.checkAllEmp = false;
      }
      // check if employee column have any answer yes or not
      let isEmpYes = isEmpArr.some(el => {
        return Object.values(el)[0] != null;
      });
      // check if employee heigh & weight have filled
      let isEmployeeInput =
        this.data[`a-${this.flexperid.insurer[0]}-11`] &&
        this.data[`a-${this.flexperid.insurer[0]}-12`]
          ? true
          : false;
      // spouse
      let spouseAllArr = [];
      let isSpouseArr = [];
      let spouse = [];
      spouseArr.forEach(el => {
        if (
          Object.keys(el)[0].split('-').reverse()[0] >= 73 &&
          Object.keys(el)[0].split('-').reverse()[0] <= 224 &&
          Object.keys(el)[0].split('-').reverse()[0] != 193 &&
          Object.keys(el)[0].split('-').reverse()[0] != 194 &&
          Object.keys(el)[0].split('-').reverse()[0] != 203 &&
          Object.keys(el)[0].split('-').reverse()[0] != 204
        ) {
          spouseAllArr.push(el);
        }
      });
      spouseAllArr.forEach(el => {
        if (Object.values(el)[0] != null) {
          spouse.push(el);
        }
        if (Object.keys(el)[0].split('').reverse()[0] == 3) {
          isSpouseArr.push(el);
        }
      });
      if (spouseAllArr.length / spouse.length == 2) {
        this.checkAllSpouse = true;
      } else {
        this.checkAllSpouse = false;
      }
      // check Spouse if is has true
      let isSpouseOptions = spouseArr.some(el => {
        return Object.values(el)[0] != null;
      });
      let isSpouseYes = isSpouseArr.some(el => {
        return Object.values(el)[0] != null;
      });
      let isSpouseInput =
        this.data[`a-${this.flexperid.insurer[0]}-24`] &&
        this.data[`a-${this.flexperid.insurer[0]}-25`]
          ? true
          : false;
      // check child1
      let Child1AllArr = [];
      let isChild1Arr = [];
      let Child1 = [];

      child1Arr.forEach(el => {
        if (
          Object.keys(el)[0].split('-').reverse()[0] >= 75 &&
          Object.keys(el)[0].split('-').reverse()[0] <= 226 &&
          Object.keys(el)[0].split('-').reverse()[0] != 195 &&
          Object.keys(el)[0].split('-').reverse()[0] != 196 &&
          Object.keys(el)[0].split('-').reverse()[0] != 205 &&
          Object.keys(el)[0].split('-').reverse()[0] != 206
        ) {
          Child1AllArr.push(el);
        }
      });
      Child1AllArr.forEach(el => {
        if (Object.values(el)[0] != null) {
          Child1.push(el);
        }
        if (Object.keys(el)[0].split('').reverse()[0] == 5) {
          isChild1Arr.push(el);
        }
      });
      if (Child1AllArr.length / Child1.length == 2) {
        this.checkAllChild1 = true;
      } else {
        this.checkAllChild1 = false;
      }
      // check child1 if is has true value
      let isChild1Options = child1Arr.some(el => {
        return Object.values(el)[0] != null;
      });
      let isChild1Yes = isChild1Arr.some(el => {
        return Object.values(el)[0] != null;
      });
      let isChild1Input =
        this.data[`a-${this.flexperid.insurer[0]}-37`] &&
        this.data[`a-${this.flexperid.insurer[0]}-38`]
          ? true
          : false;
      // check child2
      let Child2AllArr = [];
      let isChild2Arr = [];
      let Child2 = [];

      child2Arr.forEach(el => {
        if (
          Object.keys(el)[0].split('-').reverse()[0] >= 77 &&
          Object.keys(el)[0].split('-').reverse()[0] <= 228 &&
          Object.keys(el)[0].split('-').reverse()[0] != 197 &&
          Object.keys(el)[0].split('-').reverse()[0] != 198 &&
          Object.keys(el)[0].split('-').reverse()[0] != 207 &&
          Object.keys(el)[0].split('-').reverse()[0] != 208
        ) {
          Child2AllArr.push(el);
        }
      });

      Child2AllArr.forEach(el => {
        if (Object.values(el)[0] != null) {
          Child2.push(el);
        }
        if (Object.keys(el)[0].split('').reverse()[0] == 7) {
          isChild2Arr.push(el);
        }
      });

      if (Child2AllArr.length / Child2.length == 2) {
        this.checkAllChild2 = true;
      } else {
        this.checkAllChild2 = false;
      }
      // check child2 if is has true value
      let isChild2Options = child2Arr.some(el => {
        return Object.values(el)[0] != null;
      });
      let isChild2Yes = isChild2Arr.some(el => {
        return Object.values(el)[0] != null;
      });
      let isChild2Input =
        this.data[`a-${this.flexperid.insurer[0]}-50`] &&
        this.data[`a-${this.flexperid.insurer[0]}-51`]
          ? true
          : false;
      // check child3
      let Child3AllArr = [];
      child3Arr.forEach(el => {
        if (
          Object.keys(el)[0].split('-').reverse()[0] >= 79 &&
          Object.keys(el)[0].split('-').reverse()[0] <= 230 &&
          Object.keys(el)[0].split('-').reverse()[0] != 199 &&
          Object.keys(el)[0].split('-').reverse()[0] != 200 &&
          Object.keys(el)[0].split('-').reverse()[0] != 209 &&
          Object.keys(el)[0].split('-').reverse()[0] != 210
        ) {
          Child3AllArr.push(el);
        }
      });
      let Child3 = [];
      Child3AllArr.forEach(el => {
        if (Object.values(el)[0] != null) {
          Child3.push(el);
        }
      });
      if (Child3AllArr.length / Child3.length == 2) {
        this.checkAllChild3 = true;
      } else {
        this.checkAllChild3 = false;
      }
      // check child3 if is has true value
      let isChild3Options = child3Arr.some(el => {
        return Object.values(el)[0] != null;
      });
      let isChild3Arr = [];
      child3Arr.forEach(el => {
        if (Object.keys(el)[0].split('').reverse()[0] == 9) {
          isChild3Arr.push(el);
        }
      });
      let isChild3Yes = isChild3Arr.some(el => {
        return Object.values(el)[0] != null;
      });
      let isChild3Input =
        this.data[`a-${this.flexperid.insurer[0]}-63`] &&
        this.data[`a-${this.flexperid.insurer[0]}-64`]
          ? true
          : false;
      const totalEmp = [isEmployeeOptions, isEmployeeInput, isEmpYes, this.checkAllEmp];
      const totalSpouse = [isSpouseOptions, isSpouseInput, isSpouseYes, this.checkAllSpouse];
      const totalChild1 = [isChild1Options, isChild1Input, isChild1Yes, this.checkAllChild1];
      const totalChild2 = [isChild2Options, isChild2Input, isChild2Yes, this.checkAllChild2];
      const totalChild3 = [isChild3Options, isChild3Input, isChild3Yes, this.checkAllChild3];

      this.handleCheckColumn(totalEmp, totalSpouse, totalChild1, totalChild2, totalChild3);
    },
    handleCheckColumn(totalEmp, totalSpouse, totalChild1, totalChild2, totalChild3) {
      const arrOptionValidate = [];
      const arrInputValidate = [];
      const arrCheckYes = [];
      const arrCheckAll = [];
      arrInputValidate.push(totalEmp[0]);
      arrOptionValidate.push(totalEmp[1]);
      arrCheckYes.push(totalEmp[2]);
      arrCheckAll.push(totalEmp[3]);
      if (this.isCheckSpouse) {
        arrOptionValidate.push(totalSpouse[0]);
        arrInputValidate.push(totalSpouse[1]);
        arrCheckYes.push(totalSpouse[2]);
        arrCheckAll.push(totalSpouse[3]);
      }
      if (this.isCheckChild1) {
        arrOptionValidate.push(totalChild1[0]);
        arrInputValidate.push(totalChild1[1]);
        arrCheckYes.push(totalChild1[2]);
        arrCheckAll.push(totalChild1[3]);
      }
      if (this.isCheckChild2) {
        arrOptionValidate.push(totalChild2[0]);
        arrInputValidate.push(totalChild2[1]);
        arrCheckYes.push(totalChild2[2]);
        arrCheckAll.push(totalChild2[3]);
      }
      if (this.isCheckChild3) {
        arrOptionValidate.push(totalChild3[0]);
        arrInputValidate.push(totalChild3[1]);
        arrCheckYes.push(totalChild3[2]);
        arrCheckAll.push(totalChild3[3]);
      }
      let checkOptions = arrOptionValidate.includes(false);
      let checkInputs = arrInputValidate.includes(false);
      let checkYes = arrCheckYes.includes(true);
      let checkAll = arrCheckAll.includes(false);
      if (checkAll) {
        this.isCheckValidate = true;
        this.checkAll = true;
        this.checkTextField = false;
      } else if (checkOptions && checkInputs) {
        this.isCheckValidate = true;
        this.checkTextField = false;
        this.checkInput = true;
        this.checkOptions = true;
        this.checkAll = false;
      } else if (checkOptions && !checkInputs) {
        this.isCheckValidate = true;
        this.checkTextField = false;
        this.checkOptions = true;
        this.checkInput = false;
        this.checkAll = false;
      } else if (!checkOptions && checkInputs) {
        this.isCheckValidate = true;
        this.checkTextField = false;
        this.checkOptions = false;
        this.checkInput = true;
        this.checkAll = false;
      } else {
        this.handleNextStep(checkYes);
      }
    },
    handleNextStep(checkYes) {
      this.checkAll = false;
      if (this.step === 1 && !this.data[`a-${this.flexperid.insurer[0]}-231`] && checkYes) {
        this.isCheckValidate = true;
        this.checkOptions = false;
        this.checkInput = false;
        this.checkTextField = true;
      } else {
        if (this.step == 1) {
          this.handleSave();
        }
        if (this.checkSaveHDF !== 'exception') {
          this.checkNextStep = false;
          this.step !== 3 && this.step++;
          this.stepInprogress.push(this.step);
          if (this.step === 2) {
            this.progress += 20;
            return;
          }
          if (this.step === 3) {
            this.progress += 0;
            return;
          }
          this.progress += 40;
        } else {
          this.checkNextStep = true;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    prevStep() {
      this.stepInprogress.pop(this.step);
      if (this.step === 2) {
        this.progress -= 20;
      } else if (this.step === 3) {
        this.progress -= 0;
      }
      this.step--;
    },
    handleChangeData(param) {
      this.data[`a-${this.flexperid.insurer[0]}-${param}`] = null;
    },
    async submitStep() {
      try {
        // await this.nextStep();
        const text = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Flex.SubmitHDForm',
          a1: {
            employee: localStorage.getItem('empid'),
            flexperiod: this.flexperid.flexperiod
          }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (text.data.data[0].dt === 'exception') {
          this.checkNextStep = true;
        } else {
          this.checkNextStep = false;
          await this.fetchGetRelatedLoginInfo({
            invoke: 'System.execute',
            argc: '2',
            a0: 'User.getRelatedLoginInfo',
            a1: {
              empid: localStorage.getItem('userid')
            }
          });
          this.isSubmitPage = true;
          this.$router.push({ name: 'first-time-login-dashboard' });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getSaveData(params) {
      try {
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'API.Flex.SaveHDForm',
          a1: {
            employee: localStorage.getItem('empid'),
            data: params
          }
        });
        this.checkSaveHDF = res.data.data[0].dt;
      } catch (e) {
        console.log(e);
      }
    },
    handleChangeSpouse(value) {
      this.isCheckSpouse = value;
    },
    handleChangeChild1(value) {
      this.isCheckChild1 = value;
    },
    handleChangeChild2(value) {
      this.isCheckChild2 = value;
    },
    handleChangeChild3(value) {
      this.isCheckChild3 = value;
    },
    handleConfirm(value) {
      this.isCheckConfirm = value;
    }
  },
  async fetch() {
    await this.getBenefit();
    await this.getData();
    this.handleSave();
    await this.getEmpPersonal();
  }
};
</script>
<style scoped>
@import '@/assets/css/first-time-login/benefit/familyForm.css';
</style>
