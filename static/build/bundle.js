/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mikesilva_page_transition = __webpack_require__(1);

	var _mikesilva_page_transition2 = _interopRequireDefault(_mikesilva_page_transition);

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _jquery2.default)(document).on('ready', function () {
	    var pageTrans = new _mikesilva_page_transition2.default();
	    pageTrans.init();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	__webpack_require__(2);

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function MikeSilvaPageTransition() {}

	MikeSilvaPageTransition.prototype.init = function () {
	    this._transitionSetup();
	};

	/**
	*   Set smoothState options and apply to the smoothState container
	*/
	MikeSilvaPageTransition.prototype._transitionSetup = function () {
	    var options = {
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

	    this.smoothState = (0, _jquery2.default)('#js-smoothstate-container').smoothState(options).data('smoothState');
	};

	/**
	*   Before the page transition runs, add a class to the closest .tease to the event target
	*   @param  jQuery Obj $currentTarget   The target of the click event, provided by the smoothState object
	*   @param  jQuery Obj $container       The smoothState container, provided by the smoothState object
	*/
	MikeSilvaPageTransition.prototype._transitionBefore = function ($currentTarget, $container) {
	    $currentTarget.closest('.tease').addClass('is-target');
	};

	/**
	*   Once the page transition starts, add a class to the container and remove .has-exited
	*   @param  jQuery Obj $container    The smoothState container, provided by the smoothState object
	*/
	MikeSilvaPageTransition.prototype._transitionStart = function ($container) {
	    $container.addClass('is-exiting').removeClass('has-exited');
	};

	/**
	*   When the DOM is ready, added the new content to the smoothState container and set the body classes
	*   @param  jQuery Obj $currentTarget   The target of the click event, provided by the smoothState object
	*   @param  jQuery Obj $newContent      The new content loaded from the clicked link, provided by the smoothState object
	*/
	MikeSilvaPageTransition.prototype._transitionReady = function ($container, $newContent) {
	    $container.html($newContent);
	    this._addBodyClasses();
	};

	/**
	*   Once the DOM has been loaded, re-init the js objects
	*   @param  jQuery Obj $currentTarget   The target of the click event, provided by the smoothState object
	*   @param  jQuery Obj $newContent      The new content loaded from the clicked link, provided by the smoothState object
	*/
	MikeSilvaPageTransition.prototype._transitionAfter = function ($container, $newContent) {
	    $container.removeClass('is-exiting').addClass('has-exited');
	};

	/**
	*   Set the classes on the body. SmoothState doesn't have builtin ability to do this.
	*/
	MikeSilvaPageTransition.prototype._addBodyClasses = function () {
	    var stateURL = this.smoothState.href;
	    var doc = void 0,
	        matches = void 0,
	        classes = void 0;

	    if (stateURL in this.smoothState.cache) {
	        // Smooth state stores the full HTML document string in the `doc` property of the cached page object.
	        doc = this.smoothState.cache[stateURL].doc || false;
	        if (doc) {
	            // Brute force class extraction from the HTML string.
	            matches = doc.match(/<body.*class=['"](.*)['"]/);
	            if (matches) {
	                classes = matches[1];
	            }
	        }
	    }

	    // Replace body classes if we were able to extract them.
	    if (classes) {
	        (0, _jquery2.default)('body').attr('class', classes);
	    }
	};

	// export this file for use as a dependency later
	exports.default = MikeSilvaPageTransition;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * smoothState.js is a jQuery plugin to stop page load jank.
	 *
	 * This jQuery plugin progressively enhances page loads to
	 * behave more like a single-page application.
	 *
	 * @author  Miguel Ángel Pérez   reachme@miguel-perez.com
	 * @see     https://github.com/miguel-perez/jquery.smoothState.js
	 *
	 */

	;(function ($, window, document, undefined) {
	  'use strict';

	  /** Abort if browser does not support pushState */

	  if (!window.history.pushState) {
	    // setup a dummy fn, but don't intercept on link clicks
	    $.fn.smoothState = function () {
	      return this;
	    };
	    $.fn.smoothState.options = {};
	    return;
	  }

	  /** Abort if smoothState is already present **/
	  if ($.fn.smoothState) {
	    return;
	  }

	  var
	  /** Used later to scroll page to the top */
	  $body = $('html, body'),


	  /** Used in debug mode to console out useful warnings */
	  consl = window.console,


	  /** Plugin default options, will be exposed as $fn.smoothState.options */
	  defaults = {

	    /** If set to true, smoothState will log useful debug information instead of aborting */
	    debug: false,

	    /** jQuery selector to specify which anchors smoothState should bind to */
	    anchors: 'a',

	    /** jQuery selector to specify which forms smoothState should bind to */
	    forms: 'form',

	    /** A selector that defines what should be ignored by smoothState */
	    blacklist: '.no-smoothState',

	    /** If set to true, smoothState will prefetch a link's contents on hover */
	    prefetch: false,

	    /** The number of pages smoothState will try to store in memory */
	    cacheLength: 0,

	    /** Class that will be applied to the body while the page is loading */
	    loadingClass: 'is-loading',

	    /**
	     * A function that can be used to alter the ajax request settings before it is called
	     * @param  {Object} request jQuery.ajax settings object that will be used to make the request
	     * @return {Object}         Altered request object
	     */
	    alterRequest: function alterRequest(request) {
	      return request;
	    },

	    /** Run before a page load has been activated */
	    onBefore: function onBefore($currentTarget, $container) {},

	    /** Run when a page load has been activated */
	    onStart: {
	      duration: 0,
	      render: function render($container) {}
	    },

	    /** Run if the page request is still pending and onStart has finished animating */
	    onProgress: {
	      duration: 0,
	      render: function render($container) {}
	    },

	    /** Run when requested content is ready to be injected into the page  */
	    onReady: {
	      duration: 0,
	      render: function render($container, $newContent) {
	        $container.html($newContent);
	      }
	    },

	    /** Run when content has been injected and all animations are complete  */
	    onAfter: function onAfter($container, $newContent) {}
	  },


	  /** Utility functions that are decoupled from smoothState */
	  utility = {

	    /**
	     * Checks to see if the url is external
	     * @param   {string}    url - url being evaluated
	     * @see     http://stackoverflow.com/questions/6238351/fastest-way-to-detect-external-urls
	     *
	     */
	    isExternal: function isExternal(url) {
	      var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
	      if (typeof match[1] === 'string' && match[1].length > 0 && match[1].toLowerCase() !== window.location.protocol) {
	        return true;
	      }
	      if (typeof match[2] === 'string' && match[2].length > 0 && match[2].replace(new RegExp(':(' + { 'http:': 80, 'https:': 443 }[window.location.protocol] + ')?$'), '') !== window.location.host) {
	        return true;
	      }
	      return false;
	    },

	    /**
	     * Strips the hash from a url and returns the new href
	     * @param   {string}    href - url being evaluated
	     *
	     */
	    stripHash: function stripHash(href) {
	      return href.replace(/#.*/, '');
	    },

	    /**
	     * Checks to see if the url is an internal hash
	     * @param   {string}    href - url being evaluated
	     * @param   {string}    prev - previous url (optional)
	     *
	     */
	    isHash: function isHash(href, prev) {
	      prev = prev || window.location.href;

	      var hasHash = href.indexOf('#') > -1 ? true : false,
	          samePath = utility.stripHash(href) === utility.stripHash(prev) ? true : false;

	      return hasHash && samePath;
	    },

	    /**
	     * Translates a url string into a $.ajax settings obj
	     * @param  {Object|String} request url or settings obj
	     * @return {Object}        settings object
	     */
	    translate: function translate(request) {
	      var defaults = {
	        dataType: 'html',
	        type: 'GET'
	      };
	      if (typeof request === 'string') {
	        request = $.extend({}, defaults, { url: request });
	      } else {
	        request = $.extend({}, defaults, request);
	      }
	      return request;
	    },

	    /**
	     * Checks to see if we should be loading this URL
	     * @param   {string}    url - url being evaluated
	     * @param   {string}    blacklist - jquery selector
	     *
	     */
	    shouldLoadAnchor: function shouldLoadAnchor($anchor, blacklist) {
	      var href = $anchor.prop('href');
	      // URL will only be loaded if it's not an external link, hash, or blacklisted
	      return !utility.isExternal(href) && !utility.isHash(href) && !$anchor.is(blacklist) && !$anchor.prop('target');
	    },

	    /**
	     * Resets an object if it has too many properties
	     *
	     * This is used to clear the 'cache' object that stores
	     * all of the html. This would prevent the client from
	     * running out of memory and allow the user to hit the
	     * server for a fresh copy of the content.
	     *
	     * @param   {object}    obj
	     * @param   {number}    cap
	     *
	     */
	    clearIfOverCapacity: function clearIfOverCapacity(cache, cap) {
	      // Polyfill Object.keys if it doesn't exist
	      if (!Object.keys) {
	        Object.keys = function (obj) {
	          var keys = [],
	              k;
	          for (k in obj) {
	            if (Object.prototype.hasOwnProperty.call(obj, k)) {
	              keys.push(k);
	            }
	          }
	          return keys;
	        };
	      }

	      if (Object.keys(cache).length > cap) {
	        cache = {};
	      }

	      return cache;
	    },

	    /**
	     * Stores a document fragment into an object
	     * @param   {object}    object - object where it will be sotred
	     * @param   {string}    url - name of the entry
	     * @param   {string|document}    doc - entire html
	     * @param   {string}    id - the id of the fragment
	     *
	     */
	    storePageIn: function storePageIn(object, url, doc, id) {
	      var $newDoc = $(doc);

	      object[url] = { // Content is indexed by the url
	        status: 'loaded',
	        // Stores the title of the page, .first() prevents getting svg titles
	        title: $newDoc.filter('title').first().text(),
	        html: $newDoc.filter('#' + id) };
	      return object;
	    },

	    /**
	     * Triggers an 'allanimationend' event when all animations are complete
	     * @param   {object}    $element - jQuery object that should trigger event
	     * @param   {string}    resetOn - which other events to trigger allanimationend on
	     *
	     */
	    triggerAllAnimationEndEvent: function triggerAllAnimationEndEvent($element, resetOn) {

	      resetOn = ' ' + resetOn || '';

	      var animationCount = 0,
	          animationstart = 'animationstart webkitAnimationStart oanimationstart MSAnimationStart',
	          animationend = 'animationend webkitAnimationEnd oanimationend MSAnimationEnd',
	          eventname = 'allanimationend',
	          onAnimationStart = function onAnimationStart(e) {
	        if ($(e.delegateTarget).is($element)) {
	          e.stopPropagation();
	          animationCount++;
	        }
	      },
	          onAnimationEnd = function onAnimationEnd(e) {
	        if ($(e.delegateTarget).is($element)) {
	          e.stopPropagation();
	          animationCount--;
	          if (animationCount === 0) {
	            $element.trigger(eventname);
	          }
	        }
	      };

	      $element.on(animationstart, onAnimationStart);
	      $element.on(animationend, onAnimationEnd);

	      $element.on('allanimationend' + resetOn, function () {
	        animationCount = 0;
	        utility.redraw($element);
	      });
	    },

	    /** Forces browser to redraw elements */
	    redraw: function redraw($element) {
	      $element.height();
	    }
	  },


	  /** Handles the popstate event, like when the user hits 'back' */
	  onPopState = function onPopState(e) {
	    if (e.state !== null) {
	      var url = window.location.href,
	          $page = $('#' + e.state.id),
	          page = $page.data('smoothState');

	      if (page.href !== url && !utility.isHash(url, page.href)) {
	        page.load(url, false);
	      }
	    }
	  },


	  /** Constructor function */
	  Smoothstate = function Smoothstate(element, options) {
	    var
	    /** Container element smoothState is run on */
	    $container = $(element),


	    /** ID of the main container */
	    elementId = $container.prop('id'),


	    /** If a hash was clicked, we'll store it here so we
	     *  can scroll to it once the new page has been fully
	     *  loaded.
	     */
	    targetHash = null,


	    /** Used to prevent fetching while we transition so
	     *  that we don't mistakenly override a cache entry
	     *  we need.
	     */
	    isTransitioning = false,


	    /** Variable that stores pages after they are requested */
	    cache = {},


	    /** Url of the content that is currently displayed */
	    currentHref = window.location.href,


	    /**
	     * Clears a given page from the cache, if no url is provided
	     * it will clear the entire cache.
	     * @param  {String} url entry that is to be deleted.
	     */
	    clear = function clear(url) {
	      url = url || false;
	      if (url && cache.hasOwnProperty(url)) {
	        delete cache[url];
	      } else {
	        cache = {};
	      }
	      $container.data('smoothState').cache = cache;
	    },


	    /**
	     * Fetches the contents of a url and stores it in the 'cache' variable
	     * @param  {String|Object}   request  url or request settings object
	     * @param  {Function} callback function that will run as soon as it finishes
	     */
	    fetch = function fetch(request, callback) {

	      // Sets a default in case a callback is not defined
	      callback = callback || $.noop;

	      // Allows us to accept a url string or object as the ajax settings
	      var settings = utility.translate(request);

	      // Don't prefetch if we have the content already or if it's a form
	      if (cache.hasOwnProperty(settings.url) && typeof settings.data === 'undefined') {
	        return;
	      }

	      // Check the length of the cache and clear it if needed
	      cache = utility.clearIfOverCapacity(cache, options.cacheLength);

	      // Let other parts of the code know we're working on getting the content
	      cache[settings.url] = { status: 'fetching' };

	      // Make the ajax request
	      var ajaxRequest = $.ajax(settings);

	      // Store contents in cache variable if successful
	      ajaxRequest.success(function (html) {
	        utility.storePageIn(cache, settings.url, html, elementId);
	        $container.data('smoothState').cache = cache;
	      });

	      // Mark as error to be acted on later
	      ajaxRequest.error(function () {
	        cache[settings.url].status = 'error';
	      });

	      // Call fetch callback
	      if (callback) {
	        ajaxRequest.complete(callback);
	      }
	    },
	        repositionWindow = function repositionWindow() {
	      // Scroll to a hash anchor on destination page
	      if (targetHash) {
	        var $targetHashEl = $(targetHash, $container);
	        if ($targetHashEl.length) {
	          var newPosition = $targetHashEl.offset().top;
	          document.body.scrollTop = newPosition;
	        }
	        targetHash = null;
	      }
	    },


	    /** Updates the contents from cache[url] */
	    updateContent = function updateContent(url) {
	      // If the content has been requested and is done:
	      var containerId = '#' + elementId,
	          $newContent = cache[url] ? $(cache[url].html.html()) : null;

	      if ($newContent.length) {

	        // Update the title
	        document.title = cache[url].title;

	        // Update current url
	        $container.data('smoothState').href = url;

	        // Remove loading class
	        if (options.loadingClass) {
	          $body.removeClass(options.loadingClass);
	        }

	        // Call the onReady callback and set delay
	        options.onReady.render($container, $newContent);

	        $container.one('ss.onReadyEnd', function () {

	          // Allow prefetches to be made again
	          isTransitioning = false;

	          // Run callback
	          options.onAfter($container, $newContent);

	          repositionWindow();
	        });

	        window.setTimeout(function () {
	          $container.trigger('ss.onReadyEnd');
	        }, options.onReady.duration);
	      } else if (!$newContent && options.debug && consl) {
	        // Throw warning to help debug in debug mode
	        consl.warn('No element with an id of ' + containerId + ' in response from ' + url + ' in ' + cache);
	      } else {
	        // No content availble to update with, aborting...
	        window.location = url;
	      }
	    },


	    /**
	     * Loads the contents of a url into our container
	     * @param   {string}    url
	     * @param   {bool}      push - used to determine if we should
	     *                      add a new item into the history object
	     */
	    load = function load(request, push) {

	      var settings = utility.translate(request);

	      /** Makes this an optional variable by setting a default */
	      if (typeof push === 'undefined') {
	        push = true;
	      }

	      var
	      /** Used to check if the onProgress function has been run */
	      hasRunCallback = false,
	          callbBackEnded = false,


	      /** List of responses for the states of the page request */
	      responses = {

	        /** Page is ready, update the content */
	        loaded: function loaded() {
	          var eventName = hasRunCallback ? 'ss.onProgressEnd' : 'ss.onStartEnd';

	          if (!callbBackEnded || !hasRunCallback) {
	            $container.one(eventName, function () {
	              updateContent(settings.url);
	            });
	          } else if (callbBackEnded) {
	            updateContent(settings.url);
	          }

	          if (push) {
	            window.history.pushState({ id: elementId }, cache[settings.url].title, settings.url);
	          }
	        },

	        /** Loading, wait 10 ms and check again */
	        fetching: function fetching() {

	          if (!hasRunCallback) {

	            hasRunCallback = true;

	            // Run the onProgress callback and set trigger
	            $container.one('ss.onStartEnd', function () {

	              // Add loading class
	              if (options.loadingClass) {
	                $body.addClass(options.loadingClass);
	              }

	              options.onProgress.render($container);

	              window.setTimeout(function () {
	                $container.trigger('ss.onProgressEnd');
	                callbBackEnded = true;
	              }, options.onProgress.duration);
	            });
	          }

	          window.setTimeout(function () {
	            // Might of been canceled, better check!
	            if (cache.hasOwnProperty(settings.url)) {
	              responses[cache[settings.url].status]();
	            }
	          }, 10);
	        },

	        /** Error, abort and redirect */
	        error: function error() {
	          if (options.debug && consl) {
	            consl.log('There was an error loading: ' + settings.url);
	          } else {
	            window.location = settings.url;
	          }
	        }
	      };

	      if (!cache.hasOwnProperty(settings.url)) {
	        fetch(settings);
	      }

	      // Run the onStart callback and set trigger
	      options.onStart.render($container);

	      window.setTimeout(function () {
	        $body.scrollTop(0);
	        $container.trigger('ss.onStartEnd');
	      }, options.onStart.duration);

	      // Start checking for the status of content
	      responses[cache[settings.url].status]();
	    },


	    /**
	     * Binds to the hover event of a link, used for prefetching content
	     * @param   {object}    event
	     */
	    hoverAnchor = function hoverAnchor(event) {
	      var request,
	          $anchor = $(event.currentTarget);

	      if (utility.shouldLoadAnchor($anchor, options.blacklist) && !isTransitioning) {
	        event.stopPropagation();
	        request = utility.translate($anchor.prop('href'));
	        request = options.alterRequest(request);
	        fetch(request);
	      }
	    },


	    /**
	     * Binds to the click event of a link, used to show the content
	     * @param   {object}    event
	     */
	    clickAnchor = function clickAnchor(event) {
	      var $anchor = $(event.currentTarget);

	      // Ctrl (or Cmd) + click must open a new tab
	      if (!event.metaKey && !event.ctrlKey && utility.shouldLoadAnchor($anchor, options.blacklist)) {
	        var request = utility.translate($anchor.prop('href'));

	        // stopPropagation so that event doesn't fire on parent containers.
	        isTransitioning = true;
	        event.stopPropagation();
	        event.preventDefault();
	        targetHash = $anchor.prop('hash');

	        // Allows modifications to the request
	        request = options.alterRequest(request);

	        options.onBefore($anchor, $container);

	        load(request);
	      }
	    },


	    /**
	     * Binds to form submissions
	     * @param  {Event} event
	     */
	    submitForm = function submitForm(event) {
	      var $form = $(event.currentTarget);

	      if (!$form.is(options.blacklist)) {
	        event.preventDefault();
	        event.stopPropagation();

	        var request = {
	          url: $form.prop('action'),
	          data: $form.serialize(),
	          type: $form.prop('method')
	        };

	        isTransitioning = true;

	        request = options.alterRequest(request);

	        if (request.type.toLowerCase() === 'get') {
	          request.url = request.url + '?' + request.data;
	        }

	        // Call the onReady callback and set delay
	        options.onBefore($form, $container);

	        load(request);
	      }
	    },


	    /**
	     * Binds all events and inits functionality
	     * @param   {object}    event
	     */
	    bindEventHandlers = function bindEventHandlers($element) {

	      $element.on('click', options.anchors, clickAnchor);

	      $element.on('submit', options.forms, submitForm);

	      if (options.prefetch) {
	        $element.on('mouseover touchstart', options.anchors, hoverAnchor);
	      }
	    },


	    /** Restart the container's css animations */
	    restartCSSAnimations = function restartCSSAnimations() {
	      var classes = $container.prop('class');
	      $container.removeClass(classes);
	      utility.redraw($container);
	      $container.addClass(classes);
	    };

	    /** Merge defaults and global options into current configuration */
	    options = $.extend({}, $.fn.smoothState.options, options);

	    /** Sets a default state */
	    if (window.history.state === null) {
	      window.history.replaceState({ id: elementId }, document.title, currentHref);
	    }

	    /** Stores the current page in cache variable */
	    utility.storePageIn(cache, currentHref, document.documentElement.outerHTML, elementId);

	    /** Bind all of the event handlers on the container, not anchors */
	    utility.triggerAllAnimationEndEvent($container, 'ss.onStartEnd ss.onProgressEnd ss.onEndEnd');

	    /** Bind all of the event handlers on the container, not anchors */
	    bindEventHandlers($container);

	    /** Public methods */
	    return {
	      href: currentHref,
	      cache: cache,
	      clear: clear,
	      load: load,
	      fetch: fetch,
	      restartCSSAnimations: restartCSSAnimations
	    };
	  },


	  /** Returns elements with smoothState attached to it */
	  declaresmoothState = function declaresmoothState(options) {
	    return this.each(function () {
	      var tagname = this.tagName.toLowerCase();
	      // Checks to make sure the smoothState element has an id and isn't already bound
	      if (this.id && tagname !== 'body' && tagname !== 'html' && !$.data(this, 'smoothState')) {
	        // Makes public methods available via $('element').data('smoothState');
	        $.data(this, 'smoothState', new Smoothstate(this, options));
	      } else if (!this.id && consl) {
	        // Throw warning if in debug mode
	        consl.warn('Every smoothState container needs an id but the following one does not have one:', this);
	      } else if ((tagname === 'body' || tagname === 'html') && consl) {
	        // We dont support making th html or the body element the smoothstate container
	        consl.warn('The smoothstate container cannot be the ' + this.tagName + ' tag');
	      }
	    });
	  };

	  /** Sets the popstate function */
	  window.onpopstate = onPopState;

	  /** Makes utility functions public for unit tests */
	  $.smoothStateUtility = utility;

	  /** Defines the smoothState plugin */
	  $.fn.smoothState = declaresmoothState;

	  /* expose the default options */
	  $.fn.smoothState.options = defaults;
	})(jQuery, window, document);

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ }
/******/ ]);