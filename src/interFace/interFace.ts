import { ProductType, TeamMember, blogDataType } from "./api-interFace";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  date: string;
  phone: string;
  photo: string;
  gender: string;
}

interface HeaderType {
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
}

// children type

export interface childrenType {
  children: React.ReactNode;
}

// context api data type

export interface AppContextType {
  sideMenuOpen?: boolean;
  // 

  header: HeaderType;
  toggleSideMenu?: () => void;
  toggleModal?: () => void;
  logout?: () => void; 
  scrollDirection?: string;
  setScrollDirection?: React.Dispatch<React.SetStateAction<string>> | undefined;
  showSidebar?: boolean;
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>
  showSidebarWishlist?: boolean;
  setShowSidebarWishlist?: React.Dispatch<React.SetStateAction<boolean>>;
  prodcutLoadding: boolean;
  setProdcutLoadding: React.Dispatch<React.SetStateAction<boolean>>;
  openWishlist?: boolean;
  setOpenWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  user?: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  loggedIn?: boolean; 
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  newComment: boolean;
  setNewComment: React.Dispatch<React.SetStateAction<boolean>>;
  openCart: boolean;
  setModalId: React.Dispatch<React.SetStateAction<string>>;
  modalId: string;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  totalPages: number;
  setotalPages: React.Dispatch<React.SetStateAction<number>>;
  totalProduct: number;
  settotalProduct: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setcurrentPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  limit:number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  dynamicId:string;
  setDynamicId: React.Dispatch<React.SetStateAction<string>>;
  paymentSuccess: boolean;
  setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[] | []>>;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  myproducts: ProductType[];
  setMyProducts: React.Dispatch<React.SetStateAction<ProductType[] | []>>;
  blog: blogDataType[];
  setBlog: React.Dispatch<React.SetStateAction<blogDataType[] | []>>;
  teamList: TeamMember[];
  setTeamList: React.Dispatch<React.SetStateAction<TeamMember[] | []>>;
  Paymentproducts: SellProductInfoType[];
  setPaymentProducts: React.Dispatch<
    React.SetStateAction<SellProductInfoType[] | []>
  >;
}
export interface idType {
  id?: number;
}

// menu type

interface DropdownItem {
  link: string;
  title: string;
}

export interface NavMenuItem {
  id: number;
  link: string;
  title: string;
  hasDropdown?: boolean;
  megamenu?: boolean;
  dropdownItems: DropdownItem[];
}

// cart product type

export interface CartProductType {
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
  orderData?: string;
  offer: boolean;
  offerPersent: number;
  rettings: number[];
  productStatus: string;
  __v?: number;
  totalCard: number;
  bayerEmail?: string;
  clientIP?: string;
  productId?: string;
  netprice?: number;
  totalPrice?: number;
  retting?: number;
  averageRating: number;
  numRatings?: number;
}

export interface SellProductInfoType {
  bayerEmail: string | undefined;
  name: string;
  Address: string;
  City: string;
  Postcode: string;
  EmailAddress: string;
  Phone: string;
  totalPrice: number;
  orderSummary: CartProductType[]; // Assuming CartProductType is the type for items in cartProducts
}


// order product type

export interface Product {
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
  __v: number;
  totalCard: number;
  orderDate: string;
}

export interface ShipMentStatus {
  orderStatusDate?:string;
  paymentId?: string;
  shipmentStatus?: string;
  orderId?: string;
}

export interface PaymentInfoType {
  _id:string;
  buyerEmail: string | undefined;
  name: string;
  Address: string;
  City: string;
  Postcode: string;
  EmailAddress: string;
  date: string;
  orderStatusDate: string;
  Phone: string;
  totalPrice: number;
  orderProducts?: any;
  paymentId: string;
  shipmentStatus: string;
  orderId?: string;
  shipmentStatusArray?:ShipMentStatus[] | undefined

}