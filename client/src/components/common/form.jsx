import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText }) => {


    const renderInput = (item) => {
        let element = null;
        const value = formData[item.name] || '';

        switch (item.componentType) {
            case 'input':
                element = <Input name={item.name} type={item.type} placeholder={item.placeholder} key={item.name} value={value} onChange={e => setFormData({ ...formData, [item.name]: e.target.value })} />
                break;
            case 'select':
                element = <Select onValueChange={(value) => setFormData({ ...formData, [item.name]: value })} value={value}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={item.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            item.options && item.options.length > 0 ? item.options.map(i => <SelectItem key={i.id} value={i.id}></SelectItem>) : null
                        }
                    </SelectContent>
                </Select>
                break;
            case 'textarea':
                element = <Textarea value={value} name={item.name} placeholder={item.placeholder} id={item.id} onChange={e => setFormData({ ...formData, [item.name]: e.target.value })} />
                break;

            default:
                element = <Input name={item.name} type={item.type} placeholder={item.placeholder} key={item.name} value={value} onChange={e => setFormData({ ...formData, [item.name]: e.target.value })} />
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
                <Button className='mt-2 w-full' type='submit'>{buttonText}</Button>
            </div>
        </form>
    )
}

export default CommonForm