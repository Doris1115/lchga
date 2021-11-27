export const ruyjs = {
    title: "入托一件事",
    column: [{
        addurl: 'http://wx.fybj365.com/weixin/chiTrasfer2?openid=onfOMt2Se2CWaiTsTUYP9xIwodW4&wxVersion=17032601&userType=2&userid=387450&flag=0',
        icon: "/static/image/icon1.png",
        title: "宝宝档案"
    }, {
        addurl: 'http://wx.fybj365.com/wxoauth/redirect?thirdurl=http://wfw.fybj365.com/rytj/',
        icon: "/static/image/icon2.png",
        title: "入园体检"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/checkOnschool?url=nursery/checkOnschool&openid=onfOMt2Se2CWaiTsTUYP9xIwodW4',
        icon: "/static/image/icon3.png",
        title: "体检信息"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/nurseryInstitution2?url=nursery/nurseryInstitution2&openid=onfOMt2Se2CWaiTsTUYP9xIwodW4&page=1&pageSize=20&hospitalid=41',
        icon: "/static/image/icon4.png",
        title: "托育机构"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/mynurseryCourse?url=nursery/mynurseryCourse&openid=onfOMt2Se2CWaiTsTUYP9xIwodW4&page=1&pageSize=10',
        icon: "/static/image/icon5.png",
        title: "我的课程"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/mynurseryPoints?url=nursery/mynurseryPoints&openid=onfOMt2Se2CWaiTsTUYP9xIwodW4',
        icon: "/static/image/icon6.png",
        title: "学习档案"
    }]
}
export const zayjs = {
    title: "在托一件事",
    column: [{
        url: '/pages/childOrder/index',
        icon: "/static/image/icon21.png",
        title: "体检提醒"
    }, {
        url: '/pages/evaluation/index',
        icon: "/static/image/icon22.png",
        title: "社会评价"
    }, {
        addurl: 'http://wx.fybj365.com/wxoauth/redirect?thirdurl=http://wfw.fybj365.com/kidsteacher/',
        icon: "/static/image/icon23.png",
        title: "考勤上报"
    }, {
        addurl: 'http://wx.fybj365.com/wxoauth/redirect?thirdurl=http://wfw.fybj365.com/kidsorginfo/',
        icon: "/static/image/icon24.png",
        title: "教师服务"
    }]
}
export const jgyjs = {
    title: "监管一件事",
    column: [{
        addurl: 'http://wx.fybj365.com/weixin/nurseryInstitution2?url=nursery/nurseryInstitution2&openid=onfOMt2Se2CWaiTsTUYP9xIwodW4&page=1&pageSize=10&hospitalid=41',
        icon: "/static/image/icon4.png",
        title: "托育机构"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/jianKangGuanLi?url=nursery/jianKangGuanLi&openid=onfOMt2Se2CWaiTsTUYP9xIwodW4&page=1&pageSize=10&hospitalid=41',
        icon: "/static/image/icon32.png",
        title: "健康管理"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/nurseryCheckPlan?url=nursery/nurseryCheckPlan&openid=onfOMt2Se2CWaiTsTUYP9xIwodW4&page=1&pageSize=10',
        icon: "/static/image/icon33.png",
        title: "监督一件事"
    }, {
        addurl: 'http://wx.fybj365.com/weixin/kaoqinguanli?url=nursery/kaoqinguanli&openid=onfOMt2Se2CWaiTsTUYP9xIwodW4&page=1&pageSize=10&hospitalid=41',
        icon: "/static/image/icon34.png",
        title: "考勤监督"
    }]
}
export function getQueryString(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}