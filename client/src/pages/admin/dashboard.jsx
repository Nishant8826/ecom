import ProductImageUpload from '@/components/admin/image-upload';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { addCarousel, getCarousel } from '@/store/carouselSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AdminDashboard = () => {
    const { carouselImageList } = useSelector((state) => state.carousel);
    const dispatch = useDispatch();
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const { toast } = useToast();

    function handleUploadFeatureImage() {
        if (uploadedImageUrl == '') {
            toast({
                title: `Please select an Image`,
                variant: "destructive",
            });
            return;
        }
        dispatch(addCarousel(uploadedImageUrl)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getCarousel());
                setImageFile(null);
                setUploadedImageUrl("");
                toast({
                    title: `Successfully Added!`,
                });
            }
        });
    }

    useEffect(() => {
        dispatch(getCarousel())
    }, [dispatch])

    return (
        <div>
            <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                imageLoadingState={imageLoadingState}
                setImageLoadingState={setImageLoadingState}
            />
            <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
                Upload
            </Button>
            <div className="flex flex-col gap-4 mt-5">
                {carouselImageList && carouselImageList.length > 0 ? carouselImageList.map((item) => (
                    <div className="relative" key={item._id}>
                        <img src={item.image} className="w-full h-[300px] object-cover rounded-t-lg" />
                    </div>
                )) : null}
            </div>
        </div>
    )
}

export default AdminDashboard