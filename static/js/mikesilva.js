import PageTrans from './modules/mikesilva_page_transition';
import Gradient from './modules/mikesilva_gradient_polyfill';
import Homepage from './modules/mikesilva_homepage';
import Single from './modules/mikesilva_single';
import $ from 'jquery';


var MikeSilva = {

    /**
    *   Create site behaviors by initializing page transitions and other modules.
    */
    create: function() {
        let pageTrans = new PageTrans();
        pageTrans.init();
        this.init();
    },

    /**
    *   Initialize js modules
    */
    init: function() {
        this.modInstances = [
            new Homepage(),
            new Single(),
            new Gradient()
        ];

        for ( let instance of this.modInstances ) {
            instance.init();
        }
    }
};

export default MikeSilva;
