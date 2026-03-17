export async function postBlogToNapoleon(blog, napoleonSessionId) {
    const formData = new FormData()

    formData.set('subject', blog.title)
    formData.set('content', blog.blogHtml)
    formData.set('category', 1)

    const data = new URLSearchParams(formData).toString().concat('&submit=')

    await fetch('https://napoleonite.space/blog/newpost.php', {
        method: 'POST',
        headers: {
            Cookie: `PHPSESSID=${napoleonSessionId}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
    })
}
