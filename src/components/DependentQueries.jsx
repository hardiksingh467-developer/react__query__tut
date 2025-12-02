import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const readUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`);
}

const readCoursesByChannelId = (cahnnelId) => {
    return axios.get(`http://localhost:4000/courses/${cahnnelId}`);
}

const DependentQueries = ({email}) => {

    const {data: user, } = useQuery(['user', email], (email) => readUserByEmail(email))
    
    const channelId = user?.data.channelId;

    const { data: courses }= useQuery(['courses', channelId], 
    () => readCoursesByChannelId(channelId),
    {
        enabled: !!channelId,// this will fire the query only when channelId is available
    }
    );
  return (
    <div>DependentQueries</div>
  )
}

export default DependentQueries