import { load } from 'cheerio'

const initialBlogText = `
<b>
    hi! if you can see this, please ignore. im a web dev trying to figure out a 
    way to automatically migrate spacehey blogs to napoleon. will probably talk 
    more about it on the future.
    <br>
    <br>
    <i>Posted originally in: {originalTimestamp}</i>
    <br>
    <i>Kudos count on spacehey: {kudosCount}</i>
</b>
<br>`

export async function scrapeSpaceheyBlog(blogId, userSession) {
    const response = await fetch(
        'https://blog.spacehey.com/entry?id=' + blogId,
        {
            headers: {
                Cookie: 'SPACEHEY_SESSID='.concat(userSession),
            },
        },
    )

    if (!response.ok) {
        console.error('SOMETHING HAPPENED - HTTP CODE ' + response.status)
    }

    const html = await response.text()

    const $ = load(html)

    $('.content style').remove()

    const title = $('h1.title').text()
    const blogHtml = '' + $('.content').html().trim()
    const originalTimestamp = $('time.ago').html()
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

    return {
        title,
        blogHtml: fullHtml,
        originalTimestamp,
        kudosCount,
    }
}
