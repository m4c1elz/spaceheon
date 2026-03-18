'use strict'

import { scrapeSpaceheyBlog } from '../helpers/scrape-spacehey-blog.js'
import { postBlogToNapoleon } from '../helpers/post-blog-to-napoleon.js'
import { spinner } from '../spinner.js'

export async function migrateSingleBlog(
    blogId: string,
    spaceheySession: string,
    napoleonSession: string,
) {
    spinner.start('Fetching Spacehey Blog...')

    const blog = await scrapeSpaceheyBlog(blogId, spaceheySession)

    spinner.update('Posting blog to napoleon...')

    await postBlogToNapoleon(blog, napoleonSession)

    spinner.success('Blog posted! Check napoleon.')
}
