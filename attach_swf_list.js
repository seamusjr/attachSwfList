function AttachSwfList(el, swfplayer, arr) {	
	var $gallery = el,
	    $items = $('li', $gallery),
		vlist = [],
		vclones = [],
		flashvars = {},
		params = {},
		attributes = {}; 

	function attachSwf(url, vid_id){
		flashvars.videoUrl = url; 
		flashvars.playerHeight = "409"; 
		flashvars.playerWidth = "660"; 
		params = {
			quality: 'high', 
			scale: 'noscale', 
			allowscriptaccess: 'always', 
			bgcolor: '#111111', 
			wmode: 'transparent'
		}; 
		swfobject.embedSWF(swfplayer, vid_id, "660", "409", "9.0.124", null, flashvars, params, attributes);				
	};

	function findVideos() {
	     $.each($('#gallery li.video div'), function() {
	         vlist.push($(this).attr('id') || 0);
	     });
	};

	function cloneVids() {
	    $items.each(function() {         
	        vclones.push($(this).children().clone(true))
        });
	};

	function removeVideos() {
	    $.each(vlist, function(i, val) {
	        swfobject.removeSWF(val);
        });
	};

	function showSelected(num) {
	    $items.eq(num).fadeIn(250).siblings().hide();
	};

	function enableControls() {
	    $('.pager li a').bind('click', function(e) {
	        e.preventDefault();
	        var i = $(this).parent().index();
	        if($items.eq(i).hasClass('video') === false){
	            removeVideos();
	            showSelected(i);
        
	        } else {
	            removeVideos();
	            $items.eq(i).empty().append(vclones[i]);
	            attachSwf(arr[i], $items.eq(i).children('div').attr('id'));
	            showSelected(i);
	        }
	    });
	};
		
	function init() {
	    findVideos();
	    cloneVids();
	    if($items.eq(0).hasClass('video') === true){
	        attachSwf(arr[0], vlist[0]);
      }
	    enableControls();
	};
    init();
}