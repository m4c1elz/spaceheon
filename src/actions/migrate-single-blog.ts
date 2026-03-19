'use strict'

import { scrapeSpaceheyBlog } from '../helpers/scrape-spacehey-blog'
import { postBlogToNapoleon } from '../helpers/post-blog-to-napoleon'
import { spinner } from '../constants'

export async function migrateSingleBlog(blogId: string) {
    spinner.start('Fetching Spacehey Blog...')

    const blogResult = await scrapeSpaceheyBlog(blogId)

    if (blogResult.isErr()) {
        spinner.error(blogResult.error.message)
        return
    }

    spinner.update('Posting blog to napoleon...')

    const postBlogResult = await postBlogToNapoleon(blogResult.value)

    if (postBlogResult.isErr()) {
        spinner.error(postBlogResult.error.message)
        return
    }

    spinner.success('Blog posted! Check napoleon.')
}
