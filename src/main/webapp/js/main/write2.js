$("#Go-btn").click(function(e) {
	e.preventDefault();
	location.href = "../meetmain/newtap.html";
});

function add_memb() {
	$('<div>').attr('class', 'mail-box-cls').html(
			'<input type="email"' + 'class="add-email-box"'
					+ 'placeholder="email을 입력해주세요">'
					+ '<button type="button" id="minus-btn"'
					+ 'class="btn btn-default"'
					+ 'onClick="remove_memb(this)">-</button>').appendTo(
			'#new-field');
}

function remove_memb(obj) {
	document.getElementById('new-field').removeChild(obj.parentNode);
}