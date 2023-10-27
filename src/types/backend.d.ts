interface IBlog {

    id: string;
    content: string;
    author: string;
    title: string;
    blog: []
    price: number;
    rate: number;
    image_url: string; //biến nhận vào cả hai kiểu sữ liệu null hoặc string. chưa hiểu lắm
    count: number;
    search: any;
    quantity_in_stock: number;
    created_at: Date;
    publication_date: Date;
    description: string

}

interface IUser {
    username: string;
    phone: number;
    email: string;
    password: string;
    // user: []
    id: string;


}