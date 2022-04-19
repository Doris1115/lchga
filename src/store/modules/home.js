

const home = {
  state: {
    bodyHeight: "",
    topBgHeight: "",
    iconListHeight: "",
    announcementNotice: "",// 公告通知
    auditCenterData: "", // 审核中心
    NewsManagementData: "",// 新闻管理
    receiveSendManageData: "", // 收发文管理
  },
  actions: {

  },
  mutations: {
    modifybodyHeight (state, num) {
      state.bodyHeight = num
      console.log("bodyHeight-num:", num)
    },
    modifytopBgHeight (state, num) {
      state.topBgHeight = num
      console.log("TopHeight-num:", num)
    },
    iconListHeight (state, num) {
      state.iconListHeight = num
      console.log("iconListHeight-num:", num)
    },
    // 公告通知
    announcementNotice (state, num) {
      console.log("公num:", num)
      state.announcementNotice = num
      // 计算公告通知
      // console.log("state:--", state)
      // console.log("state:--", state.bodyHeight)
      // console.log("Number(state.bodyHeight):", Number(state.bodyHeight))
      // let announceHResunt = Number(state.bodyHeight) - Number(state.iconListHeight) + Number(state.topBgHeight)
      // console.log("计算公告通知：", announceHResunt)
    },
    // computerAnnouncementNoticeH(status,num) {

    // },
    // 审核中心
    auditCenterData (state, num) {
      console.log("审num:", num)
      state.auditCenterData = num
    },
    // 新闻管理
    NewsManagementData (state, num) {
      console.log("新num:", num)
      state.NewsManagementData = num
    },
    // 收发文管理
    receiveSendManageData (state, num) {
      console.log("收发文num:", num)
      state.receiveSendManageData = num
    },
  }
}

export default home