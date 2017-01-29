import $ from 'jquery';
import 'jquery.smoothState';
import Mikesilva from '../mikesilva';

function MikeSilvaPageTransition() {}

MikeSilvaPageTransition.prototype.init = function () {
    this._transitionSetup();
};

/**
*   Set smoothState options and apply to the smoothState container
*/
MikeSilvaPageTransition.prototype._transitionSetup = function() {
    let options = {
        prefetch: false,
        onBefore: this._transitionBefore,
        onStart: {
            duration: 0, // Duration of our animation
            render: this._transitionStart
        },
        onReady: {
            duration: 0,
            render: this._transitionReady.bind(this)
        },
        onAfter: this._transitionAfter
    };

   this.smoothState = $('#js-smoothstate-container').smoothState(options).data('smoothState');
};

/**
*   Before the page transition runs, add a class to the closest .tease to the event target
*   @param  jQuery Obj $currentTarget   The target of the click event, provided by the smoothState object
*   @param  jQuery Obj $container       The smoothState container, provided by the smoothState object
*/
MikeSilvaPageTransition.prototype._transitionBefore = function($currentTarget, $container) {
    $currentTarget.closest('.tease').addClass('is-target');
};

/**
*   Once the page transition starts, add a class to the container and remove .has-exited
*   @param  jQuery Obj $container    The smoothState container, provided by the smoothState object
*/
MikeSilvaPageTransition.prototype._transitionStart = function($container) {
    $container.addClass('is-exiting').removeClass('has-exited');
};

/**
*   When the DOM is ready, added the new content to the smoothState container and set the body classes
*   @param  jQuery Obj $currentTarget   The target of the click event, provided by the smoothState object
*   @param  jQuery Obj $newContent      The new content loaded from the clicked link, provided by the smoothState object
*/
MikeSilvaPageTransition.prototype._transitionReady = function($container, $newContent) {
    $container.html($newContent);
    this._addBodyClasses();
};

/**
*   Once the DOM has been loaded, re-init the js objects
*   @param  jQuery Obj $currentTarget   The target of the click event, provided by the smoothState object
*   @param  jQuery Obj $newContent      The new content loaded from the clicked link, provided by the smoothState object
*/
MikeSilvaPageTransition.prototype._transitionAfter = function($container, $newContent) {
    Mikesilva.init();
    $container.removeClass('is-exiting').addClass('has-exited');
};

/**
*   Set the classes on the body. SmoothState doesn't have builtin ability to do this.
*/
MikeSilvaPageTransition.prototype._addBodyClasses = function() {
    let stateURL = this.smoothState.href;
    let doc, matches, classes;

    if ( stateURL in this.smoothState.cache ) {
        // Smooth state stores the full HTML document string in the `doc` property of the cached page object.
        doc = this.smoothState.cache[stateURL].doc || false;
        if ( doc ) {
            // Brute force class extraction from the HTML string.
            matches = doc.match( /<body.*class=['"](.*)['"]/ );
            if ( matches ) {
                classes = matches[1];
            }
        }
    }

    // Replace body classes if we were able to extract them.
    if ( classes ) {
        $('body').attr( 'class', classes );
    }
};

// export this file for use as a dependency later
export default MikeSilvaPageTransition;
