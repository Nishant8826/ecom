import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { baseUrl } from "@/config";
import axios from "axios";

const ProductImageUpload = ({
    imageFile,
    setImageFile,
    uploadedImageUrl,
    setUploadedImageUrl,
    imageLoadingState,
    setImageLoadingState,
    currentEditedId
}) => {
    const inputRef = useRef(null);


    const handleImageFileChange = (event) => {
        console.log(event.target.files, "event.target.files");
        const selectedFile = event.target.files?.[0];
        if (selectedFile) setImageFile(selectedFile);
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) setImageFile(droppedFile);
    }

    const handleRemoveImage = () => {
        setImageFile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    const uploadImageToCloudinary = async() => {
        setImageLoadingState(true);
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const response = await axios.post(`${baseUrl}/admin/product/image-upload`, formData);
            if (response?.data?.success) {
                setUploadedImageUrl(response.data.result.url);
                setImageLoadingState(false);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }

    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary();
    }, [imageFile]);

    return (
        <div
            className={`w-full  mt-4 max-w-md mx-auto`}
        >
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`${currentEditedId !== null ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}
            >
                <Input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleImageFileChange}
                />
                {!imageFile ? (
                    <Label
                        htmlFor="image-upload"
                        className={`${currentEditedId !== null ? "cursor-not-allowed" : "cursor-pointer"} flex flex-col items-center justify-center h-32`}
                    >
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>Drag & drop or click to upload image</span>
                    </Label>
                ) : (imageLoadingState ? (
                    <Skeleton className="h-10 bg-gray-200" />
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 text-primary mr-2 h-8" />
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={handleRemoveImage}
                        >
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductImageUpload;