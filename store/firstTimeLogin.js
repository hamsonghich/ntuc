export const state = () => ({
  entitiesStep: [
    {
      id: 1,
      title: 'Consent',
      subTitle: 'Review the terms and conditions for use of the platform, including PDPA related matters'
    },
    {
      id: 2,
      title: 'Getting to know you',
      subTitle: 'Review the information we have on you.'
    },
    {
      id: 3,
      title: 'Navigate',
      subTitle: 'Optimise use of the platform'
    },
    {
      id: 4,
      title: 'Your Benefits',
      subTitle: 'Select your desired benefits for this period'
    },
    {
      id: 5,
      title: 'Complete',
      subTitle: null
    },
  ],
  currentStep: 1,
  showFirst: false,
  alert: {
		isShow: false,
		typeAlert: 'success',
		textAlert: ''
	},
})

export const getters = {
  entitiesStep: (_state) => _state.entitiesStep,
  alert: (_state) => _state.alert,
  currentStep: (_state) => _state.currentStep,
  showFirst: (_state) => _state.showFirst,
}

export const mutations = {
  SET_CURRENT_STEP: (_state, _step) => {
    _state.currentStep = _step;
  },
  SET_ALERT: (_state, alert) => {
    _state.alert = alert;
  },
  SET_SHOW: (_state, _showFirst) => {
    _state.showFirst = _showFirst
  }
}

export const actions = {
  changeCurrentStep: async ({ commit }, payload) => {
    commit('SET_CURRENT_STEP', payload);
  },

  handleChangeAlert: async ({ commit }, payload) => {
    commit('SET_ALERT', payload);
  },

  handleCloseAlert: async ({ commit }) => {
    commit('SET_ALERT', {
      isShow: false,
      typeAlert: 'success',
      textAlert: ''
    });
  },
  handleSetShowFirst: async ({ commit }, payload) => {
    commit('SET_SHOW', payload)
  }
}
