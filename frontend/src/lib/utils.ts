import { Product } from "./types";

class SortCfg 
{
    key?: keyof Product
    direction?: 'asc' | 'desc'
    constructor(key: keyof Product, direction: "asc" | "desc") {
        this.key = key
        this.direction = direction
    }
}
export const sortProducts=(key: keyof Product, direction: "asc" | "desc", toSort: Product[])=>{
    const sortedProducts=[...toSort].sort((a, b)=>{
        if(a[key]<b[key]){
            return direction==="asc" ? -1 : 1;
        }
        if(a[key]>b[key]){
            return direction==="asc" ? 1 : -1;
        }
        return 0;
    });
    const cfg = new SortCfg(key, direction)
    return({sortedProducts, cfg});
    
};

export const handleSearch=(event: React.ChangeEvent<HTMLInputElement>, searchTerm: string, products: Product[])=>{
    const term=event.target.value.toLowerCase();
    const elerheto=event.target.value === "isAvailable";

    searchTerm=term;

    const filtered = products.filter((product) => {

        if (elerheto && !product.availability) {
            return false;
        }

        const availabilityText = product.availability ? "available" : "unavailable";

        return (
            product.event.toLowerCase().includes(term) ||
            product.type.toLowerCase().includes(term) ||
            product.price.toString().toLowerCase().includes(term) ||
            availabilityText.includes(term) ||
            product.seat.toString().includes(term)
        );
    });

    return filtered;
}
