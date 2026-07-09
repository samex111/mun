import { sanityFetch } from "../client";
import {
  BLOG_POSTS_QUERY,
  FEATURED_BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
} from "./queries";
import type { Blog } from "./types";

export class BlogService {
  static async getBlogPosts(): Promise<Blog[]> {
    return sanityFetch<Blog[]>({
      query: BLOG_POSTS_QUERY,
      tags: ["blog"],
    });
  }

  static async getFeaturedBlogPosts(): Promise<Blog[]> {
    return sanityFetch<Blog[]>({
      query: FEATURED_BLOG_POSTS_QUERY,
      tags: ["blog"],
    });
  }

  static async getBlogPostBySlug(slug: string): Promise<Blog | null> {
    return sanityFetch<Blog | null>({
      query: BLOG_POST_BY_SLUG_QUERY,
      params: { slug },
      tags: ["blog", `blog:${slug}`],
    });
  }
}
