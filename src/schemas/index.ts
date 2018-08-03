import { mongoose } from '../persistance/connection';
import { SkillDocument, PostDocument, ProjectDocument, ResourceDocument, BookDocument } from '../domain';
import { PostSchema } from './postSchema';
import { ProjectSchema } from './projectSchema';
import { ResourceSchema } from './resourceSchema';
import { SkillSchema } from './skillSchema';
import { BookSchema } from './bookSchema';
import { UserSchema } from './userSchema';

const PostModel = mongoose.model<PostDocument>('Post', PostSchema);
const ProjectModel = mongoose.model<ProjectDocument>('Project', ProjectSchema);
const ResourceModel = mongoose.model<ResourceDocument>('Resource', ResourceSchema);
const SkillModel = mongoose.model<SkillDocument>('Skill', SkillSchema);
const BookModel = mongoose.model<BookDocument>('Book', BookSchema);
const UserModel = mongoose.model<BookDocument>('User', UserSchema);

export {
    PostModel,
    ProjectModel,
    ResourceModel,
    SkillModel,
    BookModel,
    UserModel
};

