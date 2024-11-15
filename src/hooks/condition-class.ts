export const getClass = (status: string) => {
    switch (status) {
        case "Order Placed":
            return "step-1 active";
        case "In Production":
            return "step-2 active";
        case "Shipping":
            return "step-3 active";
        case "Delivered":
            return "step-4 active";
        default:
            return "step-1 active";
    }
};
export const getLineActiveClass = (status: string) => {
    switch (status) {
        case "Order Placed":
            return "line-active";
        case "In Production":
            return "line-active";
        case "Shipping":
            return "line-active";
        case "Delivered":
            return "line-active";
        default:
            return "line-active";
    }
};