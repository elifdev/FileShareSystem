export class PasswordChangeRequest {
    constructor(
        public oldPassword: string,
        public newPassword: string,
    ) {}
}