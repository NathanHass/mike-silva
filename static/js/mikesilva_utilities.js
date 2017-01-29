import $ from 'jquery';

var MikeSilvaUtilities = {

    /**
    *   Set backgraound image of image element's parent.
    *   This technique adds accessibility background images.
    *   @param  jQuery Obj  $image A jQuery image object
    */
    swapImage: function($image) {
        let imgSrc     = $image.attr('src');
        let $imgParent = $image.parent();

        $imgParent.css({
            'background-image': `url('${imgSrc}')`
        }).addClass('show-bg-image');
    },

    /**
    *   If the image has already been cached, use that instead of loading again.
    *   @param  jQuery Obj  $image A jQuery image object
    */
    maybeUseCachedImage: function($image) {
        if ($image[0].complete) {
            $image.load();
        }
    },

    /**
    *   Get data from server to check if user is signed in
    *   @param  Function   cb  Pass a callback to handle the consequences of the response received
    *   @return String  Returns whether or not the WP user is signed in.
    */
    isWpUserSignedIn: function(cb) {
        let data = { action: 'is_user_logged_in' };

        $.post("/wp-admin/admin-ajax.php", data, cb);
    },

    /** Returns a function, that, as long as it continues to be invoked, will not
    * be triggered. The function will be called after it stops being called for
    * N milliseconds. If `immediate` is passed, trigger the function on the
    * leading edge, instead of the trailing.
    * https://davidwalsh.name/javascript-debounce-function
    */
    debounce: function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
};

export default MikeSilvaUtilities;
