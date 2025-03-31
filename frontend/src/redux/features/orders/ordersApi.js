import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import getBaseURL from '../../../utils/getBaseURL'
const ordersApi = createApi({
    reducerPath: 'ordersApi',  // Name for the slice in Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/orders`,  // API base URL
        credentials: 'include' // Ensures cookies are sent with requests (for authentication)
    }),
    tagTypes: ['Orders'],  // Tags for cache invalidation
    endpoints: (builder) => ({ 
        createOrder: (builder.mutation) ({  // Mutation for creating an order
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
                credentials: 'include', // Ensures authentication is maintained
            })
        }),
        getOrderByEmail: (builder.query) ({ // Query for fetching orders by email
            query: (email) => ({
                url: `/email/${email}`
            }),
            providesTags: ['Orders'] // Enables cache updates when 'Orders' data changes
        })
    })
})

export const {useCreateOrderMutation, useGetOrderByEmailQuery} = ordersApi
export default ordersApi