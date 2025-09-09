import ProductFilter from '@/components/shopping/filter'
import ProductDetailsDialog from '@/components/shopping/product-details'
import ShoppingProductTile from '@/components/shopping/product-tile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addCart, fetchCart } from '@/store/cartSlice'
import { fetchAllFilteredProducts, fetchProductDetail } from '@/store/shopProductSlice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];
  for (let [item, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const queryStr = value.join(',');

      queryParams.push(`${item}=${queryStr}`);
    }
  }
  return queryParams.join('&');
}

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { products, productDetails } = useSelector(state => state.shoppingProduct)
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();

  const categorySearchParam = searchParams.get('category')

  const handleSort = (value) => {
    setSort(value)
  }

  const handleFilter = (getSectionId, getCurrentOption) => {

    let copyFilter = { ...filters };
    const indexOfCurrentSection = Object.keys(copyFilter).indexOf(getSectionId);

    if (indexOfCurrentSection == -1) {
      copyFilter = {
        ...filters,
        [getSectionId]: [getCurrentOption]
      }
    } else {
      const indexOfCurrentOption = copyFilter[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption == -1) copyFilter[getSectionId].push(getCurrentOption);
      else copyFilter[getSectionId].splice(indexOfCurrentOption, 1)
    }

    setFilters(copyFilter);
    sessionStorage.setItem('filters', JSON.stringify(copyFilter));

  }

  const handleAddtoCart = (productId) => {
    dispatch(addCart({ userId: user._id, productId, quantity: 1 })).then((response) => {
      if (response?.payload?.success) {
        dispatch(fetchCart({ userId: user?._id }))
        toast({ title: 'Product is Added to Cart successfully' });
      }
    }).catch((err) => {
      toast({
        variant: 'destructive',
        title: err.message ? err.message : 'Error Occured'
      })
    })
  }

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetail(productId))
    setOpenDetailsDialog(true);
  }

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters])


  useEffect(() => {
    setSort('price-lowtohigh');
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortBy: sort }));
    }
  }, [dispatch, filters, sort])

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} setFilters={setFilters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {products?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-white">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id} className="cursor-pointer hover:bg-gray-400">
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {products && products.length > 0
            ? products.map((item) => (
              <ShoppingProductTile key={item._id} handleGetProductDetails={handleGetProductDetails} product={item} handleAddtoCart={handleAddtoCart} />
            ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  )
}

export default ShoppingListing