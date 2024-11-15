export interface ProductType {
  _id: string;
  categoryName: string;
  oldPrice: number;
  price: number;
  productDetails: string;
  productImages: string[];
  productName: string;
  productQuantity: number;
  subcategoryName: string;
  img: string;
  date: string;
  offer: boolean;
  offerPersent: number;
  rettings: number[];
  productStatus: string;
}

export interface CategoryType {
  _id: string;
  categoryName: string;
  categoryclass: string;
  categoryThumb: string;
}
export interface SubCategoryType {
  _id: string;
  subCategoryName: string;
  subcategoryclass: string;
  categoryName: string;
  brandImg: string;
}

export interface UserReviewType {
  _id: string;
  productName: string;
  review: string;
  name: string;
  email: string;
  date: string;
  productId: string;
  categoryName: string;
  retting: number;
  img: string;
}
export interface blogDataType {
  _id: string;
  title: string;
  blogDetails: string;
  img: string;
  date: string;
  author: string;
  commentsArray: [];
  authorEmail: string;
  comment: number;
}

export interface dynamicIdType {
  id: string;
}
export interface CommentType {
  _id: string;
  date: string;
  comment: string;
  email: string;
  name: string;
  postId: string;
  img: string;
  title: string;
}

export interface offerProductType {
  _id: string;
  productId: string;
  productName: string;
  banner: string;
  date: string;
  offerPersent: number;
  price: number;
  oldPrice: number;
  productDetails: string;
}

// team api interface

export interface TeamMember {
  _id: string;
  title: string;
  subTitle: string;
  img: string;
  imgTwo: string;
  imgThree: string;
  date: string;
  aboutMe: string;
  phone: string;
  email: string;
  location: string;
  skills: Skill[];
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export interface Skill {
  skillName: string;
  precent: string;
  _id: string;
}


export interface CanceOrderDataType {
  _id: string;
  buyerEmail: string | undefined;
  EmailAddress: string;
  date: string;
  Phone: string;
  productId: string;
  productName: string;
  returnAmount:number;
  paymentId: string;
  orderId?: string;
  returnStatus: string;
  orderProduct:any;
}