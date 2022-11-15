import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {

    const fileNames = fs.readdirSync(postDirectory)
    //['pre-rendering.md', ...]
    const allPostData = fileNames.map(fileName=>{
        const id = fileName.replace(/\.md$/, "");

        const fullPath = path.join(postDirectory, fileName)
        const fileContent = fs.readFileSync(fullPath)

        const matterResult = matter(fileContent)

        return{
            id,
            // ...allPostData(matterResult.data as {date : string; title: string})
            ...(matterResult.data as {date : string; title: string})
        }
    })

    //sorting 

    return allPostData.sort((a,b)=>{
        if(a.date < b.date){
            return 1
        } else {
            return -1
        }
    })

}