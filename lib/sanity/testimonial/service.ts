import { sanityFetch } from "../client";
import { TESTIMONIALS_QUERY } from "./queries";
import type { Testimonial } from "./types";

export class TestimonialService {
  static async getTestimonials(): Promise<Testimonial[]> {
    return sanityFetch<Testimonial[]>({
      query: TESTIMONIALS_QUERY,
      tags: ["testimonial"],
    });
  }
}
