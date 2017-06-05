import IAvatar = Daze.Interfaces.IAvatar;

export class Avatar implements IAvatar {
    constructor(
        public penName: string,
        public profileImageUrl: string,
        public bio: string) { }
}