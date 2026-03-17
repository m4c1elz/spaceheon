import { load } from 'cheerio'

export async function getSpaceheyBlogIds(userId, userSession) {
    const response = await fetch(
        'https://blog.spacehey.com/user?id='.concat(userId),
        {
            headers: {
                Cookie: 'SPACEHEY_SESSID='.concat(userSession),
            },
        },
    )

    const html = await response.text()

    const $ = load(html)

    const entries = $('.entry:not(:first-child) .title a')
        .get()
        .map(entry => {
            return entry.attributes
                .find(attr => attr.name == 'href')
                .value.split('=')[1]
        })

    return entries
}
