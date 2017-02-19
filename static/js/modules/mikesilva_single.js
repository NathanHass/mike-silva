import $ from 'jquery';
// import Utilities from 'mikesilva_utilities';
import  plyr from 'plyr'

function MikeSilvaSingle() {
    this.$videoMod      = $('.post__video-mod');
    this.plyrOptions    = {};
    this.player;
}

/**
*
*/
MikeSilvaSingle.prototype.init = function() {
    // if (Pl) {}
    // debugger;
    if ( this.$videoMod.length > 0 ) {
        this._initPlyr();

        if ($('#js-smoothstate-container').hasClass('is-exiting')) {
            console.log('test');
            this._playPlyr();
        }
    }
};


MikeSilvaSingle.prototype._initPlyr = function() {
    this.player = new plyr.setup(document.querySelectorAll('.js-player'), this.options);
};


MikeSilvaSingle.prototype._playPlyr = function() {
    // debugger;
    // this.player[0].play();
};


export default MikeSilvaSingle;
