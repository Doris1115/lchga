import {
  getShijiegeguohediqumingcheng,//国籍
  card,//证件类型
  chengxiangfenlei,//户籍分类
  wenhuachengdu,//文化程度
  minzu,//民族
  hukouguishu,//户籍归属
  renqunfenleizhiye,//职业
  past_history,//既往史
  present_history,//现病史
  byMethod,//目前避孕方法
  byPlan,//近期孕育计划
  lcMethod,//拟流产方式
  byTime,//拟避孕时间
  rsyy,//本次妊娠原因
  yesno,//是否继续
  abortion_love_menstrual,//月经量与平时比
  follow_manner,//随访方式
} from '@/api/dic'

const dic = {
  state: {
    nationality: [],//国籍
    certType: [],//证件类型
    domicileType: [],//户籍分类
    education: [],//文化程度
    ethnic: [],//民族 
    homeRegist: [],//户籍归属
    occupation: [],//职业
    pastHistory: [],//既往史
    gestatePlan: [],//近期孕育计划
    planAbortionTime: [],//拟流产方式
    planContraceptionMethod: [],//拟避孕方法
    planContraceptionTime: [],//拟避孕时间
    pregnancyReason: [],//妊娠原因
    presentHistory: [],//现病史
    yesno: [],//是否继续使用
    yylypsb: [],//月经量与平时比
    followManner: [],//随访方式
  },
  mutations: {
    Set_Nationality (state, nationality) {
      state.nationality = nationality
    },
    Set_CertType (state, value) {
      state.certType = value
    },
    Set_Education (state, value) {
      state.education = value
    },
    Set_DomicileType (state, value) {
      state.domicileType = value
    },
    Set_Ethnic (state, value) {
      state.ethnic = value
    },
    Set_HomeRegist (state, value) {
      state.homeRegist = value
    },
    Set_Occupation (state, value) {
      state.occupation = value
    },
    Set_PastHistory (state, value) {
      state.pastHistory = value
    },
    Set_PresentHistory (state, value) {
      state.presentHistory = value
    },

    Set_GestatePlan (state, value) {
      state.gestatePlan = value
    },
    Set_PlanAbortionTime (state, value) {
      state.planAbortionTime = value
    },
    Set_PlanContraceptionMethod (state, value) {
      state.planContraceptionMethod = value
    },
    Set_PlanContraceptionTime (state, value) {
      state.planContraceptionTime = value
    },
    Set_PregnancyReason (state, value) {
      state.pregnancyReason = value
    },
    Set_Yesno (state, value) {
      state.yesno = value
    },
    Set_YYLYPSJ (state, value) {
      state.yylypsb = value
    },
    Set_FOLLOWMANNER (state, value) {
      state.followManner = value
    },
  },
  actions: {
    GET_NATIONALITY: ({ commit }) => {
      return new Promise(res => {
        getShijiegeguohediqumingcheng().then(resolve => {
          dic.state.nationality.length > 0 || commit('Set_Nationality', resolve.result)
          uni.setStorageSync('nationality', true)
          res();
        });
      })
    },
    GET_CERTTYPE: ({ commit }) => {
      return new Promise(res => {
        card().then(resolve => {
          dic.state.certType.length > 0 || commit('Set_CertType', resolve.result)
          uni.setStorageSync('certType', true)

          res();
        });
      })
    },
    GET_EDUCATION: ({ commit }) => {
      return new Promise(res => {
        wenhuachengdu().then(resolve => {
          dic.state.education.length > 0 || commit('Set_Education', resolve.result)
          uni.setStorageSync('education', true)
          res();
        });
      })
    },
    GET_DOMICILETYPE: ({ commit }) => {
      return new Promise(res => {
        chengxiangfenlei().then(resolve => {
          dic.state.domicileType.length > 0 || commit('Set_DomicileType', resolve.result)
          uni.setStorageSync('domicileType', true)
          res();
        });
      })
    },
    GET_ETHNIC: ({ commit }) => {
      return new Promise(res => {
        minzu().then(resolve => {
          dic.state.ethnic.length > 0 || commit('Set_Ethnic', resolve.result)
          uni.setStorageSync('ethnic', true)
          res();
        });
      })
    },
    GET_HOMEREGIST: ({ commit }) => {
      return new Promise(res => {
        hukouguishu().then(resolve => {
          dic.state.homeRegist.length > 0 || commit('Set_HomeRegist', resolve.result)
          uni.setStorageSync('homeRegist', true)
          res();
        });
      })
    },
    GET_OCCUPATION: ({ commit }) => {
      return new Promise(res => {
        renqunfenleizhiye().then(resolve => {
          dic.state.occupation.length > 0 || commit('Set_Occupation', resolve.result)
          uni.setStorageSync('occupation', true)
          res();
        });
      })
    },
    GET_PASTHISTORY: ({ commit }) => {
      return new Promise(res => {
        past_history().then(resolve => {
          dic.state.pastHistory.length > 0 || commit('Set_PastHistory', resolve.result)
          uni.setStorageSync('pastHistory', true)
          res();
        });
      })
    },
    GET_PRESENTHISTORY: ({ commit }) => {
      return new Promise(res => {
        present_history().then(resolve => {
          dic.state.presentHistory.length > 0 || commit('Set_PresentHistory', resolve.result)
          uni.setStorageSync('presentHistory', true)
          res();
        });
      })
    },

    GET_GESTATEPLAN: ({ commit }) => {
      return new Promise(res => {
        byPlan().then(resolve => {
          dic.state.gestatePlan.length > 0 || commit('Set_GestatePlan', resolve.result)
          uni.setStorageSync('gestatePlan', true)
          res();
        });
      })
    },
    GET_PLANABORTIOMTIME: ({ commit }) => {
      return new Promise(res => {
        lcMethod().then(resolve => {
          dic.state.planAbortionTime.length > 0 || commit('Set_PlanAbortionTime', resolve.result)
          uni.setStorageSync('planAbortionTime', true)
          res();
        });
      })
    },
    GET_PLANCONTRACEPTIONMETHOD: ({ commit }) => {
      return new Promise(res => {
        byMethod().then(resolve => {
          dic.state.planContraceptionMethod.length > 0 || commit('Set_PlanContraceptionMethod', resolve.result)
          uni.setStorageSync('planContraceptionMethod', true)
          res();
        });
      })
    },
    GET_PLANCONTRACEPTIOMTIME: ({ commit }) => {
      return new Promise(res => {
        byTime().then(resolve => {
          dic.state.planContraceptionTime.length > 0 || commit('Set_PlanContraceptionTime', resolve.result)
          uni.setStorageSync('planContraceptionTime', true)
          res();
        });
      })
    },
    GET_PREGNANCYREASON: ({ commit }) => {
      return new Promise(res => {
        rsyy().then(resolve => {
          dic.state.pregnancyReason.length > 0 || commit('Set_PregnancyReason', resolve.result)
          uni.setStorageSync('pregnancyReason', true)
          res();
        });
      })
    },
    GET_YESNO: ({ commit }) => {
      return new Promise(res => {
        yesno().then(resolve => {
          dic.state.yesno.length > 0 || commit('Set_Yesno', resolve.result)
          uni.setStorageSync('yesno', true)
          res();
        });
      })
    },
    GET_YYLYPSB: ({ commit }) => {
      return new Promise(res => {
        abortion_love_menstrual().then(resolve => {
          dic.state.yylypsb.length > 0 || commit('Set_YYLYPSJ', resolve.result)
          uni.setStorageSync('yylypsb', true)
          res();
        });
      })
    },
    GET_FOLLOWMANNER: ({ commit }) => {
      return new Promise(res => {
        follow_manner().then(resolve => {
          dic.state.followManner.length > 0 || commit('Set_FOLLOWMANNER', resolve.result)
          uni.setStorageSync('yylypsb', true)
          res();
        });
      })
    },
  },
}
export default dic