<template>
<div class="f-wrapper m-auto d-flex flex-column justify-content-start align-items-start">
  <div class="f-family-history d-flex flex-column">
    <div class="f-title d-flex align-items-center text-NTUC-6 text-20 font__medium">
      {{ $t('benefit.family_history_of_the_employee') }}
    </div>
    <div class="text-16 text-NTUC-2 line-height-15 pr-4" v-html="$t('benefit.HDFormStep2.if_you_have_selected')">
    </div>
    <div class="form-container mt-5">
      <div class="d-flex flex-row mb--20">
        <div class="form-question col-4 text-center">
          <p class="mb-0 font__regular text-16 font-400 text-black">Question</p>
        </div>
        <div class="col-item col-2 text-center">
          <p class="mb-0 font__regular text-16 font-400 text-black"> {{ employeeName }} </p>
        </div>
        <div class="col-item col-2 text-center">
          <p class="mb-0 font__regular text-16 font-400 text-black"> {{ spouseName }} </p>
        </div>
        <div class="col-item col-2 text-center" v-for="item of listFamilyName" :key="item">
          <p class="mb-0 font__regular text-16 font-400 text-black"> {{ item.name }} </p>
        </div>
      </div>
      <div class="form-check-box d-flex flex-row mb-5">
        <div class="form-question col-4 text-NTUC-3 pl-0 pr-0">
          <p class="d-flex align-items-center justify-content-start mb--5"> {{ $t('benefit.select-box') }} </p>
        </div>
        <b-form-group
          class="
            mb-0
            check-box-item
            col-2
            d-flex
            justify-content-center
            align-items-center
            text-NTUC-3
          "
        >
          <b-form-checkbox
          id="a-13-1"
          :disabled="true"
          v-model="isCheckEmployee"> Employee </b-form-checkbox>
        </b-form-group>
        <b-form-group
          class="
            mb-0
            check-box-item
            col-2
            d-flex
            justify-content-center
            align-items-center
            text-NTUC-3
          "
        >
          <b-form-checkbox
          id="a-13-2"
          :disabled="!spouseName"
          @change="handleChangeSpouse(isCheckSpouse)"
          v-model="isCheckSpouse"> Spouse </b-form-checkbox>
        </b-form-group>
        <b-form-group
          class="
            mb-0
            check-box-item
            col-2
            d-flex
            justify-content-center
            align-items-center
            text-NTUC-3
          "
        >
          <b-form-checkbox
          id="a-13-3"
          :disabled="listFamilyName.length < 1"
          @change="handleChangeChild1(isCheckChild1)"
          v-model="isCheckChild1"> Child 1 </b-form-checkbox>
        </b-form-group>
        <b-form-group
          class="
            mb-0
            check-box-item
            col-2
            d-flex
            justify-content-center
            align-items-center
            text-NTUC-3
          "
        >
          <b-form-checkbox
          id="a-13-4"
          :disabled="listFamilyName.length < 2"
          @change="handleChangeChild2(isCheckChild2)"
          v-model="isCheckChild2"> Child 2 </b-form-checkbox>
        </b-form-group>
        <b-form-group
          class="
            mb-0
            check-box-item
            col-2
            d-flex
            justify-content-center
            align-items-center
            text-NTUC-3
          "
        >
          <b-form-checkbox
          id="a-13-5"
          :disabled="listFamilyName.length < 3"
          @change="handleChangeChild3(isCheckChild3)"
          v-model="isCheckChild3"> Child 3 </b-form-checkbox>
        </b-form-group>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.height&weight') }}
          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2 pl-0 pr-0">
            <b-form-input
              id="a-13-11"
              v-model="data[`a-${flexperid.insurer[0]}-11`]"
              class="f-input mr-2 form-checkbox-1"
              placeholder="Height"

            />
            <b-form-input
              id="a-13-12"
              v-model="data[`a-${flexperid.insurer[0]}-12`]"
              class="f-input form-checkbox-1"
              placeholder="Weight"

            />
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2 pl-0 pr-0">
          <b-form-input
            id="a-13-24"
            v-model="data[`a-${flexperid.insurer[0]}-24`]"
            class="f-input mr-2 form-checkbox-1"
            placeholder="Height"
            :disabled="!isCheckSpouse || !spouseName"
          />
          <b-form-input
            id="a-13-25"
            v-model="data[`a-${flexperid.insurer[0]}-25`]"
            class="f-input form-checkbox-1"
            placeholder="Weight"
            :disabled="!isCheckSpouse || !spouseName"
          />
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2 pl-0 pr-0">
          <b-form-input
            id="a-13-37"
            v-model="data[`a-${flexperid.insurer[0]}-37`]"
            class="f-input mr-2 form-checkbox-1"
            placeholder="Height"
            :disabled="!isCheckChild1 || listFamilyName.length < 1"
          />
          <b-form-input
            id="a-13-38"
            v-model="data[`a-${flexperid.insurer[0]}-38`]"
            class="f-input form-checkbox-1"
            placeholder="Weight"
            :disabled="!isCheckChild1 || listFamilyName.length < 1"
          />
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2 pl-0 pr-0">
          <b-form-input
            id="a-13-50"
            v-model="data[`a-${flexperid.insurer[0]}-50`]"
            class="f-input mr-2 form-checkbox-1"
            placeholder="Height"
            :disabled="!isCheckChild2 || listFamilyName.length < 2"
          />
          <b-form-input
            id="a-13-51"
            v-model="data[`a-${flexperid.insurer[0]}-51`]"
            class="f-input form-checkbox-1"
            placeholder="Weight"
            :disabled="!isCheckChild2 || listFamilyName.length < 2"
          />
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2 pl-0 pr-0">
          <b-form-input
            id="a-13-63"
            v-model="data[`a-${flexperid.insurer[0]}-63`]"
            class="f-input mr-2 form-checkbox-1"
            placeholder="Height"
            :disabled="!isCheckChild3 || listFamilyName.length < 3"
          />
          <b-form-input
            id="a-13-64"
            v-model="data[`a-${flexperid.insurer[0]}-64`]"
            class="f-input form-checkbox-1"
            placeholder="Weight"
            :disabled="!isCheckChild3 || listFamilyName.length < 3"
          />
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.question-1') }}
          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(72)" value="yes" id="a-13-71"  name="form-1" v-model="data[`a-${flexperid.insurer[0]}-71`]">Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(71)" value="yes" id="a-13-72" name="form-1" v-model="data[`a-${flexperid.insurer[0]}-72`]">No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(74)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-73" name="form-2" v-model="data[`a-${flexperid.insurer[0]}-73`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(73)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-74" name="form-2" v-model="data[`a-${flexperid.insurer[0]}-74`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(76)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-75"  name="form-3" v-model="data[`a-${flexperid.insurer[0]}-75`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(75)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-76" name="form-3" v-model="data[`a-${flexperid.insurer[0]}-76`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(78)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-77"  name="form-4" v-model="data[`a-${flexperid.insurer[0]}-77`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(77)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-78" name="form-4" v-model="data[`a-${flexperid.insurer[0]}-78`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(80)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-79"  name="form-5" v-model="data[`a-${flexperid.insurer[0]}-79`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(79)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-80" name="form-5" v-model="data[`a-${flexperid.insurer[0]}-80`]" >No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.question-2') }}
          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(82)" value="yes" id="a-13-81"  name="form-6" v-model="data[`a-${flexperid.insurer[0]}-81`]">Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(81)" value="yes" id="a-13-82" name="form-6" v-model="data[`a-${flexperid.insurer[0]}-82`]">No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(84)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-83" name="form-7" v-model="data[`a-${flexperid.insurer[0]}-83`]">Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(83)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-84" name="form-7" v-model="data[`a-${flexperid.insurer[0]}-84`]">No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(86)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-85"  name="form-8" v-model="data[`a-${flexperid.insurer[0]}-85`]">Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(85)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-86" name="form-8" v-model="data[`a-${flexperid.insurer[0]}-86`]">No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(88)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-87"  name="form-9" v-model="data[`a-${flexperid.insurer[0]}-87`]">Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(87)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-88" name="form-9" v-model="data[`a-${flexperid.insurer[0]}-88`]">No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(90)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-89"  name="form-10" v-model="data[`a-${flexperid.insurer[0]}-89`]">Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(89)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-90" name="form-10" v-model="data[`a-${flexperid.insurer[0]}-90`]">No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.question-3') }}
            <ul>
              <li> {{ $t('benefit.question-3a') }} </li>
              <li> {{ $t('benefit.question-3b') }} </li>
              <li> {{ $t('benefit.question-3c') }} </li>
              <li> {{ $t('benefit.question-3d') }} </li>
              <li> {{ $t('benefit.question-3e') }} </li>
              <li> {{ $t('benefit.question-3f') }} </li>
            </ul>
          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(92)" value="yes" id="a-13-91"  name="form-11" v-model="data[`a-${flexperid.insurer[0]}-91`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(91)" value="yes" id="a-13-92" name="form-11" v-model="data[`a-${flexperid.insurer[0]}-92`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(94)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-93" name="form-12" v-model="data[`a-${flexperid.insurer[0]}-93`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(93)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-94" name="form-12" v-model="data[`a-${flexperid.insurer[0]}-94`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(96)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-95"  name="form-13" v-model="data[`a-${flexperid.insurer[0]}-95`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(95)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-96" name="form-13" v-model="data[`a-${flexperid.insurer[0]}-96`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(98)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-97"  name="form-14" v-model="data[`a-${flexperid.insurer[0]}-97`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(97)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-98" name="form-14" v-model="data[`a-${flexperid.insurer[0]}-98`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(100)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-99"  name="form-15" v-model="data[`a-${flexperid.insurer[0]}-99`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(99)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-100" name="form-15" v-model="data[`a-${flexperid.insurer[0]}-100`]" >No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.question-4') }}
          </p>
        </div>
        <div class="form-radio-1 form-4 col-2"></div>
        <div class="form-radio-1 form-4 col-2"></div>
        <div class="form-radio-1 form-4 col-2"></div>
        <div class="form-radio-1 form-4 col-2"></div>
        <div class="form-radio-1 form-4 col-2"></div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.question-4a') }}
          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(102)" value="yes" id="a-13-101"  name="form-16" v-model="data[`a-${flexperid.insurer[0]}-101`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(101)" value="yes" id="a-13-102" name="form-16" v-model="data[`a-${flexperid.insurer[0]}-102`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(104)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-103" name="form-17" v-model="data[`a-${flexperid.insurer[0]}-103`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(103)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-104" name="form-17" v-model="data[`a-${flexperid.insurer[0]}-104`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(106)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-105"  name="form-18" v-model="data[`a-${flexperid.insurer[0]}-105`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(105)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-106" name="form-18" v-model="data[`a-${flexperid.insurer[0]}-106`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(108)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-107"  name="form-19" v-model="data[`a-${flexperid.insurer[0]}-107`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(107)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-108" name="form-19" v-model="data[`a-${flexperid.insurer[0]}-108`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(110)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-109"  name="form-20" v-model="data[`a-${flexperid.insurer[0]}-109`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(109)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-110" name="form-20" v-model="data[`a-${flexperid.insurer[0]}-110`]" >No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.question-4b') }}
          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(112)" value="yes" id="a-13-111"  name="form-21" v-model="data[`a-${flexperid.insurer[0]}-111`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(111)" value="yes" id="a-13-112" name="form-21" v-model="data[`a-${flexperid.insurer[0]}-112`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(114)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-113" name="form-22" v-model="data[`a-${flexperid.insurer[0]}-113`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(113)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-114" name="form-22" v-model="data[`a-${flexperid.insurer[0]}-114`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(116)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-115"  name="form-23" v-model="data[`a-${flexperid.insurer[0]}-115`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(115)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-116" name="form-23" v-model="data[`a-${flexperid.insurer[0]}-116`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(118)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-117"  name="form-24" v-model="data[`a-${flexperid.insurer[0]}-117`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(117)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-118" name="form-24" v-model="data[`a-${flexperid.insurer[0]}-118`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(120)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-119"  name="form-25" v-model="data[`a-${flexperid.insurer[0]}-119`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(119)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-120" name="form-25" v-model="data[`a-${flexperid.insurer[0]}-120`]" >No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.question-4c') }}
          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(122)" value="yes" id="a-13-121"  name="form-26" v-model="data[`a-${flexperid.insurer[0]}-121`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(121)" value="yes" id="a-13-122" name="form-26" v-model="data[`a-${flexperid.insurer[0]}-122`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(124)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-123" name="form-27" v-model="data[`a-${flexperid.insurer[0]}-123`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(123)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-124" name="form-27" v-model="data[`a-${flexperid.insurer[0]}-124`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(126)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-125"  name="form-28" v-model="data[`a-${flexperid.insurer[0]}-125`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(125)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-126" name="form-28" v-model="data[`a-${flexperid.insurer[0]}-126`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(128)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-127"  name="form-29" v-model="data[`a-${flexperid.insurer[0]}-127`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(127)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-128" name="form-29" v-model="data[`a-${flexperid.insurer[0]}-128`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(130)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-129"  name="form-30" v-model="data[`a-${flexperid.insurer[0]}-129`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(129)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-130" name="form-30" v-model="data[`a-${flexperid.insurer[0]}-130`]" >No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.question-4d') }}

          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(132)" value="yes" id="a-13-131"  name="form-31" v-model="data[`a-${flexperid.insurer[0]}-131`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(131)" value="yes" id="a-13-132" name="form-31" v-model="data[`a-${flexperid.insurer[0]}-132`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(134)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-133" name="form-32" v-model="data[`a-${flexperid.insurer[0]}-133`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(133)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-134" name="form-32" v-model="data[`a-${flexperid.insurer[0]}-134`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(136)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-135"  name="form-33" v-model="data[`a-${flexperid.insurer[0]}-135`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(135)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-136" name="form-33" v-model="data[`a-${flexperid.insurer[0]}-136`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(138)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-137"  name="form-34" v-model="data[`a-${flexperid.insurer[0]}-137`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(137)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-138" name="form-34" v-model="data[`a-${flexperid.insurer[0]}-138`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(140)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-139"  name="form-35" v-model="data[`a-${flexperid.insurer[0]}-139`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(139)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-140" name="form-35" v-model="data[`a-${flexperid.insurer[0]}-140`]" >No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.question-4e') }}
          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(142)" value="yes" id="a-13-141"  name="form-36" v-model="data[`a-${flexperid.insurer[0]}-141`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(141)" value="yes" id="a-13-142" name="form-36" v-model="data[`a-${flexperid.insurer[0]}-142`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(144)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-143" name="form-37" v-model="data[`a-${flexperid.insurer[0]}-143`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(143)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-144" name="form-37" v-model="data[`a-${flexperid.insurer[0]}-144`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(146)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-145"  name="form-38" v-model="data[`a-${flexperid.insurer[0]}-145`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(145)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-146" name="form-38" v-model="data[`a-${flexperid.insurer[0]}-146`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(148)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-147"  name="form-39" v-model="data[`a-${flexperid.insurer[0]}-147`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(147)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-148" name="form-39" v-model="data[`a-${flexperid.insurer[0]}-148`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(150)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-149"  name="form-40" v-model="data[`a-${flexperid.insurer[0]}-149`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(149)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-150" name="form-40" v-model="data[`a-${flexperid.insurer[0]}-150`]" >No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.question-4f') }}
          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(152)" value="yes" id="a-13-151"  name="form-41" v-model="data[`a-${flexperid.insurer[0]}-151`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(151)" value="yes" id="a-13-152" name="form-41" v-model="data[`a-${flexperid.insurer[0]}-152`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(154)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-153" name="form-42" v-model="data[`a-${flexperid.insurer[0]}-153`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(153)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-154" name="form-42" v-model="data[`a-${flexperid.insurer[0]}-154`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(156)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-155"  name="form-43" v-model="data[`a-${flexperid.insurer[0]}-155`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(155)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-156" name="form-43" v-model="data[`a-${flexperid.insurer[0]}-156`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(158)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-157"  name="form-44" v-model="data[`a-${flexperid.insurer[0]}-157`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(157)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-158" name="form-44" v-model="data[`a-${flexperid.insurer[0]}-158`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(160)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-159"  name="form-45" v-model="data[`a-${flexperid.insurer[0]}-159`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(159)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-160" name="form-45" v-model="data[`a-${flexperid.insurer[0]}-160`]" >No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.question-4g') }}
          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(162)" value="yes" id="a-13-161"  name="form-46" v-model="data[`a-${flexperid.insurer[0]}-161`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(161)" value="yes" id="a-13-162" name="form-46" v-model="data[`a-${flexperid.insurer[0]}-162`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(164)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-163" name="form-47" v-model="data[`a-${flexperid.insurer[0]}-163`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(163)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-164" name="form-47" v-model="data[`a-${flexperid.insurer[0]}-164`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(166)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-165"  name="form-48" v-model="data[`a-${flexperid.insurer[0]}-165`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(165)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-166" name="form-48" v-model="data[`a-${flexperid.insurer[0]}-166`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(168)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-167"  name="form-49" v-model="data[`a-${flexperid.insurer[0]}-167`]">Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(167)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-168" name="form-49" v-model="data[`a-${flexperid.insurer[0]}-168`]">No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(170)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-169"  name="form-50" v-model="data[`a-${flexperid.insurer[0]}-169`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(169)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-170" name="form-50" v-model="data[`a-${flexperid.insurer[0]}-170`]">No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.question-4h') }}
          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(172)" value="yes" id="a-13-171"  name="form-51" v-model="data[`a-${flexperid.insurer[0]}-171`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(171)" value="yes" id="a-13-172" name="form-51" v-model="data[`a-${flexperid.insurer[0]}-172`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(174)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-173" name="form-52" v-model="data[`a-${flexperid.insurer[0]}-173`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(173)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-174" name="form-52" v-model="data[`a-${flexperid.insurer[0]}-174`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(176)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-175"  name="form-53" v-model="data[`a-${flexperid.insurer[0]}-175`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(175)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-176" name="form-53" v-model="data[`a-${flexperid.insurer[0]}-176`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(178)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-177"  name="form-54" v-model="data[`a-${flexperid.insurer[0]}-177`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(177)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-178" name="form-54" v-model="data[`a-${flexperid.insurer[0]}-178`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(180)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-179"  name="form-55" v-model="data[`a-${flexperid.insurer[0]}-179`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(179)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-180" name="form-55" v-model="data[`a-${flexperid.insurer[0]}-180`]" >No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>
            {{ $t('benefit.question-4i') }}
          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(222)" value="yes" id="a-13-221"  name="form-66" v-model="data[`a-${flexperid.insurer[0]}-221`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(221)" value="yes" id="a-13-222" name="form-66" v-model="data[`a-${flexperid.insurer[0]}-222`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(224)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-223" name="form-67" v-model="data[`a-${flexperid.insurer[0]}-223`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(223)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-224" name="form-67" v-model="data[`a-${flexperid.insurer[0]}-224`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(226)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-225"  name="form-68" v-model="data[`a-${flexperid.insurer[0]}-225`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(225)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-226" name="form-68" v-model="data[`a-${flexperid.insurer[0]}-226`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(228)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-227"  name="form-69" v-model="data[`a-${flexperid.insurer[0]}-227`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(227)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-228" name="form-69" v-model="data[`a-${flexperid.insurer[0]}-228`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(230)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-229"  name="form-70" v-model="data[`a-${flexperid.insurer[0]}-229`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(229)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-230" name="form-70" v-model="data[`a-${flexperid.insurer[0]}-230`]" >No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p>{{ $t('benefit.question-5') }}</p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(182)" value="yes" id="a-13-181"  name="form-56" v-model="data[`a-${flexperid.insurer[0]}-181`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(181)" value="yes" id="a-13-182" name="form-56" v-model="data[`a-${flexperid.insurer[0]}-182`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(184)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-183" name="form-57" v-model="data[`a-${flexperid.insurer[0]}-183`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(183)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-184" name="form-57" v-model="data[`a-${flexperid.insurer[0]}-184`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(186)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-185"  name="form-58" v-model="data[`a-${flexperid.insurer[0]}-185`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(185)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-186" name="form-58" v-model="data[`a-${flexperid.insurer[0]}-186`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(188)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-187"  name="form-59" v-model="data[`a-${flexperid.insurer[0]}-187`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(187)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-188" name="form-59" v-model="data[`a-${flexperid.insurer[0]}-188`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(190)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-189"  name="form-60" v-model="data[`a-${flexperid.insurer[0]}-189`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(189)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-190" name="form-60" v-model="data[`a-${flexperid.insurer[0]}-190`]" >No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="form-radio d-flex flex-row">
        <div class="form-question text-black col-4 text-14 pl-0 pr-0 mb-0">
          <p> {{ $t('benefit.question-6') }}
            <ul>
              <li>{{ $t('benefit.question-6a') }}</li>
              <li>{{ $t('benefit.question-6b') }}</li>
              <li>{{ $t('benefit.question-6c') }}</li>
              <li>{{ $t('benefit.question-6d') }}</li>
              <li>{{ $t('benefit.question-6e') }}</li>
              <li>{{ $t('benefit.question-6f') }}</li>
            </ul>
          </p>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(212)" value="yes" id="a-13-211"  name="form-61" v-model="data[`a-${flexperid.insurer[0]}-211`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(211)" value="yes" id="a-13-212" name="form-61" v-model="data[`a-${flexperid.insurer[0]}-212`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(214)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-213" name="form-62" v-model="data[`a-${flexperid.insurer[0]}-213`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(213)" :disabled="!isCheckSpouse || !spouseName" value="yes" id="a-13-214" name="form-62" v-model="data[`a-${flexperid.insurer[0]}-214`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(216)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-215"  name="form-63" v-model="data[`a-${flexperid.insurer[0]}-215`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(215)" :disabled="!isCheckChild1 || listFamilyName.length < 1" value="yes" id="a-13-216" name="form-63" v-model="data[`a-${flexperid.insurer[0]}-216`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(218)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-217"  name="form-64" v-model="data[`a-${flexperid.insurer[0]}-217`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(217)" :disabled="!isCheckChild2 || listFamilyName.length < 2" value="yes" id="a-13-218" name="form-64" v-model="data[`a-${flexperid.insurer[0]}-218`]" >No</b-form-radio>
            </div>
          </div>
        </div>
        <div class="form-radio-1 d-flex align-items-center justify-content-center col-2">
          <div class="check_form d-flex">
            <div>
              <b-form-radio @change="handleChangeData(220)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-219"  name="form-65" v-model="data[`a-${flexperid.insurer[0]}-219`]" >Yes</b-form-radio>
            </div>
            <div class="ml-4">
              <b-form-radio @change="handleChangeData(219)" :disabled="!isCheckChild3 || listFamilyName.length < 3" value="yes" id="a-13-220" name="form-65" v-model="data[`a-${flexperid.insurer[0]}-220`]" >No</b-form-radio>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
        <p class="text-14 font__regular font-400 text-black">
          {{ $t('benefit.if_you') }}
        </p>
    </div>
    <textarea
        :placeholder="$t('benefit.Provide_response_here')"
        cols="30"
        rows="15"
        class="border pl-3"
        id="a-13-231"
        v-model="data[`a-${flexperid.insurer[0]}-231`]"
    ></textarea>
  </div>
</div>
</template>

<script>
export default {
  props: [
    'data',
    'employeeName',
    'spouseName',
    'listFamilyName',
    'flexperid',
    'isCheckEmployee',
    'isCheckSpouse',
    'isCheckChild1',
    'isCheckChild2',
    'isCheckChild3'
  ],
  data() {
    return {};
  },
  watch: {
    isCheckSpouse: function () {
      if (!this.isCheckSpouse) {
        for (let i = 0; i <= 15; i++) {
          const id73 = 73 + i * 10;
          this.data[`a-${this.flexperid.insurer[0]}-${id73}`] = null;
          this.data[`a-${this.flexperid.insurer[0]}-${id73 + 1}`] = null;
        }
      }
    },
    isCheckChild1: function () {
      if (!this.isCheckChild1) {
        for (let i = 0; i <= 15; i++) {
          const id75 = 75 + i * 10;
          this.data[`a-${this.flexperid.insurer[0]}-${id75}`] = null;
          this.data[`a-${this.flexperid.insurer[0]}-${id75 + 1}`] = null;
        }
      }
    },
    isCheckChild2: function () {
      if (!this.isCheckChild2) {
        for (let i = 0; i <= 15; i++) {
          const id77 = 77 + i * 10;
          this.data[`a-${this.flexperid.insurer[0]}-${id77}`] = null;
          this.data[`a-${this.flexperid.insurer[0]}-${id77 + 1}`] = null;
        }
      }
    },
    isCheckChild3: function () {
      if (!this.isCheckChild3) {
        for (let i = 0; i <= 15; i++) {
          const id79 = 79 + i * 10;
          this.data[`a-${this.flexperid.insurer[0]}-${id79}`] = null;
          this.data[`a-${this.flexperid.insurer[0]}-${id79 + 1}`] = null;
        }
      }
    }
  },
  methods: {
    handleChangeData(param) {
      this.$emit('handleChangeData', param);
    },
    handleChangeSpouse(value) {
      this.$emit('handleChangeSpouse', value);
    },
    handleChangeChild1(value) {
      this.$emit('handleChangeChild1', value);
    },
    handleChangeChild2(value) {
      this.$emit('handleChangeChild2', value);
    },
    handleChangeChild3(value) {
      this.$emit('handleChangeChild3', value);
    }
  }
};
</script>

<style>
@import '@/assets/css/first-time-login/benefit/familyForm.css';
.custom-checkbox .custom-control-label:before {
  border: 1px solid;
}

.custom-control-label,
.custom-control-input[disabled] ~ .custom-control-label,
.custom-control-input:disabled ~ .custom-control-label {
  color: rgba(0, 0, 0, 0.6);
}
</style>
