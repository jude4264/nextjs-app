import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

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



export function getAllPostIds() {
    const fileNames = fs.readdirSync(postDirectory)
    return fileNames.map(filename =>{
        return{

            params : {
                id : filename.replace(/\.md$/, "")
            }
        }
    })
    
  }

  export async function getPostData(id:string) {
    const fullPath = path.join(postDirectory, `${id}.md`)
    const fileContent = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContent);

    const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content)

    const contentHtml = processedContent.toString()
    return{
        id,
        contentHtml,
        ...(matterResult.data as {date : string; title: string})
    }
  }