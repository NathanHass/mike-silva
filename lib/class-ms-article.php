<?php

/**
 * Custom class for faces tagged article
 */
class MS__Article {

  /**
  * Query args for faces posts
  */
  protected static $args = array(
    'posts_per_page' => 1
  );

  /**
  * Get next faces post
  */
  function get_next() {
    self::$args['order'] = 'ASC';

    $adj_post  = get_adjacent_post(true, '', false);
    $next_post = $adj_post ? $adj_post : Timber::get_post( self::$args );

    return self::build_post_obj($next_post);
  }

  /**
  * Get previous faces post
  */
  function get_prev() {
    self::$args['order'] = 'DESC';

    $adj_post  = get_adjacent_post(true, '', true);
    $prev_post = $adj_post ? $adj_post : Timber::get_post( self::$args );

    return self::build_post_obj($prev_post);
  }

  /**
  * Build post object to return for template rendering
  */
  function build_post_obj($post) {
    return array(
      'link' => get_permalink($post),
      'post' => $post,
      'thumbnail' => get_the_post_thumbnail_url($post, 'full')
    );
  }

} // end class
