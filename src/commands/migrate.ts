import enquirer from 'enquirer'
import { migrateSingleBlog } from '../actions/migrate-single-blog'
import { getUserKeys } from '../helpers/keys'
import { spinner } from '../constants'

export async function migrate() {
    // checking if keys exists
    const result = await getUserKeys()

    if (result.isErr()) {
        spinner.error(
            'Keys not provided. Please run "spaceheon setup" and try again.',
        )
    }

    const { blogId } = await enquirer.prompt<{ blogId: string }>({
        type: 'input',
        name: 'blogId',
        message: 'Insert the spacehey blog ID to post to napoleon:',
    })

    migrateSingleBlog(blogId)
}
