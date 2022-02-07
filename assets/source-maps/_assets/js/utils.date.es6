
/*
    Note: datejs lib used for `Date.toString( format )` and `Date.parseExact( str, formats )` functionality.
    * Source: https://github.com/abritinthebay/datejs
    * Doku: https://github.com/datejs/Datejs
 */

const translation = {
    year: { 'de': 'Jahr', 'en-US': 'year' },
    years: { 'de': 'Jahre', 'en-US': 'years' },
    month: { 'de': 'Monat', 'en-US': 'month' },
    months: { 'de': 'Monate', 'en-US': 'months' },
    and_joint: { 'de': 'und', 'en-US': 'and' },
    since: { 'de': 'seit', 'en-US': 'since' }
};

const dateFormats_year = ['yyyy'];
const dateFormats_month = ['yyyy-MM', 'yyyy-M'];
const dateFormats_day = ['yyyy-MM-dd', 'yyyy-M-d'];
const dateFormats = [...dateFormats_day, ...dateFormats_month, ...dateFormats_year];

function diffMonths( from, to ) {
    const diff = to.getTime() - from.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return days / (365.2425/12.0);
}

function durationText( duration, lang ) {
    let phrases = [];

    if( duration.years === 1 )
        phrases.push( '1 ' + translation.year[lang] );
    else if( duration.years > 1 )
        phrases.push( duration.years + ' ' + translation.years[lang] );

    if( duration.months === 1 )
        phrases.push( '1 ' + translation.month[lang] );
    else if( duration.months > 1 )
        phrases.push( duration.months + ' ' + translation.months[lang] );

    return phrases.join( ' ' + translation.and_joint[lang] + ' ' );
}

function workedDuration( months ) {
    let m = Math.round( months );
    const d = (months - m) * (365.2425/12.0);
    if( Math.round( d ) >= 5.0 ) // 5+ days -> round up a month
        m++;
    const y = Math.floor( m / 12.0 );
    if( m === 0 )
        m = 1; // 1 month is minimum
    else
        m -= y * 12;
    return { years: y, months: m };
}

function getFormat( lang, level ) {
    switch( lang ) {
        case 'de':
            switch( level ) {
                case 1: return 'yyyy';
                case 3: return 'd. MMM yyyy';
                default: return 'MMM yyyy';
            }
        default:
            switch( level ) {
                case 1: return 'yyyy';
                case 3: return 'MMM d, yyyy';
                default: return 'MMM, yyyy';
            }
    }
}

function formatDate( date, lang, level ) {
    return date.toString( getFormat( lang, level ) );
}

function rangeText( from, to, lang, level ) {
    if( to === undefined )
        return translation.since[lang] + ' ' + formatDate( from, lang, level );
    else {
        dateFrom = formatDate( from, lang, level );
        dateTo = formatDate( to, lang, level );
        if( dateFrom !== dateTo )
            return formatDate( from, lang, level ) + ' &#8211; ' + formatDate( to, lang, level );
        else
            return formatDate( from, lang, level );
    }
}

function parseDate( text ) {
    return Date.parseExact( text, dateFormats );
}

function parseLatestPossibleDate( text ) {
    let date = Date.parseExact( text, dateFormats_day );
    if( date !== null )
        return date;

    date = Date.parseExact( text, dateFormats_month );
    if( date !== null ) {
        return date.moveToLastDayOfMonth();
    }

    date = Date.parseExact( text, dateFormats_year );
    if( date !== null ) {
        date.set( { month: 11, day: 1 } );
        return date.moveToLastDayOfMonth();
    }

    return null;
}
