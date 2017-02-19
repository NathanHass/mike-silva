import $ from 'jquery';
import Utilities from '../mikesilva_utilities';

function MikeSilvaHomepage() {
    this.$topperImage       = $('.hp__img');
    this.$topperTeases      = $('.js-hp-trigger');
    this.$featureArea       = $('.hp__img-bg');
    this.$featureImageArea  = $('.hp__img-bg-img');

    this.$workImages        = $('.work-tease__img');
}



/**
*   Initialize homepage topper object
*/
MikeSilvaHomepage.prototype.init = function() {
    this.$topperTeases.each( function() {
        var img = new Image();
        img.src = this.dataset.image;
    });

    if ( this.$topperImage.length > 0 ) {
        this.$topperImage
            .off()
            .on('load', Utilities.swapImage.bind(this, this.$topperImage))
            .each( Utilities.maybeUseCachedImage.bind(this, this.$topperImage));
    }

    if (this.$workImages.length > 0) {
        this.$workImages.each(function() {
            let $this = $(this);
            $this.off()
            .on('load', Utilities.swapImage.bind(this, $this))
            .each( Utilities.maybeUseCachedImage.bind(this, $this));
        })
    }

    // TODO: Init the following functions on hover!

    if ( this.$topperTeases.length > 0 ) {

        // this._getActiveTeaseData($('.js-hp-trigger')[0]);
        this._setFeaturedTopper();

        if ( $( window ).width() >= 600) {
            $( document )
                .off()
                .on('mouseenter focus', '.js-hp-trigger' , this._maybeUpdateActiveTeaseData.bind(this));
            // this.$featureImageArea
            //     .off()
            //     .on('oanimationend animationend webkitAnimationEnd', this._setFeaturedTopper.bind(this));
        }
    }
};



/**
*   Gets the featured tease data from the tease and adds active class to that tease
*/
MikeSilvaHomepage.prototype._getActiveTeaseData = function(currentTease) {
        // this.currentImageAlt    = currentTease.dataset.imageAlt;
        this.currentImage       = currentTease.dataset.image;
        this.currentLink       = currentTease.href;
        this.$topperTeases.removeClass('tease-is-active');
        currentTease.classList.add('tease-is-active');

        // // set class that triggers animate out
        this.$featureImageArea.addClass('topper-trans-out').removeClass('topper-trans-in');
}

/**
*   inits getActiveTeaseData if current tease isn't active
*/
MikeSilvaHomepage.prototype._maybeUpdateActiveTeaseData = function(evt) {
    if ( !evt.currentTarget.classList.contains('tease-is-active') ) {
        evt.currentTarget.focus();
        this._getActiveTeaseData(evt.currentTarget);
        this._setFeaturedTopper();
        $('body').addClass('teases-are-active');
    }
};


/**
*   Insert the current tease data into the featured topper
*/
MikeSilvaHomepage.prototype._setFeaturedTopper = function() {
    this.$topperImage.attr('src', this.currentImage);
    this.$featureImageArea.css({'background-image': `url('${this.currentImage}')`});
    this.$featureImageArea.attr('href', this.currentLink);
    // this.$topperImage.attr('alt', this.currentImageAlt);

    // add class to fade in once content has loaded
    this.$featureImageArea.removeClass('topper-trans-out').addClass('topper-trans-in');
};

export default MikeSilvaHomepage;
