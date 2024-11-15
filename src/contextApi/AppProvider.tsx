"use client";
import React, { createContext, useState, useEffect } from "react";
import {
  AppContextType,
  IUser,
  SellProductInfoType,
} from "@/interFace/interFace";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  ProductType,
  TeamMember,
  blogDataType,
} from "@/interFace/api-interFace";
import jwtDecode from "jwt-decode";
export const AppContext = createContext<AppContextType | undefined>(undefined);
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);
  const [totalPages, setotalPages] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(0);
  const [prodcutLoadding, setProdcutLoadding] = useState<boolean>(false);

  const dispatch = useDispatch();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [myproducts, setMyProducts] = useState<ProductType[]>([]);
  const [Paymentproducts, setPaymentProducts] = useState<SellProductInfoType[]>(
    []
  );
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalId, setModalId] = useState<string>("");
  const [scrollDirection, setScrollDirection] = useState("up");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  // wishlist states
  const [showSidebarWishlist, setShowSidebarWishlist] =
    useState<boolean>(false);
  const [openWishlist, setOpenWishlist] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<blogDataType[]>([]);
  const [teamList, setTeamList] = useState<TeamMember[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [dynamicId, setDynamicId] = useState<string>("");
  const [totalProduct, settotalProduct] = useState<number>(0);

  const token =localStorage.getItem("accessToken")
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (token || loggedIn) {
      axios
        .post(`${process.env.BASE_URL}user/get-user`, { token }, header)
        .then((res) => {
          if (res.data.data) {
            const userinfo = res.data.data;
            setLoggedIn(true);
            setUser(userinfo);
            setLoading(false);
            if (token) {
              const decodedToken: any = jwtDecode(token);
              const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds.
              const currentTime = Date.now();

              const timeUntilExpiration = expirationTime - currentTime;
              setTimeout(() => {
                logout();
              }, timeUntilExpiration);
            }
          }
        })
        .catch((e) => {
          setLoading(false);

        });
    } else {
      setLoading(false);
    }
  }, [token, loggedIn,update]);

  useEffect(() => {
    if (user?.email) {
      setProdcutLoadding(true)
      axios
        .get(
          `${process.env.BASE_URL}success/client-order-info?email=${user?.email}&page=${page}&limit=${limit}`
        )
        .then((res) => {
          setMyProducts(res.data.orderProduct);
          setotalPages(res.data.totalPages);
          setcurrentPage(res.data.currentPage);
          setProdcutLoadding(false)
        })
        .catch((e) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.email, paymentSuccess, page, limit]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setLoading(false);
    setLoggedIn(false);
    setUser(undefined);
  }; 

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const contextValue: AppContextType = {
    sideMenuOpen,
    toggleSideMenu,
    scrollDirection,
    setScrollDirection,
    showSidebar,
    setShowSidebar,
    user,
    setLoggedIn,
    setLoading,
    loading,
    logout,
    setUser,
    header,
    loggedIn,
    setProducts,
    products,
    openCart,
    setOpenCart,
    Paymentproducts,
    setPaymentProducts,
    toggleModal,
    openModal,
    setOpenModal,
    modalId,
    setModalId,
    newComment,
    setNewComment,
    blog,
    setBlog,
    teamList,
    setTeamList,
    myproducts,
    setMyProducts,
    paymentSuccess,
    setPaymentSuccess,
    currentPage,
    setcurrentPage,
    totalPages,
    setotalPages,
    page,
    setPage,
    limit,
    showSidebarWishlist,
    setShowSidebarWishlist,
    openWishlist,
    setOpenWishlist,
    prodcutLoadding, setProdcutLoadding,
    update, setUpdate,dynamicId, setDynamicId,totalProduct, settotalProduct
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
