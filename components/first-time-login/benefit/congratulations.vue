<template>
  <div class="bg-NTUC-7 pt--30 pb--30 margin-auto d-flex align-items-center justify-content-center h-100">
    <div>
      <h1 class="text-48 text-NTUC-1 text-center">Congratulations!</h1>
      <h2 class="text-center mt--20 capitalize text-24">We share your joy in welcoming your new family member/s</h2>
      <h2 v-for="dependent of listDependent" :key="dependent" class="text-center text-NTUC-3 mt--20">{{dependent.name}}</h2>
      <div style="width: 600px; margin: auto;">
        <div class="line-height-15 text-center text-20 text-NTUC-1 mt-5">You are 4 steps away from completing your enrolment: </div>
        <ol class="mt-3" style="list-style-type: disc">
          <li>
            <div class="text-16 text-gray--800 line-height-15 my-2">
              Read the product summary which reflects the premium and benefits.
            </div>
          </li>
          <li>
            <div class="text-16 text-gray--800 line-height-15 my-2">
              Select your dependant's coverage. 
            </div>
          </li>
          <li>
            <div class="text-16 text-gray--800 line-height-15 my-2">
              Confirmation email will be sent with total premium for benefits selected within 3 workdays. 
            </div>
          </li>
          <li>
            <div class="text-16 text-gray--800 line-height-15 my-2">
              If Group Term Life coverage is selected, health declaration form will be sent to you for completion.
            </div>
          </li>
        </ol>
      </div>
      <div class="mt--30 d-flex justify-content-center">
        <b-button @click='handleRouteByDependents' class="text-20 button__hover font__regular mt--20 btn__primary ml-2 w-auto">
          Continue to enrol{{listDependentString}}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  async fetch() {
    try {
      const resGetListDependent = await this.getEmployeeList({
        "invoke": "System.execute",
        "argc": "2",
        "a0": "Flex.getEmployeeList",
        "a1": {
          "userid": localStorage.getItem("staffid"),
          "mode": "1"
        }
      });
      this.listDependent = resGetListDependent;
      this.listDependent.forEach((dependent) => {
        this.listDependentString = this.listDependentString + ' ' + dependent.name;
      })
    }
    catch (error) {
      console.log('handleRouteByDependents: ' + error);
    }
  },
  data() {
    return {
      listDependent: [],
      listDependentString: '',
    }
  },
  methods: {
    ...mapActions("benefit", ["getEmployeeList"]),
    handleRouteByDependents() {
      this.$router.push({ name: 'first-time-login-benefit-list-benefit', params: { isCheckThreeWork: true } });
    },
  },
};

</script>

<style scoped>
@import '@/assets/css/button/index.css';
.button__hover:hover{
  background: var(--NTUC-1) !important;
  border: 1px solid var(--NTUC-1-light) !important;
  box-shadow: 0 0 0 0.2rem var(--NTUC-1-light) !important;
}
.capitalize {
  text-transform: capitalize;
}
</style>
