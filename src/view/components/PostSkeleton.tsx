import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function PostSkeleton() {
    return (
        <Stack >
            <Skeleton variant="rectangular" width={"100%"} height={215}/>
            <Skeleton variant="text" width={"80%"}  sx={{ fontSize: '2rem' }}/>
            <Skeleton variant="text" width={"100%"} />
            <Skeleton variant="text" width={"100%"} />
            <Skeleton variant="text" width={"60%"} />
        </Stack>
    );
}