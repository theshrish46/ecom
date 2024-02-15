"use client";

import { Ratings } from "@prisma/client";

interface RatingsProps {
    data: Ratings
}

const Ratings = ({ data }: RatingsProps) => {
    return (
        <div>
            {data}
        </div>
    );
}

export default Ratings;