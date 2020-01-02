// Since 2014, VISA and MasterCard are shortens maximum length for Cardholder names to 21 characters and 22 characters respectively.
$(function() {
	$('.input-cart-number').numeric();
	$('#card-ccv').numeric();
	$('.input-cart-number').on('keyup change', function() {
		$('.number span:nth-child(' +$(this).index()+ ')').text($(this).val());
		if ($(this).val().length > 3) {
			$(this).next().focus();
		} if ($(this).val().length < 1) {
			$(this).prev().focus();
		} if ($(this).val().length > 3 && $(this).index() == 4) {
			$('#card-holder').focus();
		}
	});
	$('#card-holder').on('keyup change', function() {
		if ($('#card-holder').val().length <21) {
			$('.card-holder div').text($(this).val());
		}
	});
	$('#card-expiration-month').change(function() {
		$('.month').text($(this).val()+'/');
	});
	$('#card-expiration-year').change(function() {
		$('.year').text($(this).val());
	});
	$('#card-ccv').on('focus', function() {
			$('.credit-card-box').addClass('hover');
	}).on('blur', function() {
			$('.credit-card-box').removeClass('hover');
	}).on('keyup change', function() {
			$('.ccv').text($(this).val());
	});
});
