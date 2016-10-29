import PageTrans from './modules/mikesilva_page_transition';
import $ from 'jquery';

$( document ).on( 'ready', function( ) {
    let pageTrans = new PageTrans();
    pageTrans.init();
});
