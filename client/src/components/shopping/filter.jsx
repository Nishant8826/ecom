import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

function ProductFilter({ filters, setFilters, handleFilter }) {

  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem, idx) => (
          <Fragment key={idx}>
            <div>
              <h3 className="text-base font-bold capitalize">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option, id) => (
                  <Label key={id} className="flex font-medium items-center gap-2 ">
                    <Checkbox onCheckedChange={() => handleFilter(keyItem, option.id)} checked={filters && Object.keys(filters).length > 0 && filters[keyItem] && filters[keyItem].indexOf(option.id) != -1} />
                    {option.label}
                  </Label>
                ))}
                <div className="border-b border-gray-200 mt-4"></div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;