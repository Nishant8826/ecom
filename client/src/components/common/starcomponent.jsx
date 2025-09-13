import React from 'react'
import { Button } from '../ui/button'
import { StarIcon } from 'lucide-react'

const StarComponent = ({ rating, handleRatingChange }) => {
    return (
        [1, 2, 3, 4, 5].map((star) => (
            <Button className={`p-2 rounded-full border border-gray-200 bg-white hover:bg-white ${star <= rating ? "text-yellow-500" : "text-black "}`} size="icon" onClick={handleRatingChange ? () => handleRatingChange(star) : null} >
                <StarIcon className={`w-10 h-10 ${star <= rating && "fill-yellow-500"}`} />
            </Button>
        ))
    )
}

export default StarComponent