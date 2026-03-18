import { Blog } from '../types'

export async function postBlogToNapoleon(
    blog: Blog,
    napoleonSessionId: string,
) {
    const form = {
        subject: blog.title,
        content: blog.blogHtml,
        category: '1',
    }

    const data = new URLSearchParams(form).toString().concat('&submit=')

    await fetch('https://napoleonite.space/blog/newpost.php', {
        method: 'POST',
        headers: {
            Cookie: `PHPSESSID=${napoleonSessionId}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
    })
}
