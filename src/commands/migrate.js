import enquirer from 'enquirer'
import { migrateSingleBlog } from '../actions/migrate-single-blog.js'

export async function migrate(options, command) {
    let spaceheyId = process.env.SPACEHEY_SESSID
    let napoleonId = process.env.NAPOLEON_SESSID

    if (process.env.NODE_ENV !== 'development') {
        const answers = await enquirer.prompt([
            {
                type: 'input',
                name: 'spaceheyId',
                message: 'Insert your spacehey session ID:',
            },
            {
                type: 'input',
                name: 'napoleonId',
                message: 'Insert your napoleon session ID:',
            },
        ])

        spaceheyId = answers.spaceheyId
        napoleonId = answers.napoleonId
    }

    const { blogId } = await enquirer.prompt({
        type: 'input',
        name: 'blogId',
        message: 'Insert the spacehey blog ID to post to napoleon:',
    })

    migrateSingleBlog(blogId, spaceheyId, napoleonId)
}
