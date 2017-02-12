$(function() {
  $('#btn_toggle_member_list').on('click', function() {
    $('.member_list_wrap').toggleClass('on');
  });

  $('.date_result_list .item').on('click', function() {
    $('.date_result_list .item').removeClass('on');
    $(this).toggleClass('on');
  });

  $('.place_result_list .item').on('click', function() {
    $('.place_result_list .item').removeClass('on');
    $(this).toggleClass('on');
  });
});