$(document).ready(function(){
	//Example
	loadCSS( "http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,700,300,600,800" );

	new Imager({ availableWidths: [320, 640, 1024] });

	$.slidebars();	

	$('#fullpage').fullpage({
		menu: true,
		navigation: true,
        navigationPosition: 'right',
        //navigationTooltips: ['firstSlide', 'secondSlide'], //esto indica el nombre del slide activo.
        showActiveTooltip: true,
	});

});

