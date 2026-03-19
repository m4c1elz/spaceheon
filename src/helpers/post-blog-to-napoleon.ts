import { Blog } from '../types'
import { getUserKeys } from './keys'

export async function postBlogToNapoleon(blog: Blog) {
    const form = {
        subject: blog.title,
        content: blog.blogHtml,
        category: '1',
    }

    const data = new URLSearchParams(form).toString().concat('&submit=')

    const { napoleonKey } = await getUserKeys()

    await fetch('https://napoleonite.space/blog/newpost.php', {
        method: 'POST',
        headers: {
            Cookie: `PHPSESSID=${napoleonKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
    })
}
