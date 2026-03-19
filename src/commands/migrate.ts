import enquirer from 'enquirer'
import { migrateSingleBlog } from '../actions/migrate-single-blog'
import { getUserKeys } from '../helpers/keys'
import { spinner } from '../constants'

export async function migrate() {
    // checking if keys exists
    const result = await getUserKeys()

    if (result.isErr()) {
        spinner.error(result.error.message)
        return
    }

    const { blogId } = await enquirer.prompt<{ blogId: string }>({
        type: 'input',
        name: 'blogId',
        message: 'Insert the spacehey blog ID to post to napoleon:',
    })

    const migrateResult = await migrateSingleBlog(blogId)

    if (migrateResult.isErr()) {
        spinner.error(migrateResult.error.message)
    } else {
        spinner.success('Blog posted! Check Napoleon.')
    }
}
