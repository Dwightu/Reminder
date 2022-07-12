import Router from 'next/router'
import { useEffect } from 'react'
import useRequest from '../../hooks/useRequest'

function signout() {
    const { doRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    })

    useEffect(() => {
        doRequest();
    }, [])

    return (
        <div>Signing you out...</div>
    )
}

export default signout
