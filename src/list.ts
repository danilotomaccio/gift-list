import axios from "axios";

export interface Gift {
    name: string,
    link: string,
    price: string,
    img: string,
    description?: string
}

const url = "https://script.google.com/macros/s/AKfycbxMC6yuo2vDV9nwgrmSKanTFvKxX5dk3DehtVlyGtYS04Gw5AX0RgllAb2-dM5CppIF/exec";

export async function getGiftList() {
    const list = (await axios.get<Gift[]>(url)).data;
    return list;
}
