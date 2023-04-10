<template>
  <div class="">
    <div>
      <div class="select__complate__ecard">
        <Autocomplete
          :value="ecardId"
          :placeholder="$t('Please select ')"
          :optionDropdowns="dependentEcard"
          :valueAttribute="'id'"
          :displayAttribute="'name'"
          :filter="true"
          @changeValue="value => handleChangeEcardId(value)"
        />
      </div>
      <div class="position-relative z-1 mt--20">
        <div v-if="this.ecardList.length > 0" class="card-desktop">
          <WalletCard v-if="ecardId != 3" :nameCard="handleNameCard()" :imageHtml="ecardList[0]" />
          <div v-else>
            <div class="position-relative img-div" v-html="this.ecardList[1]"></div>
          </div>
        </div>
        <WalletCard v-else :nameCard="handleNameCard()" />
        <div v-if="isShowPanelCards">
          <p class="font-400 text-14 text-MMB-2 text__panel__cards">
            {{ $t('eCard.view') }}
            <span class="text__click__ecard" @click="handleClickBtn('My Panel Card/s', 2)">{{
              $t('eCard.click_here')
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import WalletCard from '@/components/dashboard/walletCard.vue';
export default {
  components: {
    WalletCard
  },
  props: ['page'],
  data() {
    return {
      nameEmploy: localStorage.getItem('empName'),
      dependentEcard: [],
      cardOne: 'start',
      options: [
        { text: 'Panel', value: 'panel' },
        { text: 'Non-Panel', value: 'nopanel' }
      ],
      selected: ['nopanel']
    };
  },
  computed: {
    ...mapGetters('employee', [
      'ecardList',
      'ecardBase',
      'depentdentBase',
      'ecardId',
      'insurerCards'
    ]),
    ...mapGetters('log', ['listStatus']),
    totalPage: function () {
      return Math.ceil(this.eCard.length / this.perPage);
    },
    eCardPagination: function () {
      let start = (this.curPage - 1) * this.perPage;
      let end = this.curPage * this.perPage;
      return this.eCard.slice(start, end);
    },
    isShowPanelCards() {
      if (this.dependentEcard.length >= 2 && this.insurerCards.length > 2) return true;
      return false;
    }
  },
  async fetch() {
    await this.ecardListdata();
    await this.fetchInsurerCards();
    await this.ecardListdependent();
  },
  methods: {
    ...mapActions('log', ['toggleIsFilterClaim', 'getListClaim']),
    ...mapActions('employee', [
      'fetcheCard',
      'pelcherCard',
      'handleDependentDetails',
      'changeEcardId',
      'fetchInsurerCards'
    ]),
    handleClickBtn(param, page) {
      this.$emit('handleClickBtn', param, page);
    },
    async ecardListdata() {
      await this.fetcheCard({
        invoke: 'System.execute',
        argc: '2',
        a0: 'MedicalCard.getImage',
        a1: {
          dependent: -1
        }
      });
    },
    async ecardListdependent() {
      await this.handleDependentDetails({
        invoke: 'System.execute',
        argc: '2',
        a0: 'Employee.getClaimateList',
        a1: {
          Emp: localStorage.getItem('userid')
        }
      });
      this.dependentEcard = this.depentdentBase.map(el => {
        return {
          id: el.id,
          name: el.name
        };
      });
      if (this.insurerCards.length) {
        this.dependentEcard.push({
          id: 3,
          name: 'Terms and Conditions'
        });
      }
    },
    handleNameCard() {
      try {
        if (this.ecardId) {
          const dependent = this.dependentEcard.find(e => e.id == this.ecardId);
          return dependent.name;
        } else {
          return this.nameEmploy;
        }
      } catch (error) {
        return this.nameEmploy;
      }
    },
    async handleChangeEcardId(value) {
      const ecardId = localStorage.getItem('userid') == value ? -1 : value
      if (this.dependentEcard.length) {
        this.changeEcardId(ecardId);
        this.$forceUpdate();
      }
    }
  },
  watch: {
    async ecardId(value) {
      if (value != 3) {
        await this.fetcheCard({
          invoke: 'System.execute',
          argc: '2',
          a0: 'MedicalCard.getImage',
          a1: {
            dependent: value
          }
        });
        this.$forceUpdate();
      } else {
        await this.fetcheCard({
          invoke: 'System.execute',
          argc: '2',
          a0: 'MedicalCard.getImage',
          a1: {
            dependent: -1
          }
        });
        this.$forceUpdate();
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/dashboard/eCard.css';
.z-1 {
  z-index: 1;
}

.text__company__ecard{
  padding-top: 22px;
}

::v-deep img.img-responsive {
  height: 100%;
}
.card__face--front {
  background: url('@/assets/images/eCard-background.png') no-repeat center;
  background-size: cover;
  border-radius: 10px;
  padding: 16px 16px 23px 29px;
  height: 200px;
}
::v-deep .position-relative.img-div .img-responsive {
  width: 100% !important;
}
.text__click__ecard {
  text-decoration-line: underline;
  cursor: pointer;
}

@media screen and (max-width: 1600px) {
  .form__bank__ecard {
    margin-top: 32px;
  }
}
@media screen and (max-width: 1440px) {
  .form__bank__ecard {
    margin-top: 24px;
  }
}
</style>
<style>
.designed .input-wrapper input{
  color: #212529;
}
</style>
