import enquirer from 'enquirer'
import { migrateSingleBlog } from '../actions/migrate-single-blog'
import { getUserKeys } from '../helpers/keys'
import { spinner } from '../constants'

export async function migrate() {
    try {
        // checking if keys exists
        await getUserKeys()

        const { blogId } = await enquirer.prompt<{ blogId: string }>({
            type: 'input',
            name: 'blogId',
            message: 'Insert the spacehey blog ID to post to napoleon:',
        })

        migrateSingleBlog(blogId)
    } catch (error) {
        spinner.error(
            'Keys not provided. Please use "spaceheon setup" and try again.',
        )
    }
}
