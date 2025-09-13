import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";
import { addAddress, deleteAddress, fetchUserAddress, updateAddress } from "@/store/addressSlice";

const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
};

const Address = ({ setCurrentAddress }) => {
    const { user } = useSelector(state => state.auth);
    const { addressList } = useSelector((state) => state.address);
    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const { toast } = useToast();


    const handleManageAddress = (event) => {
        event.preventDefault();

        if (addressList && addressList.length >= 3 && currentEditedId === null) {
            setFormData(initialAddressFormData);
            toast({ title: "You can add max 3 addresses", variant: "destructive", });
            return;
        }

        currentEditedId ?
            dispatch(updateAddress({ userId: user?._id, addressId: currentEditedId, formData })).then((res) => {
                if (res.payload.success) {
                    dispatch(fetchUserAddress(user?._id))
                    toast({ title: 'Address updated successfully!', })
                    setFormData(initialAddressFormData)
                    setCurrentEditedId(null);
                }
            })
            : dispatch(addAddress({ ...formData, userId: user?._id })).then((res) => {
                if (res?.payload?.success) {
                    dispatch(fetchUserAddress(user?._id))
                    toast({ title: 'Address added successfully!', })
                    setFormData(initialAddressFormData)
                }
            })

    }

    const handleDeleteAddress = (getCurrentAddress) => {
        dispatch(deleteAddress({ userId: user?._id, addressId: getCurrentAddress?._id })).then((res) => {
            if (res.payload.success) {
                dispatch(fetchUserAddress(user?._id))
            }
        })
    }

    const handleEditAddress = (getCuurentAddress) => {
        setCurrentEditedId(getCuurentAddress?._id);
        setFormData({
            ...formData,
            address: getCuurentAddress?.address,
            city: getCuurentAddress?.city,
            phone: getCuurentAddress?.phone,
            pincode: getCuurentAddress?.pincode,
            notes: getCuurentAddress?.notes,
        });
    }

    const isFormValid = () => {
        return Object.keys(formData).map((key) => formData[key].trim() !== "").every((item) => item);
    }

    useEffect(() => {
        dispatch(fetchUserAddress(user?._id));
    }, [dispatch]);

    return (
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
                {addressList && addressList.length > 0 ? addressList.map((addressItem) => (
                    <AddressCard key={addressItem._id} handleDeleteAddress={handleDeleteAddress} addressInfo={addressItem} handleEditAddress={handleEditAddress} setCurrentAddress={setCurrentAddress} />
                ))
                    : null}
            </div>
            <CardHeader>
                <CardTitle>
                    {currentEditedId !== null ? "Edit Address" : "Add New Address"}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttonText={currentEditedId !== null ? "Edit" : "Add"} onSubmit={handleManageAddress} isBtnDisabled={!isFormValid()} />
            </CardContent>
        </Card>
    );
}

export default Address;