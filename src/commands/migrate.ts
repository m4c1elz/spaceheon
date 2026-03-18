import enquirer from 'enquirer'
import { migrateSingleBlog } from '../actions/migrate-single-blog'
import { getUserKeys } from '../helpers/keys'

export async function migrate() {
    try {
        const { napoleonKey, spaceheyKey } = await getUserKeys()

        const { blogId } = await enquirer.prompt<{ blogId: string }>({
            type: 'input',
            name: 'blogId',
            message: 'Insert the spacehey blog ID to post to napoleon:',
        })

        migrateSingleBlog(blogId, spaceheyKey, napoleonKey)
    } catch (error) {
        console.log(
            'Keys not provided. Please use "spaceheon setup" and try again.',
        )
    }
}
