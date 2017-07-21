<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

if ( ! class_exists( 'Timber' ) ) {
  echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
  return;
}

$context   = Timber::get_context();
// $context['stream'] = new TimberStream(103);
$context['stream'] = new TimberStream(261);
$templates = array( 'page-work.twig' );

// $posts = query_posts(array(
//   'posts_per_page' => 300,
//   'post_status'    => 'publish',
//   'post_type'      => 'post',
//   'paged'          => $paged
// ));

// $context['posts']         = Timber::get_posts();
// $context['pagination']    = Timber::get_pagination(array('mid_size' => 2));
// $context['total_pages']   = $wp_query->max_num_pages;
// $context['has_page_nums'] = true;
Timber::render( $templates, $context );
