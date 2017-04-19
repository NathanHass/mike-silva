import $ from 'jquery';

function MikeSilvaNav() {
    this.$body          = $('body');
    this.$navToggle     = $('.js-nav-toggle');
    this.navActiveClass = 'nav-is-active';
    this.navMinWidth    = 500;
    this.w              = $(window);
    this.wWidth         = this.w.width();
}

/**
*
*/
MikeSilvaNav.prototype.init = function() {
    this.$navToggle.click( ()=> {
        this.toggleNav()
    })

    this.w.resize( ()=> {
        this.wWidth = this.w.width();
        if (this.wWidth >= this.navMinWidth && this.$body.hasClass(this.navActiveClass)) {
            this.closeNav();
        }
    });
};

MikeSilvaNav.prototype.toggleNav = function() {
    if ( this.wWidth < this.navMinWidth ) {
        if (this.$body.hasClass(this.navActiveClass)) {
            this.closeNav();
        } else {
            this.openNav();
        }
    }
};


MikeSilvaNav.prototype.closeNav = function() {
    this.$body.removeClass(this.navActiveClass)
    this.$navToggle.text('Menu');
};


MikeSilvaNav.prototype.openNav = function() {
    this.$body.addClass(this.navActiveClass)
    this.$navToggle.text('Close');
};


export default MikeSilvaNav;
