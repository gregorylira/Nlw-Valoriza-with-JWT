import { getCustomRepository, getRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"
import { classToPlain } from "class-transformer"

class ListTagsService {

    async execute (){
        const tagsRepositores = getCustomRepository(TagsRepositories)
        const tags = await tagsRepositores.find();
        
        return classToPlain(tags);
    }
}


export { ListTagsService };