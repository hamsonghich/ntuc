<template>
  <div class="bg_main container__log w-100 bg-NTUC-7 my-0 mx-auto bg-white p--20">
    <div class="container">
      <div class="wrapper">
        <div class="inner wrapper_clinic_page" v-if="isShowPage">
          <div class="clinic__head__resource">
            <h1 class="title__claim mt-0">{{ $t('clinic.clinic_title') }}</h1>
            <div
              class="
                font__regular font-400
                text-16
                line-height-15
                text-MMB-9 text__clinic__resource
              "
            >
              <div class="text-16 font__regular mb-3 text-NTUC-28">
                {{ $t('clinic.clinic_content_1') }}
              </div>
              <div class="text-16 font__regular mb-3 text-NTUC-28">
                {{ $t('clinic.clinic_content_2') }}
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-left">
              <div class="wrapper-search br--4 d-flex justify-content-start align-items-center">
                <button class="btn-filter py--6 px--8 h-100 bra-left-4 border-0 d-flex justify-content-between align-items-center" @click="_handleToggleFilterClinic()">
                  <p class="text--16 font__regular font-400 mb-0">Filters</p>
                  <img class="icon-down-ct" src="@/assets/images/icon-down.png" alt="" />
                </button>
                <ClinicFilter
                  :a1="a1"
                  :listCategory="listCategory"
                  v-if="isFilterClinic"
                  :typeList="typeList"
                  @_searchClinic="_searchClinic"
                  @closeFilter="isFilterClinic = false"
                />

                <div class="wrapper__input--search--log position-relative w-100 h-100 border-0">
                  <span class="input__search--claim-log">
                    <input class="w-100 h-100 pl--10 pr--45 border-0 search__log"
                      type="text"
                      v-model="searchWildcard"
                      :placeholder="$t('log.search')" />
                    <span></span>
                  </span>
                  <img
                    @click="_searchWildcard"
                    class="search__alt__light--log position-absolute cursor_pointer"
                    src="@/assets/images/icon-search-bar.png"
                    alt="search alt light"
                  />
                </div>
              </div>
              <div class="ml--25 align-items-left chip__clinic">
                <div class="d-flex flex-row fiter__chip__clinic">
                  <b-form-checkbox 
                    :v-model="vcf2"
                    name="check-button" 
                    @change="onClickVChipFilter(2)" 
                    switch>
                    <div class="text_switch font__regular text-16 font-400 text-black">Open now</div>
                  </b-form-checkbox>
                  <b-form-checkbox
                    class="ml--25"
                    :v-model="vcf3"
                    name="check-button" 
                    @change="onClickVChipFilter(3)" 
                    switch>
                    <div class="text_switch font__regular text-16 font-400 text-black">Find clinics near me</div>
                  </b-form-checkbox>
                </div>
              </div>
            </div>
          </div>

          <div class="mt--25" v-if="!!nonPanel">
            <b-row>
                  <b-col
                    class="pr-7-5"
                    sm="12"
                    md="6"
                    lg="4"
                    xl="4"
                  >
                    <div class="mb-3" v-for="(item, index) in nonPanel" :key="index" v-if="index == 0 || index == 3 || index == 6 || index == 9 ">
                      <itemClinic :data="item" :idx="index" />
                    </div>
                  </b-col>
                  <b-col
                    class="pr-7-5 pl-7-5"
                    sm="12"
                    md="6"
                    lg="4"
                    xl="4"
                  >
                    <div class="mb-3" v-for="(item, index) in nonPanel" :key="index" v-if="index == 1 || index == 4 || index == 7 || index == 10 ">
                      <itemClinic :data="item" :idx="index" />
                    </div>
                  </b-col>
                  <b-col
                    class="pl-7-5"
                    sm="12"
                    md="6"
                    lg="4"
                    xl="4"
                  >
                    <div class="mb-3" v-for="(item, index) in nonPanel" :key="index" v-if="index == 2 || index == 5 || index == 8 || index == 11">
                      <itemClinic :data="item" :idx="index" />
                    </div>
                  </b-col>
            </b-row>
          </div>
          <div class="d-flex justify-content-center" v-else>
            <div>
              <img
                class="icon__no__data align-items-center"
                src="@/assets/images/data_hollow.png"
                alt="data_hollow"
              />
              <div class="text__no__data">{{ $t('clinic.no_data') }}</div>
            </div>
          </div>
        </div>
        <div v-if="!!nonPanel && nonPanel[0]" class="d-flex justify-content-end mt-30">
          <paginate
            :page-count="totalPage"
            :page-range="paginateDefault.pageRange"
            :click-handler="_handlePagination"
            :prev-text="paginateDefault.prevText"
            :next-text="paginateDefault.nextText"
            :container-class="paginateDefault.containerClass"
            :page-class="paginateDefault.pageClass"
          >
          </paginate>
        </div>
        <div v-if="list[0]" class="float-right mb-20 mt-10 paginate__clinic">
          <div class="d-flex justify-content-end">
            Total {{ listCountPage }} {{ listCountPage > 1 ? 'items' : 'item' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import itemClinic from '../../components/clinic/item-clinic/index.vue';
import ClinicFilter from '../../components/clinic/clinicFilter.vue';
import { PAGINATE } from '~/utils/constants/paginate.js';
import { postAxios } from '~/services/callApi';
import { EXCEPTION } from '~/utils/constants/statusResponse';
import { handleListCallApi } from '~/utils/functions/handleListCallApi';
export default {
  components: {
    itemClinic,
    ClinicFilter
  },
  mixins: [validationMixin],
  data() {
    return {
      myLocation: {
        lat: null,
        lng: null
      },
      nonPanel: [],
      listCategory: [],
      isShowPage: false,
      isFilterClinic: false,
      searchWildcard: '',
      typeList: [
        { value: '1', text: 'Panel' },
        { value: '0', text: 'Non-Panel' }
      ],
      a1: {
        wildcard: '',
        name: '',
        postal_code: '',
        service_info: '',
        category: '',
        panel_type: 1,
        offset_row_count: 0,
        fetch_next_row_count: 0,
        lat: null,
        lng: null,
        open_now: false
      },
      perPage: 10,
      curPage: 1,
      paginateDefault: PAGINATE,
      vcf0: 0,
      vcf1: 0,
      vcf2: 0,
      vcf3: 0,
      vChipBGColor0: '#e0e0e0',
      vChipTXColor0: '#000000',
      vChipBGColor1: '#e0e0e0',
      vChipTXColor1: '#000000',
      vChipBGColor2: '#e0e0e0',
      vChipTXColor2: '#000000',
      vChipBGColor3: '#e0e0e0',
      vChipTXColor3: '#000000'
    };
  },
  computed: {
    ...mapGetters('generalPagination', ['list', 'listAll', 'listPageCount', 'listCountPage']),
    totalPage: function () {
      return Math.ceil(this.listCountPage / this.perPage);
    },
    listImportPagination: function () {
      return this.listCountPage.slice(start, end);
    }

  },
  async created() {
    this.getClinics();
    await this._handleFetchListCategory();
    this.isShowPage = true;
    this.$emit('created');
  },
  methods: {
    ...mapActions('generalPagination', ['handleCurrentPage', 'getList']),
    _handleToggleFilterClinic: function () {
      this.isFilterClinic = !this.isFilterClinic;
    },
    async _handleFetchListCategory() {
      try {
        const res = await postAxios({
          invoke: 'System.execute',
          argc: '2',
          a0: 'PanelClinic.getCategories',
          a1: {}
        });
        const dt = res.data.data[0].dt;
        if (dt != EXCEPTION) {
          this.listCategory = handleListCallApi(
            [...res.data.data[0].colNames],
            [...res.data.data[0].rows]
          );
        }
      } catch (error) {}
    },
    onClickVChipFilter: function (idx) {
      if (idx == 0) {
        if (this.vcf0 != 0) {
          this.vcf0 = 0;
          this.vChipBGColor0 = '#e0e0e0';
          this.vChipTXColor0 = '#000';
          this.a1['panel_type'] = null;
        } else {
          this.vcf0 = 1;
          this.vChipBGColor0 = '#EE3D8B';
          this.vChipTXColor0 = '#FFF';
          this.vcf1 = 0;
          this.vChipBGColor1 = '#e0e0e0';
          this.vChipTXColor1 = '#000';
          this.a1['panel_type'] = 1;
        }
        this.getClinics();
      } else if (idx == 1) {
        if (this.vcf1 != 0) {
          this.vcf1 = 0;
          this.vChipBGColor1 = '#e0e0e0';
          this.vChipTXColor1 = '#000';
          this.a1['panel_type'] = null;
        } else {
          this.vcf1 = 1;
          this.vChipBGColor1 = '#EE3D8B';
          this.vChipTXColor1 = '#FFF';
          this.vcf0 = 0;
          this.vChipBGColor0 = '#e0e0e0';
          this.vChipTXColor0 = '#000';
          this.a1['panel_type'] = 0;
        }
        this.getClinics();
      } else if (idx == 2) {
        if (this.vcf2 != 0) {
          this.vcf2 = 0;
          this.vChipBGColor2 = '#e0e0e0';
          this.vChipTXColor2 = '#000';
          this.a1['open_now'] = false;
        } else {
          this.vcf2 = 1;
          this.vChipBGColor2 = '#EE3D8B';
          this.vChipTXColor2 = '#FFF';
          this.a1['open_now'] = true;
        }
        this.getClinics();
      } else if (idx == 3) {
        if (this.vcf3 != 0) {
          this.vcf3 = 0;
          this.vChipBGColor3 = '#e0e0e0';
          this.vChipTXColor3 = '#000';
          this.a1['lat'] = null;
          this.a1['lng'] = null;
          this.getClinics();
        } else {
          this.vcf3 = 1;
          this.vChipBGColor3 = '#EE3D8B';
          this.vChipTXColor3 = '#FFF';
          this.getMyLocation();
        }
      }
    },
    getMyLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        this.getClinics();
      }
    },
    showPosition(position) {
      this.myLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.a1['lat'] = this.myLocation.lat;
      this.a1['lng'] = this.myLocation.lng;
      this.getClinics();
    },
    getClinics: async function () {
      const PanelNonPanelClinic = await this.getList({
        invoke: 'System.execute',
        argc: '2',
        a0: 'API.getClinicLocatorListing',
        a1: this.a1
      });
      this.nonPanel = PanelNonPanelClinic;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    _handlePagination: async function (_currentPage) {
      this.handleCurrentPage(_currentPage);
      this.a1['offset_row_count'] = _currentPage - 1;
      this.getClinics();
    },
    async _searchClinic(a1) {
      let panel_type = a1.panel_type.length == 1 ? a1.panel_type[0] : '';
      this.isFilterClinic = false;
      this.a1['panel_type'] = panel_type;
      this.a1['offset_row_count'] = 0;
      this.getClinics();
    },
    async _searchWildcard() {
      this.a1['wildcard'] = this.searchWildcard;
      this.a1['offset_row_count'] = 0;
      this.getClinics();
    }
  }
};
</script>
<style scoped>
@import '@/assets/css/claim/paginate.css';
@import '@/assets/css/clinic/item-clinic.css';
@import '@/assets/css/log/controlLog.css';
</style>

<style scoped>
.wrapper-search {
  min-width: 50%;
}
.container-clinic-mb {
  background: var(--white);
  margin-bottom: 24px;
}
.v-chip.v-size--default {
  height: 36px;
}
.filter-chips {
  padding: 6px 12px;
  border-radius: 16px;
}
.filter-chips:hover {
  cursor: pointer;
}

.pr-7-5 {
  padding-right: 7.5px;
}

.pl-7-5 {
  padding-left: 7.5px;
}
</style>
