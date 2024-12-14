export interface Product{
    id: number;
    event: string;
    type: string;
    price: number;
    availability: boolean;
    seat: string;
}

export interface Profile{
    id: number;
    name: string;
    email: string;
    password: string;
}
