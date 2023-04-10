<template>
  <div class="scene-single scene--card" :class="{ scene: isSlideShow }" v-if="imageHtml">
    <div class="card" @click="handleClickCard" :class="{ flipme: cardOne == 'flipped' }">
      <div class="card__face card__face--front d-flex flex-column justify-content-between">
        <div class="w-100 d-flex justify-content-center text-white font-600 line-height-20 text-18">
          Benefits Amplified
        </div>
        <div class="text__card d-flex flex-column text-left">
          <div class="d-flex justify-content-between">
            <div class="font-600 text-20 line-height-30 custom-text">
              {{ nameCard }}
            </div>
            <div class="font-500 line-height-15 text-20 box_shadow custom-text">ELEVATE</div>
          </div>
        </div>
      </div>
      <div class="card__face card__face--back">
        <div class="position-relative img-div h-100" v-html="imageHtml" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nameCard: {
      type: String,
      default: ''
    },
    imageHtml: {
      type: String,
      default: ''
    },
    isSlideShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cardOne: 'start'
    };
  },
  methods: {
    handleRotateCard() {
      if (this.cardOne == 'start') this.cardOne = 'flipped';
      else this.cardOne = 'start';
    },
    handleClickCard() {
      if (this.imageHtml) {
        this.handleRotateCard();
      } else {
        this.cardOne = 'start';
      }
    }
  }
};
</script>

<style scoped>
::v-deep .position-relative.img-div div {
  margin-top: 0px;
  font-size: 8px;
  left: 7% !important;
}
::v-deep .position-relative.img-div .card-date {
  top:15% !important;
  font-size: 16px;
  left: 7% !important;
}

.carousel-3d-non-insurance .next {
  width: 60px !important;
  height: 60px !important;
  background: #d9d9d9;
  border-radius: 50%;
  text-align: center;
  right: 0;
}
.carousel-3d-non-insurance .prev {
  width: 60px !important;
  height: 60px !important;
  background: #d9d9d9;
  border-radius: 50%;
  text-align: center;
  right: 0;
}
.carousel-3d-slide img {
  width: auto;
}

.carousel-slide-card {
  height: unset !important;
  background: transparent;
  visibility: visible !important;
  opacity: 1 !important;
}
.img-div {
  border-radius: 10px;
}
.box_shadow {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.card__number {
  color: var(--MMB-9);
}
.bg__back {
  background: linear-gradient(109.02deg, #fcfdff 0.53%, rgba(252, 253, 255, 0) 100.88%);
  box-shadow: inset 0px 1px 2px rgba(255, 255, 255, 0.8),
    inset 0px 4px 40px rgba(255, 255, 255, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25),
    inset 0px 4px 4px rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(40px);
  border-radius: 10px;
  padding: 7px 29px 23px 29px;
}
.text__card {
  color: #dbe2e8;
  gap: 4px;
}
.text--card__name {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.scene {
  width: 100%;
  height: 100% !important;
}

.scene-single {
  width: 100%;
  height: 100%;
  aspect-ratio: 528/335;
}

.card {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  background: none;
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  font-weight: bold;
  backface-visibility: hidden;
}

.card__face--front {
  background: url('@/assets/images/eCard-background.png') no-repeat center;
  background-size: cover;
  border-radius: 10px;
  padding: 16px 16px 23px 29px;
}

.card__face--back {
  border-radius: 10px;
  background: #c4c4c4;
  transform: rotateY(180deg);
}

/* this style is applied when the card is clicked */
.flipme {
  perspective: 500;
  transform: rotateY(180deg);
}

::v-deep img.img-responsive {
  width: 100% !important;
  height: 100% !important;
  border-radius: 10px;
}

::v-deep .position-relative.img-div div.effective-date {
  top: 32% !important;
  position: absolute;
  right: 5%;
  writing-mode: vertical-rl;
}

@media screen and (min-width: 1025px) and (max-width: 1441px) {
  .custom-text {
    font-size: 12px;
  }
  .card__face--front {
    padding: 10px;
  }

  ::v-deep .position-relative.img-div div span {
    font-size: 8px !important;
  }

  ::v-deep .position-relative.img-div div.member-name {
    top: 36% !important;
  }

  ::v-deep .position-relative.img-div div.card-number {
    top: 42% !important;
  }

  ::v-deep .position-relative.img-div div.nirc-no {
    top: 48% !important;
  }

  ::v-deep .position-relative.img-div div.card-type {
    top: 54% !important;
  }

  ::v-deep .position-relative.img-div div.effective-date-second {
    top: 61% !important;
  }

  ::v-deep .position-relative.img-div div.ecardinfo {
    top: 66% !important;
  }

  ::v-deep .position-relative.img-div div.extra-cover {
    top: 72% !important;
  }

}

</style>
