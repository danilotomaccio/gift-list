import axios from "axios";

export interface Gift {
    name: string,
    link: string,
    price: string,
    img: string,
    description?: string
}

const url = "https://script.google.com/macros/s/AKfycbyqGkB4zYMCc61NsRLy7N0c7gOJP0tNqlCf2LMoW5kgovSQ9eqA7SGIhO07dRlZtX1W/exec";

export async function getGiftList() {
    const list = (await axios.get<Gift[]>(url)).data;
    return list;
}
