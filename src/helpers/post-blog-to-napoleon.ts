import { AppError, Blog } from '../types'
import { getUserKeys } from './keys'
import { err, ok, Result } from 'neverthrow'

export async function postBlogToNapoleon(
    blog: Blog,
): Promise<Result<void, AppError>> {
    const form = {
        subject: blog.title,
        content: blog.blogHtml,
        category: '1',
    }

    const data = new URLSearchParams(form).toString().concat('&submit=')

    const keysResult = await getUserKeys()

    if (keysResult.isErr()) {
        return err(keysResult.error)
    }

    const { napoleonKey } = keysResult.value

    const response = await fetch('https://napoleonite.space/blog/newpost.php', {
        method: 'POST',
        headers: {
            Cookie: `PHPSESSID=${napoleonKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
    })

    if (!response.ok) {
        return err({
            message: `ERROR: Blog could not be posted -  [HTTP ERROR ${response.status} - ${response.statusText}`,
        })
    }

    return ok()
}
