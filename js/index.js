$(function(){
    function checkLocation(location) {
		if (location === "KaohsiungCulturalCenter") {
			return "高雄市文化中心";
		} else if (location === "KaohsiungMusicHall") {
			return "高雄市音樂館";
		} else if (location === "DadongArtsCenter") {
			return "大東文化藝術中心";
		} else {
			return "岡山文化中心";
		}
    }
    function checkTicket(ticket) {
    	if(ticket === "disfree") {
    		return "售票";
    	} else if (ticket === "free") {
    		return "免票";
    	} else {
    		return "特定對象";
    	}
    }
 
	$('#serch').on('click', function(e){
		e.preventDefault();
		$.ajax({
			url: "http://opendata.khcc.gov.tw/public/OD_art_program.ashx?SDate=2016/08/02&EDate=2017/02/02",
			dataType: 'json',
			method: "GET",
			success : function(data){
				var location = $('#location').val(),
					ticket = $('#ticket').val(),
					itemLocation = checkLocation(location),
					itemTicket = checkTicket(ticket),
					src;
				console.log(data);
				

				$.each(data,function(i,item){
					if( itemLocation === item.ORGNAME && itemTicket === item.PRGTICKET ){
						console.log(item.PRGNAME);
						// ractive.set('comment',data)  ;
						var name = item.PRGNAME,
							performer = item.PRGACT,
							date = item.PRGDATE,
							startTime = item.PRGSTIME,
							endTime = item.PRGETIME,
							place = item.PRGPLACE,
							description =item.ITEMDESC,
							img = item.IMAGE1;
							art = "<h2>"+ name +"</h2>" + 
								  " <img src= " + img + " >" + 
							      "<p> 演出單位 : " + performer + "</p>" +
							      "<p> 活動日期 : " + date + " "+ startTime +"~" +endTime+ "</p>" +
							      "<p> 活動地點 : " + place + "</p>" +
							      "<p> 活動簡介 : " + description + "</p>"  ;
						$('#artBox').append(art);
					}	   
				})	
			}
		})
	});
	
});


