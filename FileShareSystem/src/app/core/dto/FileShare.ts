import { User } from "./user";

export class  FileShare {
    constructor(
        public id:string = "",
        public file : File,
        public user : User ,
       
    ) { }
}