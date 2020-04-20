$(function(){
	let madalCallBtn = $('#footer__btn');
	madalCallBtn.on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		let modalWindow = $('#modalWindow');
		let modalClose = $('#modal__close');
		modalClose.fadeIn();
			modalClose.on('click', function(event) {
				event.preventDefault();
				event.stopPropagation();
				modalWindow.fadeOut(700);
				setTimeout(function () {
					$('#form').removeClass('form--hide');
				}, 700);				
			});
		modalWindow.fadeIn(700);
	});
	$('#popap__btn').click(function() {
		$('#modalWindow').fadeOut(700);
		setTimeout(function () {
			$('#form').removeClass('form--hide');
			$('.popap__ajax').fadeOut(500).css({
			            		'transform':'translateX(-300%)',
			            		'opacity': 0
			            	});
		}, 500);		

		$('.popap__icon').css('transform', 'scale(0) rotate(-1440deg)');
	});
	$('input#name, input#email, textarea#message').unbind().blur( function(){
		let id = $(this).attr('id');
		let val = $(this).val();
		switch(id) 
		{
			case 'name' :
			let rv_name = /^[a-zA-Zа-яА-Я]+$/;

			if(val.length > 2 && val != '' && rv_name.test(val))
			{
				$(this).addClass('not--error').removeClass('error');;
				$(this).next('.error__form').text('Accepted').fadeIn()
											.css({'color': '#2eff8c'});									                                          
			}
			else 
			{
				$(this).removeClass('not--error').addClass('error');
				$(this).next('.error__form').html('&#42; You did not enter a name')
											.css('color', '#e30000');											
			}
		break;
		case 'email':
			let rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
			if(val != '' && rv_email.test(val))
			{
				$(this).addClass('not--error').removeClass('error');;
				$(this).next('.error__form').text('Accepted').fadeIn()
											.css({'color': '#2eff8c'});											
			}	
			else 
			{
				$(this).removeClass('not--error').addClass('error');
				$(this).next('.error__form').html('&#42; Email field is required')
											.css('color', '#e30000');
			}
		break;		
		case 'message':
			if(val != '' && val.length < 20)
			{
				$(this).addClass('not--error').removeClass('error');;
				$(this).next('.error__form').text('Accepted').fadeIn()
											.css({'color': '#2eff8c'});
			}	
			else 
			{
				$(this).removeClass('not--error').addClass('error');
				$(this).next('.error__form').html('&#42; Field "Text of the letter" is required')
											.css('color', '#e30000');
			}	
		break;	
		}
	});
	$('#form').submit(function(event) {
		event.preventDefault();
		if($('.not--error').length == 3) 
		{
		 $.ajax({
		        url: 'http://httpbin.org/post',
		        type: 'post',
		        data: $(this).serialize(),

		        beforeSend: function(xhr, textStatus){ 
		             $('form#form :input').attr('disabled','disabled');
		        },
		        success: function(response){
		            $('form#form :input').removeAttr('disabled');
		            $('form#form :text, textarea').val('').removeClass('error').text('');
		            setTimeout(function () {
		            	$('#form').addClass('form--hide');
		            },300)
		            
		            setTimeout(function () {
		            	$('.popap__ajax').fadeIn(500).css({
		            		'transform':'translateX(0)',
		            		'opacity': 1
		            	});
		            	$('#modal__close').fadeOut();
		            }, 700);
		            setTimeout(function () {
		            	$('.popap__icon').css('transform', 'scale(1) rotate(1440deg)');
		            },800);
		       }
		});			
		}	
		else
		{
			return false;
		}						
	});			
});