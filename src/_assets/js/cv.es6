// Note: $(document).ready() was not used intentionally to guarantee that this code runs before Hyphenopoly
document.addEventListener("DOMContentLoaded", function() {
    const lang = $(document.documentElement).attr('lang');

    const name = $("h1");
    const position = $("h1 + p");

    // extract name parts for later processing
    const firstName = name.data("first-name");
    const lastName = name.data("last-name");

    // let #data wrap down under the logo if no photo exists
    if( $('#photo').length === 0 )
        $('#pictures').css('float','none');

    // replace date durations/ranges
    // text my be like one of:
    // - ':duration: 2012-11-01 2018-03-08'
    // - ':duration: 2017-12-19'
    // - ':range: 2012-11-01 2018-03-08'
    // - ':range: 2017-12-19'
    $('em:contains(":duration:")').each(function() {
        const em = $(this);
        const items = em.text().trim().replace(/ +(?= )/g,'').split(' ');
        if( items.length < 2 )
            return;

        let months = 0;
        for( let i = 1; i < items.length; i += 2 )
        {
            const from = new Date( parseDate( items[i] ) );
            let to;
            if( items.length > i+1 )
                to = new Date( parseLatestPossibleDate( items[i+1] ) );
            else  // last date-entry missing
                to = new Date();
            months += diffMonths( from, to );
        }

        em.html( durationText( workedDuration( months ), lang ) );
    });
    $('em:contains(":range")').each(function() {
        const em = $(this);
        const items = em.text().trim().split(':range')
        const dateinfo = items[1].trim().replace(/ +(?= )/g,'').split(' ');
        if( dateinfo.length < 2 || dateinfo.length > 3 )
            return;

        let level = 2;
        switch( dateinfo[0] ) {
            case '1:': level = 1; break;
            case '3:': level = 3; break;
            default: break;
        }
        const from = new Date( parseDate( dateinfo[1] ) );
        let to;
        if( dateinfo.length === 3 )
            to = new Date( parseLatestPossibleDate( dateinfo[2] ) );
        else
            to = undefined;

        em.html( items[0] + rangeText( from, to, lang, level ) );
    });
    $('em:contains(":date")').each(function() {
        const em = $(this);
        const items = em.text().trim().split(':date')
        const dateinfo = items[1].trim().replace(/ +(?= )/g,'').split(' ');
        if( dateinfo.length !== 2 )
            return;

        let level = 2;
        switch( dateinfo[0] ) {
            case '1:': level = 1; break;
            case '3:': level = 3; break;
            default: break;
        }
        const date = new Date( parseDate( dateinfo[1] ) );

        em.html( items[0] + formatDate( date, lang, level ) );
    });

    // replace <code> with <q>
    const skipReplacementElements = $(".tag-cloud").get();
    $("code").each( function()
    {
        el = $( this );

        for( skipReplacementElement of skipReplacementElements )
            if( $.contains( skipReplacementElement, el.get()[0] ) )
                return; // skip replacement for this el

        el.replaceWith( $("<q />").append( el.contents() ) );
    } );

    // necessary for letter-/word-based CSS
    $("h2").lettering();
    $("#position > *").lettering('words');


    on_resize = function( event ) {
        // resize quote
        freeSpace = $('body').innerWidth() - $('#pictures').outerWidth();
        $('#quote').css( 'max-width', Math.floor( freeSpace - 1.0 ) + 'px' );
    };

    // call on_resize() on startup
    on_resize();

    // call on_resize() on window resize
    $(window).resize( function( event ) { on_resize(); });

    // call on_resize() before printing
    on_beforePrint = on_resize;
    on_afterPrint = function(){};

    // print-event handling
    if( window.matchMedia ) {  // Chrome
        mediaQueryList = window.matchMedia( 'print' );
        mediaQueryList.addListener( function( mql ) {
            if( mql.matches )
                on_beforePrint();
            else
                on_afterPrint();
        });
    }
    else { // Firefox
        window.onbeforeprint = on_beforePrint;
        window.onafterprint = on_afterPrint;
    }

});
