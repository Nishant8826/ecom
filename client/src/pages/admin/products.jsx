import ProductImageUpload from '@/components/admin/image-upload';
import CommonForm from '@/components/common/form';
import { addProductFormElements } from '@/config';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, editProduct, fetchAllProducts } from '@/store/adminProductSlice';
import { useToast } from '@/hooks/use-toast';
import AdminProductTile from '@/components/admin/adminProductTile';


const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const { products } = useSelector((state) => state.adminProduct);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const onSubmit = (e) => {
    console.log(currentEditedId, "currentEditedId in onSubmit");
    e.preventDefault();
    currentEditedId == null ?
      dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then((result) => {
        if (result?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setImageFile(null);
          setUploadedImageUrl("");
          toast({
            title: 'Product Added Successfully',
            variant: 'success'
          });
        }
      }) :
      dispatch(editProduct({ id: currentEditedId, formData })).then((result) => {
        if (result?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setImageFile(null);
          setUploadedImageUrl("");
          setCurrentEditedId(null);
          toast({
            title: 'Product Updated Successfully',
            variant: 'success'
          });
        }
      });
  }

  const isFormValid = () => {
    return Object.keys(formData).map(key => formData[key] !== "").every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(currentEditedId, "currentEditedId");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)} className="bg-black p-4 text-white hover:bg-gray-800">
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products && products.length > 0
          ? products.map((item) => (
            <AdminProductTile product={item} key={item._id} setCurrentEditedId={setCurrentEditedId} setFormData={setFormData} setOpenCreateProductsDialog={setOpenCreateProductsDialog} />
          ))
          : null}
      </div>


      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setCurrentEditedId(null);
        }}
      >
        <SheetContent side="right" className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle>
              {`${currentEditedId !== null ? "Edit" : "Add New"} Product`}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            currentEditedId={currentEditedId}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid() || imageLoadingState}
            />
          </div>
        </SheetContent>
      </Sheet>



    </Fragment>
  )
}

export default AdminProducts