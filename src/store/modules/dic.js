import {
  getShijiegeguohediqumingcheng,//国籍
  card,//证件类型
  chengxiangfenlei,//户籍分类
  wenhuachengdu,//文化程度
  minzu,//民族
  hukouguishu,//户籍归属
  renqunfenleizhiye,//职业
  past_history,//既往史
  present_history//现病史
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
    presentHistory: [],//现病史
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
  },
  actions: {
    GET_NATIONALITY: ({ commit }) => {
      return new Promise(res => {
        getShijiegeguohediqumingcheng().then(resolve => {
          dic.state.nationality.length > 0 || commit('Set_Nationality', resolve.result)
          res();
        });
      })
    },
    GET_CERTTYPE: ({ commit }) => {
      return new Promise(res => {
        card().then(resolve => {
          dic.state.certType.length > 0 || commit('Set_CertType', resolve.result)
          res();
        });
      })
    },
    GET_EDUCATION: ({ commit }) => {
      return new Promise(res => {
        wenhuachengdu().then(resolve => {
          dic.state.education.length > 0 || commit('Set_Education', resolve.result)
          res();
        });
      })
    },
    GET_DOMICILETYPE: ({ commit }) => {
      return new Promise(res => {
        chengxiangfenlei().then(resolve => {
          dic.state.domicileType.length > 0 || commit('Set_DomicileType', resolve.result)
          res();
        });
      })
    },
    GET_ETHNIC: ({ commit }) => {
      return new Promise(res => {
        minzu().then(resolve => {
          dic.state.ethnic.length > 0 || commit('Set_Ethnic', resolve.result)
          res();
        });
      })
    },
    GET_HOMEREGIST: ({ commit }) => {
      return new Promise(res => {
        hukouguishu().then(resolve => {
          dic.state.homeRegist.length > 0 || commit('Set_HomeRegist', resolve.result)
          res();
        });
      })
    },
    GET_OCCUPATION: ({ commit }) => {
      return new Promise(res => {
        renqunfenleizhiye().then(resolve => {
          dic.state.occupation.length > 0 || commit('Set_Occupation', resolve.result)
          res();
        });
      })
    },
    GET_PASTHISTORY: ({ commit }) => {
      return new Promise(res => {
        past_history().then(resolve => {
          dic.state.pastHistory.length > 0 || commit('Set_PastHistory', resolve.result)
          res();
        });
      })
    },
    GET_PRESENTHISTORY: ({ commit }) => {
      return new Promise(res => {
        present_history().then(resolve => {
          dic.state.presentHistory.length > 0 || commit('Set_PresentHistory', resolve.result)
          res();
        });
      })
    },
  },
}
export default dic