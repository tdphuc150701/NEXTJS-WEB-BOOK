'use client'
import User from "@/component/app.user"
import useSWR from 'swr';

interface Iprops {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    users: IUser[]
    data: string

}

const UserPage = (props: Iprops) => {

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/users",
        fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div  >

            <User users={data} showModalUpdate={false} setShowModalUpdate={function (value: boolean): void {
                throw new Error("Function not implemented.");
            }} data={""} />

        </div>
    )
}
export default UserPage