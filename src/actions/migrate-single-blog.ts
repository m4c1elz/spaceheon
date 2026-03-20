'use strict'

import { scrapeSpaceheyBlog } from '../helpers/scrape-spacehey-blog'
import { postBlogToNapoleon } from '../helpers/post-blog-to-napoleon'
import { spinner } from '../constants'
import { AppError } from '../types'
import { err, ok, Result } from 'neverthrow'

export async function migrateSingleBlog(
    blogId: string,
): Promise<Result<void, AppError>> {
    spinner.start('Fetching Spacehey Blog...')

    const blogResult = await scrapeSpaceheyBlog(blogId)

    if (blogResult.isErr()) {
        return err(blogResult.error)
    }

    spinner.update('Posting blog to napoleon...')

    const postBlogResult = await postBlogToNapoleon(blogResult.value)

    if (postBlogResult.isErr()) {
        return err(postBlogResult.error)
    }

    return ok()
}
