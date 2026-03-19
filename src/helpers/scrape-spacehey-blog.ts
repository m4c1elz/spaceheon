import { load } from 'cheerio'
import { getUserKeys } from './keys'
import { err, ok, Result } from 'neverthrow'
import { Blog } from '../types'

const initialBlogText = `
<b style="text-align: center">
    This blog post was migrated directly from spacehey through 
        <a href="https://github.com/m4c1elz/spaceheon" style="color: #346cf9; text-decoration: underline">
            spaceheon.
        </a>
    <br>
    <br>
    <i>Posted originally in: {originalTimestamp}</i>
    <br>
    <i>Kudos count on spacehey: {kudosCount}</i>
</b>
<br>`

export async function scrapeSpaceheyBlog(
    blogId: string,
): Promise<Result<Blog, { message: string }>> {
    const { spaceheyKey } = await getUserKeys()

    const response = await fetch(
        `https://blog.spacehey.com/entry?id=${blogId}`,
        {
            headers: {
                Cookie: `SPACEHEY_SESSID=${spaceheyKey}`,
            },
        },
    )

    if (!response.ok) {
        return err({
            message: `Error while fetching data - [HTTP STATUS ${response.status} - ${response.statusText}]`,
        })
    }

    const html = await response.text()

    const $ = load(html)

    $('.content style').remove()

    const title = $('h1.title').text()
    const blogHtml = '' + $('.content').html()?.trim()
    const originalTimestamp = Number($('time.ago').html())
    const kudosCount = $('#kudos b').text()

    const fullHtml = initialBlogText
        .trim()
        .replace(
            '{originalTimestamp}',
            new Date(originalTimestamp * 1000).toDateString(),
        )
        .replace('{kudosCount}', kudosCount)
        .concat(blogHtml)
        .replace(/\s+/g, ' ')
        .trim()

    return ok({
        title,
        blogHtml: fullHtml,
        originalTimestamp,
        kudosCount,
    })
}
