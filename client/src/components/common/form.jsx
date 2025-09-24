import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) => {


    const renderInput = (item) => {
        let element = null;
        const value = formData[item.name] || '';

        switch (item.componentType) {
            case 'input':
                element = <Input className='rounded-[5px] border-gray-200 placeholder:text-gray-400' name={item.name} type={item.type} placeholder={item.placeholder} key={item.name} value={value} onChange={e => setFormData({ ...formData, [item.name]: e.target.value })} />
                break;
            case 'select':
                element = (
                    <Select onValueChange={(value) => setFormData({ ...formData, [item.name]: value, })} value={value}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={item.label} />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {item.options && item.options.length > 0
                                ? item.options.map((optionItem) => (
                                    <SelectItem key={optionItem.id} value={optionItem.id}>
                                        {optionItem.label}
                                    </SelectItem>
                                ))
                                : null}
                        </SelectContent>
                    </Select>
                );
                break;
            case 'textarea':
                element = <Textarea className='rounded-[5px] border-gray-200 placeholder:text-gray-400' value={value} name={item.name} placeholder={item.placeholder} id={item.id} onChange={e => setFormData({ ...formData, [item.name]: e.target.value })} />
                break;

            default:
                element = <Input className='rounded-[5px] border-gray-200 placeholder:text-gray-400' name={item.name} type={item.type} placeholder={item.placeholder} key={item.name} value={value} onChange={e => setFormData({ ...formData, [item.name]: e.target.value })} />
                break;
        }
        return element;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {
                    formControls.map(item =>
                        <div className='grid w-full gap-1.5' key={item.name}>
                            <Label className='mb-1'>{item.label}</Label>
                            {
                                renderInput(item)
                            }
                        </div>)
                }
                <Button disabled={isBtnDisabled} className='mt-2 w-full bg-black text-white rounded-[5px] hover:bg-black/80' type='submit'>{buttonText}</Button>
            </div>
        </form>
    )
}

export default CommonForm;