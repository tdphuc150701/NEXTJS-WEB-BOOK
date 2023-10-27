'use client'
import axios from "axios"

export const fetch = async () => {
    try {
        const rs = await axios("https://book-manage-0fy7.onrender.com/api/books")
        return rs.data

    } catch (error) {
        return null

    }

}