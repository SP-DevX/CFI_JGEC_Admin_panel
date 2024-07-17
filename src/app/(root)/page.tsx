
import React from 'react'
import Layout from "@/Components/common/CommonLayout";
import { DashboardItems } from '@/utils/DashboardITems';
import Link from "next/link"

const Dashboard = () => {
    return (
        <Layout header="dashboard">
            <div>
                <div className='grid grid-cols-5 gap-x-6'>
                    {
                        DashboardItems.map(item => {
                            const { name, path, color, icon } = item;
                            return (
                                <Link href={path} key={name}>
                                    <div className={`w-full h-28 rounded-xl  p-4 text-white`} style={{ backgroundColor: color }}>
                                        <div className='flex justify-between items-center mb-4'>
                                            <h1 className='text-lg font-semibold capitalize'>{name}</h1>
                                            {icon}
                                        </div>
                                        <p className='text-2xl font-semibold mx-4'>10</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard