// Note: $(document).ready() was not used intentionally to guarantee that this code runs before Hyphenopoly
document.addEventListener("DOMContentLoaded", function() {
    const lang = $(document.documentElement).attr('lang');

    const forename = "Markus";
    const surname = "Quade";

    // bibliography
    $(".bibliography span").each(function() {
        let text = $(this).html();

        // highlight cv owner in author mentions
        if( forename.length > 0 && surname.length > 0 )
        {
            const name1 = forename + ' ' + surname;
            const name2 = forename[0] + '. ' + surname;
            const name3 = surname + ' ' + forename[0] + '.';
            text = text
                .replace(name1, '<strong>' + name1 + '</strong>')
                .replace(name2, '<strong>' + name2 + '</strong>')
                .replace(name3, '<strong>' + name3 + '</strong>')
                ;
        }

        // tag date (to allow css manipulation)
        text = text
            .replace(/, ((?:\w{3}(?:\. |-))?\d{4})/gi, ', <small>$1</small>')
            ;

        $(this).html( text );
    });
});
