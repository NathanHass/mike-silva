<?php

/**
*   Custom TimberSite subclass for Mike Silva.
*/
class Ms_Site extends TimberSite {

  function __construct() {
    add_action( 'after_setup_theme', array( $this, 'after_setup_theme' ) );
    add_action( 'wp_enqueue_scripts', array( $this, 'load_scripts' ) );

    add_filter( 'timber_context', array( $this, 'add_to_context' ) );
    add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
    add_filter( 'the_content', array( $this, 'add_classes_to_linked_images' ), 100, 1);
    add_filter( 'manage_media_columns', array( $this, 'column_id' ) );
    add_filter( 'manage_media_custom_column', array( $this, 'column_id_row' ), 10, 2 );

    add_action( 'init', array( $this, 'register_post_types' ) );
    add_action( 'init', array( $this, 'register_taxonomies' ) );
    add_action( 'get_image_alt', array( $this, 'get_image_alt' ), 100, 1);

    parent::__construct();
  }

  /**
  *   Register support for certain theme features
  */
  function after_setup_theme() {
    add_theme_support( 'post-formats' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'menus' );
  }

  /**
  *   Enqueue theme scripts
  */
  function load_scripts() {
    wp_enqueue_script( 'modernizr', get_stylesheet_directory_uri() . '/static/build/modernizr.js', array() );
    wp_enqueue_script( 'jquery' );
  }

  /**
  *   Add custom post types to theme
  */
  function register_post_types() {
  }

  /**
  *   Add custom taxonomies to theme
  */
  function register_taxonomies() {
  }

  /**
  *   Add global variables to theme
  */
  function add_to_context( $context ) {
    $context['foo'] = 'bar';
    $context['stuff'] = 'I am a value set in your functions.php file';
    $context['notes'] = 'These values are available everytime you call Timber::get_context();';
    $context['menu'] = new TimberMenu();
    $context['site'] = $this;
    return $context;
  }

  /**
  *   Add custom Twig functions and filters to Timber's Twig environment.
  */
  function add_to_twig( $twig ) {
    $twig->addExtension( new Twig_Extension_StringLoader() );
    $twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
    return $twig;
  }

  /**
  *
  */
  function add_classes_to_linked_images($html) {
    $classes = 'media-img'; // can do multiple classes, separate with space

    $patterns = array();
    $replacements = array();

    $patterns[0] = '/<a(?![^>]*class)([^>]*)>\s*<img([^>]*)>\s*<\/a>/'; // matches img tag wrapped in anchor tag where anchor tag where anchor has no existing classes
    $replacements[0] = '<a\1 class="' . $classes . '"><img\2></a>';

    $patterns[1] = '/<a([^>]*)class="([^"]*)"([^>]*)>\s*<img([^>]*)>\s*<\/a>/'; // matches img tag wrapped in anchor tag where anchor has existing classes contained in double quotes
    $replacements[1] = '<a\1class="' . $classes . ' \2"\3><img\4></a>';

    $patterns[2] = '/<a([^>]*)class=\'([^\']*)\'([^>]*)>\s*<img([^>]*)>\s*<\/a>/'; // matches img tag wrapped in anchor tag where anchor has existing classes contained in single quotes
    $replacements[2] = '<a\1class="' . $classes . ' \2"\3><img\4></a>';

    $html = preg_replace($patterns, $replacements, $html);

    return $html;
  }


}// end class

new Ms_Site();
