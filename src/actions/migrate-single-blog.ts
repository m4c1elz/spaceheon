'use strict'

import { scrapeSpaceheyBlog } from '../helpers/scrape-spacehey-blog'
import { postBlogToNapoleon } from '../helpers/post-blog-to-napoleon'
import { spinner } from '../constants'

export async function migrateSingleBlog(blogId: string) {
    spinner.start('Fetching Spacehey Blog...')

    const blog = await scrapeSpaceheyBlog(blogId)

    spinner.update('Posting blog to napoleon...')

    await postBlogToNapoleon(blog)

    spinner.success('Blog posted! Check napoleon.')
}
