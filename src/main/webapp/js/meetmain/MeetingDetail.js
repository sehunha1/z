/**
 * Created by hase on 2017. 3. 10..
 */
var MeetingDetail = function(){
    this.init();
};

MeetingDetail.prototype = {
    aCalendarData : null,
    sCurrentMemberInfo : null,
    nTotalMember : 1, // 방장 기본 1

    init : function(){
        this.cacheDom();
        if(this.aCalendarData == null){
            this.bindEvent();
            this.getMemberInfo();
            this.getMeetingInfo();
            this.getMemberList();
        }else{
            this.drawCalendar();
        }
    },

    // 보안상 매우 취약함
    // 세션이나 최소한 쿠키로 멤버정보 가져오도록 처리 필요
    getMemberInfo : function(){
        this.sCurrentMemberInfo = this.getQueryParam('memberNo');
    },

    cacheDom : function(){
        this.domDatePicker = $('#datepicker');
        this.domDateItem = $('._activeDate');
        this.domDateItemLayer = this.domDatePicker.find('._dateItemLayer');
        this.domBtnSaveSelectedDate = $('._btnSaveSelectedDate');
    },

    bindEvent : function(){
        this.domDatePicker.on('click', '._activeDate a', $.proxy(this.showSelectInfoUI, this));
        this.domDatePicker.on('click', '._btnCloseLayer', $.proxy(this.hideSelectInfoUI, this));
        this.domDatePicker.on('click', '._dateItemLayer ._selectDate', $.proxy(this.selectDateItem, this));
        this.domDatePicker.on('click', '._dateItemLayer ._deleteDate', $.proxy(this.deleteDateItem, this));
        this.domDatePicker.on('click', '._btnSaveSelectedDate', $.proxy(this.saveMeetingDate, this));
        this.domDatePicker.on('click', '._btnPrevNextCalendar', $.proxy(this.drawCalendar, this));

        this.domBtnSaveSelectedDate.on('click', $.proxy(this.saveMeetingDate, this));
        this.domDatePicker.on('click', '._btnPrevNextCalendar', $.proxy(this.drawCalendar, this));
    },

    showSelectInfoUI : function(e){
        e.preventDefault();
        var domCurrentDate = $(e.currentTarget).parents('._activeDate');

        this.hideSelectInfoUI();
        domCurrentDate.addClass("selecting");
        domCurrentDate.find('._dateItemLayer').show();
    },

    hideSelectInfoUI : function(){
        this.domDateItem.removeClass('selecting');
        this.domDateItemLayer.hide();
    },

    selectDateItem : function(e){
        var domCurrentDate = $(e.currentTarget).parents('._activeDate'),
            sSelectedParamDate = domCurrentDate.find('._dateText').text(),
            sCurrentSelectedParamTime = domCurrentDate.find('._timeInfo').text(),

            sUserList = domCurrentDate.attr('data-member-no'),
            aUserList = sUserList ? sUserList.slice(1).split('@') : [],

            sSelectedParamTime = domCurrentDate.attr('data-param-time'),
            aSelectedParamTime = sSelectedParamTime ? sSelectedParamTime.slice(1).split('@') : [],

            bUpdateInfo = false,
            bUserUpdateIdx = 0,
            htParamData = {
                sSelectedParamDate : sSelectedParamDate,
                aMemberNoList : [],
                aCalendarTime : []
            };

        for(var i=0, len=aUserList.length; i<len; i++){
            if(aUserList[i] == this.sCurrentMemberInfo){
                bUpdateInfo = true;
                bUserUpdateIdx = i;
                break;
            }
        }

        if(bUpdateInfo){
            htParamData.aMemberNoList = aUserList;
            htParamData.aCalendarTime = aSelectedParamTime;
            htParamData.aCalendarTime[bUserUpdateIdx] = sCurrentSelectedParamTime;
        }else{
            if(aSelectedParamTime.length){
                // 기존 날짜 선택자가 있는 경우
                aUserList.push(this.sCurrentMemberInfo);
                htParamData.aMemberNoList = aUserList;
                aSelectedParamTime.push(sCurrentSelectedParamTime);
                htParamData.aCalendarTime = aSelectedParamTime;
            }else{
                // 신규선택
                htParamData.aMemberNoList = [this.sCurrentMemberInfo];
                htParamData.aCalendarTime = [sCurrentSelectedParamTime];
            }
        }

        this.updateMeetingObject(htParamData);
        this.hideSelectInfoUI();
    },

    deleteDateItem : function(e){
        var domCurrentDate = $(e.currentTarget).parents('._activeDate'),
            sSelectedParamDate = domCurrentDate.find('._dateText').text(),
            sCurrentSelectedParamTime = domCurrentDate.find('._timeInfo').text(),

            sUserList = domCurrentDate.attr('data-member-no'),
            aUserList = sUserList ? sUserList.slice(1).split('@') : [],

            sSelectedParamTime = domCurrentDate.attr('data-param-time'),
            aSelectedParamTime = sSelectedParamTime ? sSelectedParamTime.slice(1).split('@') : [],

            bUpdateInfo = false,
            bUserUpdateIdx = 0,
            htParamData = {
                sSelectedParamDate : sSelectedParamDate,
                aMemberNoList : [],
                aCalendarTime : []
            };

        if(!aUserList.length){
            alert("일정을 먼저 선택해 주세요.");
            return;
        }

        for(var i=0, len=aUserList.length; i<len; i++){
            if(aUserList[i] == this.sCurrentMemberInfo){
                bUpdateInfo = true;
                bUserUpdateIdx = i;
                break;
            }
        }

        if(bUpdateInfo){
            aUserList.splice(bUserUpdateIdx,1);
            aSelectedParamTime.splice(bUserUpdateIdx,1);
            htParamData.aMemberNoList = aUserList;
            htParamData.aCalendarTime = aSelectedParamTime;
        }else{
            alert("본인거만 수정가능합니다.");
            return;
        }

        this.deleteMeetingObject(htParamData);
        this.hideSelectInfoUI();
        this.drawCalendar();

    },

    getQueryParam : function(sParamKey){
        var aParamList = location.search.slice(1).split('&'),
            htParamData = {
                key : null,
                value : null
            };

        for(var i=0, len=aParamList.length; i<len; i++){
            if(aParamList[i].split('=').indexOf(sParamKey) == 0){
                htParamData.key = aParamList[i].split('=')[0];
                htParamData.value = aParamList[i].split('=')[1];
            }
        }

        return htParamData.value;
    },

    getMeetingInfo : function(){
        var sMeetingInfoAPI = '/z/html/meetmain/getSelectDate.json?meetingNo=' + this.getQueryParam('meetingNo');
        var that = this;
        $.ajax({
            url : sMeetingInfoAPI,
            method : 'GET',
            context : this,
            success : function(res){
                that.aCalendarData = that.makeMeetingObject(res);
                that.drawCalendar();
            },
            error : function(){
                console.warn("API 호출 실패");
            }
        })
    },

    makeMeetingObject : function(res){
        if(!res.data){
            return;
        }
        // res.data.meetingInfo.endDate='2017-04-28';

        var oOriginCalendarData = res.data,
            oRenderCalendarDate = [],
            oMeetingStartDate = new Date(oOriginCalendarData.meetingInfo.startDate), //new Date(""+oOriginCalendarData.meetingInfo.sDate),
            oMeetingEndDate = new Date(oOriginCalendarData.meetingInfo.endDate), // new Date(""+oOriginCalendarData.meetingInfo.eDate),
            oIntervalDate = oMeetingEndDate - oMeetingStartDate,
            day = 1000*60*60*24,
            month = day*30;

        for(var i=0; i<=Math.ceil(oIntervalDate/month); i++){
            var oEachMonth = new Date();
            oEachMonth.setMonth(oMeetingStartDate.getMonth()+i);
            var _saveDate = new Date(oEachMonth.getYear(),oEachMonth.getMonth()+1,0);
            oRenderCalendarDate.push({
                sMeetingDate : oEachMonth,
                aEachDateInfo : new Array(_saveDate.getDate()),
                oCurrentMonth : oEachMonth
            });
        }

        for(var i=0,len=oRenderCalendarDate.length; i<len; i++){
            for(var j=0, jlen=oRenderCalendarDate[i].aEachDateInfo.length; j<jlen; j++){
                var renderData = oRenderCalendarDate[i],
                    date = parseInt(j) + 1,
                    dateValue = date < 10 ? "0" + date : date,
                    month = (renderData.oCurrentMonth.getMonth()+1),
                    monthValue = month < 10 ? "0" + month : month;


                renderData.aEachDateInfo[j] = {
                    calendarDate : renderData.oCurrentMonth.getFullYear()+'-'+monthValue+'-'+dateValue,
                    calendarTime : '',
                    aCalendarTime : [],
                    nSelectCount : 0,
                    bActiveDate : false,
                    memberNo : '',
                    aMemberNo : []
                };

                var _data = oRenderCalendarDate[i].aEachDateInfo[j];
                var compareEachDate = new Date(_data.calendarDate);
                // 선택가능한 날짜들
                if(oMeetingStartDate.getTime() <= compareEachDate.getTime() && oMeetingEndDate.getTime() >= compareEachDate.getTime()){
                    renderData.aEachDateInfo[j].bActiveDate = true;
                }
            }
        }

        for(var i=0,len=oRenderCalendarDate.length; i<len; i++){
            for(var k=0, klen=oOriginCalendarData.selectedDateInfo.length; k<klen; k++){
                for(var j=0, jlen=oRenderCalendarDate[i].aEachDateInfo.length; j<jlen; j++){

                    var eachDate = oRenderCalendarDate[i].aEachDateInfo[j],
                        selectedDate = oOriginCalendarData.selectedDateInfo[k];
// 서버에서 토탈값 받아야함
if(eachDate.calendarDate === '2017-03-17' || eachDate.calendarDate === '2017-03-15'){
    selectedDate.nTotalSelector = 2;
}
                    if(eachDate.calendarDate == selectedDate.calendarDate){

                        eachDate.calendarDate = selectedDate.calendarDate;
                        eachDate.nLocalSelectedDate = j+1;
                        eachDate.nSelectCount = 0;

                        if(selectedDate.nTotalSelector > 1){
                            eachDate.calendarTime += '@'+selectedDate.calendarTime; // array
                            eachDate.aCalendarTime.push(selectedDate.calendarTime);
                            eachDate.memberNo += '@'+selectedDate.memberNo;
                            eachDate.aMemberNo.push(selectedDate.memberNo);
                        }else{
                            eachDate.calendarTime = '@'+selectedDate.calendarTime; // array
                            eachDate.aCalendarTime[0] = selectedDate.calendarTime;
                            eachDate.memberNo = '@'+selectedDate.memberNo;
                            eachDate.aMemberNo[0] = selectedDate.memberNo;
                        }
                    }

                    eachDate.meetingNo = selectedDate.meetingNo;
                }
            }
        }

        return oRenderCalendarDate;
    },

    updateMeetingObject : function(htParamData){
        var currentView = $('[data-handler="selectDay"]').eq(0),
            currentYear = currentView.attr('data-year'),
            currentMonth = currentView.attr('data-month');

        var aMeetingData = this.aCalendarData,
            sParamDate = htParamData.sSelectedParamDate,
            aParamTime = htParamData.aCalendarTime,
            aMemberNo = htParamData.aMemberNoList;

        for(var i=0, len=aMeetingData.length; i<len; i++){
            if(aMeetingData[i].sMeetingDate.getFullYear() == parseInt(currentYear) && aMeetingData[i].sMeetingDate.getMonth() == parseInt(currentMonth)){
                for(var j=0, jlen=aMeetingData[i].aEachDateInfo.length; j<jlen; j++){
                    if(aMeetingData[i].aEachDateInfo[j].calendarDate.split('-')[2] == parseInt(sParamDate)){
                        var data = aMeetingData[i].aEachDateInfo[j];
                        data.calendarDate.split('-')[2] = sParamDate;
                        data.calendarTime = '@'+aParamTime.join('@');
                        data.aCalendarTime = aParamTime;
                        data.aMemberNo = aMemberNo;
                        data.memberNo = '@'+aMemberNo.join('@');
                        data.nLocalSelectedDate = sParamDate;
                    }
                }
            }
        }

        this.drawCalendar();
    },

    deleteMeetingObject : function(htParamData){
        console.log('제거',htParamData)
        var currentView = $('[data-handler="selectDay"]').eq(0),
            currentMonth = currentView.attr('data-month');

        var aMeetingData = this.aCalendarData,
            sParamDate = htParamData.sSelectedParamDate,
            aParamTime = htParamData.aCalendarTime,
            aMemberNo = htParamData.aMemberNoList;

        var aMeetingData = this.aCalendarData,
            sCurrentMonthDateIdx = null;

        for(var i=0, len=aMeetingData.length; i<len; i++){
            if(aMeetingData[i].sMeetingDate.getMonth() == currentMonth){
                sCurrentMonthDateIdx = i;
                break;
            }
        }

        for(var i=0, len=aMeetingData.length; i<len; i++){
            for(var j=0, jlen=aMeetingData[sCurrentMonthDateIdx].aEachDateInfo.length; j<jlen; j++){
                if(htParamData.sSelectedParamDate*1 == aMeetingData[sCurrentMonthDateIdx].aEachDateInfo[j].calendarDate.split('-')[2]*1){
                    var data = aMeetingData[sCurrentMonthDateIdx].aEachDateInfo[j];
                    data.nSelectCount = 0;
                    data.calendarTime = '@'+aParamTime.join('@');
                    data.aCalendarTime = aParamTime;
                    data.memberNo = '@'+aMemberNo.join('@');
                    data.aMemberNo = aMemberNo;
                }

                if(!aMeetingData[sCurrentMonthDateIdx].aEachDateInfo[j].aCalendarTime.length){
                    delete aMeetingData[sCurrentMonthDateIdx].aEachDateInfo[j]['nLocalSelectedDate'];
                }
            }
        }


    },

    drawCalendar : function(){
        var aMeetingData = this.aCalendarData,
            sCurrentMonthDateIdx = null,
            currentView = $('[data-handler="selectDay"]').eq(0),
            sCurrentMonth = currentView.attr('data-month');

        for(var i=0, len=aMeetingData.length; i<len; i++){
            if(aMeetingData[i].sMeetingDate.getMonth() == sCurrentMonth){
                sCurrentMonthDateIdx = i;
                break;
            }
        }

        if(sCurrentMonthDateIdx === null){
            return;
        }

        var aDomActiveDateList = this.domDatePicker.find("._dateItem");
        aDomActiveDateList.removeClass('_selectComplete selecting _currentUserSelectDate');
        aDomActiveDateList.find('.memberInfo').text('');
        // aDomActiveDateList.find('a').css({'opacity': 1});

        for(var i=0, len=aDomActiveDateList.length; i<len; i++){
            for(var j=0, jlen=aMeetingData[sCurrentMonthDateIdx].aEachDateInfo.length; j<jlen; j++){
                var _renderData = aMeetingData[sCurrentMonthDateIdx].aEachDateInfo[j];

                if(_renderData.bActiveDate){

                    if(_renderData.calendarDate.split('-')[2]*1 == aDomActiveDateList.eq(i).find('a').text()*1) {
                        aDomActiveDateList.eq(i).addClass("_activeDate");
                    }
                }else{
                    aDomActiveDateList.eq(i).addClass("_unactiveDate");
                }
                var memberRate = Math.floor((_renderData.aMemberNo.length / 11) * 100);

                _renderData.currentUserSelectDate = '___';
                if(_renderData.nLocalSelectedDate == aDomActiveDateList.eq(i).find('a').text()*1){
                    for(var v=0, vlen=_renderData.aMemberNo.length; v<vlen; v++){
                        if(this.sCurrentMemberInfo*1 === _renderData.aMemberNo[v]*1){
                            _renderData.currentUserSelectDate = '_currentUserSelectDate';
                        }
                    }

                    aDomActiveDateList.eq(i).attr('data-member-no', '@'+_renderData.aMemberNo.join('@'));
                    aDomActiveDateList.eq(i).attr('data-param-time', '@'+_renderData.aCalendarTime.join('@'));
                    aDomActiveDateList.eq(i).addClass("_selectComplete");
                    aDomActiveDateList.eq(i).addClass(_renderData.currentUserSelectDate);
                    aDomActiveDateList.eq(i).find('.memberInfo').text(_renderData.aMemberNo.length +"/"+this.nTotalMember);
                    // aDomActiveDateList.eq(i).find('a').css({'opacity': memberRate/100});
                }
            }
        }

        // test용
        console.log('------------------------------------------------')
        this.aCalendarData[0].aEachDateInfo.forEach(function(v){
            console.log(v)
        })
        // this.getMeetingDateInfo().aData.forEach(function(v){
        //     console.log(v.uiData)
        // })
    },

    getMeetingDateInfo : function(){
        //this.oMeetingDetail.getMeetingDateInfo().aData.forEach(function(v){ console.log(v.uiData)})
        var aMeetingData = this.aCalendarData,
            htParamData = {
                aData : []
            };

        for(var i=0, len=aMeetingData.length; i<len; i++){
            for(var j=0, jlen=aMeetingData[i].aEachDateInfo.length; j<jlen; j++){
                if(aMeetingData[i].aEachDateInfo[j].aCalendarTime.length){
                    var paramDataExtract = aMeetingData[i].aEachDateInfo[j];
                    htParamData.aData.push({
                        // uiData : {
                        //     date : paramDataExtract.calendarDate,
                        //     member : paramDataExtract.aMemberNo.join(',')
                        // },

                        calendarDate : paramDataExtract.calendarDate,
                        calendarTime : paramDataExtract.aCalendarTime,
                        meetingNo : paramDataExtract.meetingNo,
                        memberNo : paramDataExtract.aMemberNo
                    })
                }
            }
        }

        return htParamData;
    },

    saveMeetingDate : function(){
        if(!confirm("전송합니까?")) return;
        var oMeetingParamData = this.getMeetingDateInfo(),
            sMeetingInfoAPI = '/z/html/meetmain/getSelectDate.json?meetingNo=' + this.getQueryParam('meetingNo'),
            that = this;

        $.ajax({
            url : sMeetingInfoAPI,
            method : 'POST',
            data : oMeetingParamData,
            success : function(res){
                console.log("전송완료")
                that.aCalendarData = that.makeMeetingObject(res);
                that.drawCalendar();
            },
            error : function(){
                console.warn("API 호출 실패");
            }
        })
    },

    /**
     * only for member list index
     */
    getMemberList : function(){
        var that = this;
        $.ajax({
            url : '/z/html/meetmain/listMeetingMembNotBoss.json?meetingNo=' + this.getQueryParam('meetingNo'),
            method : 'POST',
            success : function(res){
                that.nTotalMember += res.data.length;
            },
            error : function(){
                console.warn("API 호출 실패");
            }
        })
    }
};