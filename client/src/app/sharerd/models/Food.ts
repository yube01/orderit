export class Food{
  id!:string;  //required
  name!:string;
  price!:number;
  tags?:string[]; //not mandatory
  favorite!:boolean;
  stars!:number;
  imageUrl!:string;
  origins!:string[];
  cookTime!:string
}
