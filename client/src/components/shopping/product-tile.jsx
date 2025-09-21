import { Card, CardContent, CardFooter } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { brandOptionsMap, categoryOptionsMap } from "@/config"
import { useSelector } from "react-redux"
import LoginModal from "@/pages/auth/loginModal"
import { useEffect, useState } from "react"

const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddtoCart }) => {

  const { user } = useSelector(state => state.auth);
  const [loginOpen, setLoginOpen] = useState(false)
  const [clickedProduct, setClickedProduct] = useState({})



  const handleCart = (id, totalStock) => {
    setClickedProduct({ id, totalStock })
    if (user && user._id) {
      handleAddtoCart(product?._id, product?.totalStock)
    } else {
      setLoginOpen(true);
    }
  }

  useEffect(() => {
    if (user && user._id && clickedProduct) {
      handleAddtoCart(clickedProduct.id, clickedProduct.totalStock);
      setClickedProduct(null);
      setLoginOpen(false);
    }
  }, [user]);

  return (

    <Card key={product._id} className="w-full max-w-sm mx-auto hover:cursor-pointer flex flex-col justify-between">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img src={product?.image} alt={product?.title} className="w-[300px] h-[300px] object-contain rounded-t-lg" />
          {
            product?.totalStock == 0 ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out of Stock
            </Badge> : product?.totalStock < 10 ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`only ${product?.totalStock} items left`}
            </Badge> :
              product?.salePrice > 0 ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Sale
              </Badge>
                : null
          }
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {
          product?.totalStock == 0 ?
            <Button className="w-full cursor-not-allowed opacity-65">
              Out of Stock
            </Button> :
            <Button className="w-full" onClick={() => handleCart(product?._id, product?.totalStock)}>
              Add to cart
            </Button>
        }
      </CardFooter>
      <LoginModal open={loginOpen} onClose={setLoginOpen} />
    </Card>



  )
}

export default ShoppingProductTile