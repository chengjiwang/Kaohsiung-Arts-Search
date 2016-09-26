$(function(){
	
	$(window).scroll(function(){
		var scrollValue = $(this).scrollTop(),
			windowHeight = $(window).height()*0.5;
		if(window.innerWidth > 992){
			if (scrollValue > windowHeight) {
				$('#up').fadeIn();
			} else {
				$('#up').fadeOut();
			}
		}
	});

    $('#up').click(function(){
		$('html,body').animate({scrollTop:0}, 1000);
	});

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
  
	function listData(found){								 						      						 				      
		var	art = "<div class='col-xs-12 col-md-4 item'>"+
					  "<h4>"+ found.PRGNAME +"</h4>" + 
					  " <img src= " + found.IMAGE1 + " >" + 
				      "<p> 演出單位 : " + found.PRGACT + "</p>" +
				      "<p> 活動日期 : " + found.PRGDATE + " "+ found.PRGSTIME +"~" +found.PRGETIME+ "</p>" +
				      "<p> 活動地點 : " + found.PRGPLACE + "</p>" + 
			      "</div> ";			 
		var $art = $(art);
		$('#artBox').append($art);				
    }
    function showArtData(data,callback){
    	var location = $('#location').val(),
			ticket = $('#ticket').val(),
			itemLocation = checkLocation(location),
			itemTicket = checkTicket(ticket),
			artData = [] ;
		console.log(data);
		$.each(data,function(i,item){
			if(itemLocation === item.ORGNAME && itemTicket === item.PRGTICKET){				
				callback(data[i]);
				artData.push(data[i]);
			} 
		});
		if(artData.length === 0){
			$('#artBox').append("<p>沒有符合的資料!</p>");
		}
		console.log(artData);
    }

	$('#serch').on('click', function(e){
		e.preventDefault();
		$('#artBox').empty();
		$.ajax({
			url: "http://opendata.khcc.gov.tw/public/OD_art_program.ashx?SDate=2016/08/02&EDate=2017/02/02",
			dataType: 'json',
			method: "GET",
			success: function(data){			
				showArtData(data,listData);
			}				
		})
	});	
});


