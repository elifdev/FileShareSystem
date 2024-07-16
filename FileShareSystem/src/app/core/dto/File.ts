import { User } from "./user";

export class  File {
    constructor(
        public id:string = "",
        public fileName: string = '',
        public filePath: string = '',
        public localDateTime: string = '',
        public user : User ,
       
    ) { }
}