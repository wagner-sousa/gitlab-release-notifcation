import { GitlabFeedService } from "./services/GitlabFeedService";

function app()
{
    try {
        
        let gitlabService: GitlabFeedService = new GitlabFeedService('https://gitlab.com/gitlab-org/gitlab-foss/-/tags?format=atom');

        if(!gitlabService.hasTags()) {
            throw new Error("Nenhuma tag encontrada!");
        }

        let tag: Tag = gitlabService.getLastTag();

        if(!tag.isRelease()) {
            throw new Error("Tag " + tag.version + " não é um release!");
        }



    } catch (error) {
        console.error(error.message);
    }
}